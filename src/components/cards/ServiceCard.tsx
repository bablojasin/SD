import React from 'react';
import { ArrowRight, ShieldAlert, Laptop, Cloud, Flame, Fingerprint, ScanEye, Network, Lock, Cpu, Zap } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  onClick: () => void;
  isFeatured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, isFeatured }) => {
  const active = isFeatured ?? service.isFeatured;
  const iconKey = service.icon || service.iconName;
  const desc = service.shortDescription || service.description;

  const renderIcon = () => {
    const iconClass = active ? 'w-5 h-5 text-[#B7FF00]' : 'w-5 h-5 text-[#050807]';
    const bgClass = active ? 'bg-[#050807]' : 'bg-[#B7FF00]';

    switch (iconKey) {
      case 'ShieldAlert':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><ShieldAlert className={iconClass} /></div>;
      case 'Network':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><Network className={iconClass} /></div>;
      case 'Laptop':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg`}><Laptop className={iconClass} /></div>;
      case 'Cloud':
      case 'CloudCheck':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><Cloud className={iconClass} /></div>;
      case 'Flame':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><Flame className={iconClass} /></div>;
      case 'Fingerprint':
      case 'Lock':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><Fingerprint className={iconClass} /></div>;
      case 'Cpu':
      case 'Zap':
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><Cpu className={iconClass} /></div>;
      case 'ScanEye':
      default:
        return <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-[#B7FF00]/20`}><ScanEye className={iconClass} /></div>;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative group ${
        active
          ? 'bg-[#B7FF00] text-[#050807] shadow-2xl shadow-[#B7FF00]/25 ring-2 ring-[#B7FF00] scale-[1.02]'
          : 'bg-white/[0.055] border border-white/10 hover:border-[#B7FF00]/40 text-[#E9ECE8] backdrop-blur-xl hover:bg-white/[0.08] shadow-xl'
      }`}
      id={`service-card-${service.slug || service.id}`}
    >
      <div>
        {/* Top Icon Badge */}
        <div className="mb-6">{renderIcon()}</div>

        {/* Title */}
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${active ? 'text-[#050807]' : 'text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors'}`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${active ? 'text-[#172512] font-medium' : 'text-[#9AA39A]'}`}>
          {desc}
        </p>
      </div>

      {/* Bottom Read More Action */}
      <div className="pt-4 border-t border-current/10 flex items-center justify-between">
        <span className={`text-xs font-bold tracking-wide flex items-center gap-2 group-hover:underline ${active ? 'text-[#050807]' : 'text-[#E9ECE8]'}`}>
          Read More
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
            active
              ? 'bg-[#050807] text-[#B7FF00]'
              : 'bg-white/[0.055] text-[#E9ECE8] group-hover:bg-[#B7FF00] group-hover:text-[#050807]'
          }`}
        >
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
