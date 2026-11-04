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
    <section id="promos" className="py-20 lg:py-28 bg-[#FFFDF8] border-b border-[#252927]/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
              <span className="text-[#EF777B]">Promotions & Discounts</span>
              <span aria-hidden="true">·</span>
              <span>Sabay sa Tipid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
              Great Finds.<br />
              <span className="text-[#EF777B]">Happy Homes.</span>
            </h2>
            <p className="mt-4 text-base text-[#6C7470] leading-relaxed">
              Discover weekly markdowns, bundle pack discounts, and exclusive Royalty member vouchers. Everyday low prices made even friendlier for the family budget.
            </p>
          </div>

          <button
            onClick={onShopPromo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-xs font-bold transition-all shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Featured Campaign Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-[#FBE3DF] via-[#FFF0BF] to-[#DCEEE2] p-8 sm:p-12 border border-[#252927]/8 relative overflow-hidden shadow-xs">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EF777B] bg-white/80 px-3 py-1 rounded-full inline-block mb-4 shadow-2xs">
              Seasonal Campaign 2026
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#252927] leading-tight mb-3">
              Pamilyang Prince Big Supermarket Hakot Sale
            </h3>
            <p className="text-sm sm:text-base text-[#252927]/80 leading-relaxed mb-6">
              Enjoy storewide savings on cooking oils, canned fish, laundry bars, and imported pantry favorites. Plus, earn double Royalty points on all Friday to Sunday purchases!
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onShopPromo}
                className="px-6 py-3 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Hakot Deals Now</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 border border-[#252927]/10 text-xs font-bold text-[#252927]">
                <Clock className="w-3.5 h-3.5 text-[#EF777B]" />
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
              className="p-6 rounded-3xl bg-white border border-[#252927]/8 hover:border-[#EF777B]/40 hover:-translate-y-1 transition-all duration-300 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: promo.bgPastel, color: '#252927' }}
                  >
                    {promo.discount}
                  </span>
                  <Tag className="w-4 h-4 text-[#6C7470]" />
                </div>

                <h4 className="text-lg font-bold text-[#252927] mb-2 leading-snug">
                  {promo.title}
                </h4>

                <p className="text-xs text-[#6C7470] leading-relaxed mb-4">
                  {promo.subtitle}
                </p>

                <p className="text-[11px] text-[#252927]/70 leading-relaxed border-t border-[#252927]/6 pt-3 mb-4">
                  {promo.description}
                </p>
              </div>

              {/* Bottom Voucher Code Copy or Action */}
              <div className="pt-3 border-t border-[#252927]/6">
                {promo.code ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FFFDF8] border border-[#252927]/10">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-[#6C7470]">Voucher Code</span>
                      <span className="text-xs font-extrabold text-[#252927] font-mono tracking-wider">
                        {promo.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(promo.code!)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#252927] hover:text-white text-[#252927] border border-[#252927]/10 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
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
                    className="w-full py-2 text-xs font-bold text-[#EF777B] hover:text-[#252927] flex items-center justify-center gap-1 transition-colors cursor-pointer"
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
