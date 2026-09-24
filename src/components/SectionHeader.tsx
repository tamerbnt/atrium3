import React from 'react';
import { LucideIcon, Calendar } from 'lucide-react';

export interface CtaButtonConfig {
  text: string;
  onClick: () => void;
}

interface SectionHeaderProps {
  icon: LucideIcon;
  tag: string;
  primary: string;
  accent: string;
  subline?: string;
  align?: 'left' | 'center';
  className?: string;
  ctaButton?: CtaButtonConfig | React.ReactNode;
}

/**
 * SectionHeader
 * Implements Rule 4:
 * - Small Lucide icon + one-word uppercase category label above headline (e.g. ▷ Reality, ▷ Shift, ▷ Pricing)
 * - Two-tone headline: primary text color for the setup clause (text-stone-100), brand terracotta for the payoff (text-[#b85438])
 * - Rationed terracotta discipline: 1 accent point in the headline, crisp neutral subline
 * - Optional CTA button placed exactly beneath the text header
 */
export function SectionHeader({
  icon: Icon,
  tag,
  primary,
  accent,
  subline,
  align = 'left',
  className = '',
  ctaButton,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {/* Category Pill / Lockup: Small Lucide icon + one-word label */}
      <div className={`overflow-hidden ${isCenter ? 'flex justify-center' : ''}`}>
        <div
          className={`section-tag inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#e06b48] font-semibold mb-3 ${
            isCenter ? 'justify-center mx-auto' : ''
          }`}
        >
          <Icon className="w-3.5 h-3.5 text-[#e06b48] shrink-0" strokeWidth={2.2} />
          <span>{tag}</span>
        </div>
      </div>

      {/* Two-Tone Headline — Wrapped in Architectural Horizon Mask */}
      <div className={`overflow-hidden ${isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
        <h2
          className={`section-headline block font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight`}
        >
          <span className="text-stone-100">{primary} </span>
          <span className="text-[#b85438]">{accent}</span>
        </h2>
      </div>

      {/* Subheadline — Wrapped in Architectural Horizon Mask */}
      {subline && (
        <div className={`overflow-hidden mt-3 ${isCenter ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>
          <p
            className={`section-subline block text-stone-400 font-normal text-sm sm:text-base leading-relaxed font-sans`}
          >
            {subline}
          </p>
        </div>
      )}

      {/* CTA Button exactly beneath text header */}
      {ctaButton && (
        <div className={`overflow-hidden mt-5 ${isCenter ? 'flex justify-center' : ''}`}>
          <div className={`section-cta-wrap flex items-center ${isCenter ? 'justify-center' : 'justify-start'}`}>
            {React.isValidElement(ctaButton) ? (
              ctaButton
            ) : (
              <button
                type="button"
                onClick={(ctaButton as CtaButtonConfig).onClick}
                className="px-5 py-2.5 rounded-md bg-[#b85438] hover:bg-[#a24830] text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-[#b85438]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{(ctaButton as CtaButtonConfig).text}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
