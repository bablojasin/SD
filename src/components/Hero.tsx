import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ShieldCheck, Lock, Activity, Crosshair, Share2, Cloud } from 'lucide-react';
import { HERO_CYBER_SHIELD } from '../data/mockData';
import { getHomePageContent } from '../lib/content';

interface HeroProps {
  onStartProtection: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProtection, onSelectService }) => {
  const [activeRow, setActiveRow] = useState<string>('cloud-security');
  const homeData = getHomePageContent();
  const hero = homeData.hero;

  const heroImageSrc = hero.image || HERO_CYBER_SHIELD;

  const serviceItems = [
    {
      id: 'threat-detection',
      serviceId: 'threat-detection',
      label: 'Threat Detection',
      icon: Crosshair,
    },
    {
      id: 'network-defense',
      serviceId: 'network-security',
      label: 'Network Defense',
      icon: Share2,
    },
    {
      id: 'cloud-security',
      serviceId: 'cloud-security',
      label: 'Cloud Security',
      icon: Cloud,
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-3 sm:pt-5 lg:pt-5 pb-8 sm:pb-10 lg:pb-12 overflow-hidden bg-[#050807] select-none"
    >
      {/* 1. BACKGROUND: Deep Charcoal/Near-Black Base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#050807]"
      />

      {/* 2. SUBTLE TECHNICAL GRID: Low-opacity cybersecurity grid with radial mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(183,255,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(183,255,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black_40%,transparent_90%)] opacity-70"
      />

      {/* 3. MULTI-LAYERED ATMOSPHERIC GREEN LIGHTING */}
      {/* Intense green glow focused directly behind the centerpiece */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-tr from-[#B7FF00]/16 via-emerald-800/12 to-transparent rounded-full blur-[140px] opacity-85"
      />
      {/* Subtle secondary ambient reflection in upper-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-[-5%] w-[500px] h-[500px] bg-[#B7FF00]/8 rounded-full blur-[150px]"
      />
      {/* Ambient vignette at bottom perimeter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050807] to-transparent opacity-90"
      />

      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full">
        {/* =========================================================================
            UNIFIED 3-ZONE HERO COMPOSITION:
            Left Content (34%) -> Center Cyber Visual (36%) -> Right Information Panel (30%)
            Zero large unused space; controlled tight column gap
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[34fr_36fr_30fr] gap-6 lg:gap-3 xl:gap-5 items-center">
          
          {/* =====================================================================
              1. LEFT CONTENT: Eyebrow + Headline + Description + Actions
             ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center text-left z-10 lg:pr-1"
          >
            {/* Top Left Label: Compact Dark Glass Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#070B08]/90 border border-white/[0.1] shadow-lg shadow-black/80 mb-3.5 sm:mb-4 w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00] shadow-[0_0_8px_#B7FF00]"></span>
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#FFFFFF] tracking-tight whitespace-nowrap">
                {hero.smallLabel || 'Protect Your Digital World 24/7 From Cyber Threats'}
              </span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-[clamp(2.4rem,3.2vw+0.6rem,4.4rem)] font-black tracking-[-0.035em] text-[#FFFFFF] leading-[0.98]">
              {hero.headlinePrimary || 'Defend Your'} <br />
              <span className="text-[#B7FF00]">
                {hero.headlineHighlight || 'Digital World'}
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="mt-3.5 sm:mt-4 text-[#9AA39A] text-xs sm:text-sm lg:text-[13.5px] xl:text-sm leading-relaxed max-w-[390px]">
              {hero.description ||
                'Advanced cybersecurity solutions to detect, prevent and stop digital threats before they become breaches.'}
            </p>

            {/* Action CTAs */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartProtection}
                id="hero-start-defending-today-btn"
                className="group inline-flex items-center justify-center font-bold text-xs sm:text-sm pl-4.5 sm:pl-5 pr-2 py-2.5 rounded-full bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] shadow-lg shadow-[#B7FF00]/25 hover:shadow-[#B7FF00]/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{hero.primaryButtonText || 'Start Defending Today'}</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center shrink-0 ml-2.5 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectService('threat-detection')}
                id="hero-explore-services-btn"
                className="group inline-flex items-center justify-center font-semibold text-xs sm:text-sm px-4 sm:px-4.5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#E9ECE8] hover:text-[#FFFFFF] border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Services</span>
                <span className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center ml-2 group-hover:bg-white/10 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* =====================================================================
              2. CENTER CYBER VISUAL: 3D Shield + Heavy Padlock + Pedestal + HUD Badges
              Direct visual bridge between left content and right panel
             ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.58, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center w-full z-20 py-2 lg:py-0"
          >
            {/* Top HUD Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070B08]/90 border border-white/[0.12] shadow-lg shadow-black/80 text-[10px] sm:text-[11px] font-mono font-medium text-white mb-1.5 sm:mb-2 z-20">
              <Lock className="w-3 h-3 text-[#B7FF00]" />
              <span>HARDWARE-ENCRYPTED LOCK</span>
            </div>

            {/* The 3D Shield Visual Asset seamlessly embedded with natural dark background */}
            <div
              className="relative w-full max-w-[390px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[530px] aspect-[1200/896] group"
              id="hero-3d-cyber-shield-container"
            >
              {/* Radial edge glow behind the shield */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 bg-gradient-to-tr from-[#B7FF00]/20 via-emerald-600/10 to-transparent rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700"
              />

              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/hero_cyber_defense_shield_1789577844799-480.webp 480w, /images/hero_cyber_defense_shield_1789577844799-800.webp 800w, /images/hero_cyber_defense_shield_1789577844799-1200.webp 1200w, /images/hero_cyber_defense_shield_1789577844799.webp 1200w"
                  sizes="(max-width: 640px) 390px, (max-width: 1024px) 480px, 530px"
                />
                <img
                  src="/images/hero_cyber_defense_shield_1789577844799.webp"
                  alt={hero.imageAlt || "SPECTRE DEFEND 3D Cyber-Defense Shield with Heavy Metallic Padlock"}
                  width={1200}
                  height={896}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </picture>

              {/* Bottom HUD Badge: Positioned at the pedestal base */}
              <div className="absolute -bottom-2 sm:bottom-1 left-2 sm:left-6 lg:left-0 xl:left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070B08]/95 border border-[#B7FF00]/40 shadow-xl shadow-black text-[9.5px] sm:text-[10.5px] font-mono text-[#B7FF00] z-20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
                <span>AUTONOMOUS PERIMETER. SECURE.</span>
              </div>
            </div>
          </motion.div>

          {/* =====================================================================
              3. RIGHT INFORMATION PANEL: 20K+ & Live Telemetry & Services & Radar & Action CTA
             ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center lg:justify-end z-10"
          >
            <div
              className="w-full max-w-[370px] sm:max-w-[390px] lg:max-w-[340px] xl:max-w-[375px] 2xl:max-w-[390px] bg-[#070B08]/95 border border-white/[0.1] border-t-[#B7FF00]/40 border-l-[#B7FF00]/40 shadow-[0_0_35px_rgba(183,255,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl p-4 sm:p-5 rounded-[24px] sm:rounded-[28px] relative overflow-hidden"
              id="hero-stats-card"
            >
              {/* Subtle internal atmospheric reflection */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 bg-[#B7FF00]/12 rounded-full blur-2xl"
              />

              {/* Statistics Header: 20K+ & Live Telemetry badge */}
              <div className="mb-3.5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight font-sans leading-none">
                      {hero.statsNumber || 'Continuous'}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9AA39A] font-semibold tracking-[0.22em] uppercase font-mono mt-1">
                      {hero.statsLabel || 'DEFENSE VIGILANCE'}
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#B7FF00] bg-[#050807] px-2.5 py-1 rounded-full border border-[#B7FF00]/30 shadow-sm shadow-[#B7FF00]/10">
                    <Activity className="w-3.5 h-3.5 text-[#B7FF00] animate-pulse" />
                    <span>{hero.statsBadge || 'Live Telemetry'}</span>
                  </span>
                </div>
              </div>

              {/* Three Interactive Service Rows */}
              <div className="space-y-2 mb-3.5">
                {serviceItems.map((item) => {
                  const isActive = activeRow === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveRow(item.id);
                        onSelectService(item.serviceId);
                      }}
                      id={`hero-service-${item.id}`}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-[#B7FF00] text-[#050807] font-bold shadow-md shadow-[#B7FF00]/25'
                          : 'bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[#B7FF00]/30 text-[#D8DCD8] hover:text-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-[#050807]' : 'text-[#B7FF00]'
                          }`}
                        />
                        <span className="text-xs sm:text-[13px] font-semibold">
                          {item.label}
                        </span>
                      </div>

                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isActive
                            ? 'bg-[#050807] text-[#B7FF00]'
                            : 'bg-white/[0.06] border border-white/10 text-[#9AA39A] group-hover:text-white group-hover:border-white/25'
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Card Bottom Sub-section: Circular Radar + Description text */}
              <div className="pt-3 pb-2 border-t border-white/[0.08] grid grid-cols-[105px_1fr] sm:grid-cols-[115px_1fr] gap-2.5 items-center">
                {/* Left: The Circular Radar graphic */}
                <div className="flex flex-col items-center select-none">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
                    {/* Atmospheric glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[#B7FF00]/15 rounded-full blur-md"
                    />

                    {/* Circular Typography rotating gently */}
                    <svg
                      className="w-full h-full motion-safe:animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
                      viewBox="0 0 200 200"
                    >
                      <defs>
                        <path
                          id="radarCirclePath"
                          d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                          fill="none"
                        />
                      </defs>
                      {/* Outer dashed border */}
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        stroke="#B7FF00"
                        strokeWidth="1.5"
                        strokeDasharray="3 6"
                        opacity="0.35"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="68"
                        fill="none"
                        stroke="#B7FF00"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                      <text
                        fill="#B8C0B8"
                        fontSize="13"
                        letterSpacing="4"
                        fontWeight="700"
                        className="font-mono uppercase"
                      >
                        <textPath href="#radarCirclePath" startOffset="0%">
                          • DETECT • RESPOND • DEFEND •
                        </textPath>
                      </text>
                    </svg>

                    {/* Center Arrow */}
                    <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#070B08] border border-[#B7FF00]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center text-[#B7FF00] shadow-md shadow-black">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
                    </div>
                  </div>

                  <span className="text-[7.5px] sm:text-[8px] font-mono text-[#B7FF00] tracking-wider uppercase bg-[#050807] px-1.5 py-0.5 rounded border border-[#B7FF00]/30 mt-1 whitespace-nowrap">
                    ZERO-TRUST MESH ACTIVE
                  </span>
                </div>

                {/* Right: Informational text */}
                <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-[#9AA39A] pl-2.5 border-l border-white/[0.08]">
                  Your digital infrastructure deserves the highest level of protection. Spectre Defend delivers advanced cyber defense solutions designed to keep your business secure.
                </p>
              </div>

              {/* Bottom Full-width CTA Button */}
              <div className="mt-3 pt-1">
                <button
                  type="button"
                  onClick={onStartProtection}
                  id="hero-panel-cta-btn"
                  className="w-full py-2.5 px-4 rounded-full bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2 shadow-lg shadow-[#B7FF00]/25 hover:shadow-[#B7FF00]/35 transition-all duration-200 cursor-pointer group active:scale-98"
                >
                  <span>Start Defending Today</span>
                  <span className="w-5 h-5 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
