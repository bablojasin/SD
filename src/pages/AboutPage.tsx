import React from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/common/SectionLabel';
import { CTASection } from '../components/common/CTASection';
import { SEO } from '../components/common/SEO';
import { ABOUT_GLOBE_IMAGE, SOC_ROOM_IMAGE } from '../data/mockData';
import { ShieldCheck, Award, Lock, ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { getAboutPageContent, getTeamMembers } from '../lib/content';
import { FAQSection } from '../components/common/FAQSection';

interface AboutPageProps {
  onCtaSuccess: (email: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onCtaSuccess }) => {
  const about = getAboutPageContent();
  const team = getTeamMembers();
  const leadership = team.slice(0, 3);

  const heroImage = about.heroImage || ABOUT_GLOBE_IMAGE;

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title="About SPECTRE DEFEND | Cybersecurity Team & Expertise"
        description={about.description}
        canonicalUrl="https://SpectreDefend.dpdns.org/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://SpectreDefend.dpdns.org/' },
          { name: 'About', url: 'https://SpectreDefend.dpdns.org/about' },
        ]}
        faqs={about.faqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionLabel className="mb-4">
            {about.sectionLabel || 'About SPECTRE DEFEND'}
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {about.heading} <br />
            <span className="text-[#B7FF00]">{about.highlightText}</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA39A] leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Hero 2-Column: 3D Globe + Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#050807] p-3 shadow-2xl">
              <img
                src={heroImage}
                alt="SPECTRE DEFEND 3D Global Cyber Shield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFFFFF] tracking-tight">
              {about.doctrineHeading}
            </h2>
            <p className="text-[#E9ECE8] text-sm sm:text-base leading-relaxed">
              {about.story}
            </p>
            <p className="text-[#9AA39A] text-sm sm:text-base leading-relaxed">
              {about.mission}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {about.values?.map((val, idx) => (
                <div key={idx} className="bg-white/[0.055] border border-white/10 p-4 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#B7FF00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#FFFFFF]">{val.title}</h4>
                    <p className="text-xs text-[#9AA39A] mt-1">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Operations Center Section */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-8 sm:p-12 mb-24 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <SectionLabel pulse={true}>
                Global Threat Operations Center
              </SectionLabel>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Active Sovereign Threat Interception
              </h3>
              <p className="text-[#9AA39A] text-sm leading-relaxed">
                Operating high-assurance Security Operations Centers across North America, Europe, and Asia-Pacific. Our continuous red and blue team surveillance operates under strict Zero-Trust protocols, monitoring over 140 million threat vectors daily.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                {about.stats?.map((stat, idx) => (
                  <div key={idx} className="border border-white/10 p-4 rounded-2xl bg-black/40">
                    <div className="text-2xl font-bold text-[#B7FF00]">{stat.value}</div>
                    <div className="text-xs text-[#9AA39A] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={SOC_ROOM_IMAGE}
                  alt="SPECTRE DEFEND Cyber Defense Security Operations Center"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team Preview */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel className="mb-3">
                Principal Leadership
              </SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] tracking-tight">
                Architects Of Modern Cyber Defense
              </h2>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#B7FF00] hover:underline"
            >
              <span>View All Leadership & Researchers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div
                key={member.slug}
                className="bg-[#070A08]/85 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-[#B7FF00]/40 transition-all group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-black">
                  <img
                    src={member.profileImage}
                    alt={`${member.name}, ${member.position} at SPECTRE DEFEND`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs font-mono text-[#B7FF00] mt-1 mb-3">
                  {member.position}
                </div>
                <p className="text-xs sm:text-sm text-[#9AA39A] leading-relaxed">
                  {member.shortBiography}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {about.faqs && about.faqs.length > 0 && (
          <FAQSection
            label="Security Doctrine"
            heading="Frequently Asked Questions"
            description="Operational fundamentals regarding SPECTRE DEFEND's research philosophy, compliance, and zero-trust doctrine."
            faqs={about.faqs}
          />
        )}

        {/* CTA */}
        <CTASection
          title={about.cta?.heading || "Join The Global Defense Network"}
          subtitle={about.cta?.description || "Speak directly with our principal security architects to audit your attack surface."}
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
