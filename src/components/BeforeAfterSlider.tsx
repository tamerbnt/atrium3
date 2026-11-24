import React, { useRef, useCallback, useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Language } from '../content/copy';
import { UI_COPY } from '../content/uiCopy';
import { clampSliderPercent, stepSliderPercent } from '../utils/scrollLogic';
import { WordMaskText } from './WordMaskText';

interface BeforeAfterSliderProps {
  lang: Language;
  theme?: 'dark' | 'light' | 'terracotta';
}

/**
 * BeforeAfterSlider
 * Interactive split-screen slider comparing:
 * - Left: "Before Atrium" (Scattered WhatsApp messages, paper logs, manual register blind spots)
 * - Right: "With Atrium" (Unified synchronized floor desk, instant reconciliation, live telemetry)
 */
export function BeforeAfterSlider({ lang, theme = 'dark' }: BeforeAfterSliderProps) {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderPosRef = useRef(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLayerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cleanupDragRef = useRef<(() => void) | null>(null);

  const ui = UI_COPY[lang].slider;
  const isRTL = lang === 'ar';

  const applyPosition = useCallback((pct: number) => {
    const clamped = Math.max(5, Math.min(95, pct));
    sliderPosRef.current = clamped;
    if (leftLayerRef.current) {
      leftLayerRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${clamped}%`;
    }
    const rounded = Math.round(clamped);
    setSliderValue((prev) => (prev === rounded ? prev : rounded));
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clamped = clampSliderPercent(clientX, rect.left, rect.width);
      applyPosition(clamped);
    },
    [applyPosition]
  );

  const stopDragging = useCallback(() => {
    isDraggingRef.current = false;
    if (cleanupDragRef.current) {
      cleanupDragRef.current();
      cleanupDragRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopDragging();
    };
  }, [stopDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    updateFromClientX(e.clientX);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updateFromClientX(moveEvent.clientX);
    };

    const onPointerUp = () => {
      stopDragging();
    };

    if (cleanupDragRef.current) cleanupDragRef.current();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    cleanupDragRef.current = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const next = stepSliderPercent(sliderPosRef.current, e.key, 5);
    if (next !== null) {
      e.preventDefault();
      applyPosition(next);
    }
  };

  const titleClass =
    theme === 'light'
      ? 'text-stone-900'
      : theme === 'terracotta'
      ? 'text-white'
      : 'text-stone-100';

  const sublineClass =
    theme === 'light'
      ? 'text-stone-500'
      : theme === 'terracotta'
      ? 'text-stone-200/80'
      : 'text-stone-400';

  return (
    <div className="before-after-slider w-full my-6 sm:my-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <span className="text-[10px] font-mono text-[#b85438] uppercase tracking-widest font-semibold block mb-1">
            {ui.eyebrow}
          </span>
          <h3 className={`font-editorial text-xl sm:text-2xl font-bold ${titleClass}`}>
            <WordMaskText text={ui.heading} groupClassName="slider-word" />
          </h3>
        </div>
        <div className={`text-[11px] font-mono ${sublineClass} flex items-center gap-2`}>
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#b85438] shrink-0" />
          <span>{ui.dragHint}</span>
        </div>
      </div>

      {/* Comparison Container (kept LTR for physical clip-path coordinates; cards localize internally) */}
      <div
        ref={containerRef}
        dir="ltr"
        role="slider"
        tabIndex={0}
        aria-label={ui.ariaLabel}
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={sliderValue}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full min-h-[410px] sm:min-h-[400px] h-[410px] sm:h-[400px] rounded-2xl overflow-hidden border border-stone-800 bg-[#0c0d12] select-none cursor-ew-resize shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e06b48] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
      >
        {/* RIGHT LAYER: "WITH ATRIUM" (Full width behind clip; physical right alignment) */}
        <div
          dir="ltr"
          className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#12141c] via-[#0f1117] to-[#171110]"
        >
          {/* Header Badge */}
          <div className="flex items-center justify-end">
            <div
              dir={isRTL ? 'rtl' : 'ltr'}
              className="max-w-[44%] sm:max-w-none inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-[#e06b48]/15 border border-[#e06b48]/40 text-[#f28e72] font-mono text-[9px] sm:text-xs font-semibold leading-tight"
            >
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e06b48] shrink-0" />
              <span>{ui.withBadge}</span>
            </div>
          </div>

          {/* Clean Dashboard Preview */}
          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-xl ml-auto text-left rtl:text-right"
          >
            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/90 border border-stone-800/80 shadow-lg">
              <div className="text-[10px] font-mono text-stone-500 mb-1 flex items-center justify-between gap-2">
                <span>{ui.withCards[0].eyebrow}</span>
                <span className="text-[#f28e72] font-semibold shrink-0">{ui.sampleLabel}</span>
              </div>
              <div className="text-stone-200 text-xs font-semibold mb-2">{ui.withCards[0].title}</div>
              <div className="space-y-1 text-[10px] sm:text-[11px] font-mono text-stone-400">
                <div className="flex justify-between gap-2 text-emerald-400">
                  <span>{ui.withCards[0].row1L}</span>
                  <span className="shrink-0">{ui.withCards[0].row1R}</span>
                </div>
                <div className="flex justify-between gap-2 text-stone-300">
                  <span>{ui.withCards[0].row2L}</span>
                  <span className="shrink-0">{ui.withCards[0].row2R}</span>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/90 border border-stone-800/80 shadow-lg">
              <div className="text-[10px] font-mono text-stone-500 mb-1 flex items-center justify-between gap-2">
                <span>{ui.withCards[1].eyebrow}</span>
                <span className="text-[#f28e72] font-semibold shrink-0">{ui.sampleLabel}</span>
              </div>
              <div className="text-stone-200 text-xs font-semibold mb-2">{ui.withCards[1].title}</div>
              <div className="space-y-1 text-[10px] sm:text-[11px] font-mono text-stone-400">
                <div className="flex justify-between gap-2 text-stone-200">
                  <span>{ui.withCards[1].row1L}</span>
                  <span className="font-semibold text-[#f28e72] shrink-0">{ui.withCards[1].row1R}</span>
                </div>
                <div className="flex justify-between gap-2 text-emerald-400">
                  <span>{ui.withCards[1].row2L}</span>
                  <span className="shrink-0">{ui.withCards[1].row2R}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            className="flex items-center justify-end gap-2 text-[9px] sm:text-[11px] font-mono text-stone-400"
          >
            <div className="max-w-[44%] sm:max-w-[46%] flex items-center gap-1.5 sm:gap-2 text-right leading-snug">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>{ui.withFooter}</span>
            </div>
          </div>
        </div>

        {/* LEFT LAYER: "BEFORE ATRIUM" (GPU clip-path, zero layout reflow; physical left alignment) */}
        <div
          ref={leftLayerRef}
          dir="ltr"
          className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#1a1210] via-[#140e0c] to-[#0f0d0c]"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        >
          <div className="w-full max-w-5xl h-full flex flex-col justify-between pointer-events-none">
            {/* Header Badge */}
            <div className="flex items-center justify-start">
              <div
                dir={isRTL ? 'rtl' : 'ltr'}
                className="max-w-[44%] sm:max-w-none inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-[9px] sm:text-xs font-semibold leading-tight"
              >
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 shrink-0" />
                <span>{ui.beforeBadge}</span>
              </div>
            </div>

            {/* Simulated Messy Chaos UI */}
            <div
              dir={isRTL ? 'rtl' : 'ltr'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-xl text-left rtl:text-right"
            >
              <div className="p-3 sm:p-4 rounded-xl bg-stone-950/90 border border-stone-800/90 shadow-lg">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 mb-1">
                  <MessageSquare className="w-3 h-3 shrink-0" />
                  <span>{ui.beforeCards[0].title}</span>
                </div>
                <div className="text-stone-300 text-[11px] sm:text-xs italic mb-1.5 sm:mb-2">
                  {ui.beforeCards[0].quote}
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  {ui.beforeCards[0].footer}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-stone-950/90 border border-stone-800/90 shadow-lg">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 mb-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{ui.beforeCards[1].title}</span>
                </div>
                <div className="text-xs font-mono text-rose-300 mb-1">
                  {ui.beforeCards[1].errorLine}
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  {ui.beforeCards[1].footer}
                </div>
              </div>
            </div>

            <div
              dir={isRTL ? 'rtl' : 'ltr'}
              className="flex items-center justify-start gap-2 text-[9px] sm:text-[11px] font-mono text-rose-400"
            >
              <div className="max-w-[44%] sm:max-w-[46%] flex items-center gap-1.5 sm:gap-2 leading-snug">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shrink-0" />
                <span>{ui.beforeFooter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE */}
        <div
          ref={dividerRef}
          className="absolute top-0 bottom-0 z-30 w-1 bg-[#e06b48] shadow-[0_0_15px_rgba(224,107,72,0.8)] cursor-ew-resize flex items-center justify-center -translate-x-1/2 pointer-events-none"
          style={{ left: '50%' }}
        >
          <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-[#e06b48] text-white flex items-center justify-center shadow-xl">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f28e72]" />
          </div>
        </div>
      </div>
    </div>
  );
}
