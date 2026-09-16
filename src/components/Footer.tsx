import React, { useState } from 'react';
import {
  Send,
  Check,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ShieldCheck,
  CreditCard,
  Smartphone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#1F1B2E] text-white pt-14 pb-24 md:pb-12 border-t border-violet-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission (takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                VIOLET<span className="text-[#7C3AED]">TA</span>
              </span>
              <span className="text-[10px] tracking-widest text-violet-300 font-semibold mt-0.5">
                ATELIER & MAISON
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              Purveyors of elevated design, modern lifestyle essentials, and refined luxury.
              Engineered with sustainable materials and carbon-neutral global delivery.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#7C3AED] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#7C3AED] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#7C3AED] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#7C3AED] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-4">
              About Violetta
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#about" className="hover:text-white transition-colors">Our Design Philosophy</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Sustainable Craftsmanship</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers & Internships</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press & Media Kit</a></li>
              <li><a href="#stores" className="hover:text-white transition-colors">Flagship Boutiques</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#help" className="hover:text-white transition-colors">24/7 Help Center</a></li>
              <li><a href="#tracking" className="hover:text-white transition-colors">Track Your Package</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Easy 30-Day Returns</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery Rates</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">Product Warranty & Care</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter signup */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
              Privilege Newsletter
            </h4>
            <p className="text-xs text-gray-300 mb-3">
              Receive $20 off your first order and priority access to secret drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 bg-white/10 rounded-xl border border-white/15 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  Welcome to Violetta Privilege! Check your inbox for $20 code.
                </p>
              )}
            </form>

            {/* App Store & Play Store Badges */}
            <div className="pt-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Download Mobile App
              </span>
              <div className="flex items-center space-x-2">
                <div className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 cursor-pointer text-[10px] font-semibold text-gray-200">
                  <Smartphone className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>App Store</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 cursor-pointer text-[10px] font-semibold text-gray-200">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Play</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
              <span>PCI-DSS Level 1 Encrypted</span>
            </span>
            <span>&copy; {new Date().getFullYear()} VIOLETTA Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
