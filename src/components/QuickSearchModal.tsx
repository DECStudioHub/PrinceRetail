import React, { useState } from 'react';
import { Search, ShoppingBag, MapPin, Tag, Crown, ArrowRight, X } from 'lucide-react';
import { productsData } from '../data/productsData';
import { storesData } from '../data/storesData';
import { promosData } from '../data/promosData';
import { loyaltyTiers } from '../data/loyaltyData';
import { Product } from '../types';
import { getAssetUrl } from '../utils/assets';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = cleanQuery
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const matchingStores = cleanQuery
    ? storesData.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.city.toLowerCase().includes(cleanQuery) ||
          s.region.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingPromos = cleanQuery
    ? promosData.filter(
        (pr) =>
          pr.title.toLowerCase().includes(cleanQuery) ||
          pr.subtitle.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#252927]/10 relative animate-scaleIn">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#252927]/10">
          <Search className="w-5 h-5 text-[#EF777B] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, store branches, promos, loyalty..."
            className="w-full text-sm font-semibold text-[#252927] placeholder:text-[#6C7470] focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full hover:bg-slate-100 text-[#6C7470] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto pt-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-6 text-center text-xs text-[#6C7470]">
              <p className="font-semibold text-[#252927] mb-1">Quick Search Prince Retail</p>
              <p>Try typing "Rice", "Cebu", "Hakot", "Gold", or "Pampanga"</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['Dinorado Rice', 'GC Rebate', 'PO Cash Bond', 'Layaway Plan', 'Papuno Puhonan', 'Cebu Flagship'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-[#FFFDF8] border border-[#252927]/10 text-[11px] font-medium text-[#252927] hover:border-[#EF777B] cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C7470] mb-2 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#EF777B]" /> Products
                  </div>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#FFFDF8] border border-transparent hover:border-[#252927]/10 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={getAssetUrl(p.image)}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#252927]">{p.name}</div>
                            <div className="text-[10px] text-[#6C7470]">{p.category} · {p.unit}</div>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-[#252927] tabular-nums">
                          ₱{p.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stores */}
              {matchingStores.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C7470] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F7DF8B]" /> Stores & Branches
                  </div>
                  <div className="space-y-1.5">
                    {matchingStores.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onNavigateSection('stores');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#FFFDF8] border border-transparent hover:border-[#252927]/10 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#252927]">{s.name}</div>
                          <div className="text-[10px] text-[#6C7470]">{s.address}</div>
                        </div>
                        <span className="text-[10px] font-bold text-[#EF777B] px-2 py-0.5 rounded-full bg-[#FBE3DF]">
                          {s.region}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promos */}
              {matchingPromos.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C7470] mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#B8D9C4]" /> Deals & Promos
                  </div>
                  <div className="space-y-1.5">
                    {matchingPromos.map((pr) => (
                      <div
                        key={pr.id}
                        onClick={() => {
                          onNavigateSection('promos');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#FFFDF8] border border-transparent hover:border-[#252927]/10 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#252927]">{pr.title}</div>
                          <div className="text-[10px] text-[#6C7470]">{pr.subtitle}</div>
                        </div>
                        <span className="text-[10px] font-bold text-[#252927] px-2 py-0.5 rounded-full bg-[#FFF0BF]">
                          {pr.discount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length === 0 && matchingStores.length === 0 && matchingPromos.length === 0 && (
                <div className="py-8 text-center text-xs text-[#6C7470]">
                  No matching results for "{query}".
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
