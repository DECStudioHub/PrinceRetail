import React, { useState } from 'react';
import { Tag, Copy, Check, Clock, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { promosData } from '../data/promosData';

interface PromosSectionProps {
  onShopPromo: () => void;
}

export const PromosSection: React.FC<PromosSectionProps> = ({ onShopPromo }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section id="promos" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FCFBF7] border-b border-[#1B221E]/5 relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#55635C] mb-3">
              <span className="text-[#E22C28]">Promotions & Discounts</span>
              <span aria-hidden="true">·</span>
              <span>Sabay sa Tipid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B221E] leading-tight">
              Great Finds.<br />
              <span className="text-[#E22C28]">Happy Homes.</span>
            </h2>
            <p className="mt-4 text-base text-[#55635C] leading-relaxed">
              Discover weekly markdowns, bundle pack discounts, and exclusive Royalty member vouchers. Everyday low prices made even friendlier for the family budget.
            </p>
          </div>

          <button
            onClick={onShopPromo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B221E] hover:bg-[#26302B] text-white text-xs font-bold transition-all shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Featured Campaign Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-[#FEE2E2] via-[#FEF9C3] to-[#E8F5EC] p-8 sm:p-12 border border-[#1B221E]/8 relative overflow-hidden shadow-xs">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E22C28] bg-white/80 px-3 py-1 rounded-full inline-block mb-4 shadow-2xs">
              Seasonal Campaign 2026
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1B221E] leading-tight mb-3">
              Pamilyang Prince Big Supermarket Hakot Sale
            </h3>
            <p className="text-sm sm:text-base text-[#1B221E]/80 leading-relaxed mb-6">
              Enjoy storewide savings on cooking oils, canned fish, laundry bars, and imported pantry favorites. Plus, earn double Royalty points on all Friday to Sunday purchases!
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onShopPromo}
                className="px-6 py-3 rounded-xl bg-[#E22C28] hover:bg-[#C9221F] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Hakot Deals Now</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 border border-[#1B221E]/10 text-xs font-bold text-[#1B221E]">
                <Clock className="w-3.5 h-3.5 text-[#E22C28]" />
                <span>Offer ends this Sunday</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Promo Cards Grid with Voucher Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promosData.map((promo) => (
            <div
              key={promo.id}
              className="p-6 rounded-3xl bg-white border border-[#1B221E]/8 hover:border-[#E22C28]/40 hover:-translate-y-1 transition-all duration-300 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: promo.bgPastel, color: '#1B221E' }}
                  >
                    {promo.discount}
                  </span>
                  <Tag className="w-4 h-4 text-[#55635C]" />
                </div>

                <h4 className="text-lg font-bold text-[#1B221E] mb-2 leading-snug">
                  {promo.title}
                </h4>

                <p className="text-xs text-[#55635C] leading-relaxed mb-4">
                  {promo.subtitle}
                </p>

                <p className="text-[11px] text-[#1B221E]/70 leading-relaxed border-t border-[#1B221E]/6 pt-3 mb-4">
                  {promo.description}
                </p>
              </div>

              {/* Bottom Voucher Code Copy or Action */}
              <div className="pt-3 border-t border-[#1B221E]/6">
                {promo.code ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FCFBF7] border border-[#1B221E]/10">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-[#55635C]">Voucher Code</span>
                      <span className="text-xs font-extrabold text-[#1B221E] font-mono tracking-wider">
                        {promo.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(promo.code!)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#1B221E] hover:text-white text-[#1B221E] border border-[#1B221E]/10 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy promo code"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onShopPromo}
                    className="w-full py-2 text-xs font-bold text-[#E22C28] hover:text-[#1B221E] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Qualifying Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
