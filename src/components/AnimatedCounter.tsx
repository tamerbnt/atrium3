import React, { useEffect, useRef, memo } from 'react';
import { computeCounterValue, formatCounterValue } from '../utils/scrollLogic';

interface AnimatedCounterProps {
  end: number;
  duration?: number; // duration in ms
  delay?: number; // delay in ms before starting count
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
}

/**
 * AnimatedCounter
 * Smoothly interpolates from 0 to end value when element scrolls into view,
 * updating the text node directly inside rAF without triggering React re-renders.
 */
export const AnimatedCounter = memo(function AnimatedCounter({
  end,
  duration = 1400,
  delay = 220,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimatedRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const writeValue = (val: number) => {
      if (elementRef.current) {
        elementRef.current.textContent = `${prefix}${formatCounterValue(val, decimals, separator)}${suffix}`;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          if (prefersReducedMotion || duration <= 0) {
            writeValue(end);
            return;
          }

          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const currentVal = computeCounterValue(end, elapsed, duration);

            writeValue(currentVal);

            if (elapsed < duration) {
              rafId = requestAnimationFrame(step);
            } else {
              writeValue(end);
            }
          };

          timer = setTimeout(() => {
            rafId = requestAnimationFrame(step);
          }, Math.min(delay, 160));
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [end, duration, delay, prefix, suffix, separator, decimals]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatCounterValue(0, decimals, separator)}
      {suffix}
    </span>
  );
});

