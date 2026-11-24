import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  WifiOff,
  Building,
  Sliders,
  Check,
  Clock,
  ArrowDownRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  AlertCircle,
  Compass,
  Activity,
  CreditCard,
} from 'lucide-react';
import { CONTENT, Language } from '../content/copy';
import { UI_COPY } from '../content/uiCopy';
import { useLenis } from './SmoothScroll';
import { AtriumBrandLogo } from './AtriumBrandLogo';
import { FloatingNav } from './FloatingNav';
import { SpotlightCard } from './SpotlightCard';
import { AnimatedCounter } from './AnimatedCounter';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { PinnedHowItWorks } from './PinnedHowItWorks';
import { SectionHeader } from './SectionHeader';
import { ClosingWordmark } from './ClosingWordmark';
import { CategoryCardSwiper } from './CategoryCardSwiper';
import { ProblemCardSwiper } from './ProblemCardSwiper';
import { ShiftCardSwiper } from './ShiftCardSwiper';
import FaqSection from './FaqSection';
import { WordMaskText } from './WordMaskText';
import {
  isDashboardMetricVisible,
  KpiFilterMode,
} from '../utils/scrollLogic';

gsap.registerPlugin(ScrollTrigger);

interface PageShellProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDemo: () => void;
  isHydrated: boolean;
  activeMode: '3d' | 'fallback';
  hero3DNode?: React.ReactNode;
  activeWaypointIndex?: number;
  onWaypointChange?: (index: number) => void;
}

