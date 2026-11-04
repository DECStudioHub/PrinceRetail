import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFDF8] border-b border-[#252927]/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
            <span className="text-[#EF777B]">Get In Touch</span>
            <span aria-hidden="true">·</span>
            <span>Customer Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
            We Are Here to Serve You.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6C7470] leading-relaxed">
            Have questions about your local branch, Royalty points, bulk wholesale orders, or online delivery? Our dedicated customer care team is always ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Corporate Address */}
            <div className="p-6 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FBE3DF] flex items-center justify-center text-[#EF777B] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#252927] mb-1">Corporate Headquarters</h3>
                  <p className="text-xs text-[#6C7470] leading-relaxed">
                    Prince Retail Corporate Center<br />
                    Colon Street cor. Leon Kilat, Downtown<br />
                    Cebu City 6000, Philippines
                  </p>
                  <p className="text-[11px] text-[#6C7470] mt-2 font-medium">
                    With Regional Hubs in Batangas, Pampanga, Davao & Tacloban
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Hotline */}
            <div className="p-6 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0BF] flex items-center justify-center text-[#252927] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-[#252927]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#252927] mb-1">Customer Care Hotlines</h3>
                  <p className="text-xs text-[#6C7470] leading-relaxed">
                    Trunkline: <strong>(032) 255-7000</strong><br />
                    Mobile / SMS: <strong>+63 917 888 7746</strong> (0917-888-PRINCE)<br />
                    Toll-Free Provincial: <strong>1-800-10-PRINCE</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="p-6 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#DCEEE2] flex items-center justify-center text-[#252927] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#252927]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#252927] mb-1">Email & Operating Hours</h3>
                  <p className="text-xs text-[#6C7470] leading-relaxed">
                    Shopper Inquiries: <strong>customercare@princeretail.com</strong><br />
                    Kasosyo Wholesale: <strong>kasosyo@princeretail.com</strong>
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6C7470] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#EF777B]" />
                    <span>Monday to Saturday: 7:30 AM – 7:00 PM PHT</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#252927]/10 shadow-sm">
            <h3 className="text-xl font-bold text-[#252927] mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#6C7470] mb-6">
              Please enter your details below. We typically respond within one business day.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#DCEEE2] border border-[#B8D9C4] text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#252927]">Message Received!</h4>
                <p className="text-xs text-[#6C7470] mt-1 max-w-sm mx-auto">
                  Thank you for reaching out to Prince Retail. One of our customer care advocates will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry about Royalty Points / Branch Hours / Wholesale Order"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help your family or store today?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B] transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
