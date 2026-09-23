import React from 'react';

interface AtriumBrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Official Atrium Brand Logo Vector:
 * - 4 solid terracotta square blocks at outer corners
 * - 1 hollow square outline at the center (open atrium courtyard)
 * - Optional "BY STOA STUDIO" subtitle text
 * - Completely transparent background, rendered as clean SVG
 */
export function AtriumBrandLogo({
  className = '',
  size = 28,
  showText = true,
}: AtriumBrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric SVG Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Top-Left Square */}
        <rect x="12" y="12" width="26" height="26" fill="#b85438" rx="1.5" />
        {/* Top-Right Square */}
        <rect x="62" y="12" width="26" height="26" fill="#b85438" rx="1.5" />
        {/* Bottom-Left Square */}
        <rect x="12" y="62" width="26" height="26" fill="#b85438" rx="1.5" />
        {/* Bottom-Right Square */}
        <rect x="62" y="62" width="26" height="26" fill="#b85438" rx="1.5" />
        {/* Center Hollow Square (Courtyard / Atrium) */}
        <rect
          x="35"
          y="35"
          width="30"
          height="30"
          fill="none"
          stroke="#b85438"
          strokeWidth="6"
          strokeLinejoin="miter"
          rx="1"
        />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className="font-editorial text-sm sm:text-base font-bold tracking-[0.22em] text-[#b85438] uppercase">
            ATRIUM
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] font-mono tracking-[0.24em] text-stone-400 uppercase mt-0.5">
            BY FROM SCRATCH
          </span>
        </div>
      )}
    </div>
  );
}
