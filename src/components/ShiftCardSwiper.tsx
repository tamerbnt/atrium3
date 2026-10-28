import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Sparkles, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ShiftPoint {
  title: string;
  desc: string;
}

interface ShiftCardSwiperProps {
  points: ShiftPoint[];
  autoPlayInterval?: number;
  theme?: 'dark' | 'light' | 'terracotta';
}

// Concrete before vs. after architectural comparisons for the taller card format
const SHIFT_COMPARISONS: Record<
  number,
  {
    legacyChaos: string;
    atriumClarity: string;
    telemetryStat: { label: string; value: string };
  }
> = {
  0: {
    legacyChaos: 'Disjointed apps for register, bookings, and inventory that never sync.',
    atriumClarity: 'One unified operational core where check-ins, bookings, and stock resolve instantly.',
    telemetryStat: { label: 'Sync Latency', value: '< 20ms' },
  },
  1: {
    legacyChaos: 'Blinded until end-of-day bank deposits or manual spreadsheet reconciliation.',
    atriumClarity: 'Live consolidated net revenue, active floor headcount, and till totals on your phone.',
    telemetryStat: { label: 'Real-Time Oversight', value: '100% Live' },
  },
  2: {
    legacyChaos: 'Frontline registers lock up and customers wait during internet outages.',
    atriumClarity: 'Embedded SQLite databases keep every till at full speed offline with zero interruption.',
    telemetryStat: { label: 'Fiber Cut Tolerance', value: 'Unlimited' },
  },
  3: {
    legacyChaos: 'Clunky POS interfaces that require days of employee training and cause register lines.',
    atriumClarity: 'Clean, tactile workflows that staff master in under 15 minutes of onboarding.',
    telemetryStat: { label: 'Staff Onboarding', value: '15 Mins' },
  },
};

