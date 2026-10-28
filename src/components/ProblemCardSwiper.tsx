import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, AlertCircle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ProblemPoint {
  title: string;
  desc: string;
}

interface ProblemCardSwiperProps {
  points: ProblemPoint[];
  autoPlayInterval?: number;
}

// Deep operational diagnosis and Atrium resolutions for the taller card format
const PROBLEM_DIAGNOSTICS: Record<
  number,
  {
    symptom: string;
    hiddenCost: string;
    atriumResolution: string;
    metricPill: { label: string; value: string };
  }
> = {
  0: {
    symptom: 'Client notes, reservations, and receipts scattered across separate WhatsApp threads.',
    hiddenCost: 'Double-booked suites, forgotten VIP preferences, and untracked service add-ons.',
    atriumResolution: 'Every appointment, treatment note, and receipt linked to a unified customer edge profile.',
    metricPill: { label: 'Disorganized Notes', value: '0% Allowed' },
  },
  1: {
    symptom: 'Waiting for midnight phone calls or physically counting tills to know if the day broke even.',
    hiddenCost: 'Unnoticed inventory shrinkage and delayed vendor payments that strain cashflow.',
    atriumResolution: 'Reconciled multi-branch register totals updated in real-time on your private mobile dashboard.',
    metricPill: { label: 'Revenue Visibility', value: 'Live Telemetry' },
  },
  2: {
    symptom: 'Manually tallying technician commissions, service cuts, and cash drawer discrepancies on paper.',
    hiddenCost: 'End-of-month employee frustration, mistrust, and hours wasted arguing over payouts.',
    atriumResolution: 'Every sale automatically applies staff commission rules and logs till handoffs under 90 seconds.',
    metricPill: { label: 'Commission Disputes', value: 'Eliminated' },
  },
  3: {
    symptom: 'Opening a second branch feels impossible because store managers need constant oversight.',
    hiddenCost: 'Founders trapped on the floor as operators rather than scaling into true owners.',
    atriumResolution: 'Standardized frontline operating procedures that enforce quality and cash control autonomously.',
    metricPill: { label: 'Branch Autonomy', value: 'Multi-Location' },
  },
};

export function ProblemCardSwiper({
  points = [],
  autoPlayInterval = 4400,
}: ProblemCardSwiperProps) {
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

  if (count === 0) {
    return (
      <div className="w-full py-12 px-6 text-center text-stone-500 font-mono text-sm border border-stone-800/60 rounded-2xl bg-stone-950/40 my-6 flex flex-col items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#b85438]/80 mb-1" />
        <span>[ No operational bottlenecks currently logged ]</span>
      </div>
    );
  }

  const currentPoint = points[activeIndex] || points[0];
  const diagnosis = PROBLEM_DIAGNOSTICS[activeIndex] || PROBLEM_DIAGNOSTICS[0];

  return (
    <div
      className="problem-card-showcase w-full max-w-xl mx-auto relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Operational bottlenecks showcase"
    >
      {/* ------------------------------------------------------------- */}
      {/* TALL SINGLE ACTIVE BOTTLENECK SHOWCASE CARD */}
      {/* Strict boundary clipping: stays 100% inside container */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden rounded-3xl min-h-[490px] sm:min-h-[520px]">
        <SpotlightCard
          spotlightColor="rgba(239, 68, 68, 0.22)"
          borderColor="rgba(255, 255, 255, 0.15)"
          className="group w-full h-full p-6 sm:p-8 bg-stone-950/95 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300"
        >
          {/* Card Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800/80 text-[11px] font-mono">
              <span className="text-amber-300 font-bold tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>[ 0{activeIndex + 1} // OPERATIONAL BOTTLENECK ]</span>
              </span>
              <span className="text-stone-400 text-[10px] font-mono uppercase tracking-wider">
                Field Diagnosis
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-100 mb-2.5 tracking-tight">
              {currentPoint.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed mb-6">
              {currentPoint.desc}
            </p>

            {/* Diagnostic Breakdown (Taller Card Content) */}
            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/40 text-xs font-sans">
                <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>The Hidden Operational Cost</span>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  {diagnosis.hiddenCost}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs font-sans">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>The Atrium Safeguard</span>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  {diagnosis.atriumResolution}
                </p>
              </div>
            </div>
          </div>

          {/* Card Bottom: Telemetry Chip & Resolution Guarantee */}
          <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-stone-500 uppercase">{diagnosis.metricPill.label}:</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-emerald-400 font-bold text-xs">
                {diagnosis.metricPill.value}
              </span>
            </div>
            <span className="text-stone-400 text-[11px] flex items-center gap-1">
              <span>Resolved at Edge</span>
              <ArrowRight className="w-3 h-3 text-[#e06b48]" />
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
            aria-label="Previous operational bottleneck"
            className="w-9 h-9 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Segmented Progress Pills */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 border border-white/10 shadow-inner"
            role="tablist"
            aria-label="Bottleneck cards pagination"
          >
            {points.map((p, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to bottleneck ${idx + 1}: ${p.title}`}
                onClick={() => goToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 sm:w-9 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next operational bottleneck"
            className="w-9 h-9 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Status Counter & Autoplay Controls */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-200">
          <span className="text-amber-300 font-semibold text-[11px]">
            [ 0{activeIndex + 1} / 0{count} ]
          </span>
          <span className="text-stone-100 truncate max-w-[200px]">
            {currentPoint.title}
          </span>
          <button
            type="button"
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            title={isAutoPlayEnabled ? 'Pause auto-cycle' : 'Resume auto-cycle'}
            className="text-stone-300 hover:text-white transition p-1 cursor-pointer flex items-center ml-1"
          >
            {isAutoPlayEnabled && !isHovered ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>AUTO</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-stone-300 font-mono">
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
