import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ThreatScannerModal } from './components/ThreatScannerModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CookieConsent } from './components/common/CookieConsent';
import { ServiceItem } from './types';
import { ShieldCheck, Bell, X } from 'lucide-react';

// Lazy-loaded secondary route chunks for fast initial load
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const TeamPage = lazy(() => import('./pages/TeamPage').then(m => ({ default: m.TeamPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Minimal route fallback spinner
const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#B7FF00] animate-spin" />
  </div>
);

// Scroll to top on navigation change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleDeployService = (serviceTitle: string) => {
    showNotification(`SecOps pipeline dispatched zero-trust configuration for "${serviceTitle}"`);
  };

  const handleCtaSubmit = (email: string) => {
    showNotification(`Zero-trust onboarding package dispatched to ${email}`);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* WCAG 2.2 AA Bypass Block: Skip to Main Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#B7FF00] focus:text-[#050807] focus:font-bold focus:text-sm focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-[#050807] text-[#E9ECE8] selection:bg-[#B7FF00] selection:text-[#050807] relative flex flex-col justify-between">
        
        {/* Persistent Reusable Header */}
        <Header onOpenScanner={() => setScannerOpen(true)} />

        {/* Dynamic Route Pages */}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenScanner={() => setScannerOpen(true)}
                    onSelectService={(svc) => setSelectedService(svc)}
                    onCtaSuccess={handleCtaSubmit}
                  />
                }
              />
              <Route
                path="/about"
                element={<AboutPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/services"
                element={
                  <ServicesPage
                    onSelectService={(svc) => setSelectedService(svc)}
                    onCtaSuccess={handleCtaSubmit}
                  />
                }
              />
              <Route
                path="/services/:slug"
                element={<ServiceDetailPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/team"
                element={<TeamPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/blog"
                element={<BlogPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/blog/:slug"
                element={<BlogPostPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/contact"
                element={<ContactPage onCtaSuccess={handleCtaSubmit} />}
              />
              <Route
                path="/privacy"
                element={<LegalPage />}
              />
              <Route
                path="/terms"
                element={<LegalPage />}
              />
              <Route
                path="/cookies"
                element={<LegalPage />}
              />
              <Route
                path="/cookie-policy"
                element={<LegalPage />}
              />
              <Route
                path="/refund-policy"
                element={<LegalPage />}
              />
              {/* 404 Route */}
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </Suspense>
        </main>

        {/* Persistent Reusable Footer */}
        <Footer onOpenScanner={() => setScannerOpen(true)} />

        {/* Global Modals */}
        <ThreatScannerModal
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onDeploy={handleDeployService}
        />

        {/* Regulatory Cookie Consent Banner & Preferences Modal */}
        <CookieConsent />

        {/* Live SecOps Notification Toast */}
        {notification && (
          <aside
            aria-label="Security Notification"
            className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0A0F0A] border border-[#B7FF00]/40 text-[#E9ECE8] p-4 rounded-2xl shadow-2xl flex items-start gap-3 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-[#172512] text-[#B7FF00] flex items-center justify-center shrink-0 border border-[#B7FF00]/30 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs sm:text-sm">
              <div className="font-mono font-bold text-[#B7FF00] uppercase text-[11px] mb-0.5">
                SecOps Telemetry Event
              </div>
              <p className="text-[#E9ECE8]">{notification}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              aria-label="Close notification"
              className="text-[#9AA39A] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </aside>
        )}

      </div>
    </BrowserRouter>
  );
}
