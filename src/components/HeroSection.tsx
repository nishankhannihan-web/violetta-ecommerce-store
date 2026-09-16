import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Tag, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: (category?: string) => void;
  onExplorePromo: (promoCode: string) => void;
}

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  category: string;
  ctaText: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: 'MID-SEASON SALE 2026',
    title: 'Elevate Your Signature Everyday Aesthetic',
    subtitle: 'Discover masterfully tailored blazers, cashmere knitwear, and timeless wardrobe investments.',
    discount: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    category: 'fashion',
    ctaText: 'Shop Season Sale',
  },
  {
    id: 2,
    tag: 'NEXT-GEN TECH RELEASE',
    title: 'Acoustic Precision Meets Spatial Immersion',
    subtitle: 'Next-generation noise cancellation, studio-grade audio fidelity, and all-day ergonomic fit.',
    discount: 'SAVE $150 TODAY',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    category: 'electronics',
    ctaText: 'Explore Audio Gear',
  },
  {
    id: 3,
    tag: 'CLEAN BEAUTY INNOVATION',
    title: 'Bio-Identical Peptide Radiance Rituals',
    subtitle: 'Clinically verified botanical formulations that restore collagen and deep cellular hydration.',
    discount: 'EXTRA 30% OFF BUNDLES',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    category: 'beauty',
    ctaText: 'Discover Skincare',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExplorePromo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        
        {/* Large Rotating Banner (8 cols desktop) */}
        <div
          className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-[#E9E5F5] group flex flex-col justify-end"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          id="hero-main-carousel"
        >
          {/* Background image with gradient overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B2E] via-[#1F1B2E]/60 to-transparent sm:bg-gradient-to-r sm:from-[#1F1B2E]/90 sm:via-[#1F1B2E]/65 sm:to-transparent" />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-2xl text-white">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-violet-200 text-xs font-bold tracking-wider uppercase mb-3">
              <span>{slide.tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-white font-extrabold">{slide.discount}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 mb-6 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onShopNow(slide.category)}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm sm:text-base flex items-center space-x-2 shadow-xl shadow-violet-900/40 hover:shadow-violet-800/60 transition-all transform active:scale-95 cursor-pointer"
                id="hero-cta-btn"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExplorePromo('VIOLET50')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center space-x-1.5"
                id="hero-promo-btn"
              >
                <Tag className="w-4 h-4 text-violet-300" />
                <span>Claim Promo Code</span>
              </button>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-xl bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
              id="hero-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-xl bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              id="hero-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Dots at Bottom */}
          <div className="absolute bottom-4 right-6 sm:right-10 z-20 flex items-center space-x-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-8 bg-[#7C3AED] shadow-md shadow-violet-500/40'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                id={`hero-dot-${idx}`}
              />
            ))}
          </div>
        </div>

        {/* 2 Smaller Stacked Promo Cards Beside It (4 cols desktop) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
          
          {/* Promo Card 1: New Collection */}
          <div
            onClick={() => onShopNow('fashion')}
            className="flex-1 relative rounded-2xl overflow-hidden border border-[#E9E5F5] shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer min-h-[190px] sm:min-h-[220px] p-6 flex flex-col justify-between"
            id="hero-promo-card-1"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                alt="New Atelier Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B2E]/90 via-[#1F1B2E]/60 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="px-2.5 py-1 rounded-md bg-[#7C3AED] text-white text-[10px] font-bold uppercase tracking-wider">
                New Drop
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-2 text-white group-hover:text-violet-200 transition-colors">
                The Violet Atelier 2026
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-[200px]">
                Minimalist tailoring & eco-certified organic silks.
              </p>
            </div>

            <div className="relative z-10 flex items-center text-xs font-bold text-violet-300 group-hover:text-white transition-colors">
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Promo Card 2: Secondary Offer */}
          <div
            onClick={() => onShopNow('watches')}
            className="flex-1 relative rounded-2xl overflow-hidden border border-[#E9E5F5] shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer min-h-[190px] sm:min-h-[220px] p-6 flex flex-col justify-between"
            id="hero-promo-card-2"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Timepieces & Sound"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B2E]/90 via-[#1F1B2E]/60 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  Member Exclusive
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-2 text-white group-hover:text-violet-200 transition-colors">
                Luxury Timepieces
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-[200px]">
                Complimentary strap kit + 3-year warranty included.
              </p>
            </div>

            <div className="relative z-10 flex items-center text-xs font-bold text-violet-300 group-hover:text-white transition-colors">
              <span>Claim Benefits</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
