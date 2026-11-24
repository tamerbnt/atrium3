import React, { memo, useMemo } from 'react';

interface WordMaskTextProps {
  text: string;
  className?: string;
  maskClassName?: string;
  wordClassName?: string;
  groupClassName?: string;
}

/**
 * WordMaskText
 * Splits text by whitespace into individual masked words so GSAP can animate
 * every word rising cleanly from its own baseline horizon mask.
 *
 * Preserves spaces between words so line wrapping and Arabic (RTL) word order
 * & ligature shaping inside each word remain 100% intact.
 */
export const WordMaskText = memo(function WordMaskText({
  text,
  className = '',
  maskClassName = '',
  wordClassName = '',
  groupClassName = '',
}: WordMaskTextProps) {
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);

  if (words.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <React.Fragment key={`${index}-${word}`}>
          <span
            className={`inline-block overflow-hidden align-bottom pt-[0.06em] -mt-[0.06em] pb-[0.18em] -mb-[0.18em] ${maskClassName}`}
          >
            <span
              className={`horizon-word ${groupClassName} inline-block ${wordClassName}`}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </span>
  );
});

export default WordMaskText;

