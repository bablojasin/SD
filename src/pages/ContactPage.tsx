import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/common/SectionLabel';
import { GlassCard } from '../components/common/GlassCard';
import { SEO } from '../components/common/SEO';
import { getCompanyInfo, getSiteSettings, getContactPageContent } from '../lib/content';
import { FAQSection } from '../components/common/FAQSection';
import { Phone, Mail, MapPin, CheckCircle2, AlertTriangle, Send, ShieldCheck, Loader2 } from 'lucide-react';

interface ContactPageProps {
  onCtaSuccess?: (email: string) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onCtaSuccess }) => {
  const company = getCompanyInfo();
  const siteSettings = getSiteSettings();
  const contactContent = getContactPageContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Zero-Trust Architecture Audit',
    message: '',
  });

  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dispatchId, setDispatchId] = useState<string>('');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid corporate email format (e.g. name@domain.com).';
      }
    }

    if (!formData.message.trim()) {
      errs.message = 'Message / technical requirement scope is required.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters detailing your security requirements.';
    }

    if (!consentGiven) {
      errs.consent = 'You must acknowledge the Privacy Policy to transmit this dispatch.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        const generatedId = data.dispatchId || `SEC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        setDispatchId(generatedId);
        setSubmitted(true);
        if (onCtaSuccess) onCtaSuccess(formData.email);
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          errData.message || `Contact endpoint returned HTTP ${response.status} (${response.statusText || 'Error'}).`
        );
      }
    } catch (err: any) {
      // Clear, informative error feedback if endpoint is not reachable
      console.warn('Contact dispatch error:', err);
      setErrorMessage(
        `Unable to reach contact endpoint (${contactEndpoint}): ${err.message || 'Network request failed'}. In production, ensure your Cloudflare Worker /contact endpoint is configured via VITE_CONTACT_ENDPOINT.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title="Contact SPECTRE DEFEND | Cybersecurity Consultation"
        description="Engage 24/7 Security Operations Center. Emergency incident response, security architecture audits, and zero-trust deployments."
        canonicalUrl="https://spectredefend.com/contact"
        breadcrumbs={[
          { name: 'Home', url: 'https://spectredefend.com/' },
          { name: 'Contact', url: 'https://spectredefend.com/contact' },
        ]}
        faqs={contactContent.faqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel className="mb-4">
            Secure Communications & Incident Command
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
            Engage {siteSettings.siteName || 'SPECTRE DEFEND'} <br />
            <span className="text-[#B7FF00]">Threat Operations</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA39A] leading-relaxed">
            Whether responding to an active intrusion or architecting zero-trust cyber resilience, our security commanders stand ready 24/7.
          </p>
        </div>

        {/* Emergency Red Banner */}
        <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 sm:p-5 mb-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-rose-300">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono">
              <strong>ACTIVE BREACH IN PROGRESS?</strong> Call our 24/7 Red Team Emergency Incident Response Line immediately.
            </span>
          </div>
          <a
            href={`tel:${company.emergencyPhone?.replace(/[^0-9+]/g, '') || '+18004122923'}`}
            className="shrink-0 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            {company.emergencyPhone || '+1 (800) 412-CYBER'} [Priority Line]
          </a>
        </div>

        {/* 2-Column: Details on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Global Cyber Defense Command
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA39A] leading-relaxed">
              We deliver mission-critical cyber defense solutions tailored to financial institutions, healthcare providers, energy grids, and high-growth enterprise infrastructure.
            </p>

            <div className="space-y-4 pt-2">
              <GlassCard className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#172512] border border-[#B7FF00]/30 text-[#B7FF00] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF]">Direct Operations Desk</h4>
                  <a href={`tel:${siteSettings.contactPhone || company.phone}`} className="text-xs text-[#E9ECE8] mt-0.5 hover:text-[#B7FF00] block">
                    {siteSettings.contactPhone || company.phone}
                  </a>
                  <p className="text-[11px] font-mono text-[#9AA39A]">{company.businessHours || '24/7 Global Surveillance'}</p>
                </div>
              </GlassCard>

              <GlassCard className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#172512] border border-[#B7FF00]/30 text-[#B7FF00] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF]">Encrypted Dispatch</h4>
                  <a href={`mailto:${siteSettings.contactEmail || company.email}`} className="text-xs text-[#E9ECE8] mt-0.5 hover:text-[#B7FF00] block">
                    {siteSettings.contactEmail || company.email}
                  </a>
                  <p className="text-[11px] font-mono text-[#9AA39A]">PGP Key ID: {company.pgpKeyId || '0x9B22C44F'}</p>
                </div>
              </GlassCard>

              <GlassCard className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#172512] border border-[#B7FF00]/30 text-[#B7FF00] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF]">Global Headquarters</h4>
                  <p className="text-xs text-[#E9ECE8] mt-0.5">{siteSettings.address || company.address}</p>
                  <p className="text-[11px] font-mono text-[#9AA39A]">SCIF Facility Level 4 Access</p>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
              
              {/* Submission Error Banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold mb-1">Transmission Notice</p>
                    <p className="leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center mx-auto text-[#B7FF00]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#B7FF00]">
                    DISPATCH REF: {dispatchId}
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Authenticated</h3>
                  <p className="text-sm text-[#9AA39A] max-w-md mx-auto leading-relaxed">
                    Your transmission has been securely logged. An encrypted confirmation dossier will be delivered to <strong>{formData.email}</strong> within 15 minutes.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setErrorMessage(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          subject: 'Zero-Trust Architecture Audit',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-full border border-white/10 hover:border-[#B7FF00] text-xs font-mono text-[#B7FF00] hover:bg-[#B7FF00]/10 transition-colors cursor-pointer"
                    >
                      Transmit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                        Full Name <span className="text-[#B7FF00]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Alex Vance"
                        className={`w-full bg-[#050807] border rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#B7FF00]'
                        }`}
                        id="contact-form-name"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                        Corporate Email <span className="text-[#B7FF00]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="a.vance@enterprise.com"
                        className={`w-full bg-[#050807] border rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#B7FF00]'
                        }`}
                        id="contact-form-email"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#050807] border border-white/10 focus:border-[#B7FF00] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        id="contact-form-phone"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Technologies Inc."
                        className="w-full bg-[#050807] border border-white/10 focus:border-[#B7FF00] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        id="contact-form-company"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                      Engagement Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#050807] border border-white/10 focus:border-[#B7FF00] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      id="contact-form-subject"
                    >
                      <option value="Zero-Trust Architecture Audit">Zero-Trust Architecture Audit</option>
                      <option value="Cloud Security Posture (CSPM/CWPP)">Cloud Security Posture (CSPM/CWPP)</option>
                      <option value="Endpoint Detection & Autonomous EDR">Endpoint Detection & Autonomous EDR</option>
                      <option value="Penetration Testing & Red Teaming">Penetration Testing & Red Teaming</option>
                      <option value="Incident Response & Threat Containment">Emergency Incident Response & Containment</option>
                      <option value="General Enterprise Inquiry">General Enterprise Inquiry</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono text-[#9AA39A] mb-2 uppercase">
                      Technical Scope / Requirements <span className="text-[#B7FF00]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Specify existing architecture, cloud environments (AWS, GCP, Azure), current pain points, compliance deadlines, or timeline..."
                      className={`w-full bg-[#050807] border rounded-2xl p-4 text-sm text-white focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#B7FF00]'
                      }`}
                      id="contact-form-message"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Explicit Consent Checkbox (GDPR / CCPA) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => {
                          setConsentGiven(e.target.checked);
                          if (errors.consent) setErrors({ ...errors, consent: undefined });
                        }}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-[#050807] text-[#B7FF00] focus:ring-[#B7FF00] focus:ring-offset-0 transition-colors"
                        id="contact-consent-checkbox"
                        aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                      />
                      <span className="text-xs text-[#9AA39A] leading-relaxed select-none">
                        I acknowledge that SPECTRE DEFEND will process my contact details solely to respond to this security inquiry in accordance with the{' '}
                        <Link to="/privacy" className="text-[#B7FF00] hover:underline underline-offset-2">
                          Privacy Policy
                        </Link>. Data is encrypted and never sold or shared with data brokers.
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="contact-consent-error" className="text-xs text-rose-400 font-mono mt-1.5 ml-7">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B7FF00] hover:bg-[#C6FF00] disabled:bg-[#B7FF00]/50 text-[#050807] font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#B7FF00]/20 active:scale-98"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Encrypting & Transmitting Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Encrypted Dispatch</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#9AA39A] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
                    <span>256-bit TLS Cryptographic Transport • Strict Data Confidentiality</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs */}
        {contactContent.faqs && contactContent.faqs.length > 0 && (
          <FAQSection
            label="SecOps Dispatch FAQ"
            heading="Frequently Asked Questions"
            description="Operational guidelines regarding incident response SLAs, emergency breach escalation, and enterprise NDAs."
            faqs={contactContent.faqs}
          />
        )}

      </div>
    </div>
  );
};
