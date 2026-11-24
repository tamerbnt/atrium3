import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateHeroCurtainSnap,
  findActiveSectionId,
  computeCounterValue,
  clampSliderPercent,
  stepSliderPercent,
  isDashboardMetricVisible,
  buildDemoWhatsAppUrl,
  capDevicePixelRatio,
  shouldRenderHeroScene,
  formatCounterValue,
} from './scrollLogic';

test('evaluateHeroCurtainSnap triggers downward glide from Hero on user scroll down', () => {
  assert.equal(
    evaluateHeroCurtainSnap({
      scrollY: 18,
      prevScrollY: 0,
      delta: 18,
      direction: 1,
      windowH: 900,
      isSnapping: false,
      isTransitioning: false,
    }),
    'to-proof-strip'
  );
});

test('evaluateHeroCurtainSnap never hijacks programmatic navbar navigation from Hero', () => {
  assert.equal(
    evaluateHeroCurtainSnap({
      scrollY: 120,
      prevScrollY: 0,
      delta: 120,
      direction: 1,
      windowH: 900,
      isSnapping: false,
      isTransitioning: true,
    }),
    'none'
  );
});

test('evaluateHeroCurtainSnap triggers upward glide back to Hero from Section 1.5 top', () => {
  assert.equal(
    evaluateHeroCurtainSnap({
      scrollY: 880,
      prevScrollY: 900,
      delta: -20,
      direction: -1,
      windowH: 900,
      isSnapping: false,
      isTransitioning: false,
    }),
    'to-hero'
  );
});

test('evaluateHeroCurtainSnap does not trap scrolling below Section 1.5', () => {
  assert.equal(
    evaluateHeroCurtainSnap({
      scrollY: 1500,
      prevScrollY: 1520,
      delta: -20,
      direction: -1,
      windowH: 900,
      isSnapping: false,
      isTransitioning: false,
    }),
    'none'
  );
});

test('findActiveSectionId matches the deepest section above scrollPos', () => {
  const offsets = [
    { id: 'section-hero', top: 0 },
    { id: 'section-proof-strip', top: 900 },
    { id: 'section-problem', top: 1850 },
    { id: 'section-pricing', top: 9157 },
  ];

  assert.equal(findActiveSectionId(100, offsets), 'section-hero');
  assert.equal(findActiveSectionId(960, offsets), 'section-proof-strip');
  assert.equal(findActiveSectionId(9300, offsets), 'section-pricing');
});

test('computeCounterValue interpolates cleanly from 0 to end', () => {
  assert.equal(computeCounterValue(240700, 0, 1600), 0);
  const mid = computeCounterValue(240700, 800, 1600);
  assert.ok(mid > 0 && mid < 240700);
  assert.equal(computeCounterValue(240700, 1600, 1600), 240700);
});

test('clampSliderPercent and stepSliderPercent stay within [5, 95]', () => {
  assert.equal(clampSliderPercent(-100, 0, 500), 5);
  assert.equal(clampSliderPercent(250, 0, 500), 50);
  assert.equal(clampSliderPercent(800, 0, 500), 95);
  assert.equal(stepSliderPercent(50, 'ArrowLeft'), 45);
  assert.equal(stepSliderPercent(50, 'ArrowRight'), 55);
  assert.equal(stepSliderPercent(50, 'Home'), 5);
  assert.equal(stepSliderPercent(50, 'End'), 95);
  assert.equal(stepSliderPercent(50, 'Enter'), null);
});

test('isDashboardMetricVisible filters metrics by active tab', () => {
  assert.equal(isDashboardMetricVisible('all', 'sales'), true);
  assert.equal(isDashboardMetricVisible('all', 'staff'), true);
  assert.equal(isDashboardMetricVisible('sales', 'sales'), true);
  assert.equal(isDashboardMetricVisible('sales', 'staff'), false);
  assert.equal(isDashboardMetricVisible('staff', 'staff'), true);
  assert.equal(isDashboardMetricVisible('staff', 'sales'), false);
});

test('buildDemoWhatsAppUrl encodes localized walkthrough summary cleanly', () => {
  const url = buildDemoWhatsAppUrl('+213 (0) 550 92 14 08', {
    lang: 'en',
    ownerName: 'Karim',
    businessName: 'Atlas Gym',
    businessTypeLabel: 'Memberships & Passes',
    city: 'Algiers',
    phone: '0550123456',
    slotLabel: 'Today (ASAP)',
  });
  assert.ok(url.startsWith('https://wa.me/2130550921408?text='));
  assert.ok(decodeURIComponent(url).includes('Atlas Gym'));
  assert.ok(decodeURIComponent(url).includes('Memberships & Passes'));
});

test('capDevicePixelRatio locks software WebGL to 1 and caps hardware DPR at 1.5', () => {
  assert.equal(capDevicePixelRatio(2, true), 1);
  assert.equal(capDevicePixelRatio(3, false), 1.5);
  assert.equal(capDevicePixelRatio(1.25, false), 1.25);
  assert.equal(capDevicePixelRatio(0.5, false), 1);
});

test('shouldRenderHeroScene pauses 3D loop once Proof Strip covers 92% of viewport', () => {
  assert.equal(shouldRenderHeroScene(0, 900), true);
  assert.equal(shouldRenderHeroScene(700, 900), true);
  assert.equal(shouldRenderHeroScene(840, 900), false);
});

test('formatCounterValue formats numbers cleanly with decimals and separators', () => {
  assert.equal(formatCounterValue(240700, 0, ','), '240,700');
  assert.equal(formatCounterValue(98.45, 1, ','), '98.5');
});
