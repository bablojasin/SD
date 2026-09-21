import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  showArrow = false,
  className = '',
  type = 'button',
  disabled = false,
  id,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-xs pl-3.5 pr-1.5 py-1.5 gap-2',
    md: 'text-xs sm:text-sm pl-5 pr-2 py-2 gap-2.5',
    lg: 'text-sm sm:text-base pl-6 pr-2.5 py-3 gap-3.5',
  };

  const variantClasses = {
    primary:
      'bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] shadow-lg shadow-[#B7FF00]/25 font-bold',
    secondary:
      'bg-white/[0.055] hover:bg-white/[0.09] text-[#E9ECE8] hover:text-[#FFFFFF] border border-white/10 shadow-md backdrop-blur-md',
    outline:
      'bg-transparent hover:bg-[#B7FF00]/10 text-[#B7FF00] border border-[#B7FF00]/50 hover:border-[#B7FF00]',
    ghost:
      'bg-transparent hover:bg-white/[0.055] text-[#9AA39A] hover:text-[#FFFFFF]',
  };

  const arrowCircleSize = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const arrowIconSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span
          className={`${arrowCircleSize[size]} rounded-full flex items-center justify-center shrink-0 ${
            variant === 'primary' ? 'bg-[#050807] text-[#B7FF00]' : 'bg-white/10 text-[#FFFFFF]'
          }`}
        >
          <ArrowRight className={arrowIconSize[size]} />
        </span>
      )}
    </>
  );

  const combinedClass = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} id={id}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} id={id} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClass} id={id}>
      {content}
    </button>
  );
};
