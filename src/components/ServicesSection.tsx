import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ShieldAlert,
  Network,
  Cloud,
  ScanEye,
  Flame,
  Laptop,
  Lock,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ServiceItem } from '../types';
import { getServices, getHomePageContent } from '../lib/content';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
  onExploreAll?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const navigate = useNavigate();
  const services = getServices();
  const homeData = getHomePageContent();
  const sectionContent = homeData.servicesSection;

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#B7FF00]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#B7FF00]" />;
      case 'Cloud':
      case 'CloudCheck':
        return <Cloud className="w-5 h-5 text-[#B7FF00]" />;
      case 'ScanEye':
        return <ScanEye className="w-5 h-5 text-[#B7FF00]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#B7FF00]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-[#B7FF00]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#B7FF00]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#B7FF00]" />;
      case 'Laptop':
      default:
        return <Laptop className="w-5 h-5 text-[#B7FF00]" />;
    }
  };

  const handleCardClick = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      navigate(`/services/${service.slug}`);
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-[#050807]">
      {/* Background Subtle Green Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#B7FF00]/10 rounded-full blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-5%] w-[450px] h-[450px] bg-[#142611]/35 rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          {/* Section label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md mb-4 shadow-lg shadow-black/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8] tracking-tight">
              {sectionContent?.sectionLabel || 'Our Cyber Defense'}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {sectionContent?.heading || 'Security Built For The Threats Ahead'}
          </h2>
          {sectionContent?.description && (
            <p className="text-sm sm:text-base text-[#9AA39A] mt-4 max-w-2xl mx-auto">
              {sectionContent.description}
            </p>
          )}
        </div>

        {/* 6 Premium Glass Cards: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service) => (
            <div
              key={service.slug || service.id}
              onClick={() => handleCardClick(service)}
              id={`service-card-${service.slug || service.id}`}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#070A08]/85 border border-white/10 hover:border-[#B7FF00]/40 backdrop-blur-xl shadow-xl shadow-black/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Subtle hover green glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#B7FF00]/10 rounded-full blur-2xl group-hover:bg-[#B7FF00]/25 transition-colors duration-500"
              />

              <div>
                {/* Custom Security Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#B7FF00]/40 group-hover:bg-[#B7FF00]/10 transition-all duration-300 shadow-inner">
                  {renderIcon(service.icon || service.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#B7FF00] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Concise Description */}
                <p className="text-[#9AA39A] text-sm leading-relaxed mb-6">
                  {service.shortDescription || service.description}
                </p>
              </div>

              {/* Bottom Row with Circular Arrow and Metrics */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#9AA39A] group-hover:text-[#FFFFFF] transition-colors">
                  {service.metrics ? service.metrics : 'Learn More'}
                </span>
                <span className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 text-[#9AA39A] group-hover:bg-[#B7FF00] group-hover:text-[#050807] group-hover:border-[#B7FF00] flex items-center justify-center transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
