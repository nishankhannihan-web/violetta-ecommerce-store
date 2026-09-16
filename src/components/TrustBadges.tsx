import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import { TRUST_BADGES } from '../data/mockData';

export const TrustBadges: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-[#7C3AED]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-[#7C3AED]" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-[#7C3AED]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {TRUST_BADGES.map((badge, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E9E5F5] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-3.5 group"
            id={`trust-badge-${idx}`}
          >
            <div className="w-11 h-11 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center shrink-0 transition-colors border border-violet-100">
              {getIcon(badge.icon)}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#1F1B2E] truncate group-hover:text-[#7C3AED] transition-colors">
                {badge.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#6B7280] truncate mt-0.5">
                {badge.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
