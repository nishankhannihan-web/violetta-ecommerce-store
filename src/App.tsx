import React, { useState } from 'react';
import { ALL_PRODUCTS } from './data/mockData';
import { Product, ProductColor, CartItem, OrderConfirmation } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { CategoryGrid } from './components/CategoryGrid';
import { FlashSale } from './components/FlashSale';
import { ProductGrid } from './components/ProductGrid';
import { AIRecommendations } from './components/AIRecommendations';
import { DealsGrid } from './components/DealsGrid';
import { BrandShowcase } from './components/BrandShowcase';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CompareDrawer } from './components/CompareDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrdersModal } from './components/OrdersModal';
import { AccountModal } from './components/AccountModal';
import { Check } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(ALL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod-1-Ultra Violet-M',
      product: ALL_PRODUCTS[0],
      quantity: 1,
      selectedColor: ALL_PRODUCTS[0].colors[0],
      selectedSize: 'M',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('VIOLET25');

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['prod-1', 'prod-2']));
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Compare state
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set(['prod-2']));
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [mobileActiveNav, setMobileActiveNav] = useState<'home' | 'categories' | 'wishlist' | 'orders' | 'account'>('home');

  // Completed Orders
  const [orders, setOrders] = useState<OrderConfirmation[]>([
    {
      orderId: 'VT-892019',
      date: 'Yesterday',
      items: [
        {
          id: 'prev-1',
          product: ALL_PRODUCTS[1],
          quantity: 1,
          selectedColor: ALL_PRODUCTS[1].colors[0],
          selectedSize: 'One Size',
        },
      ],
      subtotal: 249,
      discount: 50,
      shipping: 0,
      total: 199,
      shippingAddress: {
        fullName: 'Sophia Reynolds',
        email: 'sophia.reynolds@example.com',
        phone: '+1 (555) 349-8201',
        street: '742 Evergreen Terrace',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
      },
      paymentMethod: 'Apple Pay',
      estimatedDelivery: 'Out for delivery with FedEx',
    },
  ]);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to Cart handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: ProductColor,
    size?: string,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0];
    const compositeId = `${product.id}-${chosenColor.name}-${chosenSize}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            product,
            quantity,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to your bag!`);
  };

  const handleBuyNow = (
    product: Product,
    quantity = 1,
    color?: ProductColor,
    size?: string,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    handleAddToCart(product, quantity, color, size);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlistIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(product.id)) {
        updated.delete(product.id);
        showToast(`Removed from wishlist`);
      } else {
        updated.add(product.id);
        showToast(`Saved "${product.name}" to wishlist`);
      }
      return updated;
    });
  };

  // Compare handlers
  const handleToggleCompare = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCompareIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(product.id)) {
        updated.delete(product.id);
        showToast(`Removed from comparison`);
      } else {
        if (updated.size >= 4) {
          showToast(`You can compare up to 4 items max.`);
          return prev;
        }
        updated.add(product.id);
        setIsCompareOpen(true);
        showToast(`Added to comparison matrix`);
      }
      return updated;
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareIds((prev) => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  // Filtered products for search
  const displayedProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const compareProductsList = products.filter((p) => compareIds.has(p.id));
  const wishlistProductsList = products.filter((p) => wishlistIds.has(p.id));
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleOrderSuccess = (order: OrderConfirmation) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    showToast(`Order #${order.orderId} placed successfully!`);
  };

  const handleHeroShopNow = (cat = 'fashion') => {
    setActiveCategory(cat);
    const el = document.getElementById('main-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery('');
    const el = document.getElementById('main-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5FC] text-[#1F1B2E]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#1F1B2E] text-white px-4 py-3 rounded-2xl shadow-2xl border border-violet-800/40 flex items-center space-x-2.5 animate-in slide-in-from-top-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. STICKY HEADER */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={handleCategorySelect}
        onSearch={(q) => {
          setSearchQuery(q);
          const el = document.getElementById('main-catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onProductClick={(p) => setSelectedProduct(p)}
        products={products}
        activeCategory={activeCategory}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* MAIN CONTENT SECTIONS */}
      <main className="flex-1">
        
        {/* 2. HERO SECTION */}
        <HeroSection
          onShopNow={handleHeroShopNow}
          onExplorePromo={(code) => {
            setAppliedCoupon(code);
            showToast(`Promo code ${code} activated for 20% off!`);
          }}
        />

        {/* 3. TRUST BADGES ROW */}
        <TrustBadges />

        {/* 4. FEATURED CATEGORY GRID */}
        <CategoryGrid
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 5. FLASH SALE SECTION */}
        <FlashSale
          products={products}
          onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 6. PRODUCT GRID */}
        <ProductGrid
          products={displayedProducts}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
          onBuyNow={(p, e) => handleBuyNow(p, 1, undefined, undefined, e)}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          wishlistIds={wishlistIds}
          compareIds={compareIds}
        />

        {/* 7. CURATED RECOMMENDATIONS */}
        <AIRecommendations
          products={products}
          onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 8. DEALS & OFFERS */}
        <DealsGrid
          onApplyCoupon={(code) => {
            setAppliedCoupon(code);
            showToast(`Voucher ${code} copied & activated!`);
          }}
        />

        {/* 9. BRAND SHOWCASE */}
        <BrandShowcase />

        {/* 10. SOCIAL PROOF */}
        <SocialProof />

      </main>

      {/* 11. FOOTER */}
      <Footer />

      {/* 12. MOBILE-SPECIFIC UX: Persistent Bottom Navigation */}
      <MobileNav
        activeTab={mobileActiveNav}
        setActiveTab={setMobileActiveNav}
        wishlistCount={wishlistIds.size}
        onOpenCategories={() => {
          const el = document.getElementById('category-tile-fashion');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty, col, sz) => {
          handleAddToCart(prod, qty, col, sz);
          setSelectedProduct(null);
        }}
        onBuyNow={(prod, qty, col, sz) => {
          handleAddToCart(prod, qty, col, sz);
          setSelectedProduct(null);
          setIsCheckoutOpen(true);
        }}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => {
          setAppliedCoupon(code);
          showToast(`Promo ${code} applied!`);
        }}
      />

      {/* ONE-PAGE CHECKOUT FLOW */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* COMPARE DRAWER */}
      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareProductsList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={(p) => handleAddToCart(p)}
        onClearAll={() => setCompareIds(new Set())}
      />

      {/* WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistProductsList}
        onRemoveFromWishlist={(p) => handleToggleWishlist(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* ORDERS MODAL */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* ACCOUNT MODAL */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        wishlistCount={wishlistIds.size}
        orderCount={orders.length}
      />

    </div>
  );
}
