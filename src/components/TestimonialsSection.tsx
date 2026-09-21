import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getTestimonials, getHomePageContent } from '../lib/content';

export const TestimonialsSection: React.FC = () => {
  const testimonials = getTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const homeData = getHomePageContent();
  const sectionContent = homeData.testimonialsSection;

  if (!testimonials || testimonials.length === 0) return null;

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden bg-[#050807]">
      {/* Background Subtle Green Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 w-[550px] h-[550px] bg-[#B7FF00]/8 rounded-full blur-[170px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-10 w-[450px] h-[450px] bg-[#142611]/30 rounded-full blur-[150px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md mb-4 shadow-lg shadow-black/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8] tracking-tight">
              {sectionContent?.sectionLabel || 'Proven Defense'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {sectionContent?.heading || 'Trusted By Industry CISOs'}
          </h2>
        </div>

        {/* Large Editorial Testimonial Layout Container */}
        <div className="relative rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl shadow-black/90">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: Circular customer portrait with neon-green circular outline + quote badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
                
                {/* Neon-Green Circular Outline */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-[#B7FF00]/50 shadow-[0_0_25px_rgba(183,255,0,0.25)] animate-pulse"
                />
                
                {/* Secondary subtle framing ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-2.5 rounded-full border border-white/10"
                />

                {/* Circular Customer Portrait */}
                <div className="relative w-44 h-44 sm:w-54 sm:h-54 rounded-full overflow-hidden border-2 border-[#050807] shadow-2xl bg-[#050807]">
                  <img
                    src={current.avatarUrl}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote icon in a green circular badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#B7FF00] text-[#050807] flex items-center justify-center shadow-xl shadow-[#B7FF00]/40 z-10">
                  <Quote className="w-5 h-5 fill-[#050807]" />
                </div>
              </div>
            </div>

            {/* RIGHT: Five small green stars + Testimonial quote + Customer + Role + Controls */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              
              {/* Five Small Green Stars */}
              <div className="flex items-center gap-1.5" aria-label={`${current.rating || 5} out of 5 stars`}>
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#B7FF00] fill-[#B7FF00]"
                  />
                ))}
                {current.highlightMetric && (
                  <span className="ml-3 text-xs font-mono text-[#B7FF00] bg-[#B7FF00]/10 px-2.5 py-1 rounded-full border border-[#B7FF00]/20">
                    {current.highlightMetric}
                  </span>
                )}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-[#E9ECE8] font-normal leading-relaxed">
                "{current.quote}"
              </blockquote>

              {/* Bottom Row: Name/Role & Previous/Next Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base sm:text-lg font-bold text-[#FFFFFF]">
                    {current.name}
                  </div>
                  <div className="text-xs sm:text-sm text-[#9AA39A]">
                    {current.role} • <span className="text-[#B7FF00]">{current.company}</span>
                  </div>
                </div>

                {/* Previous & Next Circular Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#E9ECE8] border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-[#9AA39A]">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#E9ECE8] border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
