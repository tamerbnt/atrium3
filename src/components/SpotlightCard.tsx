import React, { useRef, useState, MouseEvent } from 'react';

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
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(224, 107, 72, 0.18)',
  borderColor = 'rgba(224, 107, 72, 0.45)',
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${className || 'border border-stone-800 bg-stone-950/80'}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Illuminating Border Highlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-10"
        style={{
          opacity,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      />

      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
