import React from 'react';
import { Eye, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';
import { SOC_ROOM_IMAGE } from '../../data/mockData';

interface ShowcaseSectionProps {
  onExploreCaseStudy?: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onExploreCaseStudy }) => {
  return (
    <section id="showcase" className="py-24 md:py-32 relative overflow-hidden bg-[#050807]">
      {/* Ambient background green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#B7FF00]/10 rounded-full blur-[170px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md mb-4 shadow-lg shadow-black/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8] tracking-tight">
              Operational Showcase
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#FFFFFF] tracking-tight leading-tight">
            See Defense In Action
          </h2>
        </div>

        {/* Large Rounded Image Container resembling a premium cybersecurity campaign */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#070A08] shadow-2xl shadow-black/90 group">
          
          {/* Main Cinematic Visual */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full overflow-hidden bg-[#050807]">
            <picture className="w-full h-full">
              <source
                type="image/webp"
                srcSet="/images/soc_war_room_1789575925158-480.webp 480w, /images/soc_war_room_1789575925158-800.webp 800w, /images/soc_war_room_1789575925158.webp 1376w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
              <img
                src="/images/soc_war_room_1789575925158.webp"
                alt="SPECTRE DEFEND Security Operations Center and Live Threat Monitoring"
                width={1376}
                height={768}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out brightness-90 contrast-105"
              />
            </picture>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#050807]/20 to-[#050807]/80 pointer-events-none" />

            {/* Overlaid Small Glass Information Panels:
                1. "Threat Intelligence"
                2. "24/7 Monitoring"
                3. "Active Protection"
            */}

            {/* Panel 1: Threat Intelligence (Top-Left) */}
            <div className="absolute top-5 sm:top-8 left-5 sm:left-8 bg-[#070A08]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black max-w-[240px] sm:max-w-xs transition-all hover:border-[#B7FF00]/40">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-7 h-7 rounded-xl bg-[#B7FF00]/15 border border-[#B7FF00]/30 text-[#B7FF00] flex items-center justify-center shrink-0">
                  <Cpu className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF] font-mono tracking-tight">
                  Threat Intelligence
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#9AA39A] leading-relaxed">
                Continuous global telemetry classifying zero-day anomalies and behavioral signatures.
              </p>
            </div>

            {/* Panel 2: 24/7 Monitoring (Top-Right) */}
            <div className="absolute top-5 sm:top-8 right-5 sm:right-8 bg-[#070A08]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black max-w-[240px] sm:max-w-xs transition-all hover:border-[#B7FF00]/40">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-7 h-7 rounded-xl bg-[#B7FF00]/15 border border-[#B7FF00]/30 text-[#B7FF00] flex items-center justify-center shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF] font-mono tracking-tight">
                  24/7 Monitoring
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#9AA39A] leading-relaxed">
                Elite SOC engineers providing non-stop surveillance over mission-critical workloads.
              </p>
            </div>

            {/* Panel 3: Active Protection (Bottom-Left / Bottom-Center on mobile) */}
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 bg-[#070A08]/90 backdrop-blur-xl border border-[#B7FF00]/30 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black max-w-[280px] sm:max-w-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-7 h-7 rounded-xl bg-[#B7FF00] text-[#050807] flex items-center justify-center shrink-0 shadow-md shadow-[#B7FF00]/30 font-bold">
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF] font-mono tracking-tight">
                  Active Protection
                </span>
                <span className="ml-auto text-[10px] font-mono bg-[#B7FF00]/15 text-[#B7FF00] px-2 py-0.5 rounded-full border border-[#B7FF00]/30">
                  ENGAGED
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#E9ECE8] leading-relaxed">
                Autonomous zero-trust quarantine mitigating ingress payloads in under 12 milliseconds.
              </p>
            </div>

            {/* Bottom-Right Live Telemetry HUD Tag */}
            <div className="hidden sm:flex absolute bottom-5 sm:bottom-8 right-5 sm:right-8 items-center gap-3 bg-[#050807]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-[#E9ECE8]">
              <Activity className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span>SOC TELEMETRY: 99.999% INTEGRITY</span>
              {onExploreCaseStudy && (
                <button
                  onClick={onExploreCaseStudy}
                  className="ml-2 text-[#B7FF00] hover:underline cursor-pointer font-bold"
                >
                  Inspect Node →
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
