import React, { useState } from 'react';
import { Shield, ArrowRight, Search, Menu, X, Terminal, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenScanner: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScanner, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Team', id: 'team' },
    { label: 'Insights', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-3 pb-2.5 px-4 sm:px-6 lg:px-8 xl:px-10 transition-all bg-[#050807]/85 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-7xl xl:max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="brand-logo-btn"
          aria-label="SPECTRE DEFEND Home"
        >
          <img 
            src="/assets/brand/spectre-defend-logo-symbol.svg" 
            alt="SPECTRE DEFEND Symbol" 
            width={36}
            height={36}
            loading="eager"
            decoding="async"
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-200" 
          />
          <div className="flex flex-col leading-none text-left">
            <span className="text-base sm:text-[17px] font-black tracking-[0.14em] text-white flex items-center">
              SPECTRE
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] font-bold font-mono tracking-[0.42em] text-[#B7FF00] mt-0.5">
              DEFEND
            </span>
          </div>
        </div>

        {/* Desktop Centered Pill Menu */}
        <nav 
          aria-label="Main Navigation"
          className="hidden md:flex items-center bg-[#090D0A]/85 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-5 py-1.5 rounded-full shadow-2xl shadow-black/70 space-x-6"
        >
          {navItems.map((item) => {
            const isHome = item.id === 'hero';
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs lg:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center ${
                  isHome
                    ? 'text-white font-semibold'
                    : 'text-[#9AA39A] hover:text-[#FFFFFF]'
                }`}
              >
                <span>{item.label}</span>
                {isHome && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B7FF00] ml-1.5 shadow-[0_0_8px_#B7FF00]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Primary Action Button: Get Started */}
          <button
            onClick={onOpenScanner}
            className="group bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-sm pl-4 pr-1.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-[#B7FF00]/20 hover:shadow-[#B7FF00]/30 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            id="get-started-nav-btn"
          >
            <span>Get Started</span>
            <span className="w-6 h-6 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search threat catalog"
            className="w-9 h-9 rounded-full bg-[#0A0F0B]/80 hover:bg-[#121A14] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-[#9AA39A] hover:text-white transition-colors duration-200 cursor-pointer"
            id="search-toggle-btn"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#0A0F0B]/80 hover:bg-[#121A14] border border-white/[0.08] flex items-center justify-center text-[#9AA39A] hover:text-white cursor-pointer transition-colors duration-200"
            aria-label="Toggle navigation menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="max-w-xl mx-auto mt-3 px-4 transition-all">
          <div className="bg-[#111713] border border-[#B8F526]/40 rounded-full px-4 py-2 flex items-center shadow-xl">
            <Search className="w-4 h-4 text-[#B8F526] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search threat reports, zero-trust services, CVE catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white text-xs">
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#0d120e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-800/60 hover:text-[#B8F526] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScanner();
              }}
              className="w-full py-2.5 bg-[#B8F526] text-black font-semibold text-xs rounded-full flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Launch Zero-Trust Audit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
