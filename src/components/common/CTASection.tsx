import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Lock } from 'lucide-react';
import { CTA_MAIL_IMAGE } from '../../data/mockData';
import { getHomePageContent } from '../../lib/content';

interface CTASectionProps {
  onSuccessPrompt?: (email: string) => void;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onSuccessPrompt,
  title,
  subtitle,
}) => {
  const homeData = getHomePageContent();
  const ctaContent = homeData.ctaSection;

  const finalTitle = title || ctaContent?.heading || 'Take The First Step Toward Stronger Security';
  const finalSubtitle = subtitle || ctaContent?.description || "Your digital environment doesn't have to face modern threats alone.";
  const ctaImage = ctaContent?.image || CTA_MAIL_IMAGE;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
    if (onSuccessPrompt) {
      onSuccessPrompt(email);
    }
  };

  return (
    <section id="cta" className="py-20 md:py-28 relative overflow-hidden bg-[#050807]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Wide Rounded Rectangular Banner matching reference */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#070A08] p-8 sm:p-12 lg:p-14 shadow-2xl shadow-black/90">
          
          {/* Strong Neon-Green Atmospheric Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-5%] top-[-20%] w-[600px] h-[600px] bg-gradient-to-bl from-[#B7FF00]/25 via-emerald-600/15 to-transparent rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-[#142611]/40 rounded-full blur-[130px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* LEFT: Heading, Supporting Text, Email Field, Button */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0F0A] border border-white/10 text-xs font-mono text-[#B7FF00]">
                <Zap className="w-3 h-3 text-[#B7FF00]" />
                <span>{ctaContent?.sectionLabel || 'IMMEDIATE DEPLOYMENT'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
                {finalTitle}
              </h2>

              <p className="text-[#9AA39A] text-sm sm:text-base max-w-xl leading-relaxed">
                {finalSubtitle}
              </p>

              {submitted ? (
                <div className="bg-[#B7FF00]/10 border border-[#B7FF00]/40 p-4 sm:p-5 rounded-2xl flex items-center gap-3 text-sm text-[#B7FF00] max-w-lg">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>
                    SecOps deployment package dispatched to <strong>{email}</strong>. Our cyber defense team will activate your perimeter shortly.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative max-w-lg">
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#050807]/90 border border-white/10 rounded-2xl sm:rounded-full p-1.5 focus-within:border-[#B7FF00]/60 transition-all shadow-xl shadow-black/60">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email Address"
                      aria-label="Enter Your Email Address"
                      className="w-full bg-transparent px-5 py-3 text-sm text-[#FFFFFF] placeholder-[#9AA39A] focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      id="cta-start-defending-today-btn"
                      className="bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-sm pl-5 pr-1.5 py-2.5 rounded-xl sm:rounded-full flex items-center justify-center gap-3 cursor-pointer transition-all shrink-0 active:scale-95 shadow-lg shadow-[#B7FF00]/20 whitespace-nowrap"
                    >
                      <span>{ctaContent?.buttonText || 'Start Defending Today'}</span>
                      <span className="w-7 h-7 rounded-full bg-[#050807] text-[#B7FF00] flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                  {error && <p className="text-xs text-rose-400 mt-2 ml-4 font-mono">{error}</p>}
                  <p className="text-[11px] text-[#9AA39A] mt-2.5 px-2">
                    By submitting your email, you agree to receive communications regarding your security assessment. We never sell your data. View our{' '}
                    <Link to="/privacy" className="text-[#B7FF00] hover:underline underline-offset-2">
                      Privacy Policy
                    </Link>.
                  </p>
                </form>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#9AA39A]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF00]"></span>
                  <span>Instant Architecture Advisory</span>
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B7FF00]" />
                  <span>Zero-Trust Architecture & Continuous Monitoring</span>
                </span>
              </div>

            </div>

            {/* RIGHT: 3D Cybersecurity Asset */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-3 shadow-2xl group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#050807]">
                  <picture className="w-full h-full">
                    <source
                      type="image/webp"
                      srcSet="/images/cta_3d_mail_shield_1789575913648-480.webp 480w, /images/cta_3d_mail_shield_1789575913648-800.webp 800w, /images/cta_3d_mail_shield_1789575913648.webp 1200w"
                      sizes="(max-width: 640px) 384px, 400px"
                    />
                    <img
                      src="/images/cta_3d_mail_shield_1789575913648.webp"
                      alt="SPECTRE DEFEND Encrypted Mail Shield"
                      width={1200}
                      height={896}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/70 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
