import React from 'react';
import { ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import { ABOUT_GLOBE_IMAGE } from '../data/mockData';
import { getHomePageContent } from '../lib/content';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const homeData = getHomePageContent();
  const aboutPreview = homeData.aboutPreview;
  const globeImage = aboutPreview?.globeImage || ABOUT_GLOBE_IMAGE;

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-[#050807]">
      {/* Ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-[#B7FF00]/10 rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Pill Badge */}
        <div className="flex items-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#B7FF00] ring-4 ring-[#B7FF00]/20"></span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8]">
              {aboutPreview?.sectionLabel || 'About SPECTRE DEFEND'}
            </span>
          </div>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3D Holographic Wireframe Globe with Shield */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.055] via-[#050807] to-[#050807] p-3 shadow-2xl group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#050807]">
                <picture className="w-full h-full">
                  <source
                    type="image/webp"
                    srcSet="/images/about_3d_globe_1789575901855-480.webp 480w, /images/about_3d_globe_1789575901855-800.webp 800w, /images/about_3d_globe_1789575901855.webp 1024w"
                    sizes="(max-width: 640px) 400px, 448px"
                  />
                  <img
                    src="/images/about_3d_globe_1789575901855.webp"
                    alt="SPECTRE DEFEND 3D Global Cyber Shield"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>

                {/* Cyber Matrix Ring Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/80 via-transparent to-transparent"></div>
                
                {/* Micro telemetry badge */}
                <div className="absolute top-4 right-4 bg-[#050807]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-mono text-[#E9ECE8]">
                  <Globe className="w-3 h-3 text-[#B7FF00]" />
                  <span>GLOBAL GRID: ACTIVE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#0A0F0A]/90 backdrop-blur-md border border-white/10 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9AA39A]">Threat Vectors Analyzed</span>
                  <span className="text-[#B7FF00] font-bold">142M+ / Day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph & Learn More Button */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-[#E9ECE8] font-normal leading-relaxed">
              At SPECTRE DEFEND, we believe cybersecurity is more than technological protocols — it is institutional trust.{' '}
              <span className="text-[#B7FF00] font-semibold underline decoration-[#B7FF00]/50 decoration-2 underline-offset-4">
                Our mission
              </span>{' '}
              is to fortify enterprises, sovereign cloud estates, and critical digital infrastructure against continuously mutating adversarial campaigns with resilient, precision defense.
            </p>

            <p className="text-sm sm:text-base text-[#9AA39A] leading-relaxed">
              {aboutPreview?.description ||
                'Traditional firewalls wait for breaches to occur. SPECTRE DEFEND deploys autonomous behavioral heuristics that intercept, microsegment, and quarantine adversarial campaigns across endpoints, sovereign clouds, and edge networks in sub-12 milliseconds.'}
            </p>

            {/* Value checklist bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E9ECE8]">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span>Autonomous Zero-Trust Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E9ECE8]">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span>24/7 Elite Incident Response Command</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E9ECE8]">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span>High-Assurance Cryptographic Tunneling</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E9ECE8]">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span>Continuous Compliance & Risk Telemetry</span>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-sm sm:text-base pl-6 pr-2 py-3 rounded-full inline-flex items-center gap-4 shadow-xl shadow-[#B7FF00]/20 active:scale-95 transition-all cursor-pointer group"
                id="about-learn-more-btn"
              >
                <span>{aboutPreview?.ctaLabel || 'Explore Security Architecture'}</span>
                <span className="w-8 h-8 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
