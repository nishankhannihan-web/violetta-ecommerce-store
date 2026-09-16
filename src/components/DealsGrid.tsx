import React, { useState } from 'react';
import { DEALS_OFFERS } from '../data/mockData';
import { DealOffer } from '../types';
import { Copy, Check, Tag, ArrowRight } from 'lucide-react';

interface DealsGridProps {
  onApplyCoupon: (code: string) => void;
}

export const DealsGrid: React.FC<DealsGridProps> = ({ onApplyCoupon }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="deals-and-offers-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Savings Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1F1B2E] tracking-tight">
            Deals & VIP Offers
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Click any voucher to copy and automatically apply at checkout
        </p>
      </div>

      {/* Grid of Colorful Promo Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {DEALS_OFFERS.map((deal: DealOffer) => {
          const isCopied = copiedCode === deal.code;

          return (
            <div
              key={deal.id}
              className={`relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${deal.bgGradient} text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-white/10`}
              id={`deal-card-${deal.id}`}
            >
              {/* Background decorative watermark */}
              <div className="absolute -right-4 -bottom-4 text-white/5 pointer-events-none text-8xl font-black select-none">
                %
              </div>

              {/* Top Row: Badge & Discount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/20">
                    {deal.badge}
                  </span>
                  <span className="text-xs font-semibold text-white/80">
                    {deal.expiresIn}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {deal.discount}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {deal.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-2">
                  {deal.subtitle}
                </p>
              </div>

              {/* Bottom Voucher Code Bar */}
              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-mono text-xs font-bold text-white tracking-wider">
                  {deal.code}
                </div>

                <button
                  onClick={() => handleCopy(deal.code)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-[#1F1B2E] hover:bg-violet-50'
                  }`}
                  id={`copy-code-btn-${deal.id}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
