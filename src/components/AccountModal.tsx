import React from 'react';
import { X, User, Award, MapPin, Heart, Shield, Bell, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount: number;
  orderCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  wishlistCount,
  orderCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E9E5F5] overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header with profile cover */}
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3.5 mt-2">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center text-white font-black text-xl shadow-lg">
              SR
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Sophia Reynolds</h3>
              <p className="text-xs text-violet-200">VIP Platinum Tier Member</p>
              <div className="mt-1 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold inline-flex">
                <Award className="w-3 h-3 text-amber-300" />
                <span>840 Violetta Loyalty Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Menu Items */}
        <div className="p-5 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-[#F7F5FC] p-3 rounded-xl border border-[#E9E5F5] text-center">
              <span className="text-lg font-black text-[#7C3AED]">{orderCount}</span>
              <p className="text-[11px] text-[#6B7280]">Active Orders</p>
            </div>
            <div className="bg-[#F7F5FC] p-3 rounded-xl border border-[#E9E5F5] text-center">
              <span className="text-lg font-black text-[#7C3AED]">{wishlistCount}</span>
              <p className="text-[11px] text-[#6B7280]">Saved Wishlist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full p-3 rounded-xl hover:bg-[#F7F5FC] text-[#1F1B2E] flex items-center justify-between transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-[#7C3AED]" />
              <span className="font-semibold">Saved Addresses (10001 New York)</span>
            </div>
            <span className="text-xs text-[#6B7280]">&rarr;</span>
          </button>

          <button
            onClick={onClose}
            className="w-full p-3 rounded-xl hover:bg-[#F7F5FC] text-[#1F1B2E] flex items-center justify-between transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-[#7C3AED]" />
              <span className="font-semibold">Security & 2-Factor Auth</span>
            </div>
            <span className="text-xs text-[#6B7280]">&rarr;</span>
          </button>

          <button
            onClick={onClose}
            className="w-full p-3 rounded-xl hover:bg-[#F7F5FC] text-[#1F1B2E] flex items-center justify-between transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-4 h-4 text-[#7C3AED]" />
              <span className="font-semibold">Notification & Sale Preferences</span>
            </div>
            <span className="text-xs text-[#6B7280]">&rarr;</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E9E5F5] bg-[#F7F5FC] flex items-center justify-between">
          <span className="text-[11px] text-[#6B7280]">Account #VT-992-VIP</span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#7C3AED] hover:underline flex items-center space-x-1"
          >
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
};
