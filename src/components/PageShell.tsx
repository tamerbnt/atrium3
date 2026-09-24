import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  WifiOff,
  Building,
  TrendingUp,
  Sliders,
  Check,
  Globe2,
  PhoneCall,
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
  Menu,
  X,
} from 'lucide-react';
import { CONTENT, Language } from '../content/copy';
import { useLenis } from './SmoothScroll';
import { AtriumBrandLogo } from './AtriumBrandLogo';
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

export default function PageShell({
  lang,
  onLanguageChange,
  onOpenDemo,
  isHydrated,
  activeMode,
  hero3DNode,
  activeWaypointIndex = 0,
  onWaypointChange,
}: PageShellProps) {
  const content = CONTENT[lang];
  const isRTL = lang === 'ar';

  const [activeVertical, setActiveVertical] = useState('memberships');
  const [activeKpiFilter, setActiveKpiFilter] = useState<'all' | 'sales' | 'staff' | 'inventory'>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('section-hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isSnappingRef = useRef(false);
  const snapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const proofHorizonTlRef = useRef<gsap.core.Timeline | null>(null);
  const sectionTimelinesRef = useRef<
    Map<string, { headerTl?: gsap.core.Timeline; cardsTl?: gsap.core.Timeline }>
  >(new Map());

  const { lenis, scrollTo: lenisScrollTo } = useLenis(
    useCallback((lenisInstance: any) => {
      const scrollY = lenisInstance?.scroll ?? (window.scrollY || document.documentElement.scrollTop);
      setIsScrolled(scrollY > 60);

      const prevScrollY = lastScrollYRef.current;
      const delta = scrollY - prevScrollY;

      if (scrollY <= 20) {
        setIsNavVisible(true);
      } else if (delta > 6 && scrollY > 60) {
        setIsNavVisible(false);
      } else if (delta < -6) {
        setIsNavVisible(true);
      }
      lastScrollYRef.current = scrollY;

      // Active section spy
      const sectionIds = [
        'section-hero',
        'section-proof-strip',
        'section-problem',
        'section-shift',
        'section-how-it-works',
        'section-verticals',
        'section-differentiation',
        'section-pricing',
        'section-faq',
      ];
      const scrollPos = scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSectionId(sectionIds[i]);
          break;
        }
      }

      // Smooth trigger glide strictly between Hero and Section 1.5
      const windowH = window.innerHeight;
      if (!isSnappingRef.current && lenisInstance) {
        // Downward glide from hero when user scrolls down (origin gate catches gentle scrolls and high-velocity flicks alike)
        if (prevScrollY < 120 && (delta > 0 || lenisInstance.direction === 1)) {
          isSnappingRef.current = true;
          lenisInstance.velocity = 0;
          if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
          lenisInstance.scrollTo('#section-proof-strip', {
            duration: 0.85,
            offset: 0,
            force: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              proofHorizonTlRef.current?.play();
              setTimeout(() => {
                isSnappingRef.current = false;
                if (lenisInstance) lenisInstance.velocity = 0;
              }, 140);
            },
          });
          snapTimerRef.current = setTimeout(() => {
            isSnappingRef.current = false;
            if (lenisInstance) lenisInstance.velocity = 0;
          }, 1050);
        }
        // Upward glide from top of Section 1.5 when user scrolls back to hero
        else if (prevScrollY >= 40 && prevScrollY <= windowH + 40 && (delta < 0 || lenisInstance.direction === -1)) {
          isSnappingRef.current = true;
          lenisInstance.velocity = 0;
          proofHorizonTlRef.current?.reverse();
          if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
          lenisInstance.scrollTo(0, {
            duration: 0.85,
            offset: 0,
            force: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              setTimeout(() => {
                isSnappingRef.current = false;
                if (lenisInstance) lenisInstance.velocity = 0;
              }, 140);
            },
          });
          snapTimerRef.current = setTimeout(() => {
            isSnappingRef.current = false;
            if (lenisInstance) lenisInstance.velocity = 0;
          }, 1050);
        }
      }
    }, [])
  );

  const scrollTo = (id: string) => {
    isTransitioningRef.current = true;
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    const targetId = id.startsWith('#') ? id.slice(1) : id;
    if (targetId === 'section-proof-strip') {
      proofHorizonTlRef.current?.play();
    }
    const tls = sectionTimelinesRef.current.get(targetId);
    if (tls) {
      setTimeout(() => {
        tls.headerTl?.play();
        tls.cardsTl?.play();
      }, 300);
    }
    lenisScrollTo(`#${targetId}`, { offset: targetId === 'section-proof-strip' ? 0 : -40, duration: 1.0 });
    transitionTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1100);
  };

  const currentVertical =
    content.verticals.items.find((v) => v.id === activeVertical) || content.verticals.items[0];

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
  const sectionPricingRef = useRef<HTMLElement>(null);
  const sectionProofRef = useRef<HTMLElement>(null);
  const sectionFaqRef = useRef<HTMLElement>(null);
  const sectionFinalCtaRef = useRef<HTMLElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation support between Hero and Section 1.5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowH = window.innerHeight;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && scrollY < 80) {
        e.preventDefault();
        lenisScrollTo('#section-proof-strip', { duration: 1.15, offset: 0 });
      } else if (
        (e.key === 'ArrowUp' || e.key === 'PageUp') &&
        scrollY >= windowH - 60 &&
        scrollY <= windowH + 60
      ) {
        e.preventDefault();
        lenisScrollTo(0, { duration: 1.1, offset: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lenisScrollTo]);

  // Absorb excess kinetic trackpad/wheel momentum during Hero <-> Section 1.5 transitions
  useEffect(() => {
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

    return () => {
      window.removeEventListener('wheel', absorbExcessMomentum, { capture: true });
      window.removeEventListener('touchmove', absorbExcessMomentum, { capture: true });
    };
  }, []);

  /**
   * Scroll Effects:
   * EFFECT 1 — Sections arrive from below, covering the previous one (y: 80 -> 0, opacity: 0.15 -> 1)
   *             with previous section dimming slightly to 0.45.
   * EXCEPTION — Long sections (Verticals, Pricing, FAQ) use the arrival effect at their entrance,
   *             then fall back to plain native vertical scroll internally.
   * EFFECT 2 — Text reveals as a single continuous masked clip-path motion (inset(0 0 100% 0) -> inset(0 0 0% 0))
   *             with subtle upward 20px settle and fade-in, triggered with a 160ms stagger.
   */
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 0. Hero Section Text Reveal (runs on initial load / hydration)
      if (prefersReducedMotion) {
        gsap.set('.hero-eyebrow, .hero-headline, .hero-subheadline', {
          opacity: 1,
          y: 0,
          clipPath: 'none',
        });
      } else {
        const heroTl = gsap.timeline({ delay: 0.15 });
        heroTl
          .fromTo(
            '.hero-eyebrow',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(
            '.hero-headline',
            { clipPath: 'inset(0 0 100% 0)', y: 20, opacity: 0 },
            { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
            0.1
          )
          .fromTo(
            '.hero-subheadline',
            { clipPath: 'inset(0 0 100% 0)', y: 16, opacity: 0 },
            { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
            0.25
          );
      }

      // Hero exit motion during Section 1.5 Curtain Reveal:
      // Hero remains anchored via CSS sticky while Section 1.5 slides UP over it
      if (!prefersReducedMotion && sectionProofStripRef.current) {
        // Cinematic exit motion: Hero typography & 3D cluster scale subtly down and dim as curtain rises
        gsap.to('.hero-inner-content', {
          opacity: 0.15,
          scale: 0.94,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionProofStripRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });

        gsap.to('.hero-3d-layer', {
          opacity: 0.2,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionProofStripRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }

      // Reusable setup for Effect 1 (Arrival from below, covering previous) + Effect 2 (Masked text reveal)
      // Master Horizon Orchestrator — Typographic Horizon Rise + Sequential Card Cascade
      const setupSectionTransition = ({
        target,
        cardsSelector,
        headerTriggerOffset = 'top 88%',
        cardsTriggerOffset = 'top 85%',
      }: {
        target: HTMLElement | null;
        cardsSelector?: string;
        headerTriggerOffset?: string;
        cardsTriggerOffset?: string;
      }) => {
        if (!target) return;

        const sectionId = target.id;
        const header = target.querySelector('.section-headline') as HTMLElement | null;
        const subline = target.querySelector('.section-subline') as HTMLElement | null;
        const tag = target.querySelector('.section-tag') as HTMLElement | null;
        const ctaWrap = target.querySelector('.section-cta-wrap') as HTMLElement | null;
        const cards = cardsSelector ? target.querySelectorAll(cardsSelector) : null;
        const innerContent =
          (target.querySelector(
            '.max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl, .max-w-2xl'
          ) as HTMLElement | null) || (target.firstElementChild as HTMLElement | null);

        if (prefersReducedMotion) {
          if (header) gsap.set(header, { opacity: 1, y: 0, clipPath: 'none' });
          if (subline) gsap.set(subline, { opacity: 1, y: 0, clipPath: 'none' });
          if (tag) gsap.set(tag, { opacity: 1, y: 0 });
          if (ctaWrap) gsap.set(ctaWrap, { opacity: 1, y: 0 });
          if (cards && cards.length) gsap.set(cards, { opacity: 1, y: 0 });
          if (innerContent) gsap.set(innerContent, { opacity: 1, y: 0 });
          gsap.set(target, { opacity: 1, y: 0 });
          return;
        }

        // 1. Header Horizon Rise Timeline — triggers when the section enters viewport
        const headerTriggerEl = target;
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerTriggerEl,
            start: headerTriggerOffset,
            toggleActions: 'play none none reverse',
          },
        });

        // Category pill / tag arrives first
        if (tag) {
          headerTl.fromTo(
            tag,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0
          );
        }

        // Two-tone headline rises through horizontal mask
        if (header) {
          headerTl.fromTo(
            header,
            {
              y: 42,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            0.08
          );
        }

        // Subheadline rises through horizontal mask
        if (subline) {
          headerTl.fromTo(
            subline,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            0.2
          );
        }

        // CTA button wrap glides in
        if (ctaWrap) {
          headerTl.fromTo(
            ctaWrap,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.35
          );
        }

        // Fallback for sections without header class but with inner content (like Section 4 Feeling Line)
        if (!header && !tag && innerContent) {
          headerTl.fromTo(
            innerContent,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
            0.1
          );
        }

        // 2. Cards Sequential Cascade Timeline — triggers when the section enters view
        let cardsTl: gsap.core.Timeline | undefined;
        if (cards && cards.length > 0) {
          cardsTl = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              start: cardsTriggerOffset,
              toggleActions: 'play none none reverse',
            },
          });

          cardsTl.fromTo(
            cards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power2.out',
            },
            0.15
          );
        }

        if (sectionId) {
          sectionTimelinesRef.current.set(sectionId, { headerTl, cardsTl });
        }
      };

      // Set up each section in sequence:
      // 1. Proof Strip / Categories — Typographic Horizon Rise + Sequential Card Cascade
      const proofTarget = sectionProofStripRef.current;
      if (proofTarget) {
        const tag = proofTarget.querySelector('.section-tag');
        const headline = proofTarget.querySelector('.section-headline');
        const subline = proofTarget.querySelector('.section-subline');
        const ctaWrap = proofTarget.querySelector('.section-cta-wrap');
        const exploreLink = proofTarget.querySelector('.proof-explore-link');
        const cardAnims = proofTarget.querySelectorAll('.proof-card-anim');
        const swiper = proofTarget.querySelector('.swiper-container');

        if (prefersReducedMotion) {
          if (headline) gsap.set(headline, { opacity: 1, y: 0 });
          if (subline) gsap.set(subline, { opacity: 1, y: 0 });
          if (tag) gsap.set(tag, { opacity: 1, y: 0 });
          if (ctaWrap) gsap.set(ctaWrap, { opacity: 1, y: 0 });
          if (exploreLink) gsap.set(exploreLink, { opacity: 1, x: 0 });
          if (cardAnims && cardAnims.length) gsap.set(cardAnims, { opacity: 1, y: 0 });
          if (swiper) gsap.set(swiper, { opacity: 1, y: 0 });
        } else {
          // Master horizon reveal timeline directly powered by ScrollTrigger
          const horizonTl = gsap.timeline({
            scrollTrigger: {
              trigger: proofTarget,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
          proofHorizonTlRef.current = horizonTl;

          // 1. Domain pill arrives first from behind its mask
          if (tag) {
            horizonTl.fromTo(
              tag,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
              0
            );
          }

          // 2. Headline rises from behind the architectural horizon mask
          if (headline) {
            horizonTl.fromTo(
              headline,
              {
                y: 45,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
              },
              0.08
            );
          }

          // 3. Subheadline rises smoothly from behind its horizon mask
          if (subline) {
            horizonTl.fromTo(
              subline,
              {
                y: 30,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
              },
              0.2
            );
          }

          // 4. CTA button and Explore link glide in
          if (ctaWrap) {
            horizonTl.fromTo(
              ctaWrap,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0.3
            );
          }

          if (exploreLink) {
            horizonTl.fromTo(
              exploreLink,
              { opacity: 0, x: 16 },
              { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' },
              0.32
            );
          }

          // 5. Category cards cascade in sequentially one by one
          if (cardAnims && cardAnims.length > 0) {
            horizonTl.fromTo(
              cardAnims,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power2.out',
              },
              0.32
            );
          } else if (swiper) {
            horizonTl.fromTo(
              swiper,
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
              0.32
            );
          }

          sectionTimelinesRef.current.set('section-proof-strip', { headerTl: horizonTl });
        }
      }

      // 2. Problem
      setupSectionTransition({
        target: sectionProblemRef.current,
        cardsSelector: '.problem-card-anim',
      });

      // 3. Shift
      setupSectionTransition({
        target: sectionShiftRef.current,
        cardsSelector: '.shift-card-anim, .shift-callout',
      });

      // 4. Feeling Line
      setupSectionTransition({
        target: sectionFeelingRef.current,
        headerTriggerOffset: 'top 80%',
      });

      // 5. How It Works
      setupSectionTransition({
        target: sectionHowRef.current,
        cardsSelector: '.how-step-card',
      });

      // 6. Verticals
      setupSectionTransition({
        target: sectionVerticalsRef.current,
        cardsSelector: '.vertical-tab-btn, .vertical-card',
      });

      // 7. Differentiation
      setupSectionTransition({
        target: sectionDiffRef.current,
        cardsSelector: '.pillar-card',
      });

      // 8. Dashboard Showcase
      setupSectionTransition({
        target: sectionDashboardRef.current,
        cardsSelector: '.dashboard-card',
      });

      // 9. Pricing
      setupSectionTransition({
        target: sectionPricingRef.current,
        cardsSelector: '.pricing-card',
      });

      // 10. Credibility
      setupSectionTransition({
        target: sectionProofRef.current,
        cardsSelector: '.credibility-card',
      });

      // 11. FAQ
      setupSectionTransition({
        target: sectionFaqRef.current,
        cardsSelector: '.faq-item',
      });

      // 12. Final CTA
      setupSectionTransition({
        target: sectionFinalCtaRef.current,
        headerTriggerOffset: 'top 80%',
      });

      // Synchronize trigger coordinates with document height and layout
      ScrollTrigger.refresh();

      // Subsequent deferred refresh once fonts, swipers, and dynamic images settle
      const delayedRefreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => {
        clearTimeout(delayedRefreshTimer);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative w-full text-white bg-black min-h-screen selection:bg-[#b85438]/40 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL BACKGROUND LAYER (Deep charcoal foundation + hero terracotta glow) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-black">
        {/* Seamless deep charcoal gradient foundation */}
        <div className="absolute inset-0 bg-black" />

        {/* Primary Hero Warm Terracotta Glow (Centered on mobile, framed on right for desktop) */}
        <div
          ref={heroGlowRef}
          className="absolute top-[3vw] sm:top-[5vw] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[12vw] w-[460px] sm:w-[680px] lg:w-[1050px] h-[460px] sm:h-[680px] lg:h-[950px] rounded-full bg-[#b85438]/12 blur-[120px] lg:blur-[160px] will-change-transform"
        />

        {/* Soft Ambient Reach */}
        <div
          className="absolute top-[8vw] sm:top-[12vw] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[28vw] w-[350px] sm:w-[550px] lg:w-[750px] h-[350px] sm:h-[550px] lg:h-[750px] rounded-full bg-[#b85438]/05 blur-[120px] lg:blur-[150px] will-change-transform pointer-events-none"
        />

        {/* Subtle Architectural Stipple Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.022] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Rhythmic Glow Accents anchored to key moments throughout page height */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow Accent 1: Problem / Shift Transition (Warm Terracotta Accent) */}
        <div
          className="absolute top-[18%] -left-[10vw] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-[#b85438]/06 blur-[160px] will-change-transform"
        />

        {/* Glow Accent 2: Shift Unified Core (Warm Terracotta Accent) */}
        <div
          className="absolute top-[34%] -right-[5vw] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-[#b85438]/06 blur-[160px] will-change-transform"
        />

        {/* Glow Accent 3: Verticals & Interactive Floor Desk (Subtle Amber/Terracotta glow) */}
        <div
          className="absolute top-[56%] -left-[8vw] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#b85438]/05 blur-[160px] will-change-transform"
        />

        {/* Glow Accent 4: Pricing & Final CTA (Warm Terracotta Accent) */}
        <div
          className="absolute top-[78%] right-[5vw] w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] rounded-full bg-[#b85438]/09 blur-[160px] will-change-transform"
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOP FLOATING GLASS NAVBAR */}
      {/* Detached, rounded-full, balanced spacing with responsive mobile menu */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`fixed top-3 sm:top-4 left-3 sm:left-6 right-3 sm:right-6 max-w-6xl mx-auto z-50 transition-all duration-300 ease-out ${
          isNavVisible || isMobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        <header
          id="atrium-nav"
          className={`w-full transition-all duration-300 ease-out flex items-center justify-between rounded-full border ${
            isScrolled
              ? 'py-2 px-3.5 sm:px-5 bg-black/90 backdrop-blur-2xl backdrop-saturate-150 border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'py-2.5 px-4 sm:px-6 bg-black/80 backdrop-blur-xl backdrop-saturate-125 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]'
          }`}
        >
          <div
            onClick={() => {
              scrollTo('section-hero');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center cursor-pointer group shrink-0"
            aria-label="Atrium Home"
          >
            {/* Official Atrium Logo with transparent background and BY STOA STUDIO */}
            <AtriumBrandLogo size={28} showText={true} />
          </div>

          {/* Desktop Anchor Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 text-xs font-medium"
          >
            <button
              type="button"
              onClick={() => scrollTo('section-proof-strip')}
              className={`transition cursor-pointer whitespace-nowrap ${
                activeSectionId === 'section-proof-strip'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.proof}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-problem')}
              className={`transition cursor-pointer whitespace-nowrap ${
                activeSectionId === 'section-problem'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.problem}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-shift')}
              className={`transition cursor-pointer whitespace-nowrap ${
                activeSectionId === 'section-shift'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.shift}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-how-it-works')}
              className={`transition cursor-pointer whitespace-nowrap hidden lg:block ${
                activeSectionId === 'section-how-it-works'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-verticals')}
              className={`transition cursor-pointer whitespace-nowrap ${
                activeSectionId === 'section-verticals'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.verticals}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-differentiation')}
              className={`transition cursor-pointer whitespace-nowrap hidden lg:block ${
                activeSectionId === 'section-differentiation'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.whyAtrium}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('section-pricing')}
              className={`transition cursor-pointer whitespace-nowrap ${
                activeSectionId === 'section-pricing'
                  ? 'text-[#e06b48] font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {content.nav.pricing}
            </button>
          </nav>

          {/* Action Controls: Compact Walkthrough button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white font-medium text-[11px] sm:text-xs tracking-wide transition shadow-md shadow-[#b85438]/20 cursor-pointer whitespace-nowrap shrink-0"
            >
              {content.nav.bookDemo}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition cursor-pointer shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-stone-950/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_16px_48px_rgba(0,0,0,0.9)] flex flex-col gap-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                scrollTo('section-proof-strip');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.proof}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-problem');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.problem}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-shift');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.shift}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-how-it-works');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.howItWorks}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-verticals');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.verticals}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-differentiation');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.whyAtrium}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollTo('section-pricing');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{content.nav.pricing}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {/* Bottom controls: Language selector and Walkthrough trigger */}
            <div className="mt-2 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-lg border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                    lang === 'en' ? 'bg-[#b85438] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('fr')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                    lang === 'fr' ? 'bg-[#b85438] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ar')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                    lang === 'ar' ? 'bg-[#b85438] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="flex-1 py-2 rounded-lg bg-[#b85438] hover:bg-[#a04830] text-white font-semibold text-xs tracking-wider uppercase transition shadow-md shadow-[#b85438]/20 flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{content.nav.bookDemo}</span>
              </button>
            </div>
          </div>
        )}
      </div>

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

              {/* Headline: Atrium alone in terracotta, as a service beneath it */}
              <h1 className="hero-headline font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.0] mb-3 sm:mb-4">
                <span className="block text-[#b85438]">{content.hero.brandName}</span>
                <span className="block text-stone-100 text-2xl sm:text-4xl lg:text-5xl font-light tracking-normal mt-0.5">
                  {content.hero.serviceLine}
                </span>
              </h1>

              {/* Subheadline: Tightened spacing, clean contrast */}
              <p className="hero-subheadline text-xs sm:text-sm text-stone-300 font-normal leading-relaxed font-sans max-w-md mb-4 sm:mb-6">
                {content.hero.subheadline}
              </p>

              {/* ONE Primary CTA Button — Touch-friendly thumb target on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-3 sm:mb-6">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 sm:py-3 rounded-lg bg-[#b85438] hover:bg-[#a24830] active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase transition shadow-xl shadow-[#b85438]/25 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 touch-manipulation"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{content.hero.ctaButton}</span>
                </button>

                <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 text-center sm:text-left whitespace-nowrap">
                  {lang === 'ar'
                    ? 'تجربة مجانية 14 يوماً • بدون بطاقة بنكية • إعداد فوري'
                    : lang === 'fr'
                    ? 'Essai gratuit 14 jours • Sans carte • Configuration rapide'
                    : '14-day free trial • No card required • Instant setup'}
                </span>
              </div>
            </div>

            {/* Scroll Indicator Prompt with clear, unobstructed background */}
            <div className="pt-2 sm:pt-3 lg:pt-4 flex items-center relative z-10 pointer-events-auto">
              <button
                type="button"
                onClick={() => scrollTo('section-proof-strip')}
                className="flex items-center gap-2 text-[11px] font-mono text-stone-400 hover:text-stone-200 transition cursor-pointer group py-1"
              >
                <ArrowDownRight className="w-3.5 h-3.5 text-[#b85438] group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
          className="relative z-20 w-full min-h-[100dvh] py-10 sm:py-14 lg:py-16 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-40px_90px_rgba(0,0,0,0.98),0_-1px_0_rgba(255,255,255,0.06)] flex flex-col justify-center will-change-transform"
        >
          {/* Ambient studio light catch on rising sheet edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#b85438]/50 to-transparent pointer-events-none" />

          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-2">
              <div className="max-w-2xl">
                <SectionHeader
                  icon={Layers}
                  tag={content.proofStrip.tag}
                  primary={content.proofStrip.headlinePrimary}
                  accent={content.proofStrip.headlineAccent}
                  subline={content.proofStrip.subline}
                  align="left"
                  className="mb-0"
                  ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
                />
              </div>
              <button
                type="button"
                onClick={() => scrollTo('section-verticals')}
                className="proof-explore-link shrink-0 text-xs font-mono text-[#e06b48] hover:text-[#f28e72] transition underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore deep interactive setups</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <CategoryCardSwiper
              categories={content.proofStrip.categories}
              onSelectCategory={(catId) => {
                setActiveVertical(catId);
                scrollTo('section-verticals');
              }}
            />
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2 — THE PROBLEM (Before Atrium) */}
      {/* Discrete triggered animation on enter (scrub: false) */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-problem"
        ref={sectionProblemRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-[#09090b] shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          <SectionHeader
            icon={AlertCircle}
            tag={content.problem.tag}
            primary={content.problem.headlinePrimary}
            accent={content.problem.headlineAccent}
            subline={content.problem.subline}
            className="problem-header"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          {/* Swipable Infinite Bottlenecks with Centered Controls */}
          <ProblemCardSwiper points={content.problem.points} />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3 — THE SHIFT (With Atrium) */}
      {/* Discrete triggered animation on enter (scrub: false) */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-shift"
        ref={sectionShiftRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          <SectionHeader
            icon={Sparkles}
            tag={content.shift.tag}
            primary={content.shift.headlinePrimary}
            accent={content.shift.headlineAccent}
            subline={content.shift.subline}
            className="shift-header"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          {/* Swipable Infinite Shift Resolutions with Centered Controls */}
          <ShiftCardSwiper points={content.shift.points} />

          {/* Interactive Before vs After Comparison Slider */}
          <BeforeAfterSlider lang={lang} />

          {/* Unification Visual Metaphor Callout */}
          <div className="shift-callout mt-8 p-6 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center gap-3 text-xs font-mono text-stone-300 shadow-xl">
            <div className="w-3 h-3 rotate-45 bg-[#e06b48] shadow-[0_0_12px_rgba(224,107,72,0.7)] shrink-0" />
            <span>THE UNIFIED ATRIUM CORE: 4 scattered vectors resolve into 1 central truth.</span>
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
        className="relative z-20 w-full min-h-[60vh] sm:min-h-[75vh] py-20 px-6 sm:px-12 text-center border-t border-stone-800/80 bg-[#0d0e12] shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-3xl mx-auto">
          <p className="section-headline font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-300 leading-tight">
            {content.feelingLine}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4 — HOW IT WORKS (3-4 Steps) */}
      {/* Discrete triggered animation on enter (scrub: false) */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-how-it-works"
        ref={sectionHowRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <PinnedHowItWorks content={content} lang={lang} onOpenDemo={onOpenDemo} />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5 — BUILT FOR YOUR BUSINESS (Vertical Proof) */}
      {/* Job: Prove this isn't generic software — shows vertical recognition */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-verticals"
        ref={sectionVerticalsRef}
        className="relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={Compass}
            tag={content.verticals.tag}
            primary={content.verticals.headlinePrimary}
            accent={content.verticals.headlineAccent}
            subline={content.verticals.subline}
            align="left"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          {/* Vertical Selector Tabs */}
          <div className="vertical-tabs flex flex-wrap gap-2 border-b border-stone-800/80 pb-4 mb-8">
            {content.verticals.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveVertical(item.id)}
                className={`vertical-tab-btn px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer font-mono ${
                  activeVertical === item.id
                    ? 'bg-[#b85438] text-white shadow-md'
                    : 'bg-stone-900/70 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Vertical Display Card */}
          <div className="vertical-card grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-stone-800 shadow-xl">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 text-stone-300 font-mono text-[11px] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                  <span>INDUSTRY SPECIFIC WORKFLOW</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-light text-stone-100 mb-4">
                  {currentVertical.name}
                </h3>

                <p className="text-sm text-stone-300 leading-relaxed mb-5 font-sans">
                  {currentVertical.featureLine}
                </p>

                {/* Research / Operational Insight block (Honest founder-voice observation) */}
                <div className="p-4 rounded-lg bg-stone-900/80 border border-stone-800/80 mb-5 text-xs text-stone-300 font-sans leading-relaxed">
                  <div className="text-[10px] font-mono text-[#e06b48] uppercase tracking-wider mb-1.5 font-semibold">
                    Field Operational Insight
                  </div>
                  <p className="italic text-stone-300">
                    "{currentVertical.operationalInsight}"
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/60 border border-stone-800/80 mb-6">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1">
                    PRIMARY OPERATIONAL FOCUS
                  </div>
                  <div className="text-base font-semibold text-emerald-400 font-mono">
                    {currentVertical.metricPreview}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-5 py-2.5 rounded-md bg-[#b85438] hover:bg-[#a24830] text-white text-xs font-mono font-semibold transition shadow-lg shadow-[#b85438]/20 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{content.tryStartButton}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Floor Dashboard Mock */}
            <div className="lg:col-span-6 rounded-lg bg-[#111318] border border-stone-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800/80 text-xs font-mono text-stone-400">
                  <span>ATRIUM FLOOR DESK // {currentVertical.name.toUpperCase()}</span>
                  <span className="text-[#e06b48] flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e06b48]" />
                    SAMPLE INTERFACE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
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
                  <div className="text-[10px] text-stone-500 uppercase">Simulated Activity Stream</div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>Sample Register Action</span>
                    <span className="text-emerald-400">Processed</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>Sample Client Notification</span>
                    <span className="text-[#e06b48]">Dispatched</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>Sample Shift Handoff Log</span>
                    <span className="text-stone-400">Reconciled</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800 text-[10px] font-mono text-stone-500 flex justify-between">
                <span>Illustrative sample data</span>
                <span>Mode: Offline-First Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6 — WHAT MAKES IT DIFFERENT (Differentiation) */}
      {/* 3 differentiation pillars with concrete details */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-differentiation"
        ref={sectionDiffRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-[#0a0a0a] shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <SectionHeader
            icon={ShieldCheck}
            tag={content.differentiation.tag}
            primary={content.differentiation.headlinePrimary}
            accent={content.differentiation.headlineAccent}
            subline={content.differentiation.subline}
            align="left"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.differentiation.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="pillar-card p-6 sm:p-7 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 hover:border-stone-700 transition flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="text-xs font-mono text-[#b85438] font-bold mb-3">
                    PILLAR {pillar.number}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-100 mb-2.5 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-5 font-sans">
                    {pillar.explanation}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-stone-800 text-[11px] font-mono text-stone-400 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{pillar.proofDetail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7 — DASHBOARD / KPI SHOWCASE */}
      {/* Job: Sell the "feels like a real company" fantasy */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-dashboard"
        ref={sectionDashboardRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <SectionHeader
            icon={Activity}
            tag={content.dashboard.tag}
            primary={content.dashboard.headlinePrimary}
            accent={content.dashboard.headlineAccent}
            subline={content.dashboard.subline}
            align="left"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          {/* Large Interactive KPI Executive Dashboard Mockup */}
          <div className="rounded-2xl bg-black/90 backdrop-blur-md border border-stone-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-800/80 gap-4">
              <div>
                <div className="text-base font-semibold text-stone-100 font-mono flex items-center gap-2">
                  <span>EXECUTIVE SUMMARY // CONSOLIDATED NETWORK</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-[#f28e72] font-semibold border border-stone-800">
                    SAMPLE DATA
                  </span>
                </div>
                <div className="text-xs text-stone-400 font-sans">
                  {content.dashboard.caption}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('all')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'all' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  All Vitals
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('sales')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'sales' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Cash &amp; Sales
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('staff')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'staff' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Staff Comms
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <SpotlightCard className="dashboard-card p-5">
                <div className="text-xs font-mono text-stone-500 mb-1">TODAY&apos;S NET REVENUE (SAMPLE)</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  <AnimatedCounter end={240700} duration={1600} /> <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-2">
                  ↑ +18.4% vs yesterday
                </div>
              </SpotlightCard>

              <SpotlightCard className="dashboard-card p-5">
                <div className="text-xs font-mono text-stone-500 mb-1">CASH IN TILL (SAMPLE)</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  <AnimatedCounter end={86400} duration={1400} /> <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono mt-2">
                  Zero discrepancy across 3 registers
                </div>
              </SpotlightCard>

              <SpotlightCard className="dashboard-card p-5">
                <div className="text-xs font-mono text-stone-500 mb-1">ACTIVE CUSTOMERS ON FLOOR (SAMPLE)</div>
                <div className="text-2xl font-bold font-mono text-[#f28e72]">
                  <AnimatedCounter end={54} duration={1200} /> <span className="text-xs font-normal text-stone-400">people</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono mt-2">
                  Peak window: 17:00 – 20:30
                </div>
              </SpotlightCard>

              <SpotlightCard className="dashboard-card p-5">
                <div className="text-xs font-mono text-stone-500 mb-1">AUTOMATED PAYROLL OWED (SAMPLE)</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  <AnimatedCounter end={34200} duration={1500} /> <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-[#e06b48] font-mono mt-2">
                  Tallied in real-time from services
                </div>
              </SpotlightCard>
            </div>

            {/* Consolidated Location Breakdown Table */}
            <div className="rounded-lg bg-stone-950/60 border border-stone-800/80 p-4 font-mono text-xs overflow-x-auto">
              <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-3">
                Live Branch Telemetry (Sample Data)
              </div>
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-500 text-[10px]">
                    <th className="pb-2">BRANCH LOCATION</th>
                    <th className="pb-2">FLOOR STATUS</th>
                    <th className="pb-2">NETWORK SYNC</th>
                    <th className="pb-2 text-right">DAILY GROSS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900 text-stone-300">
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 01 — Algiers Center</td>
                    <td className="py-2.5 text-emerald-400">● 28 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Synchronized (1s ago)</td>
                    <td className="py-2.5 text-right font-mono font-bold">142,500 DZD</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 02 — Oran Waterfront</td>
                    <td className="py-2.5 text-emerald-400">● 19 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Synchronized (3s ago)</td>
                    <td className="py-2.5 text-right font-mono font-bold">76,200 DZD</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 03 — Blida Express</td>
                    <td className="py-2.5 text-amber-400">● 7 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Offline SQLite Buffer (Ready)</td>
                    <td className="py-2.5 text-right font-mono font-bold">22,000 DZD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8 — PRICING */}
      {/* Job: Remove ambiguity, reduce decision friction */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-pricing"
        ref={sectionPricingRef}
        className="relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={CreditCard}
            tag={content.pricing.tag}
            primary={content.pricing.headlinePrimary}
            accent={content.pricing.headlineAccent}
            subline={content.pricing.subline}
            align="center"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {content.pricing.tiers.map((tier, idx) => (
              <SpotlightCard
                key={idx}
                className={`pricing-card p-8 rounded-2xl flex flex-col justify-between transition ${
                  tier.highlighted
                    ? 'border-[#e06b48] shadow-2xl relative'
                    : 'border-stone-800 shadow-xl'
                }`}
                spotlightColor={tier.highlighted ? 'rgba(224, 107, 72, 0.25)' : 'rgba(224, 107, 72, 0.12)'}
                borderColor={tier.highlighted ? 'rgba(224, 107, 72, 0.7)' : 'rgba(224, 107, 72, 0.35)'}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#b85438] text-white text-[10px] font-mono uppercase tracking-widest font-bold z-30">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold font-mono text-stone-100">{tier.price}</span>
                    <span className="text-xs font-mono text-stone-500">/ {tier.period}</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed mb-6 font-sans min-h-[36px]">
                    {tier.desc}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-stone-800/80 mb-8">
                    {tier.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemo}
                  className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-semibold tracking-wider transition cursor-pointer ${
                    tier.highlighted
                      ? 'bg-[#b85438] hover:bg-[#a24830] text-white shadow-lg shadow-[#b85438]/25'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </SpotlightCard>
            ))}
          </div>

          {/* Risk Reversal Assurance Banner */}
          <div className="p-6 rounded-lg bg-stone-950/90 border border-stone-800/80 text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>ZERO RISK GUARANTEE</span>
            </div>
            <p className="text-sm text-stone-200 font-medium font-sans">
              {content.pricing.riskReversal}
            </p>
            <p className="text-xs text-stone-500 font-mono">
              {content.pricing.billingNote}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9 — CREDIBILITY (Proven Foundation) */}
      {/* Real founder-voice credibility without fabricated quotes */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-proof"
        ref={sectionProofRef}
        className="relative z-20 w-full py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-[#09090b] shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          <SectionHeader
            icon={Building}
            tag={content.credibility.tag}
            primary={content.credibility.headlinePrimary}
            accent={content.credibility.headlineAccent}
            align="center"
            className="mb-8"
            ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
          />

          <div className="credibility-card p-8 sm:p-12 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-stone-200 text-left font-sans text-sm sm:text-base leading-relaxed shadow-2xl max-w-3xl mx-auto mb-8 space-y-4">
            <p className="text-stone-200 font-normal">
              {content.credibility.leadSentence}
            </p>
            <p className="text-stone-300 font-normal">
              {content.credibility.researchSentence}
            </p>
            <p className="text-stone-100 font-medium pt-2 border-t border-stone-800/80">
              {content.credibility.conclusionSentence}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
            <span>{content.credibility.locationBadge}</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10 — FAQ (QUESTIONS & ANSWERS) */}
      {/* Job: Remove last hesitation before trial/signup */}
      {/* ------------------------------------------------------------- */}
      <FaqSection
        ref={sectionFaqRef}
        content={content.faq}
        lang={lang}
        phone={content.footer.phone}
        onOpenDemo={onOpenDemo}
      />

      {/* ------------------------------------------------------------- */}
      {/* SECTION 11 — FINAL CTA */}
      {/* Job: One last, low-friction push — distraction-free */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-final-cta"
        ref={sectionFinalCtaRef}
        className="relative z-20 w-full min-h-[80vh] py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-800/80 bg-black shadow-[0_-30px_70px_rgba(0,0,0,0.95)] flex items-center justify-center text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 w-full">
          <SectionHeader
            icon={Calendar}
            tag={content.finalCta.tag}
            primary={content.finalCta.headlinePrimary}
            accent={content.finalCta.headlineAccent}
            subline={content.finalCta.subline}
            align="center"
            className="mb-4"
            ctaButton={{ text: content.finalCta.ctaButton, onClick: onOpenDemo }}
          />

          <div className="text-[11px] font-mono text-stone-500 pt-1">
            Instant scheduling • Response within 2 business hours • WhatsApp direct
          </div>
        </div>
      </section>

      {/* SECTION 11 — FOOTER */}
      {/* Standard: contact info, social links, legal, language toggle */}
      {/* ------------------------------------------------------------- */}
      <footer className="relative z-[110] border-t border-stone-800/80 py-16 px-6 sm:px-12 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] text-xs font-mono text-stone-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
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
              <div>Email: {content.footer.contactEmail}</div>
              <div>Phone: {content.footer.phone}</div>
              <div>Location: Algiers, Algeria</div>
              <div>Response: Direct WhatsApp line</div>
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
          <div className="flex items-center gap-4">
            <span>Built by From Scratch</span>
            <span>•</span>
            <span>Desktop &amp; Cloud Hybrid</span>
            <span>•</span>
            <span>Offline-First Engine</span>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* CLOSING BRAND STATEMENT — FULL-WIDTH ARABIC WORDMARK (THE VERY END OF THE SITE) */}
      {/* ------------------------------------------------------------- */}
      <ClosingWordmark lang={lang} />
    </div>
  );
}
