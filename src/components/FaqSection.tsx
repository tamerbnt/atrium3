import React, { useState, forwardRef } from 'react';
import { HelpCircle, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';
import { LandingContent, Language } from '../content/copy';
import { SectionHeader } from './SectionHeader';

interface FaqSectionProps {
  content: LandingContent['faq'];
  lang: Language;
  phone: string;
  onOpenDemo: () => void;
}

const FaqSection = forwardRef<HTMLElement, FaqSectionProps>(function FaqSection(
  { content, lang, phone, onOpenDemo },
  ref
) {
  // Collapsed by default, one open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const isRTL = lang === 'ar';

  // Schema.org FAQPage structured data for rich search engine result snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // Clean international WhatsApp link
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone || '213550921408'}?text=${encodeURIComponent(
    content.whatsappMessage
  )}`;

  return (
    <section
      ref={ref}
      id="section-faq"
      className="relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-stone-950 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] will-change-transform"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <SectionHeader
          icon={HelpCircle}
          tag={content.tag}
          primary={content.headlinePrimary}
          accent={content.headlineAccent}
          subline={content.subline}
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const isLast = idx === content.items.length - 1;
            const questionId = `faq-question-${idx}`;
            const answerId = `faq-answer-${idx}`;

            return (
              <div
                key={idx}
                className={`faq-item rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-stone-950/95 border-[#e06b48]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'bg-stone-950/60 hover:bg-stone-900/60 border-stone-800/80 hover:border-stone-700/80'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(idx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left rtl:text-right cursor-pointer select-none transition"
                  >
                    <span className="text-sm sm:text-base font-semibold text-stone-100 leading-snug">
                      {item.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                        isOpen
                          ? 'bg-[#b85438]/20 border-[#b85438]/50 text-[#e06b48] rotate-180'
                          : 'bg-white/[0.04] border-white/[0.08] text-stone-400 group-hover:text-stone-200'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-all duration-200 ease-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans border-t border-white/[0.06] pt-3.5 space-y-4">
                      <p>{item.a}</p>

                      {/* Last question soft transition & inline direct trial signup button */}
                      {isLast && (
                        <div className="mt-4 pt-3.5 border-t border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 sm:px-6 rounded-b-2xl">
                          <span className="text-xs text-stone-300 font-medium font-sans">
                            {content.lastItemTransition}
                          </span>
                          <button
                            type="button"
                            onClick={onOpenDemo}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white text-xs font-semibold tracking-wide transition shadow-md shadow-[#b85438]/20 cursor-pointer shrink-0"
                          >
                            <span>{content.lastItemCtaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Close — WhatsApp fallback & Primary Start Free Trial CTA */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-stone-950/80 border border-stone-800/80 text-center space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-stone-300">
            <span className="text-stone-400 font-sans">{content.stillHaveQuestions}</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium text-xs font-mono transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{content.chatOnWhatsApp}</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-8 py-3.5 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition shadow-lg shadow-[#b85438]/25 cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>{content.ctaButton}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition" />
            </button>
            <span className="text-[11px] font-mono text-stone-500">
              {content.ctaSubtext}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FaqSection;
