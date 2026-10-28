import React, { useState, forwardRef } from 'react';
import { HelpCircle, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';
import { LandingContent, Language } from '../content/copy';
import { SectionHeader } from './SectionHeader';

interface FaqSectionProps {
  content: LandingContent['faq'];
  lang: Language;
  phone: string;
  onOpenDemo: () => void;
  theme?: 'dark' | 'light';
}

const FaqSection = forwardRef<HTMLElement, FaqSectionProps>(function FaqSection(
  { content, lang, phone, onOpenDemo, theme = 'light' },
  ref
) {
  // Collapsed by default, one open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const isRTL = lang === 'ar';
  const isLight = theme === 'light';

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
      className={`relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 border-t will-change-transform ${
        isLight
          ? 'bg-[#fbfbfa] text-stone-900 border-stone-200'
          : 'bg-stone-950 text-white border-stone-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Narrative & Direct Support */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <SectionHeader
              icon={HelpCircle}
              tag={content.tag}
              primary={content.headlinePrimary}
              accent={content.headlineAccent}
              subline={content.subline}
              align="left"
              className="faq-header mb-6"
              maskedHorizon={true}
              theme={theme}
            />

            <div
              className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
                isLight
                  ? 'bg-white border-stone-200 text-stone-900'
                  : 'bg-stone-900/60 border-stone-800/80 text-white'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#b85438] uppercase tracking-wider font-semibold">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Systems Support</span>
              </div>
              <p
                className={`text-xs font-sans leading-relaxed ${
                  isLight ? 'text-stone-600' : 'text-stone-300'
                }`}
              >
                {content.stillHaveQuestions}
              </p>
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border font-medium text-xs font-mono transition cursor-pointer ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{content.chatOnWhatsApp}</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-4 py-2.5 rounded-full bg-[#b85438] hover:bg-[#a04830] text-white text-xs font-semibold tracking-wider uppercase transition shadow-md shadow-[#b85438]/20 cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>{content.ctaButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
              <div
                className={`text-[10px] font-mono ${
                  isLight ? 'text-stone-500' : 'text-stone-500'
                }`}
              >
                {content.ctaSubtext}
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-3.5" role="region" aria-label="Frequently Asked Questions">
            {content.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const isLast = idx === content.items.length - 1;
              const questionId = `faq-question-${idx}`;
              const answerId = `faq-answer-${idx}`;

              return (
                <div
                  key={idx}
                  className={`faq-item rounded-2xl transition-[border-color,background-color,box-shadow] duration-200 border ${
                    isOpen
                      ? isLight
                        ? 'bg-white border-[#b85438]/60 shadow-md ring-1 ring-[#b85438]/20'
                        : 'bg-stone-950/95 border-[#e06b48]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]'
                      : isLight
                      ? 'bg-white hover:bg-stone-50/80 border-stone-200 hover:border-stone-300 shadow-sm'
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
                      <span
                        className={`text-sm sm:text-base font-semibold leading-snug ${
                          isLight ? 'text-stone-900' : 'text-stone-100'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                          isOpen
                            ? 'bg-[#b85438]/20 border-[#b85438]/50 text-[#b85438] rotate-180'
                            : isLight
                            ? 'bg-stone-100 border-stone-200 text-stone-600'
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
                      <div
                        className={`px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed font-sans border-t pt-3.5 space-y-4 ${
                          isLight
                            ? 'text-stone-600 border-stone-100'
                            : 'text-stone-300 border-white/[0.06]'
                        }`}
                      >
                        <p>{item.a}</p>

                        {/* Last question soft transition & inline direct trial signup button */}
                        {isLast && (
                          <div
                            className={`mt-4 pt-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 sm:px-6 rounded-b-2xl ${
                              isLight
                                ? 'bg-stone-50 border-stone-200 text-stone-700'
                                : 'bg-white/[0.02] border-stone-800/90 text-stone-300'
                            }`}
                          >
                            <span className="text-xs font-medium font-sans">
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
        </div>
      </div>
    </section>
  );
});

export default FaqSection;
