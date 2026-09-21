import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { CTA_MAIL_IMAGE } from '../data/mockData';

interface CtaSectionProps {
  onSuccessPrompt: (email: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSuccessPrompt }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid enterprise email address');
      return;
    }
    setError('');
    setSubmitted(true);
    onSuccessPrompt(email);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Rounded Master Card Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#050807] via-[#070A08] to-[#0A0F0A] p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* Strategic Neon Aurora Light on the Right */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute right-[-5%] top-[-20%] w-[600px] h-[600px] bg-gradient-to-bl from-[#B7FF00]/25 via-emerald-500/15 to-transparent rounded-full blur-[110px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
                Take The First Step To Safety
              </h2>

              <p className="text-[#9AA39A] text-sm sm:text-base max-w-xl leading-relaxed">
                Protecting your enterprise from sophisticated cyber threats doesn't have to be complicated. Deploy autonomous zero-trust telemetry in minutes.
              </p>

              {/* Interactive Email Input Bar matching Reference */}
              {submitted ? (
                <div className="bg-[#B7FF00]/10 border border-[#B7FF00]/40 p-4 rounded-2xl flex items-center gap-3 text-sm text-[#B7FF00]">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>
                    SecOps deployment request initiated for <strong>{email}</strong>. Our elite cyber defense team will dispatch telemetry instructions immediately.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative max-w-lg">
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#050807]/90 border border-white/10 rounded-2xl sm:rounded-full p-1.5 focus-within:border-[#B7FF00]/50 transition-all shadow-xl">
                    <input
                      type="email"
                      placeholder="Enter your enterprise email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-5 py-3 text-sm text-[#FFFFFF] placeholder-[#9AA39A] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95 shadow-lg shadow-[#B7FF00]/20"
                      id="cta-input-submit-btn"
                    >
                      <span>Get Protected</span>
                      <span className="w-6 h-6 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                  {error && <p className="text-xs text-rose-400 mt-2 ml-4">{error}</p>}
                  <p className="text-[11px] text-[#9AA39A] mt-2.5 px-2">
                    By submitting your email, you agree to receive communications regarding your security assessment. We never sell your data. View our{' '}
                    <Link to="/privacy" className="text-[#B7FF00] hover:underline underline-offset-2">
                      Privacy Policy
                    </Link>.
                  </p>
                </form>
              )}

              {/* Trust markers */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#9AA39A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]"></span>
                  Zero-Trust Architecture
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]"></span>
                  Continuous Telemetry
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]"></span>
                  End-to-End Encryption
                </span>
              </div>
            </div>

            {/* Right 3D Visual Asset */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-tr from-[#050807] to-white/[0.055] p-3 shadow-2xl group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#050807]">
                  <img
                    src={CTA_MAIL_IMAGE}
                    alt="SPECTRE DEFEND Cyber Security Dispatch Alert"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/70 via-transparent to-transparent"></div>
                  
                  {/* Micro telemetry tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A0F0A]/90 backdrop-blur-md border border-[#B7FF00]/40 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9AA39A]">STATUS</span>
                    <span className="text-[#B7FF00] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping"></span>
                      ENCRYPTED DISPATCH READY
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
