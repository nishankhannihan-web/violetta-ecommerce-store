import React from 'react';
import { Home, Grid, Heart, Package, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'home' | 'categories' | 'wishlist' | 'orders' | 'account';
  setActiveTab: (tab: 'home' | 'categories' | 'wishlist' | 'orders' | 'account') => void;
  wishlistCount: number;
  onOpenCategories: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenAccount: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenCategories,
  onOpenWishlist,
  onOpenOrders,
  onOpenAccount,
}) => {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E9E5F5] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
      aria-label="Mobile Navigation"
      id="mobile-persistent-nav"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#7C3AED] font-bold' : 'text-[#6B7280]'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            setActiveTab('categories');
            onOpenCategories();
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'categories' ? 'text-[#7C3AED] font-bold' : 'text-[#6B7280]'
          }`}
          id="mobile-nav-categories"
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Categories</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            setActiveTab('wishlist');
            onOpenWishlist();
          }}
          className={`relative flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'wishlist' ? 'text-[#7C3AED] font-bold' : 'text-[#6B7280]'
          }`}
          id="mobile-nav-wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#7C3AED] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => {
            setActiveTab('orders');
            onOpenOrders();
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'orders' ? 'text-[#7C3AED] font-bold' : 'text-[#6B7280]'
          }`}
          id="mobile-nav-orders"
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Orders</span>
        </button>

        {/* Account */}
        <button
          onClick={() => {
            setActiveTab('account');
            onOpenAccount();
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'account' ? 'text-[#7C3AED] font-bold' : 'text-[#6B7280]'
          }`}
          id="mobile-nav-account"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Account</span>
        </button>
      </div>
    </nav>
  );
};
