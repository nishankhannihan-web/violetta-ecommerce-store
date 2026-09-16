import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-1">
            <span>Curated Departments</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1F1B2E] tracking-tight">
            Explore by Category
          </h2>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center space-x-1 group"
          id="category-view-all-btn"
        >
          <span>All Departments</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Categories Grid / Responsive Slider */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
        {CATEGORIES.map((cat: Category) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center group text-center cursor-pointer focus:outline-none"
              id={`category-tile-${cat.id}`}
            >
              {/* Circular / Rounded Tile with subtle scale/hover-lift */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 rounded-2xl sm:rounded-full p-1 transition-all duration-300 transform group-hover:-translate-y-1.5 group-hover:scale-105 shadow-sm group-hover:shadow-lg ${
                  isSelected
                    ? 'ring-3 ring-[#7C3AED] ring-offset-2 ring-offset-[#F7F5FC]'
                    : 'hover:ring-2 hover:ring-[#7C3AED]/40'
                }`}
              >
                <div className="w-full h-full rounded-xl sm:rounded-full overflow-hidden relative bg-[#E9E5F5]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-violet-900/10 group-hover:bg-violet-900/0 transition-colors" />
                </div>
              </div>

              {/* Label */}
              <span
                className={`text-xs sm:text-xs font-bold mt-2.5 max-w-[90px] line-clamp-2 leading-tight transition-colors ${
                  isSelected
                    ? 'text-[#7C3AED]'
                    : 'text-[#1F1B2E] group-hover:text-[#7C3AED]'
                }`}
              >
                {cat.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#6B7280] font-medium hidden sm:block">
                {cat.itemCount}+
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
