import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Bell,
  ArrowRight,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { Category, Product } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (catId: string) => void;
  onSearch: (query: string) => void;
  onProductClick: (product: Product) => void;
  products: Product[];
  activeCategory: string;
  onOpenCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  onSearch,
  onProductClick,
  products,
  activeCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [userZip, setUserZip] = useState('10001');
  const [userCity, setUserCity] = useState('New York, NY');
  const [tempZip, setTempZip] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Filter products for quick search preview
  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSearchDropdown(false);
    setMobileSearchOpen(false);
  };

  const handleZipUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempZip.trim()) {
      setUserZip(tempZip.trim());
      setUserCity(tempZip.startsWith('9') ? 'San Francisco, CA' : tempZip.startsWith('6') ? 'Chicago, IL' : 'New York, NY');
      setLocationModalOpen(false);
      setTempZip('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E9E5F5] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#7C3AED] text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Free Express Shipping on orders over $49 | Use code: <strong>VIOLET25</strong></span>
        </div>
        <div className="w-full sm:w-auto text-center sm:text-right flex items-center justify-center sm:justify-end space-x-4">
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center space-x-1 hover:text-violet-200 transition-colors cursor-pointer"
            id="header-location-btn"
          >
            <MapPin className="w-3.5 h-3.5 text-violet-200" />
            <span>Deliver to: <strong>{userCity} ({userZip})</strong></span>
          </button>
          <span className="hidden md:inline text-violet-300">|</span>
          <span className="hidden md:inline text-violet-200">24/7 Concierge: 1-800-VIOLET</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1F1B2E] hover:bg-[#F7F5FC] transition-colors"
              aria-label="Toggle mobile menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearch('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col group focus:outline-none"
              id="brand-logo-link"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F1B2E]">
                VIOLET<span className="text-[#7C3AED]">TA</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#6B7280] font-semibold -mt-1 hidden sm:block">
                PREMIUM ESSENTIALS
              </span>
            </a>
          </div>

          {/* Category Mega Menu Trigger (Desktop) */}
          <div className="hidden lg:block relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                isMegaMenuOpen
                  ? 'bg-[#F7F5FC] text-[#7C3AED] border-[#7C3AED]/30'
                  : 'text-[#1F1B2E] hover:text-[#7C3AED] border-transparent hover:bg-[#F7F5FC]'
              }`}
              id="mega-menu-trigger-btn"
            >
              <span>Categories</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#7C3AED]' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-[#E9E5F5] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-[#E9E5F5] mb-5">
                  <div>
                    <h3 className="text-base font-bold text-[#1F1B2E]">Explore Our Curated Collections</h3>
                    <p className="text-xs text-[#6B7280]">Browse over 3,000+ verified luxury & daily essentials</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCategory('all');
                      setIsMegaMenuOpen(false);
                    }}
                    className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center space-x-1"
                  >
                    <span>View Full Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {CATEGORIES.map((cat: Category) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsMegaMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all group ${
                        activeCategory === cat.id
                          ? 'bg-[#F7F5FC] text-[#7C3AED] font-semibold'
                          : 'hover:bg-[#F7F5FC] text-[#1F1B2E]'
                      }`}
                      id={`mega-menu-item-${cat.id}`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-11 h-11 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <p className="text-sm font-medium group-hover:text-[#7C3AED] transition-colors line-clamp-1">
                          {cat.name}
                        </p>
                        <p className="text-[11px] text-[#6B7280]">{cat.itemCount}+ items</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Featured banner inside mega menu */}
                <div className="mt-5 pt-4 border-t border-[#E9E5F5] bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-1 bg-[#7C3AED] text-white text-[11px] font-bold rounded-lg uppercase tracking-wider">
                      Flash Deal
                    </span>
                    <span className="text-xs font-semibold text-[#1F1B2E]">
                      Take extra 20% off all Electronics this week with code FLASH20
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCategory('electronics');
                      setIsMegaMenuOpen(false);
                    }}
                    className="text-xs font-bold text-[#7C3AED] hover:underline"
                  >
                    Shop Tech &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search products, brands, luxury watches, beauty..."
                className="w-full pl-11 pr-10 py-2.5 bg-[#F7F5FC] hover:bg-white focus:bg-white text-sm text-[#1F1B2E] placeholder-[#6B7280] rounded-xl border border-[#E9E5F5] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all outline-none"
                id="main-desktop-search-input"
              />
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F1B2E] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Predictive Search Dropdown */}
            {showSearchDropdown && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E9E5F5] overflow-hidden z-50 p-2">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Matching Products
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#E9E5F5]">
                    {searchResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onProductClick(p);
                          setShowSearchDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#F7F5FC] text-left transition-colors"
                        id={`search-result-${p.id}`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border border-[#E9E5F5]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1F1B2E] truncate">{p.name}</p>
                          <p className="text-[11px] text-[#6B7280] capitalize">{p.category}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#7C3AED]">${p.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-[#6B7280]">
                    No exact matches found for "{searchQuery}". Press Enter to view all results.
                  </div>
                )}
                <div className="p-2 border-t border-[#E9E5F5] bg-[#F7F5FC] text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#7C3AED] hover:underline"
                  >
                    View all matching results &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Location, Wishlist, Notification, Account, Cart */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-xl text-[#1F1B2E] hover:bg-[#F7F5FC] transition-colors"
              aria-label="Toggle mobile search"
              id="mobile-search-toggle"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-[#1F1B2E] hover:text-[#7C3AED] hover:bg-[#F7F5FC] transition-colors group"
              title="Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5 text-[#1F1B2E] group-hover:text-[#7C3AED] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7C3AED] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl text-[#1F1B2E] hover:text-[#7C3AED] hover:bg-[#F7F5FC] transition-colors"
                title="Notifications"
                id="header-notifications-btn"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E9E5F5] p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E9E5F5] mb-2">
                    <span className="text-xs font-bold text-[#1F1B2E]">Notifications</span>
                    <span className="text-[10px] text-[#7C3AED] font-semibold">Mark all as read</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100">
                      <div>
                        <p className="text-xs font-semibold text-[#1F1B2E]">Flash Sale Live!</p>
                        <p className="text-[11px] text-[#6B7280]">Extra 35% off Cashmere blazers & Audio gear today.</p>
                        <span className="text-[10px] text-[#7C3AED] font-medium">10 mins ago</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl hover:bg-[#F7F5FC] flex items-start space-x-2">
                      <span className="p-1 rounded-md bg-emerald-500 text-white mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-[#1F1B2E]">Order Dispatched</p>
                        <p className="text-[11px] text-[#6B7280]">Package #VT-89201 is out for delivery with FedEx.</p>
                        <span className="text-[10px] text-[#6B7280]">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="p-2.5 rounded-xl text-[#1F1B2E] hover:text-[#7C3AED] hover:bg-[#F7F5FC] transition-colors flex items-center space-x-1"
                title="My Account"
                id="header-account-btn"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold">Account</span>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E9E5F5] p-3 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-[#E9E5F5] mb-2">
                    <p className="text-xs font-bold text-[#1F1B2E]">Sophia Reynolds</p>
                    <p className="text-[11px] text-[#6B7280]">VIP Platinum Tier</p>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setAccountMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#F7F5FC] text-[#1F1B2E] font-medium"
                    >
                      Order History & Tracking
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#F7F5FC] text-[#1F1B2E] font-medium"
                    >
                      Saved Wishlist ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setLocationModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#F7F5FC] text-[#1F1B2E] font-medium"
                    >
                      Shipping Addresses
                    </button>
                    <button
                      onClick={() => setAccountMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#F7F5FC] text-[#1F1B2E] font-medium"
                    >
                      Violet Rewards (840 pts)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button with Violet Badge */}
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm transition-all shadow-md shadow-violet-500/20 active:scale-95 cursor-pointer"
              aria-label="View Shopping Cart"
              id="header-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-white text-[#7C3AED] text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {mobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-[#E9E5F5] animate-in slide-in-from-top-2 duration-150">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all products..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#F7F5FC] text-sm text-[#1F1B2E] rounded-xl border border-[#E9E5F5] focus:border-[#7C3AED] outline-none"
                id="mobile-search-input"
              />
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Category & Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E9E5F5] bg-white px-4 py-4 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">All Categories</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-[#6B7280]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                activeCategory === 'all'
                  ? 'bg-violet-50 border-[#7C3AED] text-[#7C3AED] font-bold'
                  : 'border-[#E9E5F5] text-[#1F1B2E]'
              }`}
            >
              <span className="text-sm">🌟 All Products</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left border flex items-center space-x-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-violet-50 border-[#7C3AED] text-[#7C3AED] font-bold'
                    : 'border-[#E9E5F5] text-[#1F1B2E]'
                }`}
                id={`mobile-cat-item-${cat.id}`}
              >
                <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-xs font-medium line-clamp-1">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#F7F5FC] rounded-xl space-y-2 text-xs">
            <button
              onClick={() => {
                setLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-[#1F1B2E] w-full py-1 font-medium"
            >
              <MapPin className="w-4 h-4 text-[#7C3AED]" />
              <span>Deliver to: {userCity} ({userZip})</span>
            </button>
            <div className="flex items-center justify-between pt-2 border-t border-[#E9E5F5] text-[#6B7280]">
              <span>Customer Help: 24/7</span>
              <span className="font-semibold text-[#7C3AED]">Live Chat</span>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#E9E5F5] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5] mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#7C3AED]" />
                <h3 className="font-bold text-base text-[#1F1B2E]">Choose Delivery Location</h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="text-[#6B7280] hover:text-[#1F1B2E] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#6B7280] mb-4">
              Enter your postal code to see real-time delivery dates, stock availability, and shipping promotions.
            </p>
            <form onSubmit={handleZipUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F1B2E] mb-1">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  value={tempZip}
                  onChange={(e) => setTempZip(e.target.value)}
                  placeholder="e.g. 10001, 94103, 60601"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5F5] focus:border-[#7C3AED] text-sm outline-none"
                  autoFocus
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E9E5F5] text-xs font-bold text-[#1F1B2E] hover:bg-[#F7F5FC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20"
                >
                  Update Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
