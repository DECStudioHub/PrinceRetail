import React, { useState } from 'react';
import { CartItem } from '../types';
import { getAssetUrl } from '../utils/assets';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck, 
  Store,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct?: number; flatDiscount?: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [customerName, setCustomerName] = useState('Maria Dela Cruz');
  const [customerPhone, setCustomerPhone] = useState('0917-888-2026');
  const [customerAddress, setCustomerAddress] = useState('Poblacion, Cebu City');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 || deliveryMethod === 'pickup' ? 0 : 99;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPct) {
      discountAmount = Math.round(subtotal * (appliedPromo.discountPct / 100));
    } else if (appliedPromo.flatDiscount) {
      discountAmount = Math.min(subtotal, appliedPromo.flatDiscount);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();

    if (code === 'SABAY2026') {
      setAppliedPromo({ code: 'SABAY2026', discountPct: 10 });
    } else if (code === 'ROYALTYNEW') {
      setAppliedPromo({ code: 'ROYALTYNEW', flatDiscount: 150 });
    } else if (code === 'PISODEAL') {
      setAppliedPromo({ code: 'PISODEAL', flatDiscount: 50 });
    } else {
      setPromoError('Invalid code. Try "SABAY2026" or "ROYALTYNEW"');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
  };

  const handleResetAfterOrder = () => {
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-[#252927]/10 flex items-center justify-between bg-[#FFFDF8]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#EF777B]" />
              <h2 className="text-base font-extrabold text-[#252927]">
                Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              {cartItems.length > 0 && !isCheckingOut && (
                <button
                  onClick={onClearCart}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#6C7470] hover:text-red-600 hover:bg-red-50 border border-[#252927]/12 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Remove all items from cart"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}

              <button
                onClick={onClose}
                aria-label="Close cart"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#252927] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>


          {/* Checkout Modal Overlay if checking out */}
          {isCheckingOut ? (
            <div className="flex-1 overflow-y-auto p-6 bg-[#FFFDF8]">
              {checkoutComplete ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#DCEEE2] text-emerald-700 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EF777B]">
                    Prototype Simulation
                  </span>
                  <h3 className="text-xl font-black text-[#252927] mt-1">
                    Order Simulated: #PR-202684
                  </h3>
                  <p className="text-xs text-[#6C7470] mt-2 max-w-xs leading-relaxed">
                    Salamat, {customerName}! Your simulated order has been generated with {paymentMethod}.
                  </p>

                  <div className="w-full my-6 p-4 rounded-2xl bg-white border border-[#252927]/10 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6C7470]">Delivery Method:</span>
                      <span className="font-bold text-[#252927]">{deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Curbside Pickup'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6C7470]">Total Amount:</span>
                      <span className="font-black text-[#EF777B]">₱{grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6C7470]">Royalty Points Earned:</span>
                      <span className="font-bold text-emerald-700">+{Math.floor(grandTotal / 200)} Points</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6C7470] italic mb-6">
                    Note: Frontend demo state — no live payment or physical shipment was processed.
                  </p>

                  <button
                    onClick={handleResetAfterOrder}
                    className="w-full py-3 px-4 rounded-xl bg-[#252927] text-white text-xs font-bold shadow-xs hover:bg-black transition-colors cursor-pointer"
                  >
                    Done & Return to Store
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#252927]/10">
                    <h3 className="text-sm font-extrabold text-[#252927]">Simulated Checkout</h3>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs font-bold text-[#EF777B] hover:underline"
                    >
                      Back to Cart
                    </button>
                  </div>

                  {/* Delivery vs Pickup */}
                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-2">Fulfillment Option</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          deliveryMethod === 'delivery'
                            ? 'border-[#EF777B] bg-[#FBE3DF]/30 text-[#252927]'
                            : 'border-[#252927]/10 bg-white text-[#6C7470]'
                        }`}
                      >
                        <Truck className="w-4 h-4 mb-1 text-[#EF777B]" />
                        <div>Home Delivery</div>
                        <div className="text-[10px] font-normal text-[#6C7470]">Direct to doorstep</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          deliveryMethod === 'pickup'
                            ? 'border-[#EF777B] bg-[#FBE3DF]/30 text-[#252927]'
                            : 'border-[#252927]/10 bg-white text-[#6C7470]'
                        }`}
                      >
                        <Store className="w-4 h-4 mb-1 text-[#252927]" />
                        <div>Curbside Pickup</div>
                        <div className="text-[10px] font-normal text-[#6C7470]">Free at nearest branch</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#252927]/15 bg-white text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#252927]/15 bg-white text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                    />
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-[#252927] mb-1">Complete Delivery Address</label>
                      <input
                        type="text"
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="House No., Street, Barangay, City, Province"
                        className="w-full px-3 py-2 rounded-xl border border-[#252927]/15 bg-white text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#252927] mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#252927]/15 bg-white text-xs font-bold focus:outline-none focus:border-[#EF777B]"
                    >
                      <option>Cash on Delivery (COD)</option>
                      <option>GCash Mobile Wallet</option>
                      <option>Maya Digital Card</option>
                      <option>Royalty Points Partial Payment</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-[#6C7470]">
                    Total payable at checkout: <strong className="text-[#252927]">₱{grandTotal.toLocaleString()}</strong>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Confirm & Place Order (Simulation)
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Items List */
            <div className="flex-1 overflow-y-auto p-5">
              
              {/* Free shipping progress */}
              <div className="mb-5 p-3 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#252927]">
                    <Truck className="w-3.5 h-3.5 text-[#EF777B]" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700">You unlocked FREE Doorstep Delivery!</span>
                    ) : (
                      <span>Add ₱{amountToFreeShipping.toLocaleString()} for Free Delivery</span>
                    )}
                  </span>
                  <span className="text-[#6C7470]">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#252927]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EF777B] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-12 h-12 text-[#6C7470] mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-bold text-[#252927]">Your cart is currently empty</p>
                  <p className="text-xs text-[#6C7470] mt-1">
                    Explore daily essentials, fresh produce, and weekly promos.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1 text-xs text-[#6C7470]">
                    <span className="font-semibold">
                      Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] font-bold text-[#6C7470] hover:text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>
                  {cartItems.map((item) => (

                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 flex items-center gap-3"
                    >
                      <img
                        src={getAssetUrl(item.product.image)}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-[#252927]/5 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#252927] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-[#6C7470] mb-2">
                          ₱{item.product.price} each · {item.product.unit}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#252927]/15 rounded-lg bg-white p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-5 h-5 flex items-center justify-center text-[#252927] hover:bg-slate-100 rounded"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-[#252927] hover:bg-slate-100 rounded"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-[#252927] tabular-nums">
                            ₱{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-[#6C7470] hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cart Footer */}
          {!isCheckingOut && (
            <div className="p-5 border-t border-[#252927]/10 bg-[#FFFDF8] space-y-3">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Promo code (e.g. SABAY2026)"
                  className="flex-1 px-3 py-2 rounded-xl border border-[#252927]/15 bg-white text-xs font-mono uppercase focus:outline-none focus:border-[#EF777B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#252927] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-800 font-bold bg-[#DCEEE2] px-3 py-1.5 rounded-lg">
                  <span>Code "{appliedPromo.code}" Applied!</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-[10px] underline">Remove</button>
                </div>
              )}

              {promoError && (
                <div className="text-[11px] text-red-600 font-medium">
                  {promoError}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6C7470] pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#252927] tabular-nums">₱{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span className="tabular-nums">-₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-[#252927] tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₱${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#252927] pt-2 border-t border-[#252927]/10">
                  <span>Grand Total</span>
                  <span className="text-[#EF777B] tabular-nums">₱{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                disabled={cartItems.length === 0}
                onClick={() => setIsCheckingOut(true)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all ${
                  cartItems.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#EF777B] hover:bg-[#e46468] text-white cursor-pointer active:scale-[0.98]'
                }`}
              >
                <span>Proceed to Checkout · ₱{grandTotal.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
