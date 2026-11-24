import React, { useEffect, useRef, useState, memo } from 'react';

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
const GIRIH_PATTERN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><line x1="0" y1="60" x2="120" y2="60" stroke="#b85438" stroke-width="0.5" stroke-opacity="0.06" stroke-dasharray="2 4"/><line x1="60" y1="0" x2="60" y2="120" stroke="#b85438" stroke-width="0.5" stroke-opacity="0.06" stroke-dasharray="2 4"/><line x1="0" y1="0" x2="120" y2="120" stroke="#b85438" stroke-width="0.5" stroke-opacity="0.05"/><line x1="120" y1="0" x2="0" y2="120" stroke="#b85438" stroke-width="0.5" stroke-opacity="0.05"/><polygon points="60,24 65.7,35.8 77.2,33.5 73.5,44.7 85.5,48.5 77.2,57.3 85.5,66 73.5,69.8 77.2,81 65.7,78.7 60,90.5 54.3,78.7 42.8,81 46.5,69.8 34.5,66 42.8,57.3 34.5,48.5 46.5,44.7 42.8,33.5 54.3,35.8" fill="none" stroke="#b85438" stroke-width="0.85" stroke-opacity="0.16"/><polygon points="54.3,46.3 65.7,46.3 73.7,54.3 73.7,65.7 65.7,73.7 54.3,73.7 46.3,65.7 46.3,54.3" fill="none" stroke="#b85438" stroke-width="0.6" stroke-opacity="0.12"/><path d="M60,24V0 M60,96V120 M24,60H0 M96,60H120 M0,24L8.5,17.2L24,0 M17.2,8.5L24,24L8.5,17.2 M120,24L111.5,17.2L96,0 M102.8,8.5L96,24L111.5,17.2 M120,96L111.5,102.8L96,120 M102.8,111.5L96,96L111.5,102.8 M0,96L8.5,102.8L24,120 M17.2,111.5L24,96L8.5,102.8 M42.8,33.5L24,24 M77.2,33.5L96,24 M77.2,86.5L96,96 M42.8,86.5L24,96" fill="none" stroke="#b85438" stroke-width="0.8" stroke-opacity="0.15"/><circle cx="60" cy="60" r="1.2" fill="#b85438" fill-opacity="0.25"/><circle cx="0" cy="0" r="1.2" fill="#b85438" fill-opacity="0.25"/><circle cx="120" cy="0" r="1.2" fill="#b85438" fill-opacity="0.25"/><circle cx="120" cy="120" r="1.2" fill="#b85438" fill-opacity="0.25"/><circle cx="0" cy="120" r="1.2" fill="#b85438" fill-opacity="0.25"/></svg>`
);
const GIRIH_BG_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,${GIRIH_PATTERN_SVG}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '120px 120px',
};

export const ClosingWordmark = memo(function ClosingWordmark({ lang: _lang = 'en' }: ClosingWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
            setIsTransitioning(true);
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
      className="section-contain relative z-[110] w-full overflow-hidden bg-stone-950 border-t border-stone-800/80 py-24 sm:py-32 lg:py-40 flex flex-col items-center justify-center select-none shadow-[0_-6px_14px_rgba(0,0,0,0.5)]"
      aria-label="Atrium Brand Statement"
    >
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND: Islamic Geometric Tessellation (Cached Tile)     */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none opacity-90 overflow-hidden">
        <div className="w-full h-full" style={GIRIH_BG_STYLE} />

        {/* Combined radial vignette + subtle terracotta ambient glow (single composite layer) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at center, rgba(184, 84, 56, 0.12) 0%, rgba(184, 84, 56, 0.04) 38%, rgba(12, 10, 9, 0.88) 85%, #0c0a09 100%)',
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FOREGROUND CONTENT: Pure Iconic Arabic Wordmark */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        <div
          dir="rtl"
          lang="ar"
          className="w-full flex items-center justify-center overflow-hidden py-4 sm:py-6 select-none"
        >
          <span
            onTransitionEnd={(e) => {
              if (e.propertyName === 'transform') {
                setIsTransitioning(false);
              }
            }}
            className={`block text-white whitespace-nowrap tracking-tight transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[105%]'
            } ${isTransitioning ? 'will-change-transform-opacity' : ''}`}
            style={{
              fontFamily: "'Reem Kufi', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3.8rem, 19vw, 22.5rem)',
              lineHeight: '1.25',
              paddingTop: '0.18em',
              paddingBottom: '0.18em',
              fontFeatureSettings: '"kern" 1, "liga" 1',
              textShadow: '0 4px 10px rgba(0, 0, 0, 0.65)',
            }}
          >
            أتريوم
          </span>
        </div>
      </div>
    </section>
  );
});
