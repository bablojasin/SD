import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { MetricsBento } from '../components/MetricsBento';
import { ShowcaseSection } from '../components/sections/ShowcaseSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { CTASection } from '../components/common/CTASection';
import { SEO } from '../components/common/SEO';
import { ServiceItem } from '../types';
import { getServiceBySlug, getSEO, getHomePageContent } from '../lib/content';
import { FAQSection } from '../components/common/FAQSection';

interface HomePageProps {
  onOpenScanner: () => void;
  onSelectService: (service: ServiceItem) => void;
  onCtaSuccess: (email: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenScanner,
  onSelectService,
  onCtaSuccess,
}) => {
  const seo = getSEO();
  const homeContent = getHomePageContent();

  return (
    <>
      <SEO
        title="SPECTRE DEFEND | Cybersecurity Solutions & Digital Security"
        description={seo.defaultDescription}
        canonicalUrl="https://SpectreDefend.dpdns.org/"
        faqs={homeContent.faqs}
      />

      {/* Hero Section */}
      <Hero
        onStartProtection={onOpenScanner}
        onSelectService={(serviceId) => {
          const matched = getServiceBySlug(serviceId);
          if (matched) {
            onSelectService(matched);
          } else {
            onSelectService({
              slug: serviceId,
              title: serviceId.replace(/-/g, ' ').toUpperCase(),
              shortDescription: 'Advanced zero-trust protection for enterprise operations.',
              fullDescription: 'Comprehensive autonomous telemetry and threat neutralization.',
              featuredImage: '/assets/images/services_threat_detection_1789575924765.jpg',
              category: 'SecOps',
              order: 1,
              isFeatured: true,
              icon: 'ShieldAlert',
              features: ['Autonomous Detection', 'Microsegmentation', '24/7 SOC Telemetry'],
              metrics: '99.999% Availability',
            });
          }
        }}
      />

      {/* About SPECTRE DEFEND Preview */}
      <AboutSection
        onLearnMore={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cyber Defense Services */}
      <ServicesSection
        onSelectService={onSelectService}
        onExploreAll={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Security Capabilities */}
      <MetricsBento />

      {/* Cybersecurity Showcase / Case Study */}
      <ShowcaseSection onExploreCaseStudy={onOpenScanner} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Cybersecurity Insights / Blog */}
      <BlogSection />

      {/* Frequently Asked Questions */}
      {homeContent.faqs && homeContent.faqs.length > 0 && (
        <FAQSection
          label="Operational Clarifications"
          heading="Frequently Asked Questions"
          description="Everything enterprise security leads need to know about SPECTRE DEFEND's autonomous defense infrastructure."
          faqs={homeContent.faqs}
        />
      )}

      {/* CTA */}
      <CTASection onSuccessPrompt={onCtaSuccess} />
    </>
  );
};
