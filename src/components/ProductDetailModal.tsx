import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Minus,
  Plus,
  Share2,
  Check,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: ProductColor, size: string) => void;
  onBuyNow: (product: Product, quantity: number, color: ProductColor, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#7C3AED' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  const images = [product.image, product.hoverImage].filter(Boolean);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E9E5F5] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto relative"
        id={`product-detail-modal-${product.id}`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9E5F5] bg-[#F7F5FC]/50">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C3AED]">
              {product.category}
            </span>
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-[#7C3AED] text-[10px] font-black">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white transition-colors"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white transition-colors"
              aria-label="Close modal"
              id="modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1 pb-24 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            
            {/* Left Column: Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#F7F5FC] border border-[#E9E5F5] relative group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-[#16A34A] text-white text-xs font-black tracking-wider uppercase shadow-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${
                    isWishlisted
                      ? 'bg-red-50 text-red-500'
                      : 'bg-white/80 hover:bg-white text-[#1F1B2E]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center space-x-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img
                        ? 'border-[#7C3AED] ring-2 ring-violet-200'
                        : 'border-[#E9E5F5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Information & Interactive Selectors */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                {/* Title & Rating */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2E] leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="font-bold text-xs text-[#1F1B2E] ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    ({product.ratingCount} customer reviews)
                  </span>
                  <span className="text-emerald-600 text-xs font-bold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock ({product.stock} available)</span>
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3 mt-4">
                  <span className="text-2xl sm:text-3xl font-black text-[#7C3AED]">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-[#6B7280] line-through font-semibold">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Save ${product.originalPrice - product.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B7280] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* COLOR SELECTOR: Visual Swatches (Requirement) */}
                <div className="mt-5 pt-5 border-t border-[#E9E5F5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1F1B2E]">
                      Select Color: <span className="text-[#7C3AED] font-semibold">{selectedColor.name}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative flex items-center space-x-1.5 p-1 rounded-xl transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-[#7C3AED] ring-offset-2' : 'hover:scale-105'
                          }`}
                          title={color.name}
                          id={`swatch-${idx}`}
                        >
                          <span
                            className="w-7 h-7 rounded-lg border border-black/10 shadow-sm block"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SIZE SELECTOR: Buttons not dropdown (Requirement) + Size Guide Link */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1F1B2E]">
                      Select Size: <span className="text-[#7C3AED] font-semibold">{selectedSize}</span>
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center space-x-1 cursor-pointer"
                      id="size-guide-btn"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  {/* Size buttons */}
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#7C3AED] text-white shadow-md shadow-violet-500/30'
                              : 'bg-[#F7F5FC] text-[#1F1B2E] border border-[#E9E5F5] hover:border-[#7C3AED]'
                          }`}
                          id={`size-btn-${size}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Size Guide Modal / Inline Panel */}
                  {showSizeGuide && (
                    <div className="mt-3 p-3.5 bg-violet-50 rounded-xl border border-violet-100 text-xs text-[#1F1B2E] space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between font-bold">
                        <span>Standard Sizing Reference</span>
                        <button onClick={() => setShowSizeGuide(false)} className="text-gray-500 hover:text-black">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-[11px] text-center border-t border-violet-200 pt-2">
                        <span className="font-semibold">Size</span>
                        <span className="font-semibold">Bust/Chest</span>
                        <span className="font-semibold">Waist</span>
                        <span className="font-semibold">Hip</span>
                        <span>S</span><span>34-36"</span><span>28-30"</span><span>36-38"</span>
                        <span>M</span><span>38-40"</span><span>32-34"</span><span>40-42"</span>
                        <span>L</span><span>42-44"</span><span>36-38"</span><span>44-46"</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* QUANTITY STEPPER (Requirement) */}
                <div className="mt-5 flex items-center space-x-4">
                  <span className="text-xs font-bold text-[#1F1B2E]">Quantity:</span>
                  <div className="flex items-center border border-[#E9E5F5] rounded-xl bg-[#F7F5FC] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 rounded-lg hover:bg-white text-[#1F1B2E] transition-colors cursor-pointer"
                      id="qty-minus-btn"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-black text-[#1F1B2E]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-1.5 rounded-lg hover:bg-white text-[#1F1B2E] transition-colors cursor-pointer"
                      id="qty-plus-btn"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-[#E9E5F5]">
                  <button
                    onClick={() => onAddToCart(product, quantity, selectedColor, selectedSize)}
                    className="py-3.5 rounded-xl bg-[#F7F5FC] hover:bg-violet-100 text-[#7C3AED] font-bold text-sm flex items-center justify-center space-x-2 border border-violet-200 transition-all active:scale-95 cursor-pointer"
                    id="modal-add-to-cart-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (${product.price * quantity})</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, quantity, selectedColor, selectedSize)}
                    className="py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/25 transition-all active:scale-95 cursor-pointer"
                    id="modal-buy-now-btn"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* Value perks row */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E9E5F5] text-[11px] text-[#6B7280]">
                  <div className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>2-Yr Warranty</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Specs & Features Tabbed Area */}
          <div className="mt-8 pt-6 border-t border-[#E9E5F5]">
            <div className="flex space-x-4 border-b border-[#E9E5F5] pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs font-bold pb-2 border-b-2 transition-all ${
                  activeTab === 'details' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-[#6B7280]'
                }`}
              >
                Features & Highlights
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-bold pb-2 border-b-2 transition-all ${
                  activeTab === 'specs' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-[#6B7280]'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`text-xs font-bold pb-2 border-b-2 transition-all ${
                  activeTab === 'shipping' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-[#6B7280]'
                }`}
              >
                Delivery & Packaging
              </button>
            </div>

            <div className="pt-4 text-xs text-[#1F1B2E]">
              {activeTab === 'details' && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                      <span className="text-[#6B7280]">{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-3 bg-[#F7F5FC] p-4 rounded-xl">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-[11px] text-[#6B7280] font-medium block">{key}</span>
                      <span className="font-bold text-[#1F1B2E]">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2 text-[#6B7280] leading-relaxed">
                  <p>
                    All items are carefully inspected and packed in our signature recyclable Violetta luxury gift box.
                  </p>
                  <p>
                    Orders placed before 2:00 PM EST ship same day via FedEx Express. Real-time GPS tracking link provided via SMS and email.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STICKY "Add to Cart / Buy Now" BAR ON MOBILE (Requirement) */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 border-t border-[#E9E5F5] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center space-x-2">
          <div className="pr-2">
            <span className="text-[10px] text-[#6B7280] block">Total ({quantity})</span>
            <span className="text-base font-black text-[#7C3AED]">${product.price * quantity}</span>
          </div>

          <button
            onClick={() => onAddToCart(product, quantity, selectedColor, selectedSize)}
            className="flex-1 py-3 rounded-xl bg-violet-100 text-[#7C3AED] font-bold text-xs flex items-center justify-center space-x-1"
            id="mobile-sticky-add-btn"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          <button
            onClick={() => onBuyNow(product, quantity, selectedColor, selectedSize)}
            className="flex-1 py-3 rounded-xl bg-[#7C3AED] text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-violet-500/30"
            id="mobile-sticky-buy-btn"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
