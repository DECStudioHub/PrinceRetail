import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

// shortcut: answers are static, move them to a CMS when business owners need self-service edits.
const suggestedQuestions = [
  {
    id: 'stores',
    question: 'Where can I find a Prince store?',
    answer: 'Open the Store Finder to browse branches by region. Branch hours and contact details are listed on each store card and can vary by location.'
  },
  {
    id: 'delivery',
    question: 'Can I order online for delivery or pickup?',
    answer: 'Yes. Shop Online offers doorstep delivery and curbside pickup. Choose an option at checkout to see what is available for your order.'
  },
  {
    id: 'royalty',
    question: 'How do Royalty points work?',
    answer: 'Royalty members earn points when they shop. The base tier earns 1 point for every ₱200 spent, with higher tiers earning up to 3× points.'
  },
  {
    id: 'wholesale',
    question: 'Who can help with a wholesale order?',
    answer: 'For Kasosyo and wholesale inquiries, email kasosyo@princeretail.com or send a message through the Customer Care form below.'
  }
];

export const FAQChat: React.FC = () => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  return (
    <section id="faq" className="border-y border-[#252927]/5 bg-[#F8F6F0] py-14 scroll-mt-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6C7470]">
            <span className="text-[#EF777B]">Customer Care</span> <span aria-hidden="true">·</span> FAQ
          </p>
          <h2 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-[#252927] sm:text-4xl lg:text-5xl">
            Let’s get you a quick answer.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#555E59]">
            Ask about stores, online orders, Royalty rewards, or wholesale. Choose a question to see a helpful answer.
          </p>
          <a href="#contact" className="mt-6 inline-flex min-h-11 items-start gap-2 rounded-lg text-sm font-bold text-[#252927] underline decoration-[#EF777B] decoration-2 underline-offset-4 transition-colors hover:text-[#A53B40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252927]">
            Need more help? Contact our team <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#252927]/10 bg-white shadow-lg shadow-[#252927]/5">
          <div className="flex shrink-0 items-center gap-3 bg-[#252927] px-5 py-4 text-white sm:px-6 lg:py-2">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F7DF8B] text-[#252927] lg:h-8 lg:w-8 lg:rounded-xl">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold">Prince Retail FAQs</h3>
              <p className="mt-0.5 text-xs text-white/70">Quick answers for your next shop</p>
            </div>
          </div>

          <div className="space-y-2 p-3 sm:p-4">
            {suggestedQuestions.map((question) => {
              const isOpen = openQuestionId === question.id;
              const questionId = `faq-question-${question.id}`;
              const answerId = `faq-answer-${question.id}`;

              return (
                <article
                  key={question.id}
                  className={`overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'border-[#EF777B]/45 bg-[#FBE3DF]/55 ring-2 ring-[#EF777B]/20' : 'border-[#252927]/10 bg-white hover:bg-[#FFFDF8]'}`}
                >
                  <h4>
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenQuestionId((current) => current === question.id ? null : question.id)}
                      className="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252927] sm:px-4"
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 motion-reduce:transition-none ${isOpen ? 'border-[#EF777B] bg-white' : 'border-[#6C7470]/50 bg-white'}`} aria-hidden="true">
                        <span className={`h-2 w-2 rounded-full bg-[#EF777B] transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                      </span>
                      <span className="text-sm font-semibold leading-snug text-[#252927]">{question.question}</span>
                    </button>
                  </h4>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 pl-11 pr-4 text-sm leading-relaxed text-[#555E59]">{question.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
