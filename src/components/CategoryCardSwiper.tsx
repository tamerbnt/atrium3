import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Layers, CheckCircle2 } from 'lucide-react';
import { CategoryProofItem, Language } from '../content/copy';
import { UI_COPY } from '../content/uiCopy';
import { SpotlightCard } from './SpotlightCard';

interface CategoryCardSwiperProps {
  categories: CategoryProofItem[];
  onSelectCategory: (categoryId: string) => void;
  autoPlayInterval?: number;
  theme?: 'dark' | 'terracotta' | 'light';
  lang?: Language;
}

const DEFAULT_ENRICHMENT = UI_COPY.en.proofStrip.enrichments.memberships;

export function CategoryCardSwiper({
  categories = [],
  onSelectCategory,
  autoPlayInterval = 4200,
  theme = 'dark',
  lang = 'en',
}: CategoryCardSwiperProps) {
  const count = categories.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch gesture state
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Pause autoplay when off-screen to avoid background DOM churn
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-play timer (active only while visible)
  useEffect(() => {
    if (!isInView || !isAutoPlayEnabled || isHovered || count <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isInView, isAutoPlayEnabled, isHovered, count, autoPlayInterval]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const threshold = 45;
    if (touchDeltaXRef.current > threshold) {
      handlePrev();
    } else if (touchDeltaXRef.current < -threshold) {
      handleNext();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  if (count === 0) {
    return (
      <div className="w-full py-12 px-6 text-center text-stone-500 font-mono text-sm border border-stone-800/60 rounded-2xl bg-stone-950/40 my-6 flex flex-col items-center justify-center gap-2">
        <Layers className="w-5 h-5 text-stone-600 mb-1" />
        <span>[ No domain workflows currently registered ]</span>
      </div>
    );
  }

  const currentCat = categories[activeIndex] || categories[0];
  const ui = UI_COPY[lang].proofStrip;
  const enrichment = ui.enrichments[currentCat.id] || DEFAULT_ENRICHMENT;

  return (
    <div
      ref={containerRef}
      className="category-card-showcase w-full max-w-xl mx-auto relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Category domain workflow showcase"
    >
      {/* ------------------------------------------------------------- */}
      {/* TALL SINGLE ACTIVE SHOWCASE CARD */}
      {/* Strict boundary clipping: stays 100% inside container */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden rounded-3xl min-h-[490px] sm:min-h-[520px]">
        <SpotlightCard
          spotlightColor="rgba(224, 107, 72, 0.28)"
          borderColor="rgba(224, 107, 72, 0.5)"
          className="group w-full h-full p-6 sm:p-8 bg-stone-950/95 border border-stone-800/90 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-300 text-left rtl:text-right"
        >
          {/* Card Top Header */}
          <div key={`cat-body-${activeIndex}`} className="animate-slide-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800/80 text-[11px] font-mono">
              <span className="text-[#e06b48] font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e06b48] animate-pulse" />
                <span>[ 0{activeIndex + 1} // {ui.domainWorkflowTag} ]</span>
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory(currentCat.id)}
                className="text-stone-400 hover:text-[#f28e72] transition flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              >
                <span>{ui.viewSpec}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>

            {/* Title & Industry Examples */}
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-100 mb-2 tracking-tight">
              {currentCat.label}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed mb-6">
              {currentCat.examples}
            </p>

            {/* Field Workflow Stages (Taller Card Content) */}
            <div className="space-y-3 mb-6">
              <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                {ui.workflowHeading}
              </div>
              <div className="space-y-2.5">
                {enrichment.stages.map((stage, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-3 transition-colors hover:border-stone-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#b85438]/20 border border-[#b85438]/40 text-[#f28e72] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      0{sIdx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-stone-200 font-sans">
                        {stage.name}
                      </div>
                      <div className="text-[11px] text-stone-400 font-sans leading-relaxed">
                        {stage.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Bottom: Live Operational Telemetry & Focus Badge */}
          <div className="pt-4 border-t border-stone-800/80 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              {enrichment.telemetry.map((tel, tIdx) => (
                <div key={tIdx} className="p-2.5 rounded-lg bg-stone-900/40 border border-stone-800/60">
                  <div className="text-[10px] font-mono text-stone-500 truncate mb-0.5">
                    {tel.label}
                  </div>
                  <div className="text-sm font-mono font-bold text-stone-200">
                    {tel.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-stone-400 gap-2">
              <span className="flex items-center gap-1.5 text-[#f28e72] min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{currentCat.operationalFocus}</span>
              </span>
              <span className="text-stone-500 text-[10px] shrink-0">{ui.readyToDeploy}</span>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTERED NAVIGATION CONTROLS STRICTLY UNDERNEATH CARD */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-5 flex flex-col items-center justify-center gap-3">
        {/* Navigation Bar: Prev, Indicators, Next */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous domain workflow"
            className="w-9 h-9 rounded-full border border-stone-800 bg-stone-950 hover:bg-stone-900 hover:border-[#b85438] text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>

          {/* Segmented Progress Pills */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-950 border border-stone-800 shadow-inner"
            role="tablist"
            aria-label="Domain cards pagination"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to domain ${idx + 1}: ${cat.label}`}
                onClick={() => goToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 sm:w-9 bg-[#e06b48] shadow-[0_0_10px_rgba(224,107,72,0.8)]'
                    : 'w-2 bg-stone-800 hover:bg-stone-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next domain workflow"
            className="w-9 h-9 rounded-full border border-stone-800 bg-stone-950 hover:bg-stone-900 hover:border-[#b85438] text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        {/* Status Counter & Autoplay Controls */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-400">
          <span className="text-[#f28e72] font-semibold text-[11px]">
            [ 0{activeIndex + 1} / 0{count} ]
          </span>
          <span className="text-stone-300 truncate max-w-[200px]">
            {currentCat.label}
          </span>
          <button
            type="button"
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            title={isAutoPlayEnabled ? 'Pause auto-cycle' : 'Resume auto-cycle'}
            className="text-stone-500 hover:text-stone-300 transition p-1 cursor-pointer flex items-center ml-1"
          >
            {isAutoPlayEnabled && !isHovered ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400/90 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{ui.autoLabel}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
                <Pause className="w-2.5 h-2.5" />
                <span>{ui.pausedLabel}</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
