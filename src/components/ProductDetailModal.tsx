import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#252927]/10 relative animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#252927] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer z-10"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Image & Badges */}
          <div className="relative rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#252927]/8 aspect-square">
            <img
              src={getAssetUrl(product.image)}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#EF777B] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#6C7470] mb-1">
                {product.category} · {product.unit}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#252927] leading-snug mb-2">
                {product.name}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-[#252927] tabular-nums">
                  ₱{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6C7470] line-through tabular-nums">
                    ₱{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[10px] font-extrabold text-[#EF777B] bg-[#FBE3DF] px-2 py-0.5 rounded-md">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-bold text-[#252927]">{product.rating}</span>
                </div>
                <span className="text-[#6C7470]">({product.reviewsCount} verified Filipino shopper reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Specs Table */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#FFFDF8] border border-[#252927]/8 mb-6 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-[#252927]/5 last:border-0">
                    <span className="text-[#6C7470] font-medium">{key}</span>
                    <span className="font-bold text-[#252927]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add To Cart Button */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-[#252927]">Quantity:</span>
                <div className="flex items-center border border-[#252927]/20 rounded-xl bg-[#FFFDF8] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-[#252927] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs tabular-nums text-[#252927]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-[#252927] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-xs font-bold text-emerald-700">In Stock Ready to Pack</span>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#EF777B] hover:bg-[#e46468] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ₱{(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-around text-[10px] text-[#6C7470] border-t border-[#252927]/5 pt-3">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#EF777B]" /> Free delivery above ₱1,500
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Authentic Filipino goods
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
