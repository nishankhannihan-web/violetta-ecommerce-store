import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E9E5F5] animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E9E5F5] flex items-center justify-between bg-[#F7F5FC]/50">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 fill-[#EF4444] text-[#EF4444]" />
            <h3 className="font-extrabold text-base text-[#1F1B2E]">
              My Saved Wishlist ({products.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#1F1B2E] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-[#1F1B2E]">Your wishlist is empty</h4>
              <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                Tap the heart icon on any product in our catalog to save it for later.
              </p>
            </div>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-[#F7F5FC] border border-[#E9E5F5] flex space-x-3 items-center"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E9E5F5] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1F1B2E] truncate">{p.name}</h4>
                  <p className="text-xs font-black text-[#7C3AED] mt-0.5">${p.price}</p>
                </div>
                <div className="flex flex-col space-y-1.5 shrink-0">
                  <button
                    onClick={() => onAddToCart(p)}
                    className="p-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-colors flex items-center justify-center shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2 rounded-xl bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 border border-[#E9E5F5] transition-colors flex items-center justify-center"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E9E5F5] bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#F7F5FC] hover:bg-violet-50 text-[#7C3AED] font-bold text-xs border border-[#E9E5F5]"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
