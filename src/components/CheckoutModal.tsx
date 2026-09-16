import React, { useState } from 'react';
import { CartItem, ShippingAddress, OrderConfirmation } from '../types';
import {
  X,
  Check,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Smartphone,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGuest, setIsGuest] = useState(true);

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Sophia Reynolds',
    email: 'sophia.reynolds@example.com',
    phone: '+1 (555) 349-8201',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'paypal' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('SOPHIA REYNOLDS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Totals calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedCoupon ? 0.2 : 0; // 20% if code applied
  const discountAmount = Math.round(subtotal * discountRate);
  const shippingFee = subtotal > 49 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order: OrderConfirmation = {
        orderId: `VT-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total,
        shippingAddress: { ...address },
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (•••• 4242)'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'paypal'
            ? 'PayPal Express'
            : 'Cash on Delivery',
        estimatedDelivery: 'Tomorrow by 4:00 PM',
      };
      setConfirmedOrder(order);
      setIsProcessing(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E9E5F5] overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-auto"
        id="checkout-modal-container"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9E5F5] bg-[#F7F5FC]/80">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-extrabold text-base text-[#1F1B2E]">
              Express Secure Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicators: 1 (Address) -> 2 (Payment) -> 3 (Confirm) */}
        {!confirmedOrder && (
          <div className="px-6 py-3 border-b border-[#E9E5F5] bg-white">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {/* Step 1 */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-colors ${
                    step >= 1 ? 'bg-[#7C3AED] text-white' : 'bg-[#E9E5F5] text-[#6B7280]'
                  }`}
                >
                  {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-xs font-bold ${step === 1 ? 'text-[#7C3AED]' : 'text-[#6B7280]'}`}>
                  Shipping
                </span>
              </div>

              <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-[#7C3AED]' : 'bg-[#E9E5F5]'}`} />

              {/* Step 2 */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-colors ${
                    step >= 2 ? 'bg-[#7C3AED] text-white' : 'bg-[#E9E5F5] text-[#6B7280]'
                  }`}
                >
                  {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className={`text-xs font-bold ${step === 2 ? 'text-[#7C3AED]' : 'text-[#6B7280]'}`}>
                  Payment
                </span>
              </div>

              <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-[#7C3AED]' : 'bg-[#E9E5F5]'}`} />

              {/* Step 3 */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-colors ${
                    step === 3 ? 'bg-[#7C3AED] text-white' : 'bg-[#E9E5F5] text-[#6B7280]'
                  }`}
                >
                  3
                </div>
                <span className={`text-xs font-bold ${step === 3 ? 'text-[#7C3AED]' : 'text-[#6B7280]'}`}>
                  Confirm
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* SUCCESS SCREEN */}
          {confirmedOrder ? (
            <div className="text-center py-6 space-y-4 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#1F1B2E]">Order Confirmed!</h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  Tracking number: <strong>{confirmedOrder.orderId}</strong>
                </p>
              </div>

              <div className="bg-[#F7F5FC] p-4 rounded-2xl border border-[#E9E5F5] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Recipient:</span>
                  <span className="font-bold text-[#1F1B2E]">{confirmedOrder.shippingAddress.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Deliver to:</span>
                  <span className="font-medium text-[#1F1B2E]">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Estimated Delivery:</span>
                  <span className="font-bold text-[#16A34A]">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-t border-[#E9E5F5] pt-2 font-bold">
                  <span>Total Charged:</span>
                  <span className="text-[#7C3AED]">${confirmedOrder.total}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md"
              >
                Back to Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Step Content Form (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                
                {/* STEP 1: Address & Guest Checkout */}
                {step === 1 && (
                  <form onSubmit={handleAddressSubmit} className="space-y-4" id="checkout-address-form">
                    {/* Guest Checkout Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-violet-50 border border-violet-100">
                      <div>
                        <span className="text-xs font-bold text-[#1F1B2E]">Guest Checkout Enabled</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsGuest(!isGuest)}
                        className="text-[11px] font-bold text-[#7C3AED] hover:underline"
                      >
                        {isGuest ? 'Sign in to earn points' : 'Continue as guest'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1F1B2E] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={address.fullName}
                          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#1F1B2E] mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={address.email}
                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1F1B2E] mb-1">Phone</label>
                          <input
                            type="tel"
                            required
                            value={address.phone}
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1F1B2E] mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-[#1F1B2E] mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1F1B2E] mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1F1B2E] mb-1">ZIP Code</label>
                          <input
                            type="text"
                            required
                            value={address.zip}
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5F5] text-xs focus:border-[#7C3AED] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-violet-500/20"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* STEP 2: Payment Method */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4" id="checkout-payment-form">
                    <div className="space-y-2.5">
                      {/* Payment Method Selector */}
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-[#7C3AED] bg-violet-50/50 ring-1 ring-[#7C3AED]' : 'border-[#E9E5F5] hover:bg-[#F7F5FC]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-[#7C3AED]" />
                          <div>
                            <p className="text-xs font-bold text-[#1F1B2E]">Credit or Debit Card</p>
                            <p className="text-[11px] text-[#6B7280]">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'apple_pay' ? 'border-[#7C3AED] bg-violet-50/50 ring-1 ring-[#7C3AED]' : 'border-[#E9E5F5] hover:bg-[#F7F5FC]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-[#1F1B2E]" />
                          <div>
                            <p className="text-xs font-bold text-[#1F1B2E]">Apple Pay / Google Pay</p>
                            <p className="text-[11px] text-[#6B7280]">Biometric 1-tap checkout</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'apple_pay' ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'apple_pay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      {/* Card Details if Card selected */}
                      {paymentMethod === 'card' && (
                        <div className="p-3.5 bg-[#F7F5FC] rounded-xl border border-[#E9E5F5] space-y-3 animate-in fade-in duration-150">
                          <div>
                            <label className="block text-[11px] font-bold text-[#1F1B2E] mb-1">Card Number</label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9E5F5] text-xs font-mono outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-[#1F1B2E] mb-1">Expiry Date</label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9E5F5] text-xs font-mono outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#1F1B2E] mb-1">CVV Security</label>
                              <input
                                type="password"
                                maxLength={4}
                                required
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9E5F5] text-xs font-mono outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3 px-4 rounded-xl border border-[#E9E5F5] text-xs font-bold text-[#1F1B2E] hover:bg-[#F7F5FC] flex items-center space-x-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
                      >
                        <span>Review Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Confirm & Place Order */}
                {step === 3 && (
                  <div className="space-y-4" id="checkout-confirm-step">
                    <div className="bg-[#F7F5FC] p-4 rounded-2xl border border-[#E9E5F5] space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-[#1F1B2E] block mb-1">Shipping To:</span>
                        <p className="text-[#6B7280]">{address.fullName}</p>
                        <p className="text-[#6B7280]">{address.street}, {address.city}, {address.state} {address.zip}</p>
                        <p className="text-[#6B7280]">{address.email} &bull; {address.phone}</p>
                      </div>
                      <div className="border-t border-[#E9E5F5] pt-2">
                        <span className="font-bold text-[#1F1B2E] block mb-1">Payment Method:</span>
                        <p className="text-[#6B7280] capitalize">
                          {paymentMethod === 'card' ? 'Credit Card (•••• 4242)' : paymentMethod.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="py-3 px-4 rounded-xl border border-[#E9E5F5] text-xs font-bold text-[#1F1B2E] hover:bg-[#F7F5FC]"
                      >
                        Change Payment
                      </button>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={handlePlaceOrder}
                        className="flex-1 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/30 active:scale-95 transition-all"
                        id="place-order-final-btn"
                      >
                        {isProcessing ? (
                          <span>Processing Security Tokens...</span>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Confirm & Authorize (${total})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="md:col-span-5 bg-[#F7F5FC] p-4 rounded-2xl border border-[#E9E5F5] flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#1F1B2E] uppercase tracking-wider mb-3">
                    Order Summary ({items.length} items)
                  </h4>

                  {/* Cart preview list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2.5 text-xs">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#E9E5F5]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1F1B2E] truncate">{item.product.name}</p>
                          <p className="text-[11px] text-[#6B7280]">
                            Qty: {item.quantity} &bull; {item.selectedSize} &bull; {item.selectedColor.name}
                          </p>
                        </div>
                        <span className="font-bold text-[#1F1B2E]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation rows */}
                  <div className="mt-4 pt-3 border-t border-[#E9E5F5] space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Express Shipping</span>
                      <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-[#1F1B2E] pt-2 border-t border-[#E9E5F5]">
                      <span>Total</span>
                      <span className="text-[#7C3AED]">${total}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E9E5F5] text-[10px] text-[#6B7280] flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30-Day Money Back Guarantee &bull; Free Returns</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
