import React, { useEffect, useRef, useState } from 'react';

interface ClosingWordmarkProps {
  lang?: 'en' | 'fr' | 'ar';
}

/**
 * ClosingWordmark
 *
 * Implements the closing full-width wordmark section for Atrium:
 * - Massive-scale Arabic wordmark "أتريوم" filling the viewport width.
 * - Typeface: Reem Kufi (Bold 700) — an authentic, monumental architectural
 *   Kufic typeface with pure geometric lines and sculpted glyph contours.
 * - Explicit dir="rtl" to guarantee perfect Arabic ligatures and character shaping.
 * - Responsive fluid clamp() scaling for full-bleed presence across all devices.
 * - Background: Dark charcoal canvas with authentic Islamic geometric
 *   tessellation pattern (8-pointed star & polygon girih linework) in brand terracotta (#b85438)
 *   rendered as lightweight, 2D vector CAD linework at ~14% opacity.
 * - Generous vertical space and overflow-visible so the Hamza and letter loops never clip.
 */
export function ClosingWordmark({ lang: _lang = 'en' }: ClosingWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="section-closing-wordmark"
      ref={containerRef}
      className="relative z-[110] w-full overflow-hidden bg-stone-950 border-t border-stone-800/80 py-24 sm:py-32 lg:py-40 flex flex-col items-center justify-center select-none shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      aria-label="Atrium Brand Statement"
    >
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND: Islamic Geometric Tessellation (CAD Terracotta)  */}
      {/* Lightweight SVG repeating pattern — 100% 2D, zero WebGL/FPS cost */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none opacity-90 overflow-hidden">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            {/* 8-Pointed Star & Girih Interlocking Tessellation Pattern */}
            <pattern
              id="atrium-islamic-girih"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              {/* Subtle CAD drafting background grid */}
              <line x1="0" y1="60" x2="120" y2="60" stroke="#b85438" strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="2 4" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#b85438" strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="2 4" />
              <line x1="0" y1="0" x2="120" y2="120" stroke="#b85438" strokeWidth="0.5" strokeOpacity="0.05" />
              <line x1="120" y1="0" x2="0" y2="120" stroke="#b85438" strokeWidth="0.5" strokeOpacity="0.05" />

              {/* Central 8-Pointed Star (Khatam) */}
              <polygon
                points="
                  60,24 65.7,35.8 77.2,33.5 73.5,44.7 85.5,48.5 77.2,57.3
                  85.5,66 73.5,69.8 77.2,81 65.7,78.7 60,90.5 54.3,78.7
                  42.8,81 46.5,69.8 34.5,66 42.8,57.3 34.5,48.5 46.5,44.7
                  42.8,33.5 54.3,35.8
                "
                fill="none"
                stroke="#b85438"
                strokeWidth="0.85"
                strokeOpacity="0.16"
              />

              {/* Central Star Core Octagon */}
              <polygon
                points="
                  54.3,46.3 65.7,46.3 73.7,54.3 73.7,65.7
                  65.7,73.7 54.3,73.7 46.3,65.7 46.3,54.3
                "
                fill="none"
                stroke="#b85438"
                strokeWidth="0.6"
                strokeOpacity="0.12"
              />

              {/* Connecting Straps to Adjacent Tiles */}
              <line x1="60" y1="24" x2="60" y2="0" stroke="#b85438" strokeWidth="0.85" strokeOpacity="0.16" />
              <line x1="60" y1="96" x2="60" y2="120" stroke="#b85438" strokeWidth="0.85" strokeOpacity="0.16" />
              <line x1="24" y1="60" x2="0" y2="60" stroke="#b85438" strokeWidth="0.85" strokeOpacity="0.16" />
              <line x1="96" y1="60" x2="120" y2="60" stroke="#b85438" strokeWidth="0.85" strokeOpacity="0.16" />

              {/* Corner Star Quadrants */}
              <path
                d="M 0,24 L 8.5,17.2 L 24,0 M 17.2,8.5 L 24,24 L 8.5,17.2"
                fill="none"
                stroke="#b85438"
                strokeWidth="0.85"
                strokeOpacity="0.16"
              />
              <path
                d="M 120,24 L 111.5,17.2 L 96,0 M 102.8,8.5 L 96,24 L 111.5,17.2"
                fill="none"
                stroke="#b85438"
                strokeWidth="0.85"
                strokeOpacity="0.16"
              />
              <path
                d="M 120,96 L 111.5,102.8 L 96,120 M 102.8,111.5 L 96,96 L 111.5,102.8"
                fill="none"
                stroke="#b85438"
                strokeWidth="0.85"
                strokeOpacity="0.16"
              />
              <path
                d="M 0,96 L 8.5,102.8 L 24,120 M 17.2,111.5 L 24,96 L 8.5,102.8"
                fill="none"
                stroke="#b85438"
                strokeWidth="0.85"
                strokeOpacity="0.16"
              />

              {/* Interlocking Rhombi linework */}
              <line x1="42.8" y1="33.5" x2="24" y2="24" stroke="#b85438" strokeWidth="0.75" strokeOpacity="0.14" />
              <line x1="77.2" y1="33.5" x2="96" y2="24" stroke="#b85438" strokeWidth="0.75" strokeOpacity="0.14" />
              <line x1="77.2" y1="86.5" x2="96" y2="96" stroke="#b85438" strokeWidth="0.75" strokeOpacity="0.14" />
              <line x1="42.8" y1="86.5" x2="24" y2="96" stroke="#b85438" strokeWidth="0.75" strokeOpacity="0.14" />

              {/* Architectural drafting center tick marks */}
              <circle cx="60" cy="60" r="1.2" fill="#b85438" fillOpacity="0.25" />
              <circle cx="0" cy="0" r="1.2" fill="#b85438" fillOpacity="0.25" />
              <circle cx="120" cy="0" r="1.2" fill="#b85438" fillOpacity="0.25" />
              <circle cx="120" cy="120" r="1.2" fill="#b85438" fillOpacity="0.25" />
              <circle cx="0" cy="120" r="1.2" fill="#b85438" fillOpacity="0.25" />
            </pattern>
          </defs>

          {/* Fill container with the Islamic Tessellation pattern */}
          <rect width="100%" height="100%" fill="url(#atrium-islamic-girih)" />
        </svg>

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0c0a09_90%)]" />

        {/* Warm Terracotta Ambient Glow at the center behind the wordmark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[250px] sm:h-[400px] bg-[#b85438]/10 blur-[120px] rounded-full" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FOREGROUND CONTENT: Pure Iconic Arabic Wordmark */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`relative z-10 w-full px-4 sm:px-8 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.98]'
        }`}
      >
        {/* ----------------------------------------------------------- */}
        {/* THE MASSIVE ARABIC WORDMARK: "أتريوم" */}
        {/* Rendered in Reem Kufi (Bold 700) */}
        {/* Full-width responsive clamp, high-contrast white, dir="rtl" */}
        {/* ----------------------------------------------------------- */}
        <div
          dir="rtl"
          lang="ar"
          className="w-full flex items-center justify-center overflow-visible py-4 sm:py-6 select-none"
        >
          <span
            className="block text-white whitespace-nowrap tracking-tight drop-shadow-[0_12px_50px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: "'Reem Kufi', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.8rem, 19vw, 22.5rem)',
              lineHeight: '1.25',
              paddingTop: '0.18em',
              paddingBottom: '0.18em',
              textRendering: 'optimizeLegibility',
              fontFeatureSettings: '"kern" 1, "liga" 1',
            }}
          >
            أتريوم
          </span>
        </div>
      </div>
    </section>
  );
}
