import React, { useState } from 'react';
import { CUSTOMER_REVIEWS, VIDEO_TESTIMONIALS } from '../data/mockData';
import { Review, VideoProof } from '../types';
import { Star, CheckCircle2, Play, ThumbsUp, X } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoProof | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Over 45,000+ 5-Star Reviews</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2E] tracking-tight">
          Loved by Connoisseurs Worldwide
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5">
          Real feedback from our global community of design and quality enthusiasts
        </p>
      </div>

      {/* Customer Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
        {CUSTOMER_REVIEWS.map((rev: Review) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 border border-[#E9E5F5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            id={`review-card-${rev.id}`}
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-[#1F1B2E] ml-1">5.0</span>
              </div>

              {/* Title & Comment */}
              <h4 className="text-sm font-bold text-[#1F1B2E] mb-1.5 line-clamp-1">
                "{rev.title}"
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                {rev.comment}
              </p>
            </div>

            {/* Author info */}
            <div className="mt-4 pt-3 border-t border-[#E9E5F5] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-8 h-8 rounded-full object-cover border border-violet-200"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-[#1F1B2E]">{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-100" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#6B7280]">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-[10px] text-[#6B7280]">
                <ThumbsUp className="w-3 h-3 text-[#7C3AED]" />
                <span>{rev.helpfulCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Testimonials Section */}
      <div className="bg-[#F7F5FC] rounded-3xl p-6 sm:p-8 border border-[#E9E5F5]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1F1B2E]">
              Community Unboxings & First Looks
            </h3>
            <p className="text-xs text-[#6B7280]">Watch authentic experiences from our community</p>
          </div>
          <span className="text-xs font-bold text-[#7C3AED]">HD Verified Stream</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VIDEO_TESTIMONIALS.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#E9E5F5]"
              id={`video-testimonial-${video.id}`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Play Icon Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#7C3AED] group-hover:bg-[#6D28D9] text-white flex items-center justify-center shadow-lg shadow-violet-900/50 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Duration & Views Badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                {video.duration}
              </div>

              {/* Title & Author at bottom */}
              <div className="absolute inset-x-3 bottom-3 text-white">
                <p className="text-xs font-bold line-clamp-1 group-hover:text-violet-200 transition-colors">
                  {video.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-300 mt-0.5">
                  <span>{video.author}</span>
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F1B2E] rounded-2xl overflow-hidden max-w-2xl w-full border border-violet-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <h4 className="text-sm font-bold truncate">{activeVideo.title}</h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute flex flex-col items-center text-center p-6 text-white">
                <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center mb-3 shadow-xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <p className="text-sm font-bold">{activeVideo.title}</p>
                <p className="text-xs text-gray-300 mt-1">Review by {activeVideo.author} ({activeVideo.views})</p>
                <span className="mt-3 px-3 py-1 bg-white/10 rounded-full text-[11px] text-violet-200">
                  Interactive community demo stream
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#181524] text-right">
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold"
              >
                Close Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
