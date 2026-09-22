import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Phone, Zap, HelpCircle, ChevronDown, ChevronUp, Layers, CheckSquare, Target } from 'lucide-react';
import { getServiceBySlug, getServices, getSiteSettings } from '../lib/content';
import { SEO } from '../components/common/SEO';
import { SectionLabel } from '../components/common/SectionLabel';
import { CTASection } from '../components/common/CTASection';

interface ServiceDetailPageProps {
  onCtaSuccess: (email: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onCtaSuccess }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug || '');
  const allServices = getServices();
  const siteSettings = getSiteSettings();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    return (
      <div className="py-24 text-center bg-[#050807] min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-white mb-4">SERVICE NOT FOUND</h1>
        <p className="text-sm text-[#9AA39A] mb-6">The requested cybersecurity service vector does not exist or has been decommissioned.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B7FF00] text-[#050807] font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To All Services</span>
        </Link>
      </div>
    );
  }

  // Related services
  const relatedServices = allServices
    .filter((s) => s.slug !== service.slug && (!service.relatedServices || service.relatedServices.includes(s.slug)))
    .slice(0, 3);

  const baseUrl = siteSettings.siteUrl || 'https://SpectreDefend.dpdns.org';

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title={service.seoTitle || service.title}
        description={service.seoDescription || service.shortDescription}
        canonicalUrl={`${baseUrl}/services/${service.slug}`}
        breadcrumbs={[
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Services', url: `${baseUrl}/services` },
          { name: service.title, url: `${baseUrl}/services/${service.slug}` },
        ]}
        service={{
          name: service.title,
          description: service.shortDescription || service.description || '',
          url: `${baseUrl}/services/${service.slug}`,
          serviceType: service.category || 'Cybersecurity Defense',
        }}
        faqs={service.faqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#9AA39A] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[#B7FF00]">{service.title}</span>
        </nav>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172512] border border-[#B7FF00]/30 text-xs font-mono text-[#B7FF00]">
                <Zap className="w-3 h-3 text-[#B7FF00]" />
                <span>{service.category}</span>
              </span>
              {service.metrics && (
                <span className="text-xs font-mono text-[#E9ECE8] bg-white/[0.05] px-3 py-1 rounded-full border border-white/10">
                  {service.metrics}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-[#D8DCD8] leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-sm px-6 py-3.5 rounded-full inline-flex items-center gap-3 shadow-lg shadow-[#B7FF00]/20 transition-all cursor-pointer"
              >
                <span>Deploy Protection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="border border-white/10 hover:border-white/20 bg-white/[0.04] text-[#E9ECE8] text-sm px-5 py-3.5 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Catalog</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <picture className="w-full h-full">
                <source
                  type="image/webp"
                  srcSet={`${(service.featuredImage || '').replace(/\.(jpg|png)$/, '')}-480.webp 480w, ${(service.featuredImage || '').replace(/\.(jpg|png)$/, '')}-800.webp 800w, ${(service.featuredImage || '').replace(/\.(jpg|png)$/, '')}.webp 1200w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                />
                <img
                  src={(service.featuredImage || '').replace(/\.(jpg|png)$/, '.webp')}
                  alt={service.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Detailed Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Technical Specification & Overview */}
            <div className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-10 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Technical Specification & Operational Architecture
              </h2>
              <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#9AA39A] leading-relaxed space-y-4">
                <p>{service.fullDescription}</p>
              </div>

              {/* Direct Semantic Answer Box for Search & AI Engines */}
              {service.whatIs && (
                <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-sm font-bold text-[#B7FF00] font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#B7FF00]" />
                    <span>What Is {service.title}?</span>
                  </h3>
                  <p className="text-sm text-[#E9ECE8] leading-relaxed">
                    {service.whatIs}
                  </p>
                </div>
              )}

              {/* How It Works */}
              {service.howItWorks && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#B7FF00]" />
                    <span>How It Operates: Execution Methodology</span>
                  </h3>
                  <div className="text-sm text-[#9AA39A] leading-relaxed space-y-3 whitespace-pre-line">
                    {service.howItWorks}
                  </div>
                </div>
              )}

              {/* Why It Matters */}
              {service.whyItMatters && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-3">
                    Threat Implications & Why It Matters
                  </h3>
                  <p className="text-sm text-[#D8DCD8] leading-relaxed">
                    {service.whyItMatters}
                  </p>
                </div>
              )}

              {/* Who It Is For */}
              {service.whoItIsFor && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-2">
                    Ideal Architecture Profile
                  </h3>
                  <p className="text-sm text-[#9AA39A] leading-relaxed">
                    {service.whoItIsFor}
                  </p>
                </div>
              )}

              {/* Core Features List */}
              {service.features && service.features.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-5">
                    Core Security Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0" />
                        <span className="text-xs sm:text-sm text-[#E9ECE8] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Deliverables */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-5 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#B7FF00]" />
                    <span>Service Deliverables & Output Artifacts</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#172512] text-[#B7FF00] text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-[#E9ECE8]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Frequently Asked Questions Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#B7FF00]" />
                  <span>Frequently Asked Technical Questions</span>
                </h3>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm sm:text-base font-medium text-white">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#B7FF00] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#9AA39A] shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-xs sm:text-sm text-[#9AA39A] leading-relaxed border-t border-white/5 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-6 sm:p-8 backdrop-blur-xl space-y-4 sticky top-24">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Deployment Consultation
              </h3>
              <p className="text-xs text-[#9AA39A] leading-relaxed">
                Speak directly with a SPECTRE DEFEND lead security architect to perform an attack surface scan and configure telemetry.
              </p>
              <div className="p-3.5 rounded-2xl bg-[#172512] border border-[#B7FF00]/30 text-xs font-mono text-[#B7FF00] space-y-1">
                <div className="font-bold">24/7 Red Team Dispatch:</div>
                <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-[#B7FF00] transition-colors">
                  {siteSettings.contactPhone}
                </a>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-mono text-[#E9ECE8] space-y-1">
                <div className="text-[#9AA39A]">Incident Response SLA:</div>
                <div className="font-bold text-[#B7FF00]">Under 15 Minutes Guaranteed</div>
              </div>
              <Link
                to="/contact"
                className="w-full text-center block py-3 rounded-2xl bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Schedule Architecture Review
              </Link>
            </div>
          </div>

        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-20">
            <div className="mb-8">
              <SectionLabel className="mb-2">Adjacent Capabilities</SectionLabel>
              <h3 className="text-2xl font-bold text-white">Explore Complementary Defenses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => navigate(`/services/${rel.slug}`)}
                  className="rounded-2xl border border-white/10 bg-[#070A08]/85 p-6 hover:border-[#B7FF00]/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#B7FF00]">{rel.category}</span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#B7FF00] mt-1 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#9AA39A] line-clamp-2">{rel.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#B7FF00] font-mono">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Ready To Lock Down This Threat Vector?"
          subtitle="Deploy SPECTRE DEFEND autonomous protection or talk to our cybersecurity architects today."
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
