import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavigation } from '../../lib/content';

interface NavigationProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onItemClick, isMobile = false }) => {
  const navConfig = getNavigation();
  const navItems = navConfig.mainNav && navConfig.mainNav.length > 0 ? navConfig.mainNav : [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Team', href: '/team' },
    { label: 'Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  if (isMobile) {
    return (
      <nav aria-label="Mobile Menu" className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            onClick={onItemClick}
            className={({ isActive }) =>
              `py-3 px-4 rounded-2xl text-sm font-medium transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-[#B7FF00] text-[#050807] font-bold shadow-lg shadow-[#B7FF00]/20'
                  : 'text-[#9AA39A] hover:bg-white/[0.055] hover:text-[#FFFFFF]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#050807]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Main Navigation"
      className="hidden md:flex items-center bg-[#070A08]/75 backdrop-blur-xl border border-white/[0.09] px-7 py-2 rounded-full shadow-2xl shadow-black/80 gap-7 lg:gap-8 transition-all"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === '/'}
          onClick={onItemClick}
          className={({ isActive }) =>
            `text-xs lg:text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer whitespace-nowrap select-none ${
              isActive
                ? 'text-[#B7FF00] font-semibold'
                : 'text-[#9AA39A] hover:text-[#FFFFFF]'
            }`
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-1.5">
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#B7FF00] shadow-[0_0_8px_#B7FF00]"></span>
              )}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
