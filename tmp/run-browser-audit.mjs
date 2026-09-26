import { WebSocket } from 'ws' || globalThis;

async function run() {
  const target = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' }).then(r => r.json());
  console.log('[AUDIT] Target created:', target.id);
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const logs = [];

  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const args = msg.params.args.map(a => a.value ?? a.description ?? JSON.stringify(a)).join(' ');
      const line = `[CONSOLE ${type.toUpperCase()}] ${args}`;
      logs.push(line);
      console.log(line);
    }
  });

  await new Promise(r => ws.on('open', r));
  console.log('[AUDIT] WebSocket connected');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');
  await send('CSS.enable');

  // Set viewport 1280x900
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('[AUDIT] Navigating to http://localhost:3000 ...');
  await send('Page.navigate', { url: 'http://localhost:3000' });

  // Wait 3 seconds for hydration and initial render
  await new Promise(r => setTimeout(r, 3500));

  console.log('\n--- EVALUATING INITIAL STATE (BEFORE SCROLL) ---');
  const initialEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('.how-header');
      const card = document.querySelector('.how-step-card');
      const cards = document.querySelectorAll('.how-step-card');
      const headline = document.querySelector('.how-header .section-headline');
      const headerCs = header ? window.getComputedStyle(header) : null;
      const cardCs = card ? window.getComputedStyle(card) : null;
      const headlineCs = headline ? window.getComputedStyle(headline) : null;

      return {
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        headerFound: !!header,
        cardsCount: cards.length,
        headlineFound: !!headline,
        header: headerCs ? {
          transform: headerCs.transform,
          opacity: headerCs.opacity,
          visibility: headerCs.visibility,
          boundingRect: header.getBoundingClientRect()
        } : null,
        headline: headlineCs ? {
          transform: headlineCs.transform,
          opacity: headlineCs.opacity,
          visibility: headlineCs.visibility,
          inlineStyle: headline.getAttribute('style'),
          boundingRect: headline.getBoundingClientRect()
        } : null,
        firstCard: cardCs ? {
          transform: cardCs.transform,
          opacity: cardCs.opacity,
          visibility: cardCs.visibility,
          inlineStyle: card.getAttribute('style'),
          boundingRect: card.getBoundingClientRect()
        } : null
      };
    })()`,
    returnByValue: true
  });
  console.log('INITIAL EVAL RESULT:', JSON.stringify(initialEval.result.value, null, 2));

  console.log('\n--- SCROLLING DOWN TO HOW IT WORKS SECTION ---');
  // Scroll in increments of 300px to simulate realistic scrolling
  for (let s = 300; s <= 3600; s += 300) {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${s}, behavior: 'instant' }); window.dispatchEvent(new Event('scroll'));`
    });
    await new Promise(r => setTimeout(r, 100));
  }

  // Wait 1.5 seconds for animations to play
  await new Promise(r => setTimeout(r, 1500));

  console.log('\n--- EVALUATING POST-SCROLL STATE ---');
  const postScrollEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('.how-header');
      const card = document.querySelector('.how-step-card');
      const cards = document.querySelectorAll('.how-step-card');
      const headline = document.querySelector('.how-header .section-headline');
      const headerCs = header ? window.getComputedStyle(header) : null;
      const cardCs = card ? window.getComputedStyle(card) : null;
      const headlineCs = headline ? window.getComputedStyle(headline) : null;

      return {
        scrollY: window.scrollY,
        header: headerCs ? {
          transform: headerCs.transform,
          opacity: headerCs.opacity,
          visibility: headerCs.visibility,
          boundingRect: header.getBoundingClientRect()
        } : null,
        headline: headlineCs ? {
          transform: headlineCs.transform,
          opacity: headlineCs.opacity,
          visibility: headlineCs.visibility,
          inlineStyle: headline.getAttribute('style'),
          boundingRect: headline.getBoundingClientRect()
        } : null,
        firstCard: cardCs ? {
          transform: cardCs.transform,
          opacity: cardCs.opacity,
          visibility: cardCs.visibility,
          inlineStyle: card.getAttribute('style'),
          boundingRect: card.getBoundingClientRect()
        } : null
      };
    })()`,
    returnByValue: true
  });
  console.log('POST-SCROLL EVAL RESULT:', JSON.stringify(postScrollEval.result.value, null, 2));

  // Take screenshot
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  const fs = await import('fs');
  fs.writeFileSync('/tmp/section-how-screenshot.png', Buffer.from(screenshot.data, 'base64'));
  console.log('[AUDIT] Screenshot saved to /tmp/section-how-screenshot.png (' + screenshot.data.length + ' base64 chars)');

  ws.close();
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
  console.log('[AUDIT] Done!');
}

run().catch(console.error);
