import React, { useEffect, useState, useRef } from 'react';
import { computeCounterValue } from '../utils/scrollLogic';

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
 * Smoothly interpolates from 0 to end value when element scrolls into view.
 */
export function AnimatedCounter({
  end,
  duration = 1400,
  delay = 220,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
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

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          if (prefersReducedMotion || duration <= 0) {
            setCount(end);
            return;
          }

          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const currentVal = computeCounterValue(end, elapsed, duration);

            setCount(currentVal);

            if (elapsed < duration) {
              rafId = requestAnimationFrame(step);
            } else {
              setCount(end);
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
  }, [end, duration, delay]);

  const formattedNumber = count
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
