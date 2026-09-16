import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Check,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const progressToFree = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountRate = appliedCoupon ? 0.2 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingFee;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'FLASH25' || clean === 'MEGASUMMER' || clean === 'VIOLET25' || clean === 'VIPVIOLET30') {
      onApplyCoupon(clean);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try VIOLET25 or FLASH25');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E9E5F5] animate-in slide-in-from-right duration-250"
        id="cart-drawer-container"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E9E5F5] flex items-center justify-between bg-[#F7F5FC]/50">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="font-extrabold text-base text-[#1F1B2E]">
              Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-4 py-3 bg-violet-50/70 border-b border-violet-100 text-xs">
          <div className="flex items-center justify-between text-[#1F1B2E] font-medium mb-1.5">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>
                {amountToFreeShipping === 0
                  ? 'Unlocked: FREE Express Shipping!'
                  : `Add $${amountToFreeShipping.toFixed(2)} more for Free Shipping`}
              </span>
            </span>
            <span className="font-bold text-[#7C3AED]">{Math.round(progressToFree)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-violet-200/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#7C3AED] transition-all duration-500"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-violet-50 text-[#7C3AED] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-[#1F1B2E]">Your bag is empty</h4>
              <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                Explore our curated catalog to add luxury blazers, spatial audio, and skincare essentials.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold shadow-md shadow-violet-500/20"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#F7F5FC] border border-[#E9E5F5] flex space-x-3 group"
                id={`cart-item-${item.id}`}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-xl object-cover border border-[#E9E5F5] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#1F1B2E] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-[#6B7280] mt-0.5">
                        <span>Size: {item.selectedSize}</span>
                        <span>&bull;</span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#6B7280] hover:text-red-500 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-[#E9E5F5] rounded-lg bg-white p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#F7F5FC] text-[#1F1B2E] rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#1F1B2E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#F7F5FC] text-[#1F1B2E] rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-[#7C3AED]">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E9E5F5] bg-white space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApply} className="relative">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder={appliedCoupon ? `Applied: ${appliedCoupon}` : "Enter promo code (e.g. VIOLET25)"}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#E9E5F5] text-xs uppercase focus:border-[#7C3AED] outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#6B7280] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-[#7C3AED] font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-red-500 mt-1">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>Promo {appliedCoupon} applied (20% discount)!</span>
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-[#6B7280]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1F1B2E]">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#1F1B2E]">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#1F1B2E] pt-2 border-t border-[#E9E5F5]">
                <span>Estimated Total</span>
                <span className="text-[#7C3AED]">${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/25 active:scale-95 transition-all cursor-pointer"
              id="cart-checkout-cta"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
