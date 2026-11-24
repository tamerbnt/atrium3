import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Calendar, Menu, X } from 'lucide-react';
import { LandingContent, Language } from '../content/copy';
import { useLenis } from './SmoothScroll';
import { AtriumBrandLogo } from './AtriumBrandLogo';
import {
  evaluateHeroCurtainSnap,
  findActiveSectionId,
  SectionOffset,
} from '../utils/scrollLogic';

export const SECTION_IDS = [
  'section-hero',
  'section-proof-strip',
  'section-problem',
  'section-shift',
  'section-how-it-works',
  'section-verticals',
  'section-differentiation',
  'section-dashboard',
  'section-slider',
  'section-pricing',
  'section-proof',
  'section-faq',
  'section-final-cta',
];

export interface FloatingNavProps {
  lang: Language;
  navCopy: LandingContent['nav'];
  onLanguageChange: (lang: Language) => void;
  onOpenDemo: () => void;
  onScrollToSection: (id: string) => void;
  isSnappingRef: React.MutableRefObject<boolean>;
  isTransitioningRef: React.MutableRefObject<boolean>;
  unlockSnap: (lenisInstance?: any) => void;
  engageMomentumGuard: () => void;
  snapTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

/**
 * FloatingNav
 * Isolates all scroll-driven React state (isScrolled, isNavVisible, activeSectionId)
 * and scroll-spy / hero-curtain snap logic so scrolling across sections only
 * reconciles this tiny navbar instead of the entire 2,300-line landing page.
 */
export const FloatingNav = memo(function FloatingNav({
  lang,
  navCopy,
  onLanguageChange,
  onOpenDemo,
  onScrollToSection,
  isSnappingRef,
  isTransitioningRef,
  unlockSnap,
  engageMomentumGuard,
  snapTimerRef,
}: FloatingNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('section-hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const isScrolledRef = useRef(false);
  const isNavVisibleRef = useRef(true);
  const activeSectionIdRef = useRef('section-hero');
  const sectionOffsetsRef = useRef<SectionOffset[]>([]);
  const lastBodyHeightRef = useRef(0);
  const offsetRafRef = useRef<number | null>(null);

  const refreshSectionOffsets = useCallback(() => {
    const next: SectionOffset[] = [];
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const id = SECTION_IDS[i];
      const el = document.getElementById(id);
      if (el) {
        next.push({ id, top: el.offsetTop });
      }
    }
    sectionOffsetsRef.current = next;
  }, []);

  const scheduleOffsetRefresh = useCallback(() => {
    if (offsetRafRef.current !== null) return;
    offsetRafRef.current = requestAnimationFrame(() => {
      offsetRafRef.current = null;
      refreshSectionOffsets();
    });
  }, [refreshSectionOffsets]);

  useEffect(() => {
    refreshSectionOffsets();
    const onResize = () => scheduleOffsetRefresh();
    window.addEventListener('resize', onResize, { passive: true });
    ScrollTrigger.addEventListener('refresh', scheduleOffsetRefresh);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            const h = document.body?.scrollHeight || 0;
            if (h !== lastBodyHeightRef.current) {
              lastBodyHeightRef.current = h;
              scheduleOffsetRefresh();
            }
          })
        : null;

    if (resizeObserver && document.body) {
      lastBodyHeightRef.current = document.body.scrollHeight;
      resizeObserver.observe(document.body);
    }

    let fontsCancelled = false;
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (!fontsCancelled) {
          scheduleOffsetRefresh();
        }
      });
    }

    return () => {
      fontsCancelled = true;
      window.removeEventListener('resize', onResize);
      ScrollTrigger.removeEventListener('refresh', scheduleOffsetRefresh);
      resizeObserver?.disconnect();
      if (offsetRafRef.current !== null) {
        cancelAnimationFrame(offsetRafRef.current);
        offsetRafRef.current = null;
      }
    };
  }, [lang, refreshSectionOffsets, scheduleOffsetRefresh]);

  useLenis(
    useCallback(
      (lenisInstance: any) => {
        const scrollY =
          lenisInstance?.scroll ?? (window.scrollY || document.documentElement.scrollTop);

        const nextScrolled = scrollY > 60;
        if (nextScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextScrolled;
          setIsScrolled(nextScrolled);
        }

        const prevScrollY = lastScrollYRef.current;
        const delta = scrollY - prevScrollY;

        let nextNavVisible = isNavVisibleRef.current;
        if (scrollY <= 20) {
          nextNavVisible = true;
        } else if (delta > 6 && scrollY > 60) {
          nextNavVisible = false;
        } else if (delta < -6) {
          nextNavVisible = true;
        }
        if (nextNavVisible !== isNavVisibleRef.current) {
          isNavVisibleRef.current = nextNavVisible;
          setIsNavVisible(nextNavVisible);
        }
        lastScrollYRef.current = scrollY;

        if (sectionOffsetsRef.current.length > 0) {
          const nextActiveId = findActiveSectionId(
            scrollY + 160,
            sectionOffsetsRef.current,
            'section-hero'
          );
          if (nextActiveId !== activeSectionIdRef.current) {
            activeSectionIdRef.current = nextActiveId;
            setActiveSectionId(nextActiveId);
          }
        }

        if (lenisInstance) {
          const windowH = window.innerHeight;
          const snapAction = evaluateHeroCurtainSnap({
            scrollY,
            prevScrollY,
            delta,
            direction: lenisInstance.direction ?? 0,
            windowH,
            isSnapping: isSnappingRef.current,
            isTransitioning: isTransitioningRef.current,
          });

          if (snapAction === 'to-proof-strip') {
            isSnappingRef.current = true;
            engageMomentumGuard();
            lenisInstance.velocity = 0;
            if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
            lenisInstance.scrollTo('#section-proof-strip', {
              duration: 0.85,
              offset: 0,
              force: true,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                unlockSnap(lenisInstance);
              },
            });
            snapTimerRef.current = setTimeout(() => {
              unlockSnap(lenisInstance);
            }, 920);
          } else if (snapAction === 'to-hero') {
            isSnappingRef.current = true;
            engageMomentumGuard();
            lenisInstance.velocity = 0;
            if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
            lenisInstance.scrollTo(0, {
              duration: 0.85,
              offset: 0,
              force: true,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                unlockSnap(lenisInstance);
              },
            });
            snapTimerRef.current = setTimeout(() => {
              unlockSnap(lenisInstance);
            }, 920);
          }
        }
      },
      [engageMomentumGuard, isSnappingRef, isTransitioningRef, snapTimerRef, unlockSnap]
    )
  );

  return (
    <div
      className={`fixed top-3 sm:top-4 left-3 sm:left-6 right-3 sm:right-6 max-w-6xl mx-auto z-50 transition-all duration-300 ease-out will-change-transform ${
        isNavVisible || isMobileMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
    >
      <header
        id="atrium-nav"
        className={`w-full transition-all duration-300 ease-out flex items-center justify-between rounded-full border ${
          isScrolled
            ? 'py-2 px-3.5 sm:px-5 bg-black/92 border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'py-2.5 px-4 sm:px-6 bg-black/85 border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            onScrollToSection('section-hero');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center cursor-pointer group shrink-0 text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b85438] rounded-full"
          aria-label="Atrium Home"
        >
          <AtriumBrandLogo size={28} showText={true} />
        </button>

        {/* Desktop Anchor Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 text-xs font-medium"
        >
          <button
            type="button"
            onClick={() => onScrollToSection('section-proof-strip')}
            className={`transition cursor-pointer whitespace-nowrap ${
              activeSectionId === 'section-proof-strip'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.proof}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-problem')}
            className={`transition cursor-pointer whitespace-nowrap ${
              activeSectionId === 'section-problem'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.problem}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-shift')}
            className={`transition cursor-pointer whitespace-nowrap ${
              activeSectionId === 'section-shift'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.shift}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-how-it-works')}
            className={`transition cursor-pointer whitespace-nowrap hidden lg:block ${
              activeSectionId === 'section-how-it-works'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.howItWorks}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-verticals')}
            className={`transition cursor-pointer whitespace-nowrap ${
              activeSectionId === 'section-verticals'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.verticals}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-differentiation')}
            className={`transition cursor-pointer whitespace-nowrap hidden lg:block ${
              activeSectionId === 'section-differentiation'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.whyAtrium}
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('section-pricing')}
            className={`transition cursor-pointer whitespace-nowrap ${
              activeSectionId === 'section-pricing'
                ? 'text-[#e06b48] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {navCopy.pricing}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            role="group"
            aria-label="Language"
            className="hidden md:flex items-center gap-0.5 bg-white/[0.05] p-0.5 rounded-full border border-white/[0.1]"
          >
            {(['en', 'fr', 'ar'] as Language[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onLanguageChange(code)}
                aria-pressed={lang === code}
                className={`px-2 py-1 rounded-full text-[10px] font-mono font-semibold uppercase transition cursor-pointer ${
                  lang === code
                    ? 'bg-[#b85438] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white font-medium text-[11px] sm:text-xs tracking-wide transition shadow-md shadow-[#b85438]/20 cursor-pointer whitespace-nowrap shrink-0"
          >
            {navCopy.bookDemo}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-stone-950/98 backdrop-blur-md border border-white/[0.14] shadow-[0_12px_32px_rgba(0,0,0,0.85)] flex flex-col gap-1 text-sm font-medium">
          {[
            { id: 'section-proof-strip', label: navCopy.proof },
            { id: 'section-problem', label: navCopy.problem },
            { id: 'section-shift', label: navCopy.shift },
            { id: 'section-how-it-works', label: navCopy.howItWorks },
            { id: 'section-verticals', label: navCopy.verticals },
            { id: 'section-differentiation', label: navCopy.whyAtrium },
            { id: 'section-pricing', label: navCopy.pricing },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onScrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left rtl:text-right px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500 rtl:rotate-180" />
            </button>
          ))}

          <div className="mt-2 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-lg border border-white/[0.08]">
              {(['en', 'fr', 'ar'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLanguageChange(code)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold uppercase transition ${
                    lang === code ? 'bg-[#b85438] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
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
              <span>{navCopy.bookDemo}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default FloatingNav;
