import React, { useState } from 'react';
import { Product } from '../types';
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  ArrowUpDown,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, e?: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  onToggleCompare: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  compareIds: Set<string>;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onToggleWishlist,
  onToggleCompare,
  wishlistIds,
  compareIds,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  // Filter & sort logic
  let filtered = activeCategory === 'all'
    ? [...products]
    : products.filter((p) => p.category === activeCategory);

  if (priceFilter !== null) {
    filtered = filtered.filter((p) => p.price <= priceFilter);
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const categoryFilters = [
    { id: 'all', label: 'All Items' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'home', label: 'Home & Kitchen' },
    { id: 'sports', label: 'Activewear' },
    { id: 'watches', label: 'Watches' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'jewelry', label: 'Jewelry' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="main-catalog-section">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-1">
            <span>Discover The Catalog</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1F1B2E] tracking-tight">
            Curated For Modern Living
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Showing {filtered.length} premier products with instant express delivery
          </p>
        </div>

        {/* Sort & Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-xl border border-[#E9E5F5] text-xs font-medium text-[#1F1B2E]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7C3AED]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer"
              id="product-sort-select"
            >
              <option value="featured">Featured Picks</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-xl border border-[#E9E5F5] text-xs font-medium text-[#1F1B2E]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C3AED]" />
            <select
              value={priceFilter ?? ''}
              onChange={(e) => setPriceFilter(e.target.value ? Number(e.target.value) : null)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer"
              id="product-price-filter"
            >
              <option value="">Any Budget</option>
              <option value="100">Under $100</option>
              <option value="200">Under $200</option>
              <option value="300">Under $300</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#7C3AED] text-white shadow-md shadow-violet-500/25 scale-102'
                : 'bg-white text-[#1F1B2E] border border-[#E9E5F5] hover:border-[#7C3AED]/40 hover:bg-[#F7F5FC]'
            }`}
            id={`filter-pill-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => {
          const isWishlisted = wishlistIds.has(product.id);
          const isCompared = compareIds.has(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E9E5F5] hover:border-[#7C3AED]/30 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              id={`product-card-${product.id}`}
            >
              {/* Image Container with Hover Swap */}
              <div
                className="relative aspect-square overflow-hidden bg-[#F7F5FC] cursor-pointer"
                onClick={() => onQuickView(product)}
              >
                {/* Primary Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  loading="lazy"
                />

                {/* Hover Swap to Second Image */}
                <img
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  loading="lazy"
                />

                {/* Badges: Discount or Custom Tag */}
                <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
                  {product.discountPercent > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#1F1B2E]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Wishlist Heart Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product, e);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-500 shadow-md scale-110'
                      : 'bg-white/80 hover:bg-white text-[#1F1B2E] shadow-sm hover:scale-105'
                  }`}
                  aria-label="Save to Wishlist"
                  id={`wishlist-btn-${product.id}`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Swatches preview indicator */}
                <div className="absolute bottom-2.5 left-3 flex items-center space-x-1.5 z-10">
                  {product.colors.slice(0, 3).map((col, cIdx) => (
                    <span
                      key={cIdx}
                      className="w-2.5 h-2.5 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-[10px] text-white font-bold drop-shadow">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Ratings */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#1F1B2E] text-xs">{product.rating}</span>
                      <span className="text-[#6B7280] text-[11px]">({product.ratingCount})</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-sm sm:text-base font-bold text-[#1F1B2E] line-clamp-2 hover:text-[#7C3AED] transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-lg sm:text-xl font-black text-[#1F1B2E]">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#6B7280] line-through font-medium">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions & Compare link */}
                <div className="mt-4 pt-3 border-t border-[#E9E5F5]">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      onClick={(e) => onAddToCart(product, e)}
                      className="py-2.5 px-2 rounded-xl bg-[#F7F5FC] hover:bg-violet-100 text-[#7C3AED] font-bold text-xs flex items-center justify-center space-x-1 transition-colors active:scale-95 border border-[#E9E5F5]"
                      id={`grid-add-cart-${product.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={(e) => onBuyNow(product, e)}
                      className="py-2.5 px-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center space-x-1 transition-colors shadow-sm shadow-violet-500/20 active:scale-95"
                      id={`grid-buy-now-${product.id}`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* "Compare" link */}
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <button
                      onClick={(e) => onToggleCompare(product, e)}
                      className={`flex items-center space-x-1 font-semibold transition-colors ${
                        isCompared ? 'text-[#7C3AED]' : 'text-[#6B7280] hover:text-[#1F1B2E]'
                      }`}
                      id={`compare-btn-${product.id}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        isCompared ? 'bg-[#7C3AED] border-[#7C3AED] text-white' : 'border-[#6B7280]'
                      }`}>
                        {isCompared && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span>{isCompared ? 'In Comparison' : 'Compare'}</span>
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      className="text-[#7C3AED] font-bold hover:underline"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
