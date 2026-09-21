import React from 'react';
import { Shield, Phone, MapPin, Mail, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenScanner }) => {
  return (
    <footer className="pt-16 pb-12 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group select-none" onClick={() => onNavigate('hero')} aria-label="SPECTRE DEFEND Home">
              <img 
                src="/assets/brand/spectre-defend-logo-symbol.svg" 
                alt="SPECTRE DEFEND Symbol" 
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="flex flex-col leading-none text-left">
                <span className="text-lg font-black tracking-[0.14em] text-white">
                  SPECTRE
                </span>
                <span className="text-[9.5px] font-bold font-mono tracking-[0.42em] text-[#B7FF00] mt-0.5">
                  DEFEND
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              SPECTRE DEFEND is delivering professional security solutions that protect people, property, and digital infrastructure with autonomous defense.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#hero" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#B8F526] hover:text-black text-zinc-400 flex items-center justify-center transition-colors text-xs font-bold"
              >
                f
              </a>
              <a 
                href="#hero" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#B8F526] hover:text-black text-zinc-400 flex items-center justify-center transition-colors text-xs font-bold"
              >
                in
              </a>
              <a 
                href="#hero" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#B8F526] hover:text-black text-zinc-400 flex items-center justify-center transition-colors text-xs font-bold"
              >
                yt
              </a>
              <a 
                href="#hero" 
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#B8F526] hover:text-black text-zinc-400 flex items-center justify-center transition-colors text-xs font-bold"
              >
                X
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#B8F526] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#B8F526] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#B8F526] transition-colors cursor-pointer">
                  Our Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#B8F526] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer text-left">
                  Cloud Of Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer text-left">
                  Endpoint Of Protection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer text-left">
                  Cyber Network Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer text-left">
                  Vulnerability Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#B8F526] transition-colors cursor-pointer text-left">
                  Access Management
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8F526] shrink-0" />
                <span>+1 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8F526] shrink-0 mt-0.5" />
                <span>421 Cyber Way, Austin, TX 78701</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8F526] shrink-0" />
                <span>support@spectredefend.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#B8F526] shrink-0" />
                <span>spectredefend.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            @Copyright 2026 SPECTRE DEFEND. All Rights Reserved
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-zinc-300 transition-colors">Terms And Conditions</a>
            <a href="#hero" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <button onClick={onOpenScanner} className="text-[#B8F526] hover:underline">
              Perimeter Health Check
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
