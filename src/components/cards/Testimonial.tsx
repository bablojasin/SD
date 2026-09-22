import React from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialProps {
  item: TestimonialItem;
  onPrev?: () => void;
  onNext?: () => void;
  showControls?: boolean;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  item,
  onPrev,
  onNext,
  showControls = true,
}) => {
  return (
    <div className="bg-white/[0.055] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left: Circular Avatar with concentric glowing rings and quote badge */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <div className="absolute inset-3 rounded-full border border-[#B7FF00]/25"></div>
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#B7FF00]/15 to-emerald-500/10 blur-md"></div>

            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={item.avatarUrl}
                alt={item.name}
                width={176}
                height={176}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Neon Quote Badge */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B7FF00] text-[#050807] flex items-center justify-center shadow-lg shadow-[#B7FF00]/40">
              <Quote className="w-5 h-5 fill-[#050807]" />
            </div>
          </div>
        </div>

        {/* Right: Stars, Quote, Author, Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-1.5 text-[#B7FF00]">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#B7FF00]" />
            ))}
          </div>

          <blockquote className="text-lg sm:text-xl md:text-2xl text-[#E9ECE8] font-normal leading-relaxed">
            "{item.quote}"
          </blockquote>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-[#FFFFFF] tracking-tight">
                  {item.name}
                </div>
                <div className="text-xs text-[#9AA39A]">
                  {item.role}, <span className="text-[#B7FF00] font-medium">{item.company}</span>
                </div>
              </div>
            </div>

            {showControls && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onPrev}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full bg-white/[0.055] hover:bg-white/[0.09] border border-white/10 flex items-center justify-center text-[#E9ECE8] hover:text-[#FFFFFF] transition-all cursor-pointer active:scale-95"
                  id="testimonial-prev-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={onNext}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full bg-white/[0.055] hover:bg-white/[0.09] border border-white/10 flex items-center justify-center text-[#E9ECE8] hover:text-[#FFFFFF] transition-all cursor-pointer active:scale-95"
                  id="testimonial-next-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
