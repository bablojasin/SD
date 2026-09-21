import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Headphones, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { getFooter, getSiteSettings } from '../../lib/content';

interface FooterProps {
  onOpenScanner?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const footerConfig = getFooter();
  const siteSettings = getSiteSettings();

  return (
    <footer className="pt-20 pb-12 bg-[#050807] border-t border-white/10 relative overflow-hidden text-[#E9ECE8]">
      {/* Subtle Green Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#B7FF00]/5 rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* LEFT COLUMN: SPECTRE DEFEND Logo, Description, Social Icons */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="md" />

            <p className="text-[#9AA39A] text-xs sm:text-sm leading-relaxed max-w-sm">
              {footerConfig.companyDescription ||
                'SPECTRE DEFEND delivers autonomous zero-trust cyber defense, high-frequency threat isolation, and 24/7 sovereign SOC surveillance protecting modern enterprise infrastructure.'}
            </p>

            {/* Social Icons from CMS Configuration */}
            <div className="flex items-center gap-3 pt-2">
              {siteSettings.socialLinks?.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#9AA39A] flex items-center justify-center transition-all text-xs font-bold border border-white/10 cursor-pointer"
                >
                  in
                </a>
              )}
              {siteSettings.socialLinks?.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#9AA39A] flex items-center justify-center transition-all text-xs font-bold border border-white/10 cursor-pointer"
                >
                  X
                </a>
              )}
              {siteSettings.socialLinks?.github && (
                <a
                  href={siteSettings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#9AA39A] flex items-center justify-center transition-all text-xs font-bold border border-white/10 cursor-pointer"
                >
                  GH
                </a>
              )}
              {siteSettings.socialLinks?.discord && (
                <a
                  href={siteSettings.socialLinks.discord}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#B7FF00] hover:text-[#050807] text-[#9AA39A] flex items-center justify-center transition-all text-xs font-bold border border-white/10 cursor-pointer"
                >
                  DC
                </a>
              )}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#FFFFFF] tracking-wider font-mono uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9AA39A]">
              {footerConfig.quickLinks?.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-[#B7FF00] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#FFFFFF] tracking-wider font-mono uppercase">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9AA39A]">
              {footerConfig.servicesLinks?.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-[#B7FF00] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#FFFFFF] tracking-wider font-mono uppercase">
              SecOps Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#9AA39A]">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <a href={`mailto:${siteSettings.contactEmail}`} className="text-[#E9ECE8] hover:text-[#B7FF00] transition-colors">
                  {siteSettings.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} className="text-[#E9ECE8] hover:text-[#B7FF00] transition-colors">
                  {siteSettings.contactPhone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B7FF00] shrink-0 mt-0.5" />
                <span className="text-[#E9ECE8]">{siteSettings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span className="text-[#E9ECE8]">24/7 Global Autonomous SOC</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9AA39A] gap-4">
          <div>
            {footerConfig.copyright}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {footerConfig.legalLinks?.map((l) => (
              <Link key={l.href} to={l.href} className="hover:text-[#B7FF00] transition-colors">
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              className="hover:text-[#B7FF00] transition-colors cursor-pointer text-left"
              id="footer-cookie-preferences-btn"
            >
              Cookie Preferences
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
