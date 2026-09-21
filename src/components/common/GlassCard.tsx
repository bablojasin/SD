import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = false,
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-3xl border border-white/10 bg-white/[0.055] backdrop-blur-xl transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-[#B7FF00]/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70'
          : ''
      } ${
        glow ? 'shadow-2xl shadow-[#B7FF00]/10 border-[#B7FF00]/30' : 'shadow-xl shadow-black/70'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
