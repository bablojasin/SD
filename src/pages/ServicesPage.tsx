import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SectionLabel } from '../components/common/SectionLabel';
import { ServiceCard } from '../components/cards/ServiceCard';
import { CTASection } from '../components/common/CTASection';
import { SEO } from '../components/common/SEO';
import { getServices, getServicesPageContent } from '../lib/content';
import { FAQSection } from '../components/common/FAQSection';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onCtaSuccess: (email: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService, onCtaSuccess }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchFilter = searchParams.get('search')?.toLowerCase() || '';
  const [activeFilter, setActiveFilter] = useState('all');

  const services = getServices();
  const servicesPage = getServicesPageContent();

  const filteredServices = services.filter((svc) => {
    const matchesSearch =
      !searchFilter ||
      svc.title.toLowerCase().includes(searchFilter) ||
      (svc.shortDescription && svc.shortDescription.toLowerCase().includes(searchFilter)) ||
      (svc.fullDescription && svc.fullDescription.toLowerCase().includes(searchFilter));

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'network' && (svc.slug.includes('network') || svc.category.toLowerCase().includes('network'))) return true;
    if (activeFilter === 'cloud' && (svc.slug.includes('cloud') || svc.category.toLowerCase().includes('cloud'))) return true;
    if (activeFilter === 'endpoint' && (svc.slug.includes('threat') || svc.category.toLowerCase().includes('detection'))) return true;
    if (activeFilter === 'vulnerability' && (svc.slug.includes('vulnerability') || svc.slug.includes('penetration'))) return true;
    if (activeFilter === 'monitoring' && svc.slug.includes('monitoring')) return true;

    return true;
  });

  const handleServiceClick = (service: ServiceItem) => {
    onSelectService(service);
    navigate(`/services/${service.slug}`);
  };

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title="Cybersecurity Services | SPECTRE DEFEND"
        description="Explore our specialized suite of enterprise cyber defense services: continuous threat detection, cloud infrastructure security, vulnerability auditing, and penetration testing."
        canonicalUrl="https://SpectreDefend.dpdns.org/services"
        breadcrumbs={[
          { name: 'Home', url: 'https://SpectreDefend.dpdns.org/' },
          { name: 'Services', url: 'https://SpectreDefend.dpdns.org/services' },
        ]}
        faqs={servicesPage.faqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel className="mb-4">
            Enterprise Cyber Defense Suite
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
            Comprehensive <br />
            <span className="text-[#B7FF00]">Cyber Defense Services</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA39A] leading-relaxed">
            Engineered from the ground up for modern hybrid cloud architectures, distributed enterprise fleets, and zero-trust perimeters.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { label: 'All Services', key: 'all' },
            { label: 'Network Defense', key: 'network' },
            { label: 'Cloud Security', key: 'cloud' },
            { label: 'Endpoint Detection', key: 'endpoint' },
            { label: 'Audits & Penetration', key: 'vulnerability' },
            { label: '24/7 Monitoring', key: 'monitoring' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#B7FF00] text-[#050807] shadow-lg shadow-[#B7FF00]/20 font-bold'
                  : 'bg-white/[0.055] hover:bg-white/[0.09] text-[#E9ECE8] border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Query Notice if active */}
        {searchFilter && (
          <div className="text-center text-xs font-mono text-[#9AA39A] mb-8">
            Showing results matching query: <span className="text-[#B7FF00]">"{searchFilter}"</span>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>

        {/* Zero-Trust Architecture SLA Matrix */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] backdrop-blur-xl p-8 sm:p-12 mb-24">
          <div className="mb-8">
            <SectionLabel pulse={true} className="mb-3">
              Operational Assurance
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Zero-Trust Performance Guarantees
            </h3>
            <p className="text-sm text-[#9AA39A] mt-2">
              Every SPECTRE DEFEND customer is protected by verifiable contractual SLAs backed by cryptographic telemetry records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            <div className="border border-white/10 p-5 rounded-2xl bg-black/40">
              <div className="text-3xl font-bold text-[#B7FF00]">&lt;12ms</div>
              <div className="text-xs text-[#E9ECE8] font-bold mt-1">Autonomous Quarantine</div>
              <div className="text-[11px] text-[#9AA39A] mt-1">Sub-second host isolation upon heuristic confirmation.</div>
            </div>
            <div className="border border-white/10 p-5 rounded-2xl bg-black/40">
              <div className="text-3xl font-bold text-[#B7FF00]">99.999%</div>
              <div className="text-xs text-[#E9ECE8] font-bold mt-1">Telemetry Sensor Uptime</div>
              <div className="text-[11px] text-[#9AA39A] mt-1">Distributed globally across redundant Anycast nodes.</div>
            </div>
            <div className="border border-white/10 p-5 rounded-2xl bg-black/40">
              <div className="text-3xl font-bold text-[#B7FF00]">15 Min</div>
              <div className="text-xs text-[#E9ECE8] font-bold mt-1">Red Team Response SLA</div>
              <div className="text-[11px] text-[#9AA39A] mt-1">Direct escalation bridge to Tier 3 forensic engineers.</div>
            </div>
            <div className="border border-white/10 p-5 rounded-2xl bg-black/40">
              <div className="text-3xl font-bold text-[#B7FF00]">0.001%</div>
              <div className="text-xs text-[#E9ECE8] font-bold mt-1">False Positive Ratio</div>
              <div className="text-[11px] text-[#9AA39A] mt-1">Continuous contextual baseline tuning.</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {servicesPage.faqs && servicesPage.faqs.length > 0 && (
          <FAQSection
            label="Service Architecture"
            heading="Frequently Asked Questions"
            description="Clear answers regarding deployment scopes, integrations, and compliance coverage for SPECTRE DEFEND defense modules."
            faqs={servicesPage.faqs}
          />
        )}

        {/* CTA */}
        <CTASection
          title="Ready To Elevate Your Security Posture?"
          subtitle="Deploy SPECTRE DEFEND autonomous protection or talk to our cybersecurity architects today."
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
