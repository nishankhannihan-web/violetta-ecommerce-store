import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Zap, ChevronLeft, ChevronRight, ShoppingBag, Eye, Heart } from 'lucide-react';

interface FlashSaleProps {
  products: Product[];
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: Set<string>;
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Live ticking countdown: initialize to 6 hours, 24 minutes, 45 seconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 24,
    seconds: 45,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 }; // reset cycle
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Container with soft off-white background and light border */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#E9E5F5] shadow-sm">
        
        {/* Section Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E9E5F5]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EF4444] to-[#F87171] flex items-center justify-center text-white shadow-md shadow-red-500/20">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EF4444]">
                  Limited-Time Event
                </span>
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2E]">
                Flash Sale Drops
              </h2>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-[#6B7280]">Offer ends in:</span>
            <div className="flex items-center space-x-1.5">
              <div className="bg-[#1F1B2E] text-white text-xs sm:text-sm font-black px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="font-bold text-[#1F1B2E]">:</span>
              <div className="bg-[#1F1B2E] text-white text-xs sm:text-sm font-black px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="font-bold text-[#1F1B2E]">:</span>
              <div className="bg-[#7C3AED] text-white text-xs sm:text-sm font-black px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center space-x-1.5 ml-4">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-xl border border-[#E9E5F5] hover:bg-[#F7F5FC] text-[#1F1B2E] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-xl border border-[#E9E5F5] hover:bg-[#F7F5FC] text-[#1F1B2E] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Product Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto no-scrollbar pt-6 pb-2 scroll-smooth"
        >
          {flashSaleProducts.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);
            const soldPct = product.soldPercent || 75;

            return (
              <div
                key={product.id}
                className="w-[240px] sm:w-[270px] shrink-0 bg-[#F7F5FC] rounded-2xl p-3 sm:p-4 border border-[#E9E5F5] hover:border-[#7C3AED]/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                id={`flash-product-${product.id}`}
              >
                {/* Product Image Area */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-3 cursor-pointer" onClick={() => onQuickView(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Discount % Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-[#EF4444] text-white text-[11px] font-black tracking-wider uppercase shadow-sm">
                    -{product.discountPercent}%
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product, e);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-red-50 text-red-500 shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#1F1B2E] opacity-90'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                  </button>

                  {/* Quick View Button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute inset-x-3 bottom-3 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[#1F1B2E] text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 hover:bg-white"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Quick Preview</span>
                  </button>
                </div>

                {/* Product Meta */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-bold text-[#1F1B2E] line-clamp-1 mt-0.5 hover:text-[#7C3AED] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Price: Strikethrough original + discounted */}
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-base sm:text-lg font-black text-[#7C3AED]">
                        ${product.price}
                      </span>
                      <span className="text-xs text-[#6B7280] line-through">
                        ${product.originalPrice}
                      </span>
                    </div>

                    {/* "X% sold" Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] mb-1">
                        <span>Sold: {soldPct}%</span>
                        <span className="text-red-500 font-bold">{product.stock} left</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E9E5F5] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EF4444] transition-all duration-1000"
                          style={{ width: `${soldPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Add to Cart Button */}
                  <button
                    onClick={(e) => onAddToCart(product, e)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20 flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                    id={`flash-add-btn-${product.id}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
