import React from 'react';
import { BRAND_PARTNERS } from '../data/mockData';

export const BrandShowcase: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-b border-[#E9E5F5]">
      <div className="text-center mb-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C3AED]">
          Official Partner Network
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-[#1F1B2E] mt-1">
          Authorized Direct Retailer for World-Class Brands
        </h3>
      </div>

      {/* Horizontal Strip */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
        {BRAND_PARTNERS.map((brand, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-[130px] sm:min-w-[150px] py-4 px-5 rounded-2xl bg-white border border-[#E9E5F5] hover:border-[#7C3AED]/40 hover:shadow-md transition-all duration-200 text-center group cursor-pointer"
            id={`brand-strip-${idx}`}
          >
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-[#1F1B2E]/75 group-hover:text-[#7C3AED] transition-colors">
              {brand.logoText}
            </span>
            <p className="text-[10px] text-[#6B7280] font-medium mt-0.5 group-hover:text-[#1F1B2E]">
              {brand.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
