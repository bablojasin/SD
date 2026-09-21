import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  pulse = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50 select-none ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00] ring-2 ring-[#B7FF00]/25"></span>
      </span>
      <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8] tracking-wide">
        {children}
      </span>
    </div>
  );
};