const PageShell = React.memo(function PageShell({
  lang,
  onLanguageChange,
  onOpenDemo,
  isHydrated,
  activeMode: _activeMode,
  hero3DNode,
  activeWaypointIndex: _activeWaypointIndex = 0,
  onWaypointChange: _onWaypointChange,
}: PageShellProps) {
  const content = CONTENT[lang];
  const ui = UI_COPY[lang];
  const isRTL = lang === 'ar';

  const [activeVertical, setActiveVertical] = useState('memberships');
  const [activeKpiFilter, setActiveKpiFilter] = useState<KpiFilterMode>('all');

  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSnappingRef = useRef(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const detachMomentumGuardRef = useRef<(() => void) | null>(null);

  const unlockSnap = useCallback((lenisInstance?: any) => {
    isSnappingRef.current = false;
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    if (detachMomentumGuardRef.current) {
      detachMomentumGuardRef.current();
      detachMomentumGuardRef.current = null;
    }
    if (lenisInstance) {
      lenisInstance.velocity = 0;
    }
  }, []);

  const engageMomentumGuard = useCallback(() => {
    if (detachMomentumGuardRef.current) return;
    const absorbExcessMomentum = (e: any) => {
      if (isSnappingRef.current) {
        e.lenisStopPropagation = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };
    window.addEventListener('wheel', absorbExcessMomentum, { capture: true, passive: false });
    window.addEventListener('touchmove', absorbExcessMomentum, { capture: true, passive: false });
    detachMomentumGuardRef.current = () => {
      window.removeEventListener('wheel', absorbExcessMomentum, { capture: true });
      window.removeEventListener('touchmove', absorbExcessMomentum, { capture: true });
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      unlockSnap();
    };
  }, [unlockSnap]);

  const { scrollTo: lenisScrollTo } = useLenis();

  const scrollTo = useCallback(
    (id: string) => {
      unlockSnap();
      isTransitioningRef.current = true;
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      const targetId = id.startsWith('#') ? id.slice(1) : id;
      lenisScrollTo(`#${targetId}`, {
        offset: targetId === 'section-proof-strip' ? 0 : -40,
        duration: 1.0,
        force: true,
        onComplete: () => {
          isTransitioningRef.current = false;
        },
      });
      transitionTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1150);
    },
    [lenisScrollTo, unlockSnap]
  );

  const currentVertical =
    content.verticals.items.find((v) => v.id === activeVertical) || content.verticals.items[0];

  const tryStartCta = useMemo(
    () => ({ text: content.tryStartButton, onClick: onOpenDemo }),
    [content.tryStartButton, onOpenDemo]
  );

  const finalCtaConfig = useMemo(
    () => ({ text: content.finalCta.ctaButton, onClick: onOpenDemo }),
    [content.finalCta.ctaButton, onOpenDemo]
  );

  const handleSelectCategory = useCallback(
    (catId: string) => {
      setActiveVertical(catId);
      scrollTo('section-verticals');
    },
    [scrollTo]
  );

  const handleHeroScrollClick = useCallback(() => {
    scrollTo('section-proof-strip');
  }, [scrollTo]);

  const handleExploreVerticalsClick = useCallback(() => {
    scrollTo('section-verticals');
  }, [scrollTo]);

  // Section refs for discrete entrance and cover animations (Effect 1 & Effect 2)
  const sectionHeroRef = useRef<HTMLElement>(null);
  const sectionProofStripRef = useRef<HTMLElement>(null);
  const sectionProblemRef = useRef<HTMLElement>(null);
  const sectionShiftRef = useRef<HTMLElement>(null);
  const sectionFeelingRef = useRef<HTMLDivElement>(null);
  const sectionHowRef = useRef<HTMLElement>(null);
  const sectionVerticalsRef = useRef<HTMLElement>(null);
  const sectionDiffRef = useRef<HTMLElement>(null);
  const sectionDashboardRef = useRef<HTMLElement>(null);
  const sectionSliderRef = useRef<HTMLElement>(null);
  const sectionPricingRef = useRef<HTMLElement>(null);
  const sectionProofRef = useRef<HTMLElement>(null);
  const sectionFaqRef = useRef<HTMLElement>(null);
  const sectionFinalCtaRef = useRef<HTMLElement>(null);

  // Keyboard navigation support between Hero and Section 1.5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowH = window.innerHeight;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && scrollY < 80) {
        e.preventDefault();
        scrollTo('section-proof-strip');
      } else if (
        (e.key === 'ArrowUp' || e.key === 'PageUp') &&
        scrollY >= windowH - 60 &&
        scrollY <= windowH + 60
      ) {
        e.preventDefault();
        scrollTo('section-hero');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollTo]);

  /**
   * Synchronized Motion Engine:
   * - Word-by-word masked horizon rise on all headlines, sublines, callouts, and narrative copy
   * - Responsive choreography via gsap.matchMedia():
   *     Desktop (>= 1024px): Unified 2-column section timeline so left & right blocks animate in harmonic sync
   *     Mobile (< 1024px): Independent header + stacked visual/card triggers so every block reveals right in view
   * - Scrubbed curtain transition between Hero & Section 1.5 + ambient glow depth parallax
   */
  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 0. Hero Section Word-by-Word Masked Horizon Reveal
      const heroEyebrow = document.querySelector('.hero-eyebrow');
      const heroWords = gsap.utils.toArray<HTMLElement>('.hero-headline .hero-word');
      const heroSubWords = gsap.utils.toArray<HTMLElement>('.hero-subheadline .hero-sub-word');
      const heroCtaGroup = document.querySelector('.hero-cta-group');
      const heroScrollHint = document.querySelector('.hero-scroll-hint');

      if (prefersReducedMotion) {
        gsap.set(
          [heroEyebrow, ...heroWords, ...heroSubWords, heroCtaGroup, heroScrollHint].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      } else {
        const heroTl = gsap.timeline({
          delay: 0.08,
          onComplete: () => {
            gsap.set(
              [heroEyebrow, ...heroWords, ...heroSubWords, heroCtaGroup, heroScrollHint].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          },
        });

        if (heroEyebrow) {
          heroTl.fromTo(
            heroEyebrow,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
            0
          );
        }

        if (heroWords.length > 0) {
          heroTl.fromTo(
            heroWords,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.68,
              stagger: 0.065,
              ease: 'power3.out',
            },
            0.06
          );
        }

        if (heroSubWords.length > 0) {
          heroTl.fromTo(
            heroSubWords,
            { yPercent: 108, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.48,
              stagger: 0.015,
              ease: 'power2.out',
            },
            0.22
          );
        }

        if (heroCtaGroup) {
          heroTl.fromTo(
            heroCtaGroup,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.52, ease: 'power2.out' },
            0.42
          );
        }

        if (heroScrollHint) {
          heroTl.fromTo(
            heroScrollHint,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0.54
          );
        }
      }

      // Hero exit motion during Section 1.5 Curtain Reveal
      if (!prefersReducedMotion && sectionProofStripRef.current) {
        gsap.to('.hero-inner-content', {
          opacity: 0.12,
          scale: 0.94,
          y: -24,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionProofStripRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });

        gsap.to('.hero-3d-layer', {
          opacity: 0.18,
          scale: 0.95,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionProofStripRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }

      // Helper to animate a section's header + narrative + visuals in tight rhythmic sequence
      interface SectionMotionConfig {
        section: HTMLElement | null;
        startDesktop?: string;
        startMobile?: string;
        visualSelector?: string;
        cardSelector?: string;
        cardStagger?: number;
        calloutSelector?: string;
        extraRevealSelector?: string;
        wordSelector?: string;
        wordStagger?: number;
        wordDuration?: number;
      }

      const mm = gsap.matchMedia();

      const animateHeaderIntoTimeline = (
        tl: gsap.core.Timeline,
        container: Element,
        baseOffset = 0
      ) => {
        const tag = container.querySelector('.section-tag');
        const headlineWords = container.querySelectorAll('.section-headline .headline-word');
        const sublineWords = container.querySelectorAll('.section-subline .subline-word');
        const ctaWrap = container.querySelector('.section-cta-wrap');

        if (tag) {
          tl.fromTo(
            tag,
            { opacity: 0, yPercent: 110 },
            { opacity: 1, yPercent: 0, duration: 0.45, ease: 'power3.out' },
            baseOffset
          );
        }

        if (headlineWords.length > 0) {
          tl.fromTo(
            headlineWords,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.62,
              stagger: 0.045,
              ease: 'power3.out',
            },
            baseOffset + 0.05
          );
        }

        if (sublineWords.length > 0) {
          tl.fromTo(
            sublineWords,
            { yPercent: 108, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.46,
              stagger: 0.015,
              ease: 'power2.out',
            },
            baseOffset + 0.18
          );
        }

        if (ctaWrap) {
          tl.fromTo(
            ctaWrap,
            { opacity: 0, yPercent: 105 },
            { opacity: 1, yPercent: 0, duration: 0.50, ease: 'power2.out' },
            baseOffset + 0.30
          );
        }

        return [tag, ctaWrap].filter(
          (el): el is Element => el !== null
        );
      };

      const registerSectionChoreography = (configs: SectionMotionConfig[]) => {
        // Desktop (>= 1024px): Unified 2-column harmonic timeline per section
        mm.add('(min-width: 1024px)', () => {
          configs.forEach((cfg) => {
            if (!cfg.section) return;
            const section = cfg.section;

            if (prefersReducedMotion) {
              const allTargets = section.querySelectorAll(
                '.section-tag, .headline-word, .subline-word, .section-cta-wrap, .horizon-word, .section-reveal-item, .section-callout-box'
              );
              gsap.set(allTargets, { clearProps: 'transform,opacity' });
              return;
            }

            const clearedTargets: Element[] = [];
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: cfg.startDesktop || 'top 76%',
                toggleActions: 'play none none none',
                once: true,
                fastScrollEnd: true,
              },
              onComplete: () => {
                gsap.set(clearedTargets, { clearProps: 'transform,opacity' });
              },
            });

            clearedTargets.push(...animateHeaderIntoTimeline(tl, section, 0));

            if (cfg.visualSelector) {
              const visuals = Array.from(section.querySelectorAll(cfg.visualSelector));
              if (visuals.length > 0) {
                tl.fromTo(
                  visuals,
                  { opacity: 0, y: 30, scale: 0.98 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.70,
                    stagger: 0.10,
                    ease: 'power3.out',
                  },
                  0.18
                );
                clearedTargets.push(...visuals);
              }
            }

            if (cfg.extraRevealSelector) {
              const extras = Array.from(section.querySelectorAll(cfg.extraRevealSelector));
              if (extras.length > 0) {
                tl.fromTo(
                  extras,
                  { opacity: 0, y: 16 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.46,
                    stagger: 0.045,
                    ease: 'power2.out',
                  },
                  0.26
                );
                clearedTargets.push(...extras);
              }
            }

            if (cfg.cardSelector) {
              const cards = Array.from(section.querySelectorAll(cfg.cardSelector));
              if (cards.length > 0) {
                tl.fromTo(
                  cards,
                  { opacity: 0, y: 28, scale: 0.978 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.58,
                    stagger: cfg.cardStagger ?? 0.09,
                    ease: 'power2.out',
                  },
                  0.24
                );
                clearedTargets.push(...cards);
              }
            }

            if (cfg.calloutSelector) {
              const callouts = Array.from(section.querySelectorAll(cfg.calloutSelector));
              if (callouts.length > 0) {
                tl.fromTo(
                  callouts,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.52,
                    stagger: 0.08,
                    ease: 'power2.out',
                  },
                  0.32
                );
                clearedTargets.push(...callouts);
              }
            }

            const bodyWords = Array.from(
              section.querySelectorAll(
                cfg.wordSelector || '.callout-word, .card-word, .slider-word, .credibility-word'
              )
            );
            if (bodyWords.length > 0) {
              tl.fromTo(
                bodyWords,
                { yPercent: 108, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: cfg.wordDuration ?? 0.36,
                  stagger: cfg.wordStagger ?? 0.008,
                  ease: 'power2.out',
                  force3D: false,
                },
                0.30
              );
              clearedTargets.push(...bodyWords.slice(0, 0));
            }
          });
        });

        // Mobile / Tablet (< 1024px): Decoupled triggers so stacked columns animate right as they enter view
        mm.add('(max-width: 1023px)', () => {
          configs.forEach((cfg) => {
            if (!cfg.section) return;
            const section = cfg.section;

            if (prefersReducedMotion) {
              const allTargets = section.querySelectorAll(
                '.section-tag, .headline-word, .subline-word, .section-cta-wrap, .horizon-word, .section-reveal-item, .section-callout-box'
              );
              gsap.set(allTargets, { clearProps: 'transform,opacity' });
              return;
            }

            // 1. Header & narrative column
            const headerTriggerEl =
              section.querySelector('.section-headline')?.closest('div')?.parentElement || section;
            const headerCleared: Element[] = [];
            const headerTl = gsap.timeline({
              scrollTrigger: {
                trigger: headerTriggerEl,
                start: cfg.startMobile || 'top 84%',
                toggleActions: 'play none none none',
                once: true,
                fastScrollEnd: true,
              },
              onComplete: () => {
                gsap.set(headerCleared, { clearProps: 'transform,opacity' });
              },
            });
            headerCleared.push(...animateHeaderIntoTimeline(headerTl, section, 0));

            if (cfg.calloutSelector) {
              const callouts = Array.from(section.querySelectorAll(cfg.calloutSelector));
              if (callouts.length > 0) {
                headerTl.fromTo(
                  callouts,
                  { opacity: 0, y: 18 },
                  { opacity: 1, y: 0, duration: 0.48, stagger: 0.08, ease: 'power2.out' },
                  0.28
                );
                headerCleared.push(...callouts);
              }
            }

            const calloutWords = Array.from(section.querySelectorAll('.callout-word'));
            if (calloutWords.length > 0) {
              headerTl.fromTo(
                calloutWords,
                { yPercent: 108, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.40, stagger: 0.011, ease: 'power2.out' },
                0.32
              );
              headerCleared.push(...calloutWords.slice(0, 0));
            }

            // 2. Stacked visual panel / cards below
            const visualTargets = [
              ...(cfg.visualSelector ? Array.from(section.querySelectorAll(cfg.visualSelector)) : []),
              ...(cfg.cardSelector ? Array.from(section.querySelectorAll(cfg.cardSelector)) : []),
              ...(cfg.extraRevealSelector
                ? Array.from(section.querySelectorAll(cfg.extraRevealSelector))
                : []),
            ];

            if (visualTargets.length > 0) {
              const bodyWords = Array.from(
                section.querySelectorAll('.card-word, .slider-word, .credibility-word')
              );
              const visualTriggerEl = visualTargets[0];
              const visualCleared: Element[] = [...visualTargets];

              const visualTl = gsap.timeline({
                scrollTrigger: {
                  trigger: visualTriggerEl,
                  start: 'top 86%',
                  toggleActions: 'play none none none',
                  once: true,
                  fastScrollEnd: true,
                },
                onComplete: () => {
                  gsap.set(visualCleared, { clearProps: 'transform,opacity' });
                },
              });

              visualTl.fromTo(
                visualTargets,
                { opacity: 0, y: 24, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.55,
                  stagger: 0.075,
                  ease: 'power2.out',
                },
                0
              );

              if (bodyWords.length > 0) {
                visualTl.fromTo(
                  bodyWords,
                  { yPercent: 108, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.40,
                    stagger: 0.01,
                    ease: 'power2.out',
                  },
                  0.14
                );
              }
            }
          });
        });
      };

      registerSectionChoreography([
        {
          section: sectionProofStripRef.current,
          startDesktop: 'top 80%',
          startMobile: 'top 84%',
          visualSelector: '.proof-visual-panel',
          extraRevealSelector: '.proof-explore-link',
        },
        {
          section: sectionProblemRef.current,
          visualSelector: '.problem-visual-panel',
          calloutSelector: '.problem-callout',
        },
        {
          section: sectionShiftRef.current,
          visualSelector: '.shift-visual-panel',
          calloutSelector: '.shift-callout',
        },
        {
          section: sectionHowRef.current,
          visualSelector: '.how-canvas-panel',
          cardSelector: '.how-step-card',
          cardStagger: 0.09,
        },
        {
          section: sectionVerticalsRef.current,
          visualSelector: '.vertical-card',
          extraRevealSelector: '.vertical-tab-btn',
        },
        {
          section: sectionDiffRef.current,
          cardSelector: '.pillar-card',
          cardStagger: 0.09,
          calloutSelector: '.diff-callout',
        },
        {
          section: sectionDashboardRef.current,
          visualSelector: '.dashboard-console',
          cardSelector: '.dashboard-card',
          cardStagger: 0.09,
          calloutSelector: '.dashboard-callout',
          extraRevealSelector: '.dashboard-filters, .dashboard-table',
        },
        {
          section: sectionSliderRef.current,
          visualSelector: '.slider-panel',
          cardSelector: '.slider-check-card',
          cardStagger: 0.09,
        },
        {
          section: sectionPricingRef.current,
          cardSelector: '.pricing-card',
          cardStagger: 0.11,
          calloutSelector: '.pricing-callout',
        },
        {
          section: sectionProofRef.current,
          visualSelector: '.credibility-card',
          extraRevealSelector: '.credibility-badge',
          wordStagger: 0.011,
        },
        {
          section: sectionFaqRef.current,
          cardSelector: '.faq-item',
          cardStagger: 0.065,
          calloutSelector: '.faq-support-card',
        },
        {
          section: sectionFinalCtaRef.current,
          startDesktop: 'top 82%',
          startMobile: 'top 86%',
          visualSelector: '.final-cta-card',
          extraRevealSelector: '.final-cta-check-item',
        },
      ]);

      // Interlude — Feeling Line Word-by-Word Editorial Reveal
      if (sectionFeelingRef.current) {
        const feelingWords = Array.from(
          sectionFeelingRef.current.querySelectorAll('.feeling-word')
        );
        if (feelingWords.length > 0) {
          if (prefersReducedMotion) {
            gsap.set(feelingWords, { clearProps: 'transform,opacity' });
          } else {
            gsap.fromTo(
              feelingWords,
              { opacity: 0, yPercent: 115 },
              {
                opacity: 1,
                yPercent: 0,
                duration: 0.72,
                stagger: 0.085,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: sectionFeelingRef.current,
                  start: 'top 78%',
                  toggleActions: 'play none none none',
                  once: true,
                  fastScrollEnd: true,
                },
                onComplete: () => {
                  gsap.set(feelingWords, { clearProps: 'transform,opacity' });
                },
              }
            );
          }
        }
      }

      // Synchronize trigger coordinates with document height and layout
      ScrollTrigger.refresh();
    });

    let fontsCancelled = false;
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (!fontsCancelled) {
          ScrollTrigger.refresh();
        }
      });
    }

    const delayedRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      fontsCancelled = true;
      clearTimeout(delayedRefreshTimer);
      ctx.revert();
    };
  }, [lang]);

  return (
    <div
      className="relative w-full text-white bg-black min-h-screen selection:bg-[#b85438]/40 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* TOP FLOATING GLASS NAVBAR (State-Isolated to prevent mid-scroll re-renders) */}
      {/* ------------------------------------------------------------- */}
      <FloatingNav
        lang={lang}
        navCopy={content.nav}
        onLanguageChange={onLanguageChange}
        onOpenDemo={onOpenDemo}
        onScrollToSection={scrollTo}
        isSnappingRef={isSnappingRef}
        isTransitioningRef={isTransitioningRef}
        unlockSnap={unlockSnap}
        engageMomentumGuard={engageMomentumGuard}
        snapTimerRef={snapTimerRef}
      />

      {/* ------------------------------------------------------------- */}
      {/* HERO & CURTAIN TRANSITION TRACK */}
      {/* Dedicated track where Section 1 stays sticky at top and Section 1.5 rises over it */}
      {/* ------------------------------------------------------------- */}
      <div className="hero-curtain-stage relative w-full">
        {/* ------------------------------------------------------------- */}
        {/* SECTION 1 — HERO */}
        {/* Responsive layout: clean, fast typography on mobile, interactive 3D hero on desktop (lg+) */}
        {/* ------------------------------------------------------------- */}
        <section
          id="section-hero"
          ref={sectionHeroRef}
          className="sticky top-0 z-10 w-full h-[100dvh] bg-black overflow-hidden flex flex-col justify-start lg:justify-center pt-20 sm:pt-24 lg:pt-0"
        >
          {/* Lightweight Mobile/Tablet Architectural Backdrop Accent (< 1024px where 3D layer is omitted) */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute bottom-[-8%] right-[-18%] w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-[#b85438]/15"
              style={{
                background: 'radial-gradient(circle at center, rgba(184, 84, 56, 0.16) 0%, rgba(184, 84, 56, 0.05) 45%, transparent 72%)',
              }}
            />
            <div className="absolute bottom-[4%] right-[-6%] w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-white/[0.06]" />
            <div className="absolute bottom-[16%] right-[6%] w-[120px] sm:w-[160px] h-[120px] sm:h-[160px] rounded-full border border-[#e06b48]/20" />
          </div>

          {/* Full-bleed 3D Scene Layer: Desktop-only (lg+), completely excluded on mobile */}
          {hero3DNode && (
            <div className="hero-3d-layer hidden lg:block absolute inset-0 z-0 pointer-events-none will-change-transform">
              {hero3DNode}
            </div>
          )}

          {/* Hero Content Overlay Layer */}
          <div className="hero-inner-content relative z-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between lg:justify-center pointer-events-auto pb-6 sm:pb-8 lg:pb-0 will-change-transform">
            <div className="max-w-xl lg:max-w-lg pt-1 sm:pt-4 lg:pt-0 relative z-10 pointer-events-auto">
              {/* Category eyebrow */}
              <div className="hero-eyebrow inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] sm:text-xs font-mono text-stone-300 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b85438] animate-pulse" />
                <span>{content.hero.badge}</span>
              </div>

              {/* Headline: Atrium alone in terracotta, as a service beneath it (word-by-word masked horizon rise) */}
              <h1 className="hero-headline font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.0] mb-3 sm:mb-4">
                <span className="block text-[#b85438]">
                  <WordMaskText text={content.hero.brandName} groupClassName="hero-word" />
                </span>
                <span className="block text-stone-100 text-2xl sm:text-4xl lg:text-5xl font-light tracking-normal mt-0.5">
                  <WordMaskText text={content.hero.serviceLine} groupClassName="hero-word" />
                </span>
              </h1>

              {/* Subheadline: Tightened spacing, clean contrast (word-by-word masked horizon rise) */}
              <p className="hero-subheadline text-xs sm:text-sm text-stone-300 font-normal leading-relaxed font-sans max-w-md mb-4 sm:mb-6">
                <WordMaskText text={content.hero.subheadline} groupClassName="hero-sub-word" />
              </p>

              {/* ONE Primary CTA Button — Touch-friendly thumb target on mobile */}
              <div className="hero-cta-group flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-3 sm:mb-6">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 sm:py-3 rounded-lg bg-[#b85438] hover:bg-[#a24830] active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase transition shadow-xl shadow-[#b85438]/25 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 touch-manipulation"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{content.hero.ctaButton}</span>
                </button>

                <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 text-center sm:text-left rtl:sm:text-right whitespace-nowrap">
                  {lang === 'ar'
                    ? 'تجربة مجانية 14 يوماً • بدون بطاقة بنكية • إعداد فوري'
                    : lang === 'fr'
                    ? 'Essai gratuit 14 jours • Sans carte • Configuration rapide'
                    : '14-day free trial • No card required • Instant setup'}
                </span>
              </div>
            </div>

            {/* Scroll Indicator Prompt with clear, unobstructed background */}
            <div className="hero-scroll-hint pt-2 sm:pt-3 lg:pt-4 flex items-center relative z-10 pointer-events-auto">
              <button
                type="button"
                onClick={handleHeroScrollClick}
                className="flex items-center gap-2 text-[11px] font-mono text-stone-400 hover:text-stone-200 transition cursor-pointer group py-1"
              >
                <ArrowDownRight className="w-3.5 h-3.5 text-[#b85438] group-hover:translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 transition-transform shrink-0" />
                <span className="whitespace-nowrap">{content.hero.scrollHint}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1.5 — SIX-CATEGORY PROOF STRIP (Immediate Breadth Proof) */}
        {/* Proves multi-vertical scope immediately following the hero */}
        {/* ------------------------------------------------------------- */}
        <section
          id="section-proof-strip"
          ref={sectionProofStripRef}
          className="section-contain relative z-20 w-full min-h-[100dvh] py-16 sm:py-20 lg:py-24 px-6 sm:px-12 border-t border-stone-800/80 bg-[#09090b] shadow-[0_-8px_16px_rgba(0,0,0,0.65)] flex flex-col justify-center"
        >
          {/* Ambient studio light catch on rising sheet edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#b85438]/50 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <SectionHeader
                  icon={Layers}
                  tag={content.proofStrip.tag}
                  primary={content.proofStrip.headlinePrimary}
                  accent={content.proofStrip.headlineAccent}
                  subline={content.proofStrip.subline}
                  align="left"
                  className="proof-strip-header mb-0"
                  maskedHorizon={true}
                  theme="dark"
                  ctaButton={tryStartCta}
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleExploreVerticalsClick}
                    className="proof-explore-link shrink-0 text-xs font-mono text-[#e06b48] hover:text-[#f28e72] transition underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{ui.proofStrip.exploreLink}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>

              <div className="proof-visual-panel lg:col-span-7">
                <CategoryCardSwiper
                  categories={content.proofStrip.categories}
                  lang={lang}
                  onSelectCategory={handleSelectCategory}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2 — THE PROBLEM (Before Atrium) */}
      {/* Background: Rich Terracotta (#963c24) */}
      {/* 2-Column Zigzag: Swiper on Left, Narrative on Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-problem"
        ref={sectionProblemRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-[#7d2f1a] bg-[#963c24] text-white shadow-[0_-6px_14px_rgba(0,0,0,0.38)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visuals on Left */}
            <div className="problem-visual-panel lg:col-span-7 lg:order-1">
              <ProblemCardSwiper points={content.problem.points} lang={lang} />
            </div>

            {/* Narrative on Right */}
            <div className="lg:col-span-5 lg:order-2 space-y-6">
              <SectionHeader
                icon={AlertCircle}
                tag={content.problem.tag}
                primary={content.problem.headlinePrimary}
                accent={content.problem.headlineAccent}
                subline={content.problem.subline}
                className="problem-header mb-0"
                maskedHorizon={true}
                theme="terracotta"
                align="left"
                ctaButton={tryStartCta}
              />

              <div className="problem-callout p-5 rounded-2xl bg-black/25 border border-white/10 text-xs text-stone-100 font-sans leading-relaxed space-y-2 text-left rtl:text-right">
                <div className="text-[10px] font-mono text-amber-200 uppercase tracking-wider font-semibold">
                  {ui.problem.calloutTitle}
                </div>
                <p>
                  <WordMaskText
                    text={ui.problem.calloutBody}
                    groupClassName="callout-word"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3 — THE SHIFT (With Atrium) */}
      {/* Background: Crisp Off-White (#fbfbfa) */}
      {/* 2-Column Zigzag: Narrative on Left, Swiper on Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-shift"
        ref={sectionShiftRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200 bg-[#fbfbfa] text-stone-900 shadow-[0_-6px_12px_rgba(0,0,0,0.04)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Narrative on Left */}
            <div className="lg:col-span-5 lg:order-1 space-y-6">
              <SectionHeader
                icon={Sparkles}
                tag={content.shift.tag}
                primary={content.shift.headlinePrimary}
                accent={content.shift.headlineAccent}
                subline={content.shift.subline}
                className="shift-header mb-0"
                maskedHorizon={true}
                theme="light"
                align="left"
                ctaButton={tryStartCta}
              />

              <div className="shift-callout p-6 rounded-2xl bg-white border border-stone-200 shadow-md flex items-center gap-3.5 text-xs font-mono text-stone-700 text-left rtl:text-right">
                <div className="w-3.5 h-3.5 rotate-45 bg-[#b85438] shadow-[0_0_12px_rgba(184,84,56,0.4)] shrink-0" />
                <span className="font-semibold text-stone-900">
                  <WordMaskText
                    text={ui.shift.coreBadge}
                    groupClassName="callout-word"
                  />
                </span>
              </div>
            </div>

            {/* Visuals on Right */}
            <div className="shift-visual-panel lg:col-span-7 lg:order-2">
              <ShiftCardSwiper points={content.shift.points} lang={lang} theme="light" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEELING LINE (OPTION A) — Resting breath between Section 3 & 4 */}
      {/* Center-aligned, generous vertical padding, large editorial type */}
      {/* ------------------------------------------------------------- */}
      <div
        id="section-feeling"
        ref={sectionFeelingRef}
        className="section-contain relative z-20 w-full min-h-[60vh] sm:min-h-[75vh] py-20 px-6 sm:px-12 text-center border-t border-stone-800/80 bg-[#0d0e12] shadow-[0_-6px_14px_rgba(0,0,0,0.5)] flex items-center justify-center"
      >
        <div className="max-w-3xl mx-auto py-1">
          <p className="section-headline font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-300 leading-tight">
            <WordMaskText text={content.feelingLine} groupClassName="feeling-word" />
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* SECTION 4 — HOW IT WORKS (3-4 Steps) */}
      {/* Background: Rich Terracotta (#8f371f) */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-how-it-works"
        ref={sectionHowRef}
        className="section-contain-style relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-[#782c18] bg-[#8f371f] text-white shadow-[0_-6px_14px_rgba(0,0,0,0.38)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <PinnedHowItWorks content={content} lang={lang} onOpenDemo={onOpenDemo} theme="terracotta" />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5 — BUILT FOR YOUR BUSINESS (Vertical Proof) */}
      {/* Background: Crisp Off-White (#f7f6f2) */}
      {/* 2-Column Side-by-Side: Category & Narrative Left, Console Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-verticals"
        ref={sectionVerticalsRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200 bg-[#f7f6f2] text-stone-900 shadow-[0_-6px_12px_rgba(0,0,0,0.04)]"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Compass}
            tag={content.verticals.tag}
            primary={content.verticals.headlinePrimary}
            accent={content.verticals.headlineAccent}
            subline={content.verticals.subline}
            align="left"
            className="verticals-header mb-8"
            maskedHorizon={true}
            theme="light"
            ctaButton={tryStartCta}
          />

          {/* Vertical Selector Tabs on Light Canvas */}
          <div className="vertical-tabs flex flex-wrap gap-2.5 border-b border-stone-200 pb-5 mb-8">
            {content.verticals.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveVertical(item.id)}
                className={`vertical-tab-btn px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer font-mono ${
                  activeVertical === item.id
                    ? 'bg-[#b85438] text-white shadow-md shadow-[#b85438]/25'
                    : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Vertical Display Card */}
          <div className="vertical-card grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xl text-stone-900 text-left rtl:text-right">
            <div key={`vert-left-${lang}-${activeVertical}`} className="lg:col-span-6 flex flex-col justify-between space-y-6 animate-slide-in">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b85438]/10 text-[#b85438] font-mono text-[11px] font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                  <span>{ui.verticals.badgeLabel}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-950 mb-3 tracking-tight">
                  {currentVertical.name}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-5 font-sans">
                  {currentVertical.featureLine}
                </p>

                {/* Research / Operational Insight block */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-5 text-xs text-stone-700 font-sans leading-relaxed">
                  <div className="text-[10px] font-mono text-[#b85438] uppercase tracking-wider mb-1.5 font-bold">
                    {ui.verticals.insightLabel}
                  </div>
                  <p className="italic text-stone-700">
                    &ldquo;{currentVertical.operationalInsight}&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 mb-6">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1 font-semibold">
                    {ui.verticals.focusLabel}
                  </div>
                  <div className="text-base font-semibold text-[#b85438] font-mono">
                    {currentVertical.metricPreview}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-5 py-2.5 rounded-md bg-[#b85438] hover:bg-[#a24830] text-white text-xs font-mono font-semibold transition shadow-md shadow-[#b85438]/20 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{content.tryStartButton}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Floor Dashboard Mock */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0e1017] border border-stone-800 p-6 flex flex-col justify-between shadow-2xl text-stone-200">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-800/80 text-xs font-mono text-stone-400">
                  <span>{ui.verticals.floorDeskPrefix} {currentVertical.name.toUpperCase()}</span>
                  <span className="text-[#f28e72] flex items-center gap-1.5 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e06b48]" />
                    {ui.verticals.sampleInterface}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {currentVertical.sampleKpis.map((kpi, idx) => (
                    <div key={idx} className="p-3 rounded bg-stone-900/80 border border-stone-800/70">
                      <div className="text-[10px] font-mono text-stone-500 truncate mb-1">
                        {kpi.label}
                      </div>
                      <div className="text-sm font-bold text-stone-100 font-mono">
                        {kpi.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[10px] text-stone-500 uppercase">{ui.verticals.activityTitle}</div>
                  {ui.verticals.activities.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]"
                    >
                      <span>{act.label}</span>
                      <span
                        className={
                          act.tone === 'emerald'
                            ? 'text-emerald-400'
                            : act.tone === 'accent'
                            ? 'text-[#e06b48]'
                            : 'text-stone-400'
                        }
                      >
                        {act.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800 text-[10px] font-mono text-stone-500 flex justify-between gap-2">
                <span>{ui.verticals.footerLeft}</span>
                <span>{ui.verticals.footerRight}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* SECTION 6 — WHAT MAKES IT DIFFERENT (Differentiation) */}
      {/* Background: Deep Obsidian (#09090b) */}
      {/* 2-Column Zigzag: 4 Pillar Cards Left, Narrative Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-differentiation"
        ref={sectionDiffRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#09090b] shadow-[0_-6px_14px_rgba(0,0,0,0.5)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Visual): 2x2 Grid of 4 Pillars */}
            <div className="lg:col-span-7 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {content.differentiation.pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="pillar-card p-6 sm:p-7 rounded-2xl bg-stone-950/90 border border-stone-800 hover:border-[#b85438]/60 transition-all duration-200 flex flex-col justify-between shadow-xl text-left rtl:text-right"
                >
                  <div>
                    <div className="text-xs font-mono text-[#e06b48] font-bold mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                      <span>{ui.differentiation.pillarPrefix} 0{pillar.number}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-stone-100 mb-2 leading-snug">
                      <WordMaskText text={pillar.title} groupClassName="card-word" />
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed mb-5 font-sans">
                      <WordMaskText text={pillar.explanation} groupClassName="card-word" />
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{pillar.proofDetail}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (Text): SectionHeader & Architecture Narrative */}
            <div className="lg:col-span-5 lg:order-2 space-y-6">
              <SectionHeader
                icon={ShieldCheck}
                tag={content.differentiation.tag}
                primary={content.differentiation.headlinePrimary}
                accent={content.differentiation.headlineAccent}
                subline={content.differentiation.subline}
                align="left"
                className="diff-header mb-0"
                maskedHorizon={true}
                theme="dark"
                ctaButton={tryStartCta}
              />

              <div className="diff-callout p-5 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 font-sans leading-relaxed space-y-2.5 text-left rtl:text-right">
                <div className="text-[10px] font-mono text-[#e06b48] uppercase tracking-wider font-semibold">
                  {ui.differentiation.calloutTitle}
                </div>
                <p>
                  <WordMaskText
                    text={ui.differentiation.calloutBody}
                    groupClassName="callout-word"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7 — DASHBOARD / KPI SHOWCASE */}
      {/* Background: Rich Terracotta (#963c24) */}
      {/* 2-Column Side-by-Side: Summary & Controls Left, Console Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-dashboard"
        ref={sectionDashboardRef}
        className="section-contain-style relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-[#7d2f1a] bg-[#963c24] text-white shadow-[0_-6px_14px_rgba(0,0,0,0.38)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Narrative & Filters */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <SectionHeader
                icon={Activity}
                tag={content.dashboard.tag}
                primary={content.dashboard.headlinePrimary}
                accent={content.dashboard.headlineAccent}
                subline={content.dashboard.subline}
                align="left"
                className="dashboard-header mb-0"
                maskedHorizon={true}
                theme="terracotta"
                ctaButton={tryStartCta}
              />

              <div className="dashboard-callout p-5 rounded-2xl bg-black/25 border border-white/10 text-xs text-stone-100 font-sans leading-relaxed space-y-2 text-left rtl:text-right">
                <div className="text-[10px] font-mono text-amber-200 uppercase tracking-wider font-semibold">
                  {content.dashboard.tag}
                </div>
                <p>
                  <WordMaskText text={content.dashboard.caption} groupClassName="callout-word" />
                </p>
              </div>

              {/* Filter Tabs on Terracotta */}
              <div
                role="tablist"
                aria-label={content.dashboard.tag}
                className="dashboard-filters flex flex-wrap items-center gap-1.5 bg-black/30 border border-white/10 rounded-xl p-1 text-xs font-mono"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeKpiFilter === 'all'}
                  onClick={() => setActiveKpiFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                    activeKpiFilter === 'all' ? 'bg-white text-stone-950 font-bold shadow' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {ui.dashboard.filters.all}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeKpiFilter === 'sales'}
                  onClick={() => setActiveKpiFilter('sales')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                    activeKpiFilter === 'sales' ? 'bg-white text-stone-950 font-bold shadow' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {ui.dashboard.filters.sales}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeKpiFilter === 'staff'}
                  onClick={() => setActiveKpiFilter('staff')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                    activeKpiFilter === 'staff' ? 'bg-white text-stone-950 font-bold shadow' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {ui.dashboard.filters.staff}
                </button>
              </div>
            </div>

            {/* Right Column: Large Interactive KPI Executive Dashboard Mockup */}
            <div className="dashboard-console lg:col-span-8 rounded-3xl bg-stone-950/95 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-left rtl:text-right">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-800/80 gap-4">
                <div>
                  <div className="text-base font-semibold text-stone-100 font-mono flex flex-wrap items-center gap-2">
                    <span>{ui.dashboard.summaryTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-[#f28e72] font-semibold border border-stone-800">
                      {ui.dashboard.sampleBadge}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 font-sans mt-1">
                    {ui.dashboard.subtitle}
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid (Reactively filtered by activeKpiFilter) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {ui.dashboard.cards
                  .filter((card) => isDashboardMetricVisible(activeKpiFilter, card.category))
                  .map((card) => (
                    <SpotlightCard
                      key={card.id}
                      data-kpi-category={card.category}
                      className="dashboard-card p-5 bg-stone-900/80 border-stone-800 animate-slide-in"
                    >
                      <div className="text-xs font-mono text-stone-400 mb-1">{card.label}</div>
                      <div
                        className={`text-2xl font-bold font-mono ${
                          card.accent ? 'text-[#f28e72]' : 'text-stone-100'
                        }`}
                      >
                        <AnimatedCounter end={card.end} duration={card.duration} delay={card.delay} />{' '}
                        <span className="text-xs font-normal text-stone-400">{card.unit}</span>
                      </div>
                      <div
                        className={`text-[11px] font-mono mt-2 ${
                          card.tone === 'emerald'
                            ? 'text-emerald-400'
                            : card.tone === 'accent'
                            ? 'text-[#e06b48]'
                            : 'text-stone-300'
                        }`}
                      >
                        {card.subtext}
                      </div>
                    </SpotlightCard>
                  ))}
              </div>

              {/* Consolidated Location Breakdown Table */}
              <div className="dashboard-table rounded-xl bg-stone-900/60 border border-stone-800/80 p-4 font-mono text-xs overflow-x-auto">
                <div className="text-[11px] text-stone-400 uppercase tracking-wider mb-3">
                  {ui.dashboard.tableTitle}
                </div>
                <table className="w-full text-left rtl:text-right min-w-[500px]">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 text-[10px]">
                      <th className="pb-2">{ui.dashboard.tableHeaders[0]}</th>
                      <th className="pb-2">{ui.dashboard.tableHeaders[1]}</th>
                      <th className="pb-2">{ui.dashboard.tableHeaders[2]}</th>
                      <th className="pb-2 text-right rtl:text-left">{ui.dashboard.tableHeaders[3]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {ui.dashboard.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 font-semibold text-stone-100">{row.branch}</td>
                        <td
                          className={`py-2.5 ${
                            row.tone === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {row.status}
                        </td>
                        <td className="py-2.5 text-stone-400">{row.sync}</td>
                        <td className="py-2.5 text-right rtl:text-left font-mono font-bold">{row.gross}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8.5 — BEFORE & AFTER COMPARISON SLIDER */}
      {/* Background: Crisp Off-White (#faf9f5) */}
      {/* 2-Column Side-by-Side: Interactive Slider Left, Audit Checklist Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-slider"
        ref={sectionSliderRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-200 bg-[#faf9f5] text-stone-900 shadow-inner flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive Before/After Split-Screen Lens */}
            <div className="slider-panel lg:col-span-7">
              <BeforeAfterSlider lang={lang} theme="light" />
            </div>

            {/* Right Column: Narrative & Transformation Checklist */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                icon={Sliders}
                tag={ui.slider.tag}
                primary={ui.slider.headlinePrimary}
                accent={ui.slider.headlineAccent}
                subline={ui.slider.subline}
                align="left"
                className="slider-header mb-0"
                maskedHorizon={true}
                theme="light"
                ctaButton={tryStartCta}
              />

              <div className="space-y-3.5 pt-2">
                {ui.slider.checks.map((checkItem, idx) => {
                  const iconBoxClass =
                    idx === 0
                      ? 'bg-rose-50 border-rose-200/80 text-rose-600'
                      : idx === 1
                      ? 'bg-amber-50 border-amber-200/80 text-amber-700'
                      : 'bg-emerald-50 border-emerald-200/80 text-emerald-700';
                  return (
                    <div
                      key={idx}
                      className="slider-check-card p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start gap-3.5 text-left rtl:text-right"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${iconBoxClass}`}
                      >
                        {idx === 0 ? (
                          <WifiOff className="w-4 h-4" />
                        ) : idx === 1 ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 font-mono mb-1">
                          <WordMaskText text={checkItem.title} groupClassName="card-word" />
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          <WordMaskText text={checkItem.desc} groupClassName="card-word" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9 — PRICING */}
      {/* Background: Rich Terracotta (#963c24) */}
      {/* 2-Column Side-by-Side: Summary & Guarantee Left, 3 Tiers Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-pricing"
        ref={sectionPricingRef}
        className="section-contain-style relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-[#7d2f1a] bg-[#963c24] text-white shadow-[0_-6px_14px_rgba(0,0,0,0.38)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Narrative & Zero-Risk Reversal Banner */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <SectionHeader
                icon={CreditCard}
                tag={content.pricing.tag}
                primary={content.pricing.headlinePrimary}
                accent={content.pricing.headlineAccent}
                subline={content.pricing.subline}
                align="left"
                className="pricing-header mb-0"
                maskedHorizon={true}
                theme="terracotta"
                ctaButton={tryStartCta}
              />

              {/* Risk Reversal Assurance Banner */}
              <div className="pricing-callout p-6 rounded-2xl bg-black/30 border border-white/10 text-stone-100 space-y-3 shadow-xl text-left rtl:text-right">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{ui.pricing.guaranteeBadge}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-100 font-sans leading-relaxed">
                  <WordMaskText text={content.pricing.riskReversal} groupClassName="callout-word" />
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-stone-300/80">
                  {content.pricing.billingNote}
                </div>
              </div>
            </div>

            {/* Right Column: 3 Pricing Tiers on Dark Obsidian Glass */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.pricing.tiers.map((tier, idx) => (
                <SpotlightCard
                  key={idx}
                  className={`pricing-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-200 bg-stone-950/95 text-left rtl:text-right ${
                    tier.highlighted
                      ? 'border-amber-400/90 ring-2 ring-amber-400/30 shadow-2xl relative'
                      : 'border-white/10 shadow-xl'
                  }`}
                  spotlightColor={tier.highlighted ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.08)'}
                  borderColor={tier.highlighted ? 'rgba(251, 191, 36, 0.6)' : 'rgba(255, 255, 255, 0.15)'}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#b85438] text-white text-[10px] font-mono uppercase tracking-widest font-bold z-30 shadow-md whitespace-nowrap">
                      {ui.pricing.popularBadge}
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2 font-semibold">
                      {tier.name}
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-100">{tier.price}</span>
                      <span className="text-xs font-mono text-stone-400">/ {tier.period}</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed mb-6 font-sans min-h-[48px]">
                      {tier.desc}
                    </p>

                    <div className="space-y-3 pt-5 border-t border-stone-800/80 mb-6">
                      {tier.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-semibold tracking-wider transition cursor-pointer ${
                      tier.highlighted
                        ? 'bg-[#b85438] hover:bg-[#a24830] text-white shadow-lg shadow-[#b85438]/30'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
                    }`}
                  >
                    {tier.ctaText}
                  </button>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10 — CREDIBILITY (Proven Foundation) */}
      {/* Background: Deep Obsidian (#09090b) */}
      {/* 2-Column Zigzag: Narrative Left, Founder Statement Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-proof"
        ref={sectionProofRef}
        className="section-contain relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#09090b] shadow-[0_-6px_14px_rgba(0,0,0,0.5)] flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Section Header & Verified Badges */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                icon={Building}
                tag={content.credibility.tag}
                primary={content.credibility.headlinePrimary}
                accent={content.credibility.headlineAccent}
                subline={ui.credibility.subline}
                align="left"
                className="credibility-header mb-0"
                maskedHorizon={true}
                theme="dark"
                ctaButton={tryStartCta}
              />

              <div className="credibility-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-400 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                <span>{content.credibility.locationBadge}</span>
              </div>
            </div>

            {/* Right Column: Founder Statement Card */}
            <div className="lg:col-span-7">
              <div className="credibility-card p-8 sm:p-10 rounded-2xl bg-stone-950/90 border border-stone-800 text-stone-200 text-left rtl:text-right font-sans text-sm sm:text-base leading-relaxed shadow-2xl space-y-4">
                <p className="text-stone-200 font-normal">
                  <WordMaskText text={content.credibility.leadSentence} groupClassName="credibility-word" />
                </p>
                <p className="text-stone-300 font-normal">
                  <WordMaskText text={content.credibility.researchSentence} groupClassName="credibility-word" />
                </p>
                <p className="text-stone-100 font-medium pt-3 border-t border-stone-800/80">
                  <WordMaskText text={content.credibility.conclusionSentence} groupClassName="credibility-word" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 11 — FAQ (QUESTIONS & ANSWERS) */}
      {/* Background: Crisp Off-White (#fbfbfa) via theme="light" */}
      {/* 2-Column: Sticky Support Left, Questions Right */}
      {/* ------------------------------------------------------------- */}
      <FaqSection
        ref={sectionFaqRef}
        content={content.faq}
        lang={lang}
        phone={content.footer.phone}
        onOpenDemo={onOpenDemo}
        theme="light"
      />

      {/* ------------------------------------------------------------- */}
      {/* SECTION 12 — FINAL CTA */}
      {/* Background: Rich Terracotta (#8f371f) */}
      {/* 2-Column Side-by-Side: Heading Left, Quick Booking Right */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-final-cta"
        ref={sectionFinalCtaRef}
        className="section-contain relative z-20 w-full min-h-[60vh] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#782c18] bg-[#8f371f] text-white shadow-[0_-6px_14px_rgba(0,0,0,0.4)] flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Subline */}
            <div className="lg:col-span-6 space-y-4 text-left rtl:text-right">
              <SectionHeader
                icon={Calendar}
                tag={content.finalCta.tag}
                primary={content.finalCta.headlinePrimary}
                accent={content.finalCta.headlineAccent}
                subline={content.finalCta.subline}
                align="left"
                className="final-cta-header mb-0"
                maskedHorizon={true}
                theme="terracotta"
                ctaButton={finalCtaConfig}
              />
            </div>

            {/* Right Column: Direct Booking & Fast Response Box */}
            <div className="final-cta-card lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-black/45 border border-white/10 shadow-2xl space-y-4 text-stone-100 text-left rtl:text-right">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono text-stone-300">
                <span>{ui.finalCta.onboardingLabel}</span>
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {ui.finalCta.slotsLabel}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-sans text-stone-200">
                {ui.finalCta.checks.map((item, idx) => (
                  <div key={idx} className="final-cta-check-item flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <WordMaskText text={item} groupClassName="card-word" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-stone-300">
                <span>{ui.finalCta.responseTime}</span>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold transition shadow cursor-pointer text-xs"
                >
                  {content.finalCta.ctaButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FOOTER */}
      {/* Standard: contact info, social links, legal, language toggle */}
      {/* ------------------------------------------------------------- */}
      <footer className="section-contain relative z-[110] border-t border-stone-800/80 py-16 px-6 sm:px-12 bg-stone-950 shadow-[0_-6px_14px_rgba(0,0,0,0.5)] text-xs font-mono text-stone-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left rtl:text-right">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <AtriumBrandLogo size={26} showText={true} />
            <p className="text-stone-400 text-xs font-sans max-w-sm leading-relaxed">
              {content.footer.tagline}
            </p>
            <div className="text-[11px] text-stone-500">{content.footer.byline}</div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="text-stone-200 font-semibold mb-3">{content.footer.contactHeading}</div>
            <div className="space-y-2 text-stone-400">
              <div>{ui.footer.emailLabel}: {content.footer.contactEmail}</div>
              <div>{ui.footer.phoneLabel}: <span dir="ltr">{content.footer.phone}</span></div>
              <div>{ui.footer.locationLabel}: {ui.footer.locationValue}</div>
              <div>{ui.footer.responseLabel}: {ui.footer.responseValue}</div>
            </div>
          </div>

          {/* Language & Regional Switcher */}
          <div>
            <div className="text-stone-200 font-semibold mb-3">Language / اللغة</div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'en' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                English (International)
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'fr' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                Français (Algérie / Maghreb)
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'ar' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                العربية (الجزائر والشرق الأوسط)
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-4">
          <div>{content.footer.copyright}</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>{ui.footer.badges[0]}</span>
            <span>•</span>
            <span>{ui.footer.badges[1]}</span>
            <span>•</span>
            <span>{ui.footer.badges[2]}</span>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* CLOSING BRAND STATEMENT — FULL-WIDTH ARABIC WORDMARK (THE VERY END OF THE SITE) */}
      {/* ------------------------------------------------------------- */}
      <ClosingWordmark lang={lang} />
    </div>
  );
});

export default PageShell;
