import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, ShieldCheck, Terminal, Phone, ExternalLink, FileText, Cpu, UserCheck } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { getNavigation, getSiteSettings, searchSite, SearchResult } from '../../lib/content';

interface HeaderProps {
  onOpenScanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScanner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navConfig = getNavigation();
  const siteSettings = getSiteSettings();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll locking when mobile menu is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Handle ESC key listener for both modal and drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update real-time search results when typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = searchSite(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearchResultClick = (url: string) => {
    navigate(url);
    setSearchModalOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (searchResults.length > 0) {
      handleSearchResultClick(searchResults[0].url);
    } else {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchModalOpen(false);
      setSearchQuery('');
    }
  };

  const handleQuickTagSearch = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050807]/90 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-2xl shadow-black/60'
            : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* LEFT: SPECTRE DEFEND Logo */}
          <div className="flex items-center shrink-0">
            <Logo size="md" />
          </div>

          {/* CENTER: Rounded glass navigation container (Desktop) */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* RIGHT: Get Started Button + Search Icon + Menu Icon */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Bright Neon-Green Button: "Get Started" from CMS config */}
            <Link
              to={navConfig.primaryCta?.href || '/contact'}
              id="header-get-started-btn"
              className="group inline-flex items-center justify-center font-bold text-xs sm:text-sm pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] shadow-lg shadow-[#B7FF00]/25 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap select-none"
            >
              <span>{navConfig.primaryCta?.label || 'Get Started'}</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center shrink-0 ml-2 sm:ml-2.5 group-hover:translate-x-0.5 group-hover:rotate-12 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </Link>

            {/* Search Icon (Circular glass button) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search threat intelligence and services"
              id="header-search-btn"
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.055] hover:bg-white/[0.09] border border-white/10 backdrop-blur-md items-center justify-center text-[#E9ECE8] hover:text-[#FFFFFF] hover:border-white/20 transition-all cursor-pointer select-none"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Menu Icon (Circular glass button) */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle navigation menu"
              id="header-menu-btn"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.055] hover:bg-white/[0.09] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#E9ECE8] hover:text-[#FFFFFF] hover:border-white/20 transition-all cursor-pointer select-none"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </header>

      {/* Real-time Global Search Modal Overlay */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-[#050807]/85 backdrop-blur-md transition-opacity duration-200"
          onClick={(e) => {
            if (searchModalRef.current && !searchModalRef.current.contains(e.target as Node)) {
              setSearchModalOpen(false);
            }
          }}
        >
          <div
            ref={searchModalRef}
            className="w-full max-w-xl bg-[#070A08] border border-white/15 rounded-3xl p-6 shadow-2xl shadow-black/90 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B7FF00]">
                <Search className="w-3.5 h-3.5" />
                <span>INTELLIGENCE & SERVICES SEARCH</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.055] hover:bg-white/[0.09] flex items-center justify-center text-[#9AA39A] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative mb-4 shrink-0">
              <input
                type="text"
                placeholder="Search services, threat insights, articles, team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#0A0F0A] border border-white/15 focus:border-[#B7FF00] rounded-2xl pl-4 pr-24 py-3 text-sm text-[#FFFFFF] placeholder-[#9AA39A] focus:outline-none transition-colors"
                id="search-overlay-input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Find
              </button>
            </form>

            {/* Live Search Results List */}
            {searchResults.length > 0 ? (
              <div className="overflow-y-auto space-y-2 flex-1 pr-1 mb-4">
                <div className="text-[11px] font-mono text-[#B7FF00] uppercase tracking-wider mb-2">
                  Found {searchResults.length} matches:
                </div>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearchResultClick(res.url)}
                    className="w-full text-left p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#B7FF00]/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white group-hover:text-[#B7FF00] transition-colors">
                        {res.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#9AA39A] group-hover:text-white">
                        {res.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#9AA39A] line-clamp-2 leading-relaxed">
                      {res.snippet}
                    </p>
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-6 text-center text-sm text-[#9AA39A] font-mono">
                No telemetry records found for "{searchQuery}". Try searching for Cloud, EDR, Red Team, or Zero Trust.
              </div>
            ) : null}

            {/* Quick Keywords */}
            <div className="space-y-2 shrink-0 pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9AA39A]">
                Quick Security Keywords
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Threat Detection',
                  'Cloud Security',
                  'Network Security',
                  'Penetration Testing',
                  'Zero Trust',
                  'Vulnerability',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagSearch(tag)}
                    className="text-xs font-mono bg-white/[0.055] hover:bg-white/[0.09] hover:text-[#B7FF00] text-[#E9ECE8] px-3 py-1.5 rounded-lg border border-white/5 transition-all cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Mobile & Desktop Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#050807]/80 backdrop-blur-sm transition-opacity duration-200"
          onClick={(e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
              setDrawerOpen(false);
            }
          }}
        >
          <div
            ref={drawerRef}
            className="w-full max-w-sm sm:max-w-md h-full bg-[#070A08] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl shadow-black"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <Logo size="sm" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.055] hover:bg-white/[0.09] text-[#9AA39A] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer border border-white/10 transition-colors"
                  aria-label="Close menu drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mb-6">
                <div className="text-xs font-mono text-[#9AA39A] uppercase tracking-wider mb-3">
                  Navigation Directory
                </div>
                <Navigation onItemClick={() => setDrawerOpen(false)} isMobile={true} />
              </div>

              {/* Quick Search on Mobile */}
              <div className="mb-4 sm:hidden">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full py-3 px-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#B7FF00]" />
                    <span>Search Site Catalog</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9AA39A]" />
                </button>
              </div>

              {/* Quick Zero-Trust Perimeter Audit Trigger */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenScanner();
                  }}
                  className="w-full py-3 px-4 bg-[#172512] hover:bg-[#1f3318] border border-[#B7FF00]/40 text-[#B7FF00] font-mono text-xs rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                  id="drawer-perimeter-audit-btn"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span>Run Perimeter Scanner Audit</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Drawer Bottom Info & Incident Line */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="bg-[#050807] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B7FF00]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Continuous Telemetry Active</span>
                </div>
                <p className="text-[11px] text-[#9AA39A] leading-relaxed font-mono">
                  {siteSettings.operationalStatus || 'Autonomous Zero-Trust Sentinel nodes operating with 320ms Mean Time to Detect.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#9AA39A]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span>24/7 Red Team Hotline:</span>
                </div>
                {siteSettings.contactPhone && !siteSettings.contactPhone.includes('CONFIRMATION') ? (
                  <a
                    href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-[#FFFFFF] hover:text-[#B7FF00] font-bold"
                  >
                    {siteSettings.contactPhone}
                  </a>
                ) : (
                  <span className="text-[#9AA39A]">
                    {siteSettings.contactPhone || 'REQUIRES BUSINESS CONFIRMATION'}
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
