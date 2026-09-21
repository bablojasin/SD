import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

export interface FAQItem {
  question: string;
  answer: string;
  order?: number;
}

interface FAQSectionProps {
  label?: string;
  heading?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  label = 'Frequently Asked Questions',
  heading = 'Answers for Security Architects & CISOs',
  description = 'Detailed operational specifications regarding Securify autonomous threat containment, compliance, and deployment.',
  faqs,
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  // Sort by order if provided
  const sortedFaqs = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={`py-16 md:py-20 relative ${className}`} aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          {label && <SectionLabel className="mb-3">{label}</SectionLabel>}
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-[#9AA39A] max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {sortedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#070A08] border-[#B7FF00]/40 shadow-lg shadow-black/60'
                    : 'bg-[#070A08]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-[#B7FF00]' : 'text-[#9AA39A]'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#172512] text-[#B7FF00]' : 'bg-white/5 text-[#9AA39A]'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#D8DCD8] leading-relaxed border-t border-white/5 font-sans"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
