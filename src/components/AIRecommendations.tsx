import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { AI_RECOMMENDATION_TABS } from '../data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Eye,
} from 'lucide-react';

interface AIRecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: Set<string>;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Filter products based on selected recommendation tab
  const getTabProducts = () => {
    switch (activeTab) {
      case 'recommended':
        return products.slice(0, 8);
      case 'trending':
        return products.filter((p) => (p.soldPercent || 0) > 70 || p.isFlashSale);
      case 'bestsellers':
        return products.filter((p) => p.isBestSeller || p.rating >= 4.9);
      case 'new':
        return products.filter((p) => p.isNewArrival || p.id.endsWith('1') || p.id.endsWith('7'));
      case 'recent':
        return [products[1], products[0], products[4], products[7], products[9]];
      case 'toprated':
        return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  };

  const currentProducts = getTabProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-gradient-to-br from-violet-50/70 via-white to-purple-50/60 rounded-3xl p-6 sm:p-8 border border-[#E9E5F5] shadow-sm">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-1">
              Curated For You
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1F1B2E] tracking-tight">
              Personalized Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Tailored selections based on your browsing preferences and trending catalog activity
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl border border-[#E9E5F5] bg-white hover:bg-[#F7F5FC] text-[#1F1B2E] transition-colors shadow-sm"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl border border-[#E9E5F5] bg-white hover:bg-[#F7F5FC] text-[#1F1B2E] transition-colors shadow-sm"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[#E9E5F5]">
          {AI_RECOMMENDATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-violet-500/25 scale-102'
                    : 'bg-white text-[#1F1B2E] border border-[#E9E5F5] hover:bg-[#F7F5FC]'
                }`}
                id={`rec-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto no-scrollbar pb-4 pt-1 scroll-smooth"
        >
          {currentProducts.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);

            return (
              <div
                key={product.id}
                className="w-[230px] sm:w-[260px] shrink-0 bg-white rounded-2xl p-3.5 border border-[#E9E5F5] hover:border-[#7C3AED]/30 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group"
                id={`rec-prod-${product.id}`}
              >
                {/* Product Image */}
                <div
                  className="relative aspect-square rounded-xl overflow-hidden bg-[#F7F5FC] mb-3 cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  {product.discountPercent > 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#16A34A] text-white text-[10px] font-extrabold uppercase">
                      {product.discountPercent}% OFF
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product, e);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-red-50 text-red-500 shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#1F1B2E]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                  </button>

                  {/* Quick preview button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute inset-x-3 bottom-3 py-1.5 rounded-lg bg-white/95 text-[#1F1B2E] text-[11px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3 h-3 text-[#7C3AED]" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Content & Actions */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-[#7C3AED] uppercase">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-xs text-[#1F1B2E]">{product.rating}</span>
                      </div>
                    </div>

                    <h4
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-bold text-[#1F1B2E] line-clamp-1 hover:text-[#7C3AED] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-base font-black text-[#1F1B2E]">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#6B7280] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => onAddToCart(product, e)}
                    className="mt-3 w-full py-2 rounded-xl bg-violet-50 hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white text-xs font-bold transition-all border border-violet-100 flex items-center justify-center space-x-1.5"
                    id={`rec-add-btn-${product.id}`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Bag</span>
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
