import React, { useRef, MouseEvent, memo, useMemo } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

/**
 * SpotlightCard
 * Tactile cursor-following illumination glow (Linear / Stripe style)
 * Highlights borders and backdrop with a subtle radial terracotta gradient.
 * Uses GPU-composited translate3d + cached rect to eliminate paint/layout thrashing.
 */
export const SpotlightCard = memo(function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(224, 107, 72, 0.18)',
  borderColor = 'rgba(224, 107, 72, 0.45)',
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rectRef = useRef<{ left: number; top: number } | null>(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  const gradientStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at center, ${spotlightColor}, transparent 70%)`,
    }),
    [spotlightColor]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect && cardRef.current) {
      const box = cardRef.current.getBoundingClientRect();
      rect = { left: box.left, top: box.top };
      rectRef.current = rect;
    }
    if (!rect) return;
    coordsRef.current.x = e.clientX - rect.left;
    coordsRef.current.y = e.clientY - rect.top;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${coordsRef.current.x}px, ${coordsRef.current.y}px, 0)`;
        }
      });
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const box = cardRef.current.getBoundingClientRect();
      rectRef.current = { left: box.left, top: box.top };
      coordsRef.current.x = e.clientX - box.left;
      coordsRef.current.y = e.clientY - box.top;
    }
    if (glowRef.current) {
      glowRef.current.style.willChange = 'transform';
      glowRef.current.style.transform = `translate3d(${coordsRef.current.x}px, ${coordsRef.current.y}px, 0)`;
      glowRef.current.style.opacity = '1';
    }
    if (borderRef.current) borderRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
      glowRef.current.style.willChange = 'auto';
    }
    if (borderRef.current) borderRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl transition-[border-color,background-color,box-shadow] duration-300 ${className || 'border border-stone-800 bg-stone-950/80'}`}
    >
      {/* Dynamic Cursor Spotlight Layer (GPU transform only on hover, zero idle layer allocation) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] -ml-[200px] -mt-[200px] transition-opacity duration-300 z-10"
        style={{
          opacity: 0,
          ...gradientStyle,
        }}
      />

      {/* Illuminating Border Highlight Overlay */}
      <div
        ref={borderRef}
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-10"
        style={{
          opacity: 0,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      />

      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
});

