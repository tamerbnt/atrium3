import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play, Layers, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CategoryProofItem } from '../content/copy';
import { SpotlightCard } from './SpotlightCard';

interface CategoryCardSwiperProps {
  categories: CategoryProofItem[];
  onSelectCategory: (categoryId: string) => void;
  autoPlayInterval?: number;
  theme?: 'dark' | 'terracotta' | 'light';
}

// Domain-specific workflow stages and telemetry enrichments for the taller showcase card
const DOMAIN_ENRICHMENTS: Record<
  string,
  {
    stages: Array<{ name: string; detail: string }>;
    telemetry: Array<{ label: string; value: string }>;
  }
> = {
  gym: {
    stages: [
      { name: 'NFC Turnstile Edge Check-In', detail: 'Local reader authorization in < 25ms, zero cloud delay.' },
      { name: 'Automated Trainer Quotas', detail: 'Class attendance tallies commission tiers in real-time.' },
      { name: 'Local SQLite Buffer', detail: 'Pass renewals saved offline if broadband cuts during peak.' },
    ],
    telemetry: [
      { label: 'Edge Check-in Speed', value: '18ms' },
      { label: 'Offline Resiliency', value: '100% Guaranteed' },
    ],
  },
  salon: {
    stages: [
      { name: 'Chair & Stylist Scheduling', detail: 'Dynamic booking grid prevents double-booked suites.' },
      { name: 'Instant Tip & Service Split', detail: 'Automated commission calculation per completed treatment.' },
      { name: 'Client Preference Recall', detail: 'Color formula notes and treatment logs available instantly.' },
    ],
    telemetry: [
      { label: 'Handoff Reconciliation', value: '45 sec' },
      { label: 'Commission Accuracy', value: '100.0%' },
    ],
  },
  restaurant: {
    stages: [
      { name: 'Edge Kitchen Display (KDS)', detail: 'Direct LAN station routing without external internet reliance.' },
      { name: 'Fast Table Splitting & Tills', detail: 'Multiple payment methods split across seated covers seamlessly.' },
      { name: 'Recipe Inventory Depletion', detail: 'Ingredients subtracted dynamically with low-stock warnings.' },
    ],
    telemetry: [
      { label: 'Order-to-KDS Delay', value: '< 15ms' },
      { label: 'Table Turnover Gain', value: '+22%' },
    ],
  },
  retail: {
    stages: [
      { name: 'Multi-Barcode Fast Scanning', detail: 'Immediate basket assembly with volume pricing tier rules.' },
      { name: 'Multi-Location Live Stock', detail: 'Inter-branch stock balances synced asynchronously.' },
      { name: 'Offline Receipt Printing', detail: 'Thermal printers fire instantly over USB or localized Wi-Fi.' },
    ],
    telemetry: [
      { label: 'Scan-to-Receipt Time', value: '1.2s' },
      { label: 'Network Fallback Buffer', value: 'Ready' },
    ],
  },
  repair: {
    stages: [
      { name: 'Diagnostic Work Orders', detail: 'Intake photo capture and condition signoff on counter tablets.' },
      { name: 'Parts Allocation & Labor', detail: 'Stock reserved dynamically against technician work shifts.' },
      { name: 'SMS & WhatsApp Updates', detail: 'Automated client dispatch when service testing completes.' },
    ],
    telemetry: [
      { label: 'Intake Flow Time', value: '90s' },
      { label: 'Parts Traceability', value: 'Complete' },
    ],
  },
  education: {
    stages: [
      { name: 'Cohort & Course Enrollment', detail: 'Automated tuition installment tracking and payment schedules.' },
      { name: 'Biometric Attendance Logs', detail: 'Synchronized student logs with guardian absence notifications.' },
      { name: 'Teacher Gradebook Sync', detail: 'End-of-term transcript generation and certificate printing.' },
    ],
    telemetry: [
      { label: 'Installment Tracking', value: 'Zero Overlook' },
      { label: 'Sync Status', value: 'Edge-Backed' },
    ],
  },
};

const DEFAULT_ENRICHMENT = {
  stages: [
    { name: 'Localized Terminal Flow', detail: 'Dedicated frontline point-of-sale workflow tailored to trade.' },
    { name: 'Instant Register Balancing', detail: 'Automated end-of-shift cash drawer reconciliations.' },
    { name: 'Offline-First Edge Sync', detail: 'Full frontline autonomy when cloud connections degrade.' },
  ],
  telemetry: [
    { label: 'System Uptime', value: '99.99%' },
    { label: 'Edge Latency', value: '< 40ms' },
  ],
};

export function CategoryCardSwiper({
  categories = [],
  onSelectCategory,
  autoPlayInterval = 4200,
  theme = 'dark',
}: CategoryCardSwiperProps) {
  const count = categories.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  // Touch gesture state
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlayEnabled || isHovered || count <= 1) return;

    const timer = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlayEnabled, isHovered, count, autoPlayInterval]);

  const handleNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goToIndex = (idx: number) => {
    setDirection(idx > activeIndex ? 'next' : 'prev');
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
  const enrichment = DOMAIN_ENRICHMENTS[currentCat.id] || DEFAULT_ENRICHMENT;

  return (
    <div
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
          className="group w-full h-full p-6 sm:p-8 bg-stone-950/95 backdrop-blur-md border border-stone-800/90 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-300"
        >
          {/* Card Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800/80 text-[11px] font-mono">
              <span className="text-[#e06b48] font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e06b48] animate-pulse" />
                <span>[ 0{activeIndex + 1} // DOMAIN WORKFLOW ]</span>
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory(currentCat.id)}
                className="text-stone-400 hover:text-[#f28e72] transition flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              >
                <span>View Full Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                Operational Frontline Workflow
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

            <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-stone-400">
              <span className="flex items-center gap-1.5 text-[#f28e72]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentCat.operationalFocus}</span>
              </span>
              <span className="text-stone-500 text-[10px]">Ready to Deploy</span>
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
            <ChevronLeft className="w-4 h-4" />
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
            <ChevronRight className="w-4 h-4" />
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
                <span>AUTO</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
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
