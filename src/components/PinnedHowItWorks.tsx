import React, { useState } from 'react';
import { Sparkles, ArrowRight, Workflow, Calendar } from 'lucide-react';
import { LandingContent, Language } from '../content/copy';
import { UI_COPY } from '../content/uiCopy';
import { SectionHeader } from './SectionHeader';
import { WordMaskText } from './WordMaskText';

interface PinnedHowItWorksProps {
  content: LandingContent;
  lang: Language;
  onOpenDemo: () => void;
  theme?: 'terracotta' | 'dark' | 'light';
}

/**
 * PinnedHowItWorks
 * Sequential step walkthrough with synchronized mock dashboard states.
 * Users can click through the 4 steps or view the responsive breakdown.
 */
export function PinnedHowItWorks({ content, lang, onOpenDemo, theme = 'terracotta' }: PinnedHowItWorksProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = content.howItWorks.steps;
  const activeStep = steps[activeStepIndex];
  const ui = UI_COPY[lang].howItWorks;

  return (
    <div className="w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SectionHeader
        icon={Workflow}
        tag={content.howItWorks.tag}
        primary={content.howItWorks.headlinePrimary}
        accent={content.howItWorks.headlineAccent}
        subline={content.howItWorks.subline}
        className="how-header"
        maskedHorizon={true}
        theme={theme}
        ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
      />

      {/* Interactive Walkthrough Layout: Steps Navigation on Left, Live Telemetry Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Cards / Tabs (Left Column) */}
        <div role="tablist" aria-label={content.howItWorks.tag} className="lg:col-span-5 space-y-3.5 sm:space-y-4">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStepIndex(idx)}
                className={`how-step-card w-full p-5 sm:p-6 rounded-xl border min-h-[148px] sm:min-h-[164px] flex flex-col justify-between transition-[color,background-color,border-color,box-shadow] duration-200 cursor-pointer text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  theme === 'terracotta'
                    ? isActive
                      ? 'bg-stone-950/95 border-white/50 shadow-2xl ring-1 ring-white/20'
                      : 'bg-[#782c18]/60 border-white/10 hover:border-white/25 hover:bg-[#782c18]/80'
                    : isActive
                    ? 'bg-stone-900/90 border-[#e06b48] shadow-xl shadow-[#e06b48]/10'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/40'
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3 gap-2">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded ${
                        theme === 'terracotta'
                          ? isActive
                            ? 'bg-white text-stone-950'
                            : 'bg-black/30 text-stone-200 border border-white/10'
                          : isActive
                          ? 'bg-[#e06b48] text-white'
                          : 'bg-stone-900 text-stone-400 border border-stone-800'
                      }`}
                    >
                      {ui.stepLabel} {step.stepNumber}
                    </span>
                    {isActive && (
                      <span className={`text-[10px] font-mono flex items-center gap-1 font-semibold tracking-wide ${
                        theme === 'terracotta' ? 'text-amber-200' : 'text-[#f28e72]'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        {ui.activeWorkflow}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-base sm:text-[17px] font-semibold tracking-tight transition-colors ${
                      isActive ? 'text-white' : (theme === 'terracotta' ? 'text-stone-200' : 'text-stone-300')
                    }`}
                  >
                    <WordMaskText text={step.title} groupClassName="card-word" />
                  </h3>
                </div>
                <p className={`text-xs sm:text-[13px] mt-2 leading-relaxed font-sans w-full ${
                  theme === 'terracotta' ? 'text-stone-200/80' : 'text-stone-400'
                }`}>
                  <WordMaskText text={step.caption} groupClassName="card-word" />
                </p>
              </button>
            );
          })}
        </div>

        {/* Live Synchronized Screen Canvas (Right Column - Sticky & Interactive) */}
        <div role="tabpanel" className="how-canvas-panel lg:col-span-7 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-[#0e1017] border border-stone-800 p-5 sm:p-8 shadow-2xl overflow-hidden relative">
            {/* Ambient Terracotta Glow */}
            <div
              className="absolute -top-12 -right-12 w-80 h-80 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(224, 107, 72, 0.12) 0%, rgba(224, 107, 72, 0.04) 45%, transparent 70%)',
              }}
            />

            {/* Window Topbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-800 text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                <span className="ms-1.5 text-stone-300 font-semibold truncate">
                  {ui.canvasHeaderPrefix} {activeStep.stepNumber}
                </span>
              </div>
              <div className="text-[11px] text-[#e06b48] font-mono shrink-0">
                {ui.engineStatus}
              </div>
            </div>

            {/* Dynamic Step Visualization */}
            <div key={`${lang}-${activeStepIndex}`} className="min-h-[260px] flex flex-col justify-between animate-slide-in">
              {activeStepIndex === 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">{ui.initTitle}</span> {ui.initDesc}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#e06b48]/20 border border-[#e06b48] text-white flex items-center justify-between gap-2">
                      <span>✓ {ui.initItems[0]}</span>
                      <span className="text-[10px] text-stone-200 shrink-0">{ui.initLoaded}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      {ui.initItems[1]}
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      {ui.initItems[2]}
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      {ui.initItems[3]}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/50 border border-stone-800/80 text-[11px] font-mono text-stone-400">
                    {ui.initStatus}
                  </div>
                </div>
              )}

              {activeStepIndex === 1 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">{ui.pruningTitle}</span> {ui.pruningDesc}
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    {ui.pruningRows.map((row, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-2 text-stone-200"
                      >
                        <span>{row.label}</span>
                        <span className="text-emerald-400 font-bold shrink-0">{row.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStepIndex === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">{ui.floorTitle}</span> {ui.floorDesc}
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2 font-mono text-xs">
                    <div className="flex flex-wrap justify-between items-center gap-2 text-stone-200 pb-2 border-b border-stone-800">
                      <span>{ui.floorCheckin}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        {ui.floorValid}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-stone-300">
                      <span>{ui.floorBooking}</span>
                      <span className="text-stone-100 font-semibold shrink-0">{ui.floorBookingAmount}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-stone-400 text-[11px]">
                      <span>{ui.floorTillLabel}</span>
                      <span className="text-emerald-400">{ui.floorTillStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">{ui.branchesTitle}</span> {ui.branchesDesc}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    {ui.branchesCards.map((card, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-stone-900/90 border border-stone-800">
                        <div className="text-[10px] text-stone-500 mb-1 flex justify-between gap-2">
                          <span>{card.branch}</span>
                          <span className="text-[#f28e72] shrink-0">{card.sample}</span>
                        </div>
                        <div className="text-base font-bold text-stone-100">{card.amount}</div>
                        <div className="text-[10px] text-emerald-400 mt-1">{card.checkins}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-[#e06b48]/10 border border-[#e06b48]/40 flex flex-wrap justify-between items-center gap-2 text-xs font-mono text-[#f28e72]">
                    <span>{ui.branchesTotalLabel}</span>
                    <span className="font-bold">{ui.branchesTotalValue}</span>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-stone-400">
                  {ui.stepOf(activeStepIndex + 1, steps.length)}
                </div>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-4 py-2 rounded-lg bg-[#b85438] hover:bg-[#a24830] text-white text-xs font-mono font-semibold transition flex items-center gap-2 cursor-pointer shadow-md shadow-[#b85438]/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{content.tryStartButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
