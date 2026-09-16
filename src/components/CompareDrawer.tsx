import React from 'react';
import { Product } from '../types';
import { X, Check, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onClearAll: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onAddToCart,
  onClearAll,
}) => {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t-2 border-[#7C3AED] shadow-2xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5] mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#1F1B2E]">
              Product Comparison Matrix ({products.length}/4)
            </h3>
            <p className="text-xs text-[#6B7280]">Side-by-side specifications, prices, and feature ratings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Clear Comparison
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1F1B2E] hover:bg-[#F7F5FC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#F7F5FC] p-4 rounded-2xl border border-[#E9E5F5] flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-white">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemoveFromCompare(p.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                  {p.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F1B2E] line-clamp-2 mt-0.5">
                  {p.name}
                </h4>
                <div className="text-base font-black text-[#7C3AED] mt-1">
                  ${p.price}
                </div>

                {/* Specs List */}
                <div className="mt-3 pt-3 border-t border-[#E9E5F5] text-[11px] space-y-1">
                  {Object.entries(p.specs).slice(0, 3).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[#6B7280]">
                      <span className="font-medium truncate mr-1">{k}:</span>
                      <span className="font-bold text-[#1F1B2E] truncate">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onAddToCart(p)}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-violet-500/20"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
