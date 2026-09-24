import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Sparkles, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ShiftPoint {
  title: string;
  desc: string;
}

interface ShiftCardSwiperProps {
  points: ShiftPoint[];
  autoPlayInterval?: number;
}

export function ShiftCardSwiper({
  points = [],
  autoPlayInterval = 4200,
}: ShiftCardSwiperProps) {
  const count = points.length;

  // Graceful empty state
  if (count === 0) {
    return (
      <div className="w-full py-12 px-6 text-center text-stone-500 font-mono text-sm border border-stone-800/60 rounded-2xl bg-stone-950/40 my-6 flex flex-col items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-[#e06b48]/80 mb-1" />
        <span>[ No operational resolutions currently logged ]</span>
      </div>
    );
  }

  const isSingleItem = count === 1;
  const copies = isSingleItem ? 1 : count < 4 ? 5 : 3;
  const baseOffsetMultiplier = isSingleItem ? 0 : copies === 5 ? 2 : 1;

  const extendedPoints = React.useMemo(() => {
    if (isSingleItem) return [...points];
    const arr: ShiftPoint[] = [];
    for (let i = 0; i < copies; i++) {
      arr.push(...points);
    }
    return arr;
  }, [points, count, isSingleItem, copies]);

  const [virtualIndex, setVirtualIndex] = useState(() => count * baseOffsetMultiplier);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [cardWidth, setCardWidth] = useState(480);
  const [gap, setGap] = useState(24);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentDragRef = useRef(0);

  useEffect(() => {
    const updateGeometry = () => {
      const screenW = window.innerWidth;
      const cWidth = containerRef.current?.offsetWidth || screenW;
      setContainerWidth(cWidth);

      if (screenW < 640) {
        setCardWidth(Math.min(screenW * 0.85, 350));
        setGap(14);
      } else if (screenW < 1024) {
        setCardWidth(Math.min(screenW * 0.56, 440));
        setGap(20);
      } else {
        setCardWidth(500);
        setGap(24);
      }
    };

    updateGeometry();
    window.addEventListener('resize', updateGeometry, { passive: true });
    return () => window.removeEventListener('resize', updateGeometry);
  }, []);

  const activeOriginalIndex = isSingleItem ? 0 : ((virtualIndex % count) + count) % count;

  const snapToVirtualIndex = useCallback((targetIndex: number) => {
    setIsTransitioning(true);
    setDragOffset(0);
    currentDragRef.current = 0;
    setVirtualIndex(targetIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (isSingleItem) return;
    snapToVirtualIndex(virtualIndex + 1);
  }, [isSingleItem, virtualIndex, snapToVirtualIndex]);

  const handlePrev = useCallback(() => {
    if (isSingleItem) return;
    snapToVirtualIndex(virtualIndex - 1);
  }, [isSingleItem, virtualIndex, snapToVirtualIndex]);

  const goToOriginalIndex = useCallback(
    (targetOriginal: number) => {
      if (isSingleItem) return;
      setIsTransitioning(true);
      const currentOriginal = ((virtualIndex % count) + count) % count;
      let diff = targetOriginal - currentOriginal;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      snapToVirtualIndex(virtualIndex + diff);
    },
    [isSingleItem, virtualIndex, count, snapToVirtualIndex]
  );

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== 'transform') return;
    if (isSingleItem) return;

    const minThreshold = count;
    const maxThreshold = count * (copies - 1);

    if (virtualIndex >= maxThreshold) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev - count);
    } else if (virtualIndex < minThreshold) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev + count);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const id = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isSingleItem || !isAutoPlayEnabled || isHovered || isDragging) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isSingleItem, isAutoPlayEnabled, isHovered, isDragging, handleNext, autoPlayInterval]);

  const handleDragRelease = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentDragRef.current;
    const timeDiff = Date.now() - startTimeRef.current;
    const cardStepPx = cardWidth + gap;

    const isQuickFlick = timeDiff < 280 && Math.abs(diff) > 25;

    if (isQuickFlick) {
      if (diff < 0) {
        snapToVirtualIndex(virtualIndex + 1);
      } else {
        snapToVirtualIndex(virtualIndex - 1);
      }
    } else {
      const threshold = cardWidth * 0.22;
      if (Math.abs(diff) > threshold) {
        const cardsMoved = Math.round(-diff / cardStepPx);
        const delta = cardsMoved !== 0 ? cardsMoved : Math.sign(-diff);
        snapToVirtualIndex(virtualIndex + delta);
      } else {
        snapToVirtualIndex(virtualIndex);
      }
    }

    setDragOffset(0);
    currentDragRef.current = 0;
  }, [isDragging, cardWidth, gap, virtualIndex, snapToVirtualIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSingleItem) return;
    e.stopPropagation();
    startXRef.current = e.touches[0].clientX;
    startTimeRef.current = Date.now();
    currentDragRef.current = 0;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isSingleItem) return;
    e.stopPropagation();
    const diff = e.touches[0].clientX - startXRef.current;
    currentDragRef.current = diff;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    handleDragRelease();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSingleItem) return;
    e.stopPropagation();
    startXRef.current = e.clientX;
    startTimeRef.current = Date.now();
    currentDragRef.current = 0;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isSingleItem) return;
    e.stopPropagation();
    const diff = e.clientX - startXRef.current;
    currentDragRef.current = diff;
    setDragOffset(diff);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDragRelease();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isDragging) {
      handleDragRelease();
    }
  };

  const centerOffsetPx = containerWidth / 2 - cardWidth / 2;
  const cardStepPx = cardWidth + gap;
  const targetTranslateX = centerOffsetPx - virtualIndex * cardStepPx + dragOffset;

  const activePoint = points[activeOriginalIndex] || points[0];

  return (
    <div
      className="swiper-container w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      aria-label="Infinite resolved shift carousel"
    >
      {/* Edge navigation buttons */}
      {!isSingleItem && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous resolution"
            className="absolute left-3 sm:left-6 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-stone-700/80 bg-stone-950/95 backdrop-blur-md hover:bg-stone-900 hover:border-[#e06b48] text-stone-200 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-90 shadow-[0_4px_25px_rgba(0,0,0,0.9)] group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next resolution"
            className="absolute right-3 sm:right-6 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-stone-700/80 bg-stone-950/95 backdrop-blur-md hover:bg-stone-900 hover:border-[#e06b48] text-stone-200 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-90 shadow-[0_4px_25px_rgba(0,0,0,0.9)] group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Swipable Track with Centered Focal Alignment */}
      <div
        ref={containerRef}
        className="w-full overflow-visible relative cursor-grab active:cursor-grabbing touch-pan-y py-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex will-change-transform"
          style={{
            gap: `${gap}px`,
            transition:
              isTransitioning && !isDragging
                ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
            transform: `translate3d(${targetTranslateX}px, 0, 0)`,
          }}
        >
          {extendedPoints.map((point, virtualIdx) => {
            const originalIdx = virtualIdx % count;
            const isCenterFocused = virtualIdx === virtualIndex;

            return (
              <div
                key={`shift-${virtualIdx}`}
                onClick={() => {
                  if (!isCenterFocused) snapToVirtualIndex(virtualIdx);
                }}
                className={`shrink-0 transition-all duration-500 ease-out cursor-pointer ${
                  isCenterFocused
                    ? 'scale-100 opacity-100 z-10'
                    : 'scale-[0.92] opacity-40 hover:opacity-75 z-0'
                }`}
                style={{
                  width: `${cardWidth}px`,
                }}
              >
                <SpotlightCard
                  spotlightColor="rgba(224, 107, 72, 0.35)"
                  borderColor={
                    isCenterFocused
                      ? 'rgba(224, 107, 72, 0.85)'
                      : 'rgba(224, 107, 72, 0.25)'
                  }
                  className={`group p-6 sm:p-8 shadow-xl transition-all h-full flex flex-col justify-between ${
                    isCenterFocused
                      ? 'border-[#e06b48]/80 ring-1 ring-[#e06b48]/40 bg-stone-950 shadow-[0_15px_45px_rgba(224,107,72,0.28)]'
                      : 'border-stone-800/85 bg-stone-950/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono mb-3.5 font-semibold">
                      <Sparkles
                        className={`w-3.5 h-3.5 ${
                          isCenterFocused ? 'text-[#e06b48]' : 'text-stone-500'
                        }`}
                      />
                      <span className={isCenterFocused ? 'text-[#f28e72]' : 'text-stone-500'}>
                        [ 0{originalIdx + 1} — RESOLVED ]
                      </span>
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-medium transition-colors mb-3 leading-snug ${
                        isCenterFocused ? 'text-white' : 'text-stone-300'
                      }`}
                    >
                      {point.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed min-h-[44px]">
                      {point.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between mt-6">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Atrium Core Resolution</span>
                    </span>
                    <span className={isCenterFocused ? 'text-[#f28e72] font-semibold' : 'text-stone-600'}>
                      {isCenterFocused ? 'Active in Architecture' : 'Click to Focus'}
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Controls & Swap Indicators */}
      <div className="flex flex-col items-center justify-center gap-3 mt-4 px-4">
        {!isSingleItem && (
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-950/90 border border-stone-800/90 shadow-inner"
            role="tablist"
            aria-label="Shift cards pagination"
          >
            {points.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeOriginalIndex}
                aria-label={`Go to resolution ${idx + 1}`}
                onClick={() => goToOriginalIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeOriginalIndex
                    ? 'w-8 sm:w-10 bg-[#e06b48] shadow-[0_0_12px_rgba(224,107,72,0.95)]'
                    : 'w-2 sm:w-2.5 bg-stone-800 hover:bg-stone-700'
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-stone-400">
          <span className="px-2 py-0.5 rounded bg-stone-900/90 border border-stone-800 text-[#f28e72] font-bold text-[11px]">
            [ 0{activeOriginalIndex + 1} / 0{count} ]
          </span>
          <span className="text-stone-300 font-medium truncate max-w-xs">
            {activePoint?.title}
          </span>
          {!isSingleItem && (
            <button
              type="button"
              onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
              title={isAutoPlayEnabled ? 'Pause auto-scroll' : 'Resume auto-scroll'}
              aria-label={isAutoPlayEnabled ? 'Pause auto-scroll' : 'Resume auto-scroll'}
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
          )}
        </div>
      </div>
    </div>
  );
}
