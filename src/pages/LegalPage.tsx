import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SectionLabel } from '../components/common/SectionLabel';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Lock, FileText, ChevronRight, Cookie } from 'lucide-react';
import { getCompanyInfo, getLegalPageBySlug } from '../lib/content';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const company = getCompanyInfo();
  
  const slug = location.pathname.replace(/^\//, '').split('/')[0] || 'privacy';
  const legalData = getLegalPageBySlug(slug);

  const isPrivacy = slug === 'privacy';
  const isCookies = slug === 'cookies';

  const defaultTitle = isPrivacy
    ? 'Privacy & Cryptographic Data Policy'
    : isCookies
    ? 'Cookie & Session Governance Policy'
    : 'Terms & Conditions of Service';

  const pageTitle = legalData?.title || defaultTitle;
  const pageSummary = legalData?.summary || (isPrivacy
    ? 'Official Privacy Policy for SPECTRE DEFEND. Learn about our zero-knowledge telemetry policies, data retention, and cryptographic protection standards.'
    : isCookies
    ? 'Official Cookie and Session Policy for SPECTRE DEFEND. Learn how we handle necessary authentication tokens with zero third-party tracking.'
    : 'Official Terms of Service for SPECTRE DEFEND autonomous cyber defense platform and managed SecOps services.');

  const lastUpdated = legalData?.lastUpdated || 'September 16, 2026';
  const effectiveDate = legalData?.effectiveDate || 'January 1, 2026';

  const sectionIcons = [ShieldCheck, Lock, FileText, Cookie];

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title={pageTitle}
        description={pageSummary}
        breadcrumbs={[
          { name: 'Home', url: 'https://spectredefend.com/' },
          { name: pageTitle, url: `https://spectredefend.com${location.pathname}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#9AA39A] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[#B7FF00]">{pageTitle}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <SectionLabel className="mb-3">
            Governance & Compliance
          </SectionLabel>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {pageTitle}
          </h1>
          <p className="mt-3 text-xs font-mono text-[#9AA39A]">
            Last Updated: {lastUpdated} • Effective Date: {effectiveDate} • Document Ref: SEC-DOC-2026-V4
          </p>
          {legalData?.summary && (
            <p className="mt-4 text-sm sm:text-base text-[#9AA39A] leading-relaxed border-l-2 border-[#B7FF00]/60 pl-4 py-1">
              {legalData.summary}
            </p>
          )}
        </div>

        {/* Content Container */}
        <div className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-8 text-sm sm:text-base text-[#D8DCD8] leading-relaxed">
          
          {legalData && legalData.sections && legalData.sections.length > 0 ? (
            legalData.sections.map((sec, idx) => {
              const IconComp = sectionIcons[idx % sectionIcons.length];
              return (
                <section key={idx} className="space-y-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <IconComp className="w-5 h-5 text-[#B7FF00] shrink-0" />
                    <span>{sec.heading}</span>
                  </h2>
                  <div className="text-[#9AA39A] leading-relaxed space-y-3 whitespace-pre-line">
                    {sec.content}
                  </div>
                </section>
              );
            })
          ) : isPrivacy ? (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#B7FF00]" />
                  1. Zero-Knowledge Telemetry Architecture
                </h2>
                <p>
                  At SPECTRE DEFEND, our core architectural doctrine is that customer data belongs exclusively to the customer. Our endpoint and cloud telemetry sensors execute local mathematical hashing and behavioral feature extraction. Raw packet payloads, customer database tables, and unencrypted credentials never leave your enclave.
                </p>
                <p>
                  All heuristic vectors transmitted to the SPECTRE DEFEND Central Threat Intelligence Fabric are strictly anonymized, salted, and encrypted with AES-256-GCM and post-quantum Kyber key exchange.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#B7FF00]" />
                  2. Telemetry Ingestion & Purpose
                </h2>
                <p>
                  Information gathered is limited to operational security telemetry:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9AA39A]">
                  <li>Cryptographic process hashes and memory allocation heuristic scores.</li>
                  <li>Anomalous egress network socket destination metadata (IP, port, protocol).</li>
                  <li>Authentication failure rates and IAM privilege escalation event tokens.</li>
                  <li>Kernel system call graphs analyzed via read-only eBPF ring buffers.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#B7FF00]" />
                  3. Security Framework Alignment & GDPR Compliance
                </h2>
                <p>
                  SPECTRE DEFEND implements internal security controls engineered to align with industry benchmarks including the NIST Cybersecurity Framework 2.0, CIS Critical Security Controls, and the EU General Data Protection Regulation (GDPR). Information regarding our technical architecture and data processing measures is available upon inquiry to <a href={`mailto:${company.email}`} className="text-[#B7FF00] hover:underline">{company.email}</a>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#B7FF00]" />
                  1. Acceptance of Master Defense Agreement
                </h2>
                <p>
                  By deploying SPECTRE DEFEND agents, accessing the Threat Operations Console, or utilizing our automated vulnerability assessment APIs, you agree to be bound by this Master Defense Agreement and all incorporated security SLAs.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#B7FF00]" />
                  2. Authorized Security Auditing & Red Team Scope
                </h2>
                <p>
                  Customers engaging SPECTRE DEFEND for penetration testing and offensive simulations warrant that they own or hold explicit written authority from the infrastructure owner to conduct non-destructive vulnerability assessments on the targeted CIDR blocks and cloud domains.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#B7FF00]" />
                  3. Service Level Agreement (SLA) & Uptime Guarantee
                </h2>
                <p>
                  SPECTRE DEFEND warrants 99.999% availability for the Central Threat Intelligence Fabric and continuous autonomous threat interception engines. In the event of an SLA disruption exceeding 0.001% in a calendar month, financial service credits apply automatically in accordance with your enterprise service tier.
                </p>
              </section>
            </>
          )}

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#9AA39A] gap-4">
            <div>
              Corporate Legal Counsel: <span className="text-white">{company.name} Legal Directorate</span>
            </div>
            <div>
              Address: <span className="text-white">{company.address}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
