import React from 'react';
import { Link } from 'react-router-dom';
import { getSiteSettings, getBranding } from '../../lib/content';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'primary' | 'symbol' | 'light' | 'dark' | 'monochrome' | 'white' | 'black';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'symbol',
}) => {
  const siteSettings = getSiteSettings();
  const branding = getBranding();
  const brandName = branding?.brandName || 'SPECTRE DEFEND';

  // Resolve logo file source according to requested variant and CMS settings
  let logoSrc = branding?.symbolLogo || siteSettings?.logoImage || '/logo-symbol.svg';
  if (variant === 'primary') {
    logoSrc = branding?.primaryLogo || branding?.logoImage || '/logo.svg';
  } else if (variant === 'light') {
    logoSrc = branding?.lightLogo || '/logo-light.svg';
  } else if (variant === 'dark') {
    logoSrc = branding?.darkLogo || '/logo-dark.svg';
  } else if (variant === 'white' || variant === 'monochrome') {
    logoSrc = branding?.whiteLogo || branding?.monochromeLogo || '/logo-white.svg';
  } else if (variant === 'black') {
    logoSrc = branding?.blackLogo || '/logo-black.svg';
  } else {
    logoSrc = branding?.symbolLogo || '/logo-symbol.svg';
  }

  const isLightVariant = variant === 'light';
  const isMonochromeBlack = variant === 'black';

  const sizeClasses = {
    sm: {
      box: 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg',
      spectreText: 'text-[13px] sm:text-[14px] tracking-[0.14em]',
      defendText: 'text-[7.5px] sm:text-[8px] tracking-[0.38em]',
    },
    md: {
      box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
      spectreText: 'text-[15px] sm:text-[17px] tracking-[0.15em]',
      defendText: 'text-[8.5px] sm:text-[9.5px] tracking-[0.42em]',
    },
    lg: {
      box: 'w-11 h-11 sm:w-13 sm:h-13 rounded-xl',
      spectreText: 'text-[19px] sm:text-[22px] tracking-[0.16em]',
      defendText: 'text-[10px] sm:text-[12px] tracking-[0.46em]',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none ${className}`}
      id="spectre-defend-brand-logo"
      aria-label={`${brandName} Home`}
    >
      {/* Symbol Icon */}
      <img
        src={logoSrc}
        alt={branding?.logoAltText || `${brandName} Emblem`}
        className={`${currentSize.box} object-contain transition-transform duration-300 group-hover:scale-105 shrink-0`}
        loading="eager"
      />

      {/* Two-Line Futuristic Wordmark: SPECTRE over DEFEND */}
      {showText && (
        <div className="hidden min-[340px]:flex flex-col leading-none select-none text-left">
          <span
            className={`${currentSize.spectreText} font-extrabold uppercase font-sans transition-colors duration-200 ${
              isLightVariant || isMonochromeBlack ? 'text-[#080D0A]' : 'text-[#FFFFFF]'
            }`}
          >
            SPECTRE
          </span>
          <span
            className={`${currentSize.defendText} font-bold uppercase font-mono mt-0.5 transition-colors duration-200 ${
              isMonochromeBlack
                ? 'text-[#080D0A]'
                : isLightVariant
                ? 'text-[#487800]'
                : 'text-[#B7FF00]'
            }`}
          >
            DEFEND
          </span>
        </div>
      )}
    </Link>
  );
};
