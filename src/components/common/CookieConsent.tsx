import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X, Check, Lock, Sliders, ExternalLink } from 'lucide-react';

export interface CookiePreferences {
  strictlyNecessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'cookie_consent_preferences';

export const getSavedCookiePreferences = (): CookiePreferences | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback if localStorage is disabled
  }
  return null;
};

export const saveCookiePreferences = (prefs: CookiePreferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // fallback
  }
};

interface CookieConsentProps {
  onOpenSettingsDirectly?: () => void;
  isSettingsOpenExternal?: boolean;
  onCloseSettingsExternal?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  isSettingsOpenExternal,
  onCloseSettingsExternal,
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const saved = getSavedCookiePreferences();
    if (!saved) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsEnabled(saved.analytics);
      setMarketingEnabled(saved.marketing);
    }
  }, []);

  useEffect(() => {
    if (isSettingsOpenExternal) {
      setModalOpen(true);
    }
  }, [isSettingsOpenExternal]);

  useEffect(() => {
    const handleOpenEvent = () => setModalOpen(true);
    window.addEventListener('open-cookie-settings', handleOpenEvent);
    return () => window.removeEventListener('open-cookie-settings', handleOpenEvent);
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      strictlyNecessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(prefs);
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setShowBanner(false);
    setModalOpen(false);
    if (onCloseSettingsExternal) onCloseSettingsExternal();
  };

  const handleStrictlyNecessaryOnly = () => {
    const prefs: CookiePreferences = {
      strictlyNecessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(prefs);
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setShowBanner(false);
    setModalOpen(false);
    if (onCloseSettingsExternal) onCloseSettingsExternal();
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      strictlyNecessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(prefs);
    setShowBanner(false);
    setModalOpen(false);
    if (onCloseSettingsExternal) onCloseSettingsExternal();
  };

  const closeModal = () => {
    setModalOpen(false);
    if (onCloseSettingsExternal) onCloseSettingsExternal();
  };

  // Keyboard escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <>
      {/* Floating Bottom Cookie Consent Banner */}
      {showBanner && !modalOpen && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-[#070A08]/95 border border-white/15 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-xs text-[#9AA39A] space-y-4 ring-1 ring-[#B7FF00]/10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#172512] border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00] shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Privacy & Storage Notice</h3>
                  <span className="text-[10px] font-mono text-[#B7FF00]">ZERO TRACKING COOKIES</span>
                </div>
              </div>
              <button
                onClick={handleStrictlyNecessaryOnly}
                aria-label="Dismiss banner"
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="leading-relaxed text-[#D8DCD8]">
              SPECTRE DEFEND utilizes strictly necessary local storage for core security and session functions. We do not use third-party tracking, advertising, or profiling cookies.{' '}
              <Link to="/cookie-policy" className="text-[#B7FF00] hover:underline underline-offset-2">
                Read our Cookie Policy
              </Link>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 font-mono text-xs">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold py-2 px-3 rounded-xl transition-all cursor-pointer text-center active:scale-98 shadow-sm shadow-[#B7FF00]/20"
                id="cookie-accept-all-btn"
              >
                Accept All
              </button>
              <button
                onClick={handleStrictlyNecessaryOnly}
                className="flex-1 bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium py-2 px-3 rounded-xl border border-white/10 transition-all cursor-pointer text-center active:scale-98"
                id="cookie-necessary-only-btn"
              >
                Essential Only
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-2 text-zinc-400 hover:text-[#B7FF00] hover:bg-white/[0.04] rounded-xl transition-colors cursor-pointer text-center"
                id="cookie-customize-btn"
              >
                Customize
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Comprehensive Cookie Preferences Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050807]/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl bg-[#070A08] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ring-1 ring-white/10">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
              aria-label="Close Cookie Settings"
              id="cookie-modal-close-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#B7FF00] text-[#050807] flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#B7FF00]">
                SPECTRE DEFEND • Privacy Controls
              </span>
            </div>

            <h2 id="cookie-settings-title" className="text-2xl font-bold text-white tracking-tight mb-2">
              Cookie & Storage Preferences
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA39A] mb-6 leading-relaxed">
              We respect your digital sovereignty. Below you can inspect and configure the storage technologies used across our infrastructure.
            </p>

            {/* Category 1: Strictly Necessary */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#B7FF00]" />
                    <span className="text-sm font-bold text-white">Strictly Necessary Storage</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#172512] text-[#B7FF00] border border-[#B7FF00]/30 font-semibold">
                    ALWAYS ACTIVE
                  </span>
                </div>
                <p className="text-xs text-[#9AA39A] leading-relaxed">
                  Required for essential functions including cryptographic CSRF protection during Decap CMS author authentication (<code className="text-[#E9ECE8]">oauth_state</code>) and retaining your cookie consent choice. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" />
                    <div>
                      <span className="text-sm font-bold text-white block">Analytics & Telemetry</span>
                      <span className="text-[10px] text-zinc-500 font-mono">No active 3P analytics scripts</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                      id="toggle-analytics-cookies"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B7FF00] peer-checked:after:bg-[#050807]"></div>
                  </label>
                </div>
                <p className="text-xs text-[#9AA39A] leading-relaxed">
                  Allows anonymous performance metrics. SPECTRE DEFEND does not currently run Google Analytics or third-party web trackers. Keeping this disabled will not affect site functionality.
                </p>
              </div>

              {/* Category 3: Marketing & Social */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-zinc-400" />
                    <div>
                      <span className="text-sm font-bold text-white block">Marketing & Cross-Site Tracking</span>
                      <span className="text-[10px] text-zinc-500 font-mono">No ad pixels loaded</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingEnabled}
                      onChange={(e) => setMarketingEnabled(e.target.checked)}
                      className="sr-only peer"
                      id="toggle-marketing-cookies"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B7FF00] peer-checked:after:bg-[#050807]"></div>
                  </label>
                </div>
                <p className="text-xs text-[#9AA39A] leading-relaxed">
                  Used by commercial ad networks for retargeting. We do not load advertising pixels (such as Meta Pixel or LinkedIn Insight). Kept disabled by default.
                </p>
              </div>
            </div>

            {/* Policy Link */}
            <div className="mb-6 flex items-center justify-between text-xs text-zinc-400 border-t border-white/10 pt-4">
              <span>Need detailed technical disclosures?</span>
              <Link
                to="/cookie-policy"
                onClick={closeModal}
                className="text-[#B7FF00] hover:underline flex items-center gap-1 font-mono"
              >
                <span>Exhaustive Cookie Inventory</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleStrictlyNecessaryOnly}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-mono text-white transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs font-mono transition-all cursor-pointer shadow-lg shadow-[#B7FF00]/20 flex items-center justify-center gap-1.5"
                id="cookie-save-preferences-btn"
              >
                <Check className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
