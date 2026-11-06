import React, { useEffect, useRef, useState } from 'react';
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

type Message = { id: string; role: 'assistant' | 'user'; text: string };
type PendingReply = { question: (typeof suggestedQuestions)[number]; turnId: number };

export const FAQChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: 'Hi there! Choose a question and I’ll help you find the right information.' }
  ]);
  const [pendingReply, setPendingReply] = useState<PendingReply | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pendingReply) return;

    const { question, turnId } = pendingReply;
    let typingInterval: number | undefined;
    const finishAnswer = () => {
      setMessages((current) => [...current, { id: `answer-${turnId}`, role: 'assistant', text: question.answer }]);
      setTypedAnswer('');
      setPendingReply(null);
      setAnnouncement(`Prince Retail answered: ${question.answer}`);
    };

    const typingDelay = window.setTimeout(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finishAnswer();
        return;
      }

      let character = 0;
      typingInterval = window.setInterval(() => {
        character += 1;
        setTypedAnswer(question.answer.slice(0, character));
        if (character >= question.answer.length) {
          window.clearInterval(typingInterval);
          finishAnswer();
        }
      }, 18);
    }, 900);

    return () => {
      window.clearTimeout(typingDelay);
      if (typingInterval !== undefined) window.clearInterval(typingInterval);
    };
  }, [pendingReply]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages, pendingReply, typedAnswer]);

  const askQuestion = (question: (typeof suggestedQuestions)[number]) => {
    if (pendingReply) return;
    const turnId = messages.length;
    setAnnouncement('');
    setMessages((current) => [...current, { id: `question-${turnId}`, role: 'user', text: question.question }]);
    setPendingReply({ question, turnId });
  };

  return (
    <section id="faq" className="border-y border-[#252927]/5 bg-[#F8F6F0] py-14 scroll-mt-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-8">
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

        <div className="overflow-hidden rounded-3xl border border-[#252927]/10 bg-white shadow-lg shadow-[#252927]/5 lg:flex lg:h-[272px] lg:flex-col">
          <div className="flex shrink-0 items-center gap-3 bg-[#252927] px-5 py-4 text-white sm:px-6 lg:py-2">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F7DF8B] text-[#252927] lg:h-8 lg:w-8 lg:rounded-xl">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold">Prince Retail FAQs</h3>
              <p className="mt-0.5 text-xs text-white/70">Quick answers for your next shop</p>
            </div>
          </div>

          <div
            ref={conversationRef}
            role="log"
            aria-label="FAQ conversation"
            aria-live="off"
            className="flex max-h-80 min-h-64 flex-col gap-3 overflow-y-auto bg-[#FFFDF8] px-4 py-5 sm:px-6 lg:min-h-0 lg:max-h-none lg:flex-1 lg:gap-2 lg:py-1"
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 lg:px-3 lg:py-1 ${message.role === 'user' ? 'rounded-br-md bg-[#252927] text-white' : 'rounded-bl-md border border-[#252927]/8 bg-white text-[#252927]'}`}>
                  <p className={`mb-1 text-[11px] font-bold lg:mb-0 ${message.role === 'user' ? 'text-white/65' : 'text-[#6C7470]'}`}>
                    {message.role === 'user' ? 'You' : 'Prince Retail'}
                  </p>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {pendingReply && (
              <div className="flex justify-start" aria-hidden="true">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-[#252927]/8 bg-white px-4 py-3 text-[#252927] lg:px-3 lg:py-1">
                  <p className="mb-1 text-[11px] font-bold text-[#6C7470] lg:mb-0">Prince Retail</p>
                  {typedAnswer ? (
                    <p className="text-sm leading-relaxed">{typedAnswer}</p>
                  ) : (
                    <span className="faq-typing-dots flex h-5 items-center gap-1" aria-label="Typing">
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</p>

          <div className="shrink-0 border-t border-[#252927]/8 px-4 py-4 sm:px-6 lg:py-2">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6C7470] lg:mb-1">Suggested questions</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:gap-1">
              {suggestedQuestions.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  disabled={Boolean(pendingReply)}
                  onClick={() => askQuestion(question)}
                  className="min-h-11 rounded-xl border border-[#252927]/12 bg-white px-3 py-2 text-left text-xs font-semibold leading-relaxed text-[#252927] transition-colors hover:border-[#EF777B] hover:bg-[#FBE3DF]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252927] disabled:cursor-wait disabled:opacity-55"
                >
                  {question.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
