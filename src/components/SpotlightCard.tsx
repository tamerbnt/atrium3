import React, { useRef, MouseEvent } from 'react';

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
 * Uses direct DOM ref updates to maintain 60fps with zero React re-renders.
 */
export function SpotlightCard({
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
  const coordsRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    coordsRef.current.x = e.clientX - rect.left;
    coordsRef.current.y = e.clientY - rect.top;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(400px circle at ${coordsRef.current.x}px ${coordsRef.current.y}px, ${spotlightColor}, transparent 70%)`;
        }
      });
    }
  };

  const handleMouseEnter = () => {
    if (glowRef.current) glowRef.current.style.opacity = '1';
    if (borderRef.current) borderRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
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
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: 0,
          background: `radial-gradient(400px circle at 0px 0px, ${spotlightColor}, transparent 70%)`,
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
}
