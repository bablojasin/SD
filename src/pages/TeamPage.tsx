import React, { useState } from 'react';
import { SectionLabel } from '../components/common/SectionLabel';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/common/CTASection';
import { getTeamMembers } from '../lib/content';
import { TeamMember } from '../types';
import { Linkedin, Twitter, Github, Mail, X, Shield, ArrowRight } from 'lucide-react';

interface TeamPageProps {
  onCtaSuccess: (email: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onCtaSuccess }) => {
  const teamMembers = getTeamMembers();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Dynamic grid column class based on count:
  // 1 member: centered single card
  // 2 members: 2 cols
  // 3 members: 3 cols
  // 4 members: 4 cols or 2x2
  // 6+ members: 3 cols responsive
  const getGridClasses = (count: number) => {
    if (count === 1) return 'max-w-md mx-auto grid grid-cols-1';
    if (count === 2) return 'max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8';
    if (count === 4) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
  };

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title="Leadership Team & Cyber Defense Fellows"
        description="Meet the founders, cryptography researchers, red-team veterans, and security architects leading Securify."
        canonicalUrl="https://securify.com/team"
        breadcrumbs={[
          { name: 'Home', url: 'https://securify.com/' },
          { name: 'Team', url: 'https://securify.com/team' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel className="mb-4">
            Security Architects & Researchers
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
            The Minds Defending <br />
            <span className="text-[#B7FF00]">Modern Enterprise Frontiers</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA39A] leading-relaxed">
            Our team brings together decades of experience across national intelligence services, distributed systems infrastructure, zero-day research, and military-grade network operations.
          </p>
        </div>

        {/* Dynamic Responsive Team Grid */}
        <div className={`${getGridClasses(teamMembers.length)} mb-24`}>
          {teamMembers.map((member) => (
            <div
              key={member.slug}
              onClick={() => setSelectedMember(member)}
              className="bg-[#070A08]/85 border border-white/10 hover:border-[#B7FF00]/40 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-xl shadow-black/80"
            >
              <div>
                {/* Member Photo */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-black">
                  <img
                    src={member.profileImage}
                    alt={`${member.name}, ${member.position} at Securify`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A08] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {member.isFeatured && (
                    <div className="absolute top-3 left-3 bg-[#050807]/90 border border-[#B7FF00]/40 px-2.5 py-1 rounded-full text-[10px] font-mono text-[#B7FF00] flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>FELLOW</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#B7FF00] transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs font-mono text-[#B7FF00] mt-1 mb-3">
                  {member.position}
                </div>
                <p className="text-xs sm:text-sm text-[#9AA39A] leading-relaxed">
                  {member.shortBiography}
                </p>
              </div>

              {/* Bottom Socials & Bio Link */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#9AA39A]">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:text-[#B7FF00] hover:bg-white/[0.05] transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:text-[#B7FF00] hover:bg-white/[0.05] transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:text-[#B7FF00] hover:bg-white/[0.05] transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <span className="text-xs font-mono text-[#B7FF00] group-hover:underline flex items-center gap-1">
                  Full Bio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Member Modal Dialog for Full Bio */}
        {selectedMember && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050807]/85 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="relative w-full max-w-xl bg-[#070A08] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#9AA39A] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer border border-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedMember.profileImage}
                  alt={`${selectedMember.name}, ${selectedMember.position} at Securify`}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                  <div className="text-xs font-mono text-[#B7FF00]">{selectedMember.position}</div>
                </div>
              </div>

              <div className="prose prose-invert text-sm text-[#D8DCD8] leading-relaxed mb-6 whitespace-pre-line">
                {selectedMember.fullBiography || selectedMember.shortBiography}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA39A]">
                <span>CONFIDENTIAL SECOPS DOSSIER</span>
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`} className="text-[#B7FF00] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {selectedMember.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Interested In Joining Our Defense Research Unit?"
          subtitle="We are constantly seeking elite vulnerability researchers, reverse engineers, and distributed systems architects."
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
