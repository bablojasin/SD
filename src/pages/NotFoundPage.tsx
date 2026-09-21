import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Logo } from '../components/common/Logo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 bg-[#050807] min-h-[75vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <SEO
        title="404 - Page Not Found | SPECTRE DEFEND"
        description="The requested page could not be located on the SPECTRE DEFEND cyber defense portal."
        noIndex={true}
      />

      {/* Atmospheric green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B7FF00]/10 rounded-full blur-[160px]"
      />

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="mb-6 flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-[#172512] border border-[#B7FF00]/40 text-[#B7FF00] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#B7FF00]/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-block px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#B7FF00] mb-4">
          STATUS 404 • ROUTE NOT FOUND
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-2 font-mono">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-[#9AA39A] mb-8 leading-relaxed">
          The requested security perimeter or resource does not exist, has been relocated, or is undergoing autonomous maintenance. Please navigate back to safety.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/"
            className="bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-[#B7FF00]/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
          <Link
            to="/services"
            className="border border-white/15 hover:border-[#B7FF00]/50 bg-white/[0.04] text-[#E9ECE8] text-sm px-5 py-3 rounded-full transition-all hover:bg-white/[0.08]"
          >
            View Services
          </Link>
          <Link
            to="/contact"
            className="border border-white/15 hover:border-[#B7FF00]/50 bg-white/[0.04] text-[#E9ECE8] text-sm px-5 py-3 rounded-full transition-all hover:bg-white/[0.08]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};
