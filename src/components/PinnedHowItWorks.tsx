import React, { useState } from 'react';
import { Sparkles, Layers, Sliders, CheckCircle2, ArrowRight, Workflow, Calendar } from 'lucide-react';
import { LandingContent, Language } from '../content/copy';
import { SectionHeader } from './SectionHeader';

interface PinnedHowItWorksProps {
  content: LandingContent;
  lang: Language;
  onOpenDemo: () => void;
}

/**
 * PinnedHowItWorks
 * Sequential step walkthrough with synchronized mock dashboard states.
 * Users can click through the 4 steps or view the responsive breakdown.
 */
export function PinnedHowItWorks({ content, lang, onOpenDemo }: PinnedHowItWorksProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = content.howItWorks.steps;
  const activeStep = steps[activeStepIndex];

  return (
    <div className="w-full">
      <SectionHeader
        icon={Workflow}
        tag={content.howItWorks.tag}
        primary={content.howItWorks.headlinePrimary}
        accent={content.howItWorks.headlineAccent}
        subline={content.howItWorks.subline}
        className="how-header"
        maskedHorizon={true}
        ctaButton={{ text: content.tryStartButton, onClick: onOpenDemo }}
      />

      {/* Interactive Walkthrough Layout: Steps Navigation on Left, Live Telemetry Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Cards / Tabs (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`how-step-card p-5 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                  isActive
                    ? 'bg-stone-900/90 border-[#e06b48] shadow-xl shadow-[#e06b48]/10'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#e06b48] text-white'
                        : 'bg-stone-900 text-stone-400 border border-stone-800'
                    }`}
                  >
                    STEP {step.stepNumber}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-[#f28e72] flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      ACTIVE WORKFLOW
                    </span>
                  )}
                </div>
                <h3
                  className={`text-base font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-stone-300'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-sans">
                  {step.caption}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Synchronized Screen Canvas (Right Column - Sticky & Interactive) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-[#0e1017] border border-stone-800 p-6 sm:p-8 shadow-2xl overflow-hidden relative">
            {/* Ambient Terracotta Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e06b48]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800 text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-stone-300 font-semibold">
                  ATRIUM // WORKSPACE WORKFLOW — STEP {activeStep.stepNumber}
                </span>
              </div>
              <div className="text-[11px] text-[#e06b48] font-mono">
                ENGINE: REAL-TIME OFFLINE + SYNC
              </div>
            </div>

            {/* Dynamic Step Visualization */}
            <div className="min-h-[260px] flex flex-col justify-between">
              {activeStepIndex === 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">INITIALIZATION:</span> Select trade vertical to generate exact register rules:
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#e06b48]/20 border border-[#e06b48] text-white flex items-center justify-between">
                      <span>✓ Memberships &amp; Classes</span>
                      <span className="text-[10px] text-stone-200">Loaded</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      Appointments &amp; Care
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      Orders &amp; Stock
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400">
                      Projects &amp; Studios
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/50 border border-stone-800/80 text-[11px] font-mono text-stone-400">
                    Status: Zero manual template coding. Ready in under 120 seconds.
                  </div>
                </div>
              )}

              {activeStepIndex === 1 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">ADAPTIVE MOLDING:</span> Irrelevant clutter is pruned. Active commerce modules initialized:
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800 flex items-center justify-between text-stone-200">
                      <span>Hardware Turnstile Controller</span>
                      <span className="text-emerald-400 font-bold">CONNECTED</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800 flex items-center justify-between text-stone-200">
                      <span>Automated Expiry Alerts (WhatsApp/SMS)</span>
                      <span className="text-emerald-400 font-bold">ARMED</span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800 flex items-center justify-between text-stone-200">
                      <span>Coach &amp; Trainer Shift Quotas</span>
                      <span className="text-emerald-400 font-bold">ENABLED</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">DAILY FLOOR DESK (SAMPLE DATA):</span> Client check-ins, till receipts &amp; staff hours in one tap:
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center text-stone-200 pb-2 border-b border-stone-800">
                      <span>Check-in #418 (Amine K.)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        VALID • 6-MONTH PASS
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-stone-300">
                      <span>New Session Booking (Coach Yacine)</span>
                      <span className="text-stone-100 font-semibold">3,500 DZD</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-400 text-[11px]">
                      <span>Daily Till Status</span>
                      <span className="text-emerald-400">Reconciled • 0 DZD shortage</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-stone-400">
                    <span className="text-[#f28e72] font-semibold">CONSOLIDATED TELEMETRY (SAMPLE DATA):</span> Multi-branch revenue without travelling or waiting for midnight calls:
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800">
                      <div className="text-[10px] text-stone-500 mb-1 flex justify-between">
                        <span>ALGIERS (DIDOUCHE)</span>
                        <span className="text-[#f28e72]">SAMPLE</span>
                      </div>
                      <div className="text-base font-bold text-stone-100">142,500 DZD</div>
                      <div className="text-[10px] text-emerald-400 mt-1">42 check-ins today</div>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800">
                      <div className="text-[10px] text-stone-500 mb-1 flex justify-between">
                        <span>ORAN (AKID LOTFI)</span>
                        <span className="text-[#f28e72]">SAMPLE</span>
                      </div>
                      <div className="text-base font-bold text-stone-100">98,200 DZD</div>
                      <div className="text-[10px] text-emerald-400 mt-1">31 check-ins today</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#e06b48]/10 border border-[#e06b48]/40 flex justify-between items-center text-xs font-mono text-[#f28e72]">
                    <span>Total Regional Footprint (Sample)</span>
                    <span className="font-bold">240,700 DZD (Net Active)</span>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
                <div className="text-[11px] font-mono text-stone-400">
                  Step {activeStepIndex + 1} of {steps.length}
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