export function ShiftCardSwiper({
  points = [],
  autoPlayInterval = 4400,
  theme = 'light',
}: ShiftCardSwiperProps) {
  const count = points.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  // Touch gesture state
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlayEnabled || isHovered || count <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlayEnabled, isHovered, count, autoPlayInterval]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);
  };

  // Touch handlers
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

  const isLight = theme === 'light';

  if (count === 0) {
    return (
      <div
        className={`w-full py-12 px-6 text-center font-mono text-sm border rounded-2xl my-6 flex flex-col items-center justify-center gap-2 ${
          isLight
            ? 'bg-white border-stone-200 text-stone-500'
            : 'bg-stone-950/40 border-stone-800/60 text-stone-500'
        }`}
      >
        <Sparkles className="w-5 h-5 text-[#b85438]/80 mb-1" />
        <span>[ No operational resolutions currently logged ]</span>
      </div>
    );
  }

  const currentPoint = points[activeIndex] || points[0];
  const comparison = SHIFT_COMPARISONS[activeIndex] || SHIFT_COMPARISONS[0];

  return (
    <div
      className="shift-card-showcase w-full max-w-xl mx-auto relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Architectural shift showcase"
    >
      {/* ------------------------------------------------------------- */}
      {/* TALL SINGLE ACTIVE SHIFT SHOWCASE CARD */}
      {/* Strict boundary clipping: stays 100% inside container */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden rounded-3xl min-h-[490px] sm:min-h-[520px]">
        <SpotlightCard
          spotlightColor={isLight ? 'rgba(184, 84, 56, 0.12)' : 'rgba(224, 107, 72, 0.22)'}
          borderColor={isLight ? 'rgba(184, 84, 56, 0.4)' : 'rgba(224, 107, 72, 0.5)'}
          className={`group w-full h-full p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 ${
            isLight
              ? 'bg-white border border-stone-200 text-stone-900'
              : 'bg-stone-950/95 backdrop-blur-md border border-stone-800 text-white'
          }`}
        >
          {/* Card Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/80 text-[11px] font-mono">
              <span className="text-[#b85438] font-bold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b85438]" />
                <span>[ 0{activeIndex + 1} // ARCHITECTURAL ADVANTAGE ]</span>
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
                SYSTEM EVOLUTION
              </span>
            </div>

            {/* Title & Description */}
            <h3
              className={`text-2xl sm:text-3xl font-editorial font-bold mb-2.5 tracking-tight ${
                isLight ? 'text-stone-950' : 'text-stone-100'
              }`}
            >
              {currentPoint.title}
            </h3>
            <p
              className={`text-xs sm:text-sm font-sans leading-relaxed mb-6 ${
                isLight ? 'text-stone-600' : 'text-stone-400'
              }`}
            >
              {currentPoint.desc}
            </p>

            {/* Before vs. After Architectural Comparison (Taller Card Content) */}
            <div className="space-y-3 mb-6">
              {/* Legacy Friction */}
              <div
                className={`p-3.5 rounded-xl border text-xs font-sans ${
                  isLight
                    ? 'bg-stone-50/80 border-stone-200 text-stone-700'
                    : 'bg-red-950/20 border-red-900/30 text-stone-300'
                }`}
              >
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Legacy Disconnected Setup</span>
                </div>
                <p className="text-xs leading-relaxed">
                  {comparison.legacyChaos}
                </p>
              </div>

              {/* Atrium Serenity */}
              <div
                className={`p-3.5 rounded-xl border text-xs font-sans ${
                  isLight
                    ? 'bg-[#b85438]/05 border-[#b85438]/25 text-stone-900'
                    : 'bg-emerald-950/20 border-emerald-900/30 text-stone-200'
                }`}
              >
                <div className="text-[10px] font-mono text-[#b85438] uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b85438]" />
                  <span>The Atrium Architecture</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  {comparison.atriumClarity}
                </p>
              </div>
            </div>
          </div>

          {/* Card Bottom: Live Metric Chip & Autonomy Note */}
          <div
            className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isLight ? 'border-stone-200 text-stone-600' : 'border-stone-800 text-stone-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-stone-500">{comparison.telemetryStat.label}:</span>
              <span
                className={`px-2 py-0.5 rounded font-bold text-xs ${
                  isLight
                    ? 'bg-stone-100 border border-stone-200 text-[#b85438]'
                    : 'bg-stone-900 border border-stone-800 text-emerald-400'
                }`}
              >
                {comparison.telemetryStat.value}
              </span>
            </div>
            <span className="text-[11px] flex items-center gap-1 text-[#b85438] font-semibold">
              <span>Synchronized</span>
              <ArrowRight className="w-3 h-3" />
            </span>
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
            aria-label="Previous architectural resolution"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer shadow-md active:scale-95 ${
              isLight
                ? 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950'
                : 'border-stone-800 bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Segmented Progress Pills */}
          <div
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border shadow-inner ${
              isLight
                ? 'bg-stone-100 border-stone-200'
                : 'bg-stone-950 border-stone-800'
            }`}
            role="tablist"
            aria-label="Shift cards pagination"
          >
            {points.map((p, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to shift resolution ${idx + 1}: ${p.title}`}
                onClick={() => goToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 sm:w-9 bg-[#b85438] shadow-[0_0_8px_rgba(184,84,56,0.6)]'
                    : isLight
                    ? 'w-2 bg-stone-300 hover:bg-stone-400'
                    : 'w-2 bg-stone-800 hover:bg-stone-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next architectural resolution"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer shadow-md active:scale-95 ${
              isLight
                ? 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950'
                : 'border-stone-800 bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Status Counter & Autoplay Controls */}
        <div
          className={`flex items-center justify-center gap-2 text-xs font-mono ${
            isLight ? 'text-stone-600' : 'text-stone-400'
          }`}
        >
          <span className="text-[#b85438] font-semibold text-[11px]">
            [ 0{activeIndex + 1} / 0{count} ]
          </span>
          <span className={`truncate max-w-[200px] ${isLight ? 'text-stone-900 font-medium' : 'text-stone-200'}`}>
            {currentPoint.title}
          </span>
          <button
            type="button"
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            title={isAutoPlayEnabled ? 'Pause auto-cycle' : 'Resume auto-cycle'}
            className="text-stone-400 hover:text-stone-700 transition p-1 cursor-pointer flex items-center ml-1"
          >
            {isAutoPlayEnabled && !isHovered ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AUTO</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                <Pause className="w-2.5 h-2.5" />
                <span>PAUSED</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
