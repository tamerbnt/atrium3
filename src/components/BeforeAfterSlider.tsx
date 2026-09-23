import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MessageSquare, AlertCircle, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Language } from '../content/copy';

interface BeforeAfterSliderProps {
  lang: Language;
}

/**
 * BeforeAfterSlider
 * Interactive split-screen slider comparing:
 * - Left: "Before Atrium" (Scattered WhatsApp messages, paper logs, manual register blind spots)
 * - Right: "With Atrium" (Unified synchronized floor desk, instant reconciliation, live telemetry)
 */
export function BeforeAfterSlider({ lang }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPos(clamped);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const isArabic = lang === 'ar';

  return (
    <div className="w-full my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <span className="text-[10px] font-mono text-[#e06b48] uppercase tracking-widest font-semibold block mb-1">
            {lang === 'ar' ? 'المقارنة الميدانية التفاعلية' : lang === 'fr' ? 'Comparatif Interactif sur le Terrain' : 'Interactive Operational Comparison'}
          </span>
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-100">
            {lang === 'ar'
              ? 'اسحب المؤشر لترى الفارق على أرض الواقع'
              : lang === 'fr'
              ? 'Glissez le curseur pour voir la différence'
              : 'Drag the slider to inspect the operational contrast'}
          </h3>
        </div>
        <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#e06b48]" />
          <span>{lang === 'ar' ? 'اسحب يميناً ويساراً' : 'Drag left or right'}</span>
        </div>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[400px] rounded-2xl overflow-hidden border border-stone-800 bg-[#0c0d12] select-none cursor-ew-resize shadow-2xl"
      >
        {/* RIGHT LAYER: "WITH ATRIUM" (Full width behind clip) */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#12141c] via-[#0f1117] to-[#171110]">
          {/* Header Badge */}
          <div className="flex items-center justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e06b48]/15 border border-[#e06b48]/40 text-[#f28e72] font-mono text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e06b48]" />
              <span>WITH ATRIUM (THE UNIFIED DESK)</span>
            </div>
          </div>

          {/* Clean Dashboard Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl ml-auto text-left">
            <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800/80 shadow-lg">
              <div className="text-[10px] font-mono text-stone-500 mb-1 flex items-center justify-between">
                <span>SINGLE SOURCE OF TRUTH</span>
                <span className="text-[#f28e72] font-semibold">SAMPLE</span>
              </div>
              <div className="text-stone-200 text-xs font-semibold mb-2">Automated Register &amp; Turnstile Log</div>
              <div className="space-y-1 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between text-emerald-400">
                  <span>Register 1 (Floor)</span>
                  <span>Synced (0 err)</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Pass Expiring (Today)</span>
                  <span>SMS Dispatched</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800/80 shadow-lg">
              <div className="text-[10px] font-mono text-stone-500 mb-1 flex items-center justify-between">
                <span>REAL-TIME COMMISSIONS</span>
                <span className="text-[#f28e72] font-semibold">SAMPLE</span>
              </div>
              <div className="text-stone-200 text-xs font-semibold mb-2">Instant Staff Reconciliation</div>
              <div className="space-y-1 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between text-stone-200">
                  <span>Dr. Amel B. (Appointments)</span>
                  <span className="font-semibold text-[#f28e72]">18,400 DZD</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Cash Drawer Variance</span>
                  <span>0.00 DZD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Multi-Branch Offline Engine Active • Synchronized across Algiers, Oran &amp; Sétif</span>
          </div>
        </div>

        {/* LEFT LAYER: "BEFORE ATRIUM" (Clipped by sliderPos) */}
        <div
          className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#1a1210] via-[#140e0c] to-[#0f0d0c] border-r border-[#e06b48]"
          style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
        >
          <div className="w-[calc(100vw-3rem)] max-w-5xl h-full flex flex-col justify-between pointer-events-none">
            {/* Header Badge */}
            <div className="flex items-center justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-xs font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>BEFORE ATRIUM (CLERICAL CHAOS)</span>
              </div>
            </div>

            {/* Simulated Messy Chaos UI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl text-left">
              <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800/90 shadow-lg">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 mb-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>WHATSAPP VOICE MESSAGES</span>
                </div>
                <div className="text-stone-300 text-xs italic mb-2">
                  "Did Karim pay for the 6-month renew or just 1 session? Check the paper register!"
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  Trapped in 14 different chat groups • Untracked cash
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800/90 shadow-lg">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 mb-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>MANUAL EXCEL SHEET COLLAPSE</span>
                </div>
                <div className="text-stone-300 text-xs font-mono text-rose-300 mb-1">
                  #REF! Missing formula in Cell D48
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  Midnight disputes over practitioner commissions &amp; drawer shortages
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-2 text-[11px] font-mono text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>Manual paper records • Revenue blind spots • Constant owner anxiety</span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-[#e06b48] shadow-[0_0_15px_rgba(224,107,72,0.8)] cursor-ew-resize flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-[#e06b48] text-white flex items-center justify-center shadow-xl">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f28e72]" />
          </div>
        </div>
      </div>
    </div>
  );
}
