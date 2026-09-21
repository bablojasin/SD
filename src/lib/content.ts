import {
  BrandingConfig,
  SiteSettings,
  NavigationConfig,
  FooterConfig,
  SEOConfig,
  HomePageContent,
  AboutPageContent,
  ContactPageContent,
  ServiceItem,
  TeamMember,
  TestimonialItem,
  BlogPostItem,
  LegalPageContent,
} from '../types';

// Load static JSON files statically via Vite glob imports
const siteFiles = (import.meta as any).glob('/content/site/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const pageFiles = (import.meta as any).glob('/content/pages/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const serviceFiles = (import.meta as any).glob('/content/services/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const teamFiles = (import.meta as any).glob('/content/team/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const testimonialFiles = (import.meta as any).glob('/content/testimonials/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const blogFiles = (import.meta as any).glob('/content/blog/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const legalFiles = (import.meta as any).glob('/content/legal/*.json', { eager: true, import: 'default' }) as Record<string, any>;

// Default Fallbacks
const defaultBranding: BrandingConfig = {
  brandName: 'SPECTRE DEFEND',
  brandTagline: 'Autonomous Enterprise Cyber Defense & Zero-Trust Intelligence',
  brandDescription: 'SPECTRE DEFEND provides autonomous zero-trust cyber defense, continuous threat detection, incident containment, and cryptographic security architecture for enterprise infrastructures worldwide.',
  logoAltText: 'SPECTRE DEFEND Autonomous Cyber Defense',
  logoImage: '/logo.svg',
  lightLogo: '/logo-light.svg',
  darkLogo: '/logo-dark.svg',
  symbolLogo: '/logo-symbol.svg',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
};

const defaultSiteSettings: SiteSettings = {
  siteName: 'SPECTRE DEFEND',
  tagline: 'Autonomous Cyber Defense & Zero-Trust Intelligence',
  siteUrl: 'https://spectredefend.com',
  logoText: 'SPECTRE DEFEND',
  logoImage: '/logo.svg',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
  contactEmail: 'defense@spectredefend.com',
  contactPhone: '[REQUIRES BUSINESS CONFIRMATION]',
  address: '[REQUIRES BUSINESS CONFIRMATION]',
  socialLinks: {
    twitter: 'https://twitter.com/spectredefend',
    github: 'https://github.com/spectredefend',
    linkedin: 'https://linkedin.com/company/spectredefend',
    discord: 'https://discord.gg/spectredefend',
  },
  operationalStatus: 'Autonomous Threat Interception Active • Continuous Telemetry Monitoring',
};

const defaultNavigation: NavigationConfig = {
  mainNav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Team', href: '/team' },
    { label: 'Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  primaryCta: {
    label: 'Get Started',
    href: '/contact',
  },
};

const defaultFooter: FooterConfig = {
  footerLogo: '/logo.svg',
  companyDescription:
    'SPECTRE DEFEND delivers autonomous zero-trust cyber defense, high-frequency threat isolation, and 24/7 sovereign SOC surveillance protecting modern enterprise infrastructure.',
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Leadership Team', href: '/team' },
    { label: 'Threat Insights', href: '/blog' },
    { label: 'Contact SecOps', href: '/contact' },
  ],
  servicesLinks: [
    { label: 'Threat Detection & Response', href: '/services/threat-detection' },
    { label: 'Network Security', href: '/services/network-security' },
    { label: 'Cloud Security', href: '/services/cloud-security' },
    { label: 'Vulnerability Assessment', href: '/services/vulnerability-assessment' },
    { label: 'Penetration Testing', href: '/services/penetration-testing' },
    { label: '24/7 Security Monitoring', href: '/services/security-monitoring' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Decap CMS Portal', href: '/admin/' },
  ],
  copyright: '© 2026 SPECTRE DEFEND. All rights reserved.',
};

const defaultSEO: SEOConfig = {
  siteName: 'SPECTRE DEFEND',
  siteTitle: 'SPECTRE DEFEND | Autonomous Cyber Defense & Zero-Trust Architecture',
  siteDescription:
    'Protect enterprise infrastructure with SPECTRE DEFEND autonomous zero-trust cyber defense, high-speed telemetry, continuous threat detection, and 24/7 sovereign SOC operations.',
  defaultTitle: 'SPECTRE DEFEND | Autonomous Cyber Defense & Zero-Trust Architecture',
  titleTemplate: '%s | SPECTRE DEFEND',
  defaultDescription:
    'Protect enterprise infrastructure with SPECTRE DEFEND autonomous zero-trust cyber defense, high-speed telemetry, continuous threat detection, and 24/7 sovereign SOC operations.',
  siteUrl: 'https://spectredefend.com',
  defaultOgImage: '/src/assets/images/hero_cyber_defense_shield_1789577844799.jpg',
  twitterHandle: '@spectredefend',
  organizationName: 'SPECTRE DEFEND',
  organizationLogo: 'https://spectredefend.com/logo.svg',
};

// Safe Getters
export function getBranding(): BrandingConfig {
  return (siteFiles['/content/site/branding.json'] as BrandingConfig) || defaultBranding;
}

export function getSiteSettings(): SiteSettings {
  return (siteFiles['/content/site/settings.json'] as SiteSettings) || defaultSiteSettings;
}

export function getNavigation(): NavigationConfig {
  return (siteFiles['/content/site/navigation.json'] as NavigationConfig) || defaultNavigation;
}

export function getFooter(): FooterConfig {
  return (siteFiles['/content/site/footer.json'] as FooterConfig) || defaultFooter;
}

export function getSEO(): SEOConfig {
  return (siteFiles['/content/site/seo.json'] as SEOConfig) || defaultSEO;
}

// Company Info for contact / legal / cards
export function getBusinessInfo(): import('../types').BusinessInfo {
  const fromFile = siteFiles['/content/site/business.json'];
  if (fromFile) return fromFile;

  return {
    legalName: '[REQUIRES BUSINESS CONFIRMATION]',
    tradingName: 'SPECTRE DEFEND',
    businessAddress: '[REQUIRES BUSINESS CONFIRMATION]',
    country: '[REQUIRES BUSINESS CONFIRMATION]',
    city: '[REQUIRES BUSINESS CONFIRMATION]',
    email: 'defense@spectredefend.com',
    phone: '[REQUIRES BUSINESS CONFIRMATION]',
    whatsapp: '[REQUIRES BUSINESS CONFIRMATION]',
    website: 'https://spectredefend.com',
    privacyEmail: 'privacy@spectredefend.com',
    legalEmail: 'legal@spectredefend.com',
    supportEmail: 'support@spectredefend.com',
    registrationNumber: '[REQUIRES BUSINESS CONFIRMATION]',
    taxId: '[REQUIRES BUSINESS CONFIRMATION]',
    operatingHours: '24/7 Security Operations Telemetry',
  };
}

export function getCompanyInfo() {
  const site = getSiteSettings();
  const contact = getContactPageContent();
  const biz = getBusinessInfo();
  return {
    name: site.siteName || biz.tradingName,
    legalName: biz.legalName,
    email: contact.email || biz.email,
    phone: contact.phone || biz.phone,
    emergencyPhone: contact.emergencyPhone || biz.phone,
    address: contact.headquarters?.address || biz.businessAddress,
    businessHours: biz.operatingHours || '24/7 Continuous SOC Telemetry',
    pgpKeyId: '0x9B22C44F',
    socialLinks: site.socialLinks,
  };
}

// Pages
export function getHomePageContent(): HomePageContent {
  const content = pageFiles['/content/pages/home.json'] as HomePageContent;
  if (content) return content;

  return {
    hero: {
      smallLabel: 'Next-Generation Cyber Protection',
      headlinePrimary: 'Defend Your Digital World With',
      headlineHighlight: 'Next-Gen Cybersecurity',
      description:
        'Protect your systems, data and digital infrastructure with advanced threat detection, real-time monitoring and proactive defense solutions.',
      primaryButtonText: 'Start Protecting Today',
      primaryButtonLink: '/contact',
      image: '/src/assets/images/hero_3d_shield_1789575889590.jpg',
      imageAlt: 'SPECTRE DEFEND Autonomous Cyber Defense Shield',
      statsNumber: '99.9%',
      statsLabel: 'Threat Detection Rate',
      statsBadge: 'Zero Trust Certified',
      badgeText: 'Next-Gen Security Platform',
      serviceRows: [
        { id: '1', label: 'Cyber Network Security', serviceId: 'network-security' },
        { id: '2', label: 'Cloud Of Security', serviceId: 'cloud-security' },
        { id: '3', label: 'Endpoint Of Protection', serviceId: 'threat-detection' },
      ],
    },
    aboutPreview: {
      sectionLabel: 'Our Defense Doctrine',
      heading: 'Continuous Threat Neutralization at Wire Speed',
      description:
        'We decouple cybersecurity from human response latency. Our zero-trust fabric continuously interrogates host baselines and arrests unauthorized movement in sub-second timeframes.',
      ctaLabel: 'Read Defense Architecture',
      ctaLink: '/about',
      globeImage: '/src/assets/images/about_3d_globe_1789575901855.jpg',
    },
    servicesSection: {
      sectionLabel: 'Our Cyber Defense',
      heading: 'Security Built For The Threats Ahead',
      description:
        'Engineered from the ground up for modern hybrid cloud architectures, distributed enterprise fleets, and zero-trust perimeters.',
    },
    securityShowcase: {
      sectionLabel: 'Case Study & Operational Impact',
      heading: 'Securing High-Assurance Global Infrastructure',
      description:
        'How our autonomous fabric protected a tier-one financial institution against a multi-vector zero-day campaign without operational disruption.',
    },
    testimonialsSection: {
      sectionLabel: 'Proven Defense',
      heading: 'Trusted By Industry CISOs',
    },
    blogSection: {
      sectionLabel: 'Cybersecurity Insights',
      heading: 'Stay Ahead Of The Threat',
      description:
        'In-depth threat analyses, CVE breakdowns, zero-day advisories, and architectural whitepapers authored by the SPECTRE DEFEND Threat Research Lab.',
      postCount: 3,
    },
    ctaSection: {
      sectionLabel: 'IMMEDIATE DEPLOYMENT',
      heading: 'Take The First Step Toward Stronger Security',
      description: "Your digital environment doesn't have to face modern threats alone.",
      buttonText: 'Start Defending Today',
      buttonLink: '/contact',
      image: '/src/assets/images/cta_3d_mail_shield_1789575913648.jpg',
    },
  };
}

export function getAboutPageContent(): AboutPageContent {
  const content = pageFiles['/content/pages/about.json'] as AboutPageContent;
  if (content) return content;

  return {
    sectionLabel: 'About SPECTRE DEFEND',
    heading: 'Defending Global',
    highlightText: 'Digital Sovereignty',
    description:
      'SPECTRE DEFEND protects enterprises, sovereign cloud estates, infrastructure, applications, networks, and digital assets against modern cyber threats with autonomous intelligence.',
    heroImage: '/src/assets/images/about_3d_globe_1789575901855.jpg',
    doctrineHeading: 'Our Security Doctrine: Zero Trust, Zero Compromise',
    story:
      "At SPECTRE DEFEND, we believe cybersecurity is more than just technology—it's institutional trust. Traditional perimeter security assumes anything behind the firewall is safe. In today's hostile digital landscape, nation-state adversaries, polymorphic ransomware, and AI-driven bots easily bypass static walls.",
    mission:
      'Our autonomous defense fabric validates every packet, every process, and every identity continuously. By decoupling detection from human latency, our platforms neutralize breaches in sub-second timeframes.',
    vision:
      'To build the world’s most dependable, autonomous, and mathematically rigorous security perimeter for global cloud and sovereign computational infrastructure.',
    values: [
      { title: 'Continuous Verification', description: 'Never trust, always verify. Every identity, process, and packet is challenged at every layer.' },
      { title: 'Sub-Second Neutralization', description: 'Breach containment cannot wait for human triage. Autonomous action occurs in under 12 milliseconds.' },
    ],
    stats: [
      { value: '20,000+', label: 'Enterprise Endpoints Secured' },
      { value: '<12ms', label: 'Autonomous Threat Quarantine' },
    ],
    cta: {
      heading: 'Join The Global Defense Network',
      description: 'Speak directly with our principal security architects to audit your attack surface.',
      buttonText: 'Schedule Architectural Review',
      buttonLink: '/contact',
    },
  };
}

export function getContactPageContent(): ContactPageContent {
  const content = pageFiles['/content/pages/contact.json'] as ContactPageContent;
  if (content) return content;

  return {
    sectionLabel: 'Direct SecOps Uplink',
    heading: 'Initiate Secure Communications',
    description: 'Engage our global incident response commanders or schedule a confidential threat briefing with our principal defense architects.',
    responseSLA: 'Rapid Incident Triage For Active Breaches • 24-Hour Standard Inquiries',
    phone: '[REQUIRES BUSINESS CONFIRMATION]',
    emergencyPhone: '[REQUIRES BUSINESS CONFIRMATION]',
    email: 'incident-response@spectredefend.com',
    generalEmail: 'defense@spectredefend.com',
    headquarters: {
      city: '[REQUIRES BUSINESS CONFIRMATION]',
      address: '[REQUIRES BUSINESS CONFIRMATION]',
    },
    regionalCenters: [
      { city: 'London', region: 'EMEA Operations', lead: 'Mayfair Cyber Campus' },
      { city: 'Singapore', region: 'APAC Sentinel Hub', lead: 'Marina Tech Tower' },
      { city: 'Tokyo', region: 'East Asia SOC', lead: 'Chiyoda Cryptographic Center' },
    ],
  };
}

export function getServicesPageContent() {
  const content = pageFiles['/content/pages/services.json'];
  if (content) return content;

  return {
    sectionLabel: 'Enterprise Defense Capabilities',
    heading: 'Comprehensive Cybersecurity Services',
    description:
      'Engineered to protect every vector of your digital estate: from deep wire packet analysis to autonomous cloud workload containment.',
    faqs: [
      {
        question: 'Can SPECTRE DEFEND services be deployed modularly or do they require the full suite?',
        answer:
          'SPECTRE DEFEND services are fully modular. You can deploy standalone Cloud Security, Penetration Testing, or 24/7 Security Monitoring, or integrate the complete unified Zero-Trust Defense Fabric across your infrastructure.',
        order: 1,
      },
      {
        question: 'How does SPECTRE DEFEND integrate with existing enterprise tools like Splunk, Datadog, or Jira?',
        answer:
          'SPECTRE DEFEND provides native bi-directional webhooks and REST APIs for Splunk, Datadog, Elastic, Sentinel, ServiceNow, and Jira, synchronizing threat alerts and automated containment actions in real-time.',
        order: 2,
      },
      {
        question: 'Do you provide custom compliance mapping for financial and healthcare institutions?',
        answer:
          'Yes. All monitoring and vulnerability assessment deliverables include automated compliance control mapping for PCI-DSS 4.0, HIPAA Security Rule, FFIEC, and GDPR Article 32.',
        order: 3,
      },
    ],
  };
}

// Services Collection
export function getServices(): ServiceItem[] {
  const items = Object.values(serviceFiles)
    .filter(Boolean)
    .map((raw: any) => {
      return {
        ...raw,
        slug: raw.slug || raw.id,
        id: raw.slug || raw.id,
        iconName: raw.icon || raw.iconName || 'ShieldAlert',
        icon: raw.icon || raw.iconName || 'ShieldAlert',
        description: raw.shortDescription || raw.description || '',
        shortDescription: raw.shortDescription || raw.description || '',
        longDescription: raw.fullDescription || raw.longDescription || '',
        fullDescription: raw.fullDescription || raw.longDescription || '',
        category: raw.category || 'Defense',
        features: raw.features || [],
        metrics: raw.metrics || '99.999% SLA',
        whatIs: raw.whatIs,
        howItWorks: raw.howItWorks,
        whyItMatters: raw.whyItMatters,
        whoItIsFor: raw.whoItIsFor,
        deliverables: raw.deliverables || [],
        faqs: raw.faqs || [],
        relatedServices: raw.relatedServices || [],
      } as ServiceItem;
    });

  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const services = getServices();
  return services.find((s) => s.slug === slug || s.id === slug);
}

// Team Collection
export function getTeamMembers(): TeamMember[] {
  const members = (Object.values(teamFiles).filter(Boolean) as any[]).map((raw) => ({
    name: raw.name || '',
    slug: raw.slug || '',
    position: raw.position || '',
    profileImage: raw.profileImage || '',
    shortBiography: raw.shortBiography || '',
    fullBiography: raw.fullBiography || raw.shortBiography || '',
    email: raw.email,
    linkedin: raw.linkedin,
    twitter: raw.twitter,
    github: raw.github,
    displayOrder: raw.displayOrder || 0,
    isFeatured: Boolean(raw.isFeatured),
  })) as TeamMember[];

  return members.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  const members = getTeamMembers();
  return members.find((m) => m.slug === slug);
}

// Testimonials Collection
export function getTestimonials(): TestimonialItem[] {
  const items = (Object.values(testimonialFiles).filter(Boolean) as any[]).map((raw) => ({
    id: raw.id || raw.name,
    name: raw.name || '',
    role: raw.role || '',
    company: raw.company || '',
    avatarUrl: raw.avatarUrl || '',
    quote: raw.quote || '',
    rating: raw.rating || 5,
    highlightMetric: raw.highlightMetric || '',
    displayOrder: raw.displayOrder || 0,
  })) as TestimonialItem[];

  return items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

// Blog Collection
export function getBlogPosts(): BlogPostItem[] {
  const posts = (Object.values(blogFiles).filter(Boolean) as any[]).map((p) => ({
    ...p,
    id: p.slug || p.id,
    slug: p.slug || p.id,
    imageUrl: p.featuredImage || p.imageUrl || '',
    featuredImage: p.featuredImage || p.imageUrl || '',
    date: p.publishDate || p.date || '',
    publishDate: p.publishDate || p.date || '',
    readTime: p.readTime || '5 min read',
    category: p.category || 'Security',
    excerpt: p.excerpt || '',
    content: p.content || '',
    author: p.author || 'Threat Operations',
  })) as BlogPostItem[];

  return posts.sort((a, b) => new Date(b.publishDate || b.date || 0).getTime() - new Date(a.publishDate || a.date || 0).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPostItem | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
}

// Legal Collection
export function getLegalPageBySlug(slug: string): LegalPageContent | undefined {
  const normalized = slug.toLowerCase().replace(/^\//, '');
  const aliasMap: Record<string, string> = {
    cookies: 'cookie-policy',
    cookie: 'cookie-policy',
    'cookie-policy': 'cookie-policy',
    terms: 'terms',
    'terms-of-service': 'terms',
    tos: 'terms',
    privacy: 'privacy',
    'privacy-policy': 'privacy',
    refund: 'refund-policy',
    'refund-policy': 'refund-policy',
    cancellation: 'refund-policy',
  };
  const targetSlug = aliasMap[normalized] || normalized;

  const pages = (Object.values(legalFiles).filter(Boolean) as any[]).map((raw) => ({
    title: raw.title || '',
    slug: raw.slug || '',
    lastUpdated: raw.lastUpdated || '',
    effectiveDate: raw.effectiveDate || '',
    summary: raw.summary || '',
    sections: raw.sections || [],
  })) as LegalPageContent[];

  return pages.find((p) => p.slug === targetSlug || p.slug === normalized);
}

// Global Instant Search
export interface SearchResult {
  title: string;
  type: 'Service' | 'Insight' | 'Page' | 'Team';
  snippet: string;
  url: string;
}

export function searchSite(query: string): SearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const results: SearchResult[] = [];

  // 1. Search Services
  getServices().forEach((svc) => {
    const title = svc.title || '';
    const desc = svc.shortDescription || svc.description || '';
    const cat = svc.category || '';
    if (
      title.toLowerCase().includes(clean) ||
      desc.toLowerCase().includes(clean) ||
      cat.toLowerCase().includes(clean) ||
      svc.features?.some((f) => f.toLowerCase().includes(clean))
    ) {
      results.push({
        title: svc.title,
        type: 'Service',
        snippet: desc,
        url: `/services/${svc.slug}`,
      });
    }
  });

  // 2. Search Blog / Insights
  getBlogPosts().forEach((post) => {
    const title = post.title || '';
    const excerpt = post.excerpt || '';
    const cat = post.category || '';
    if (
      title.toLowerCase().includes(clean) ||
      excerpt.toLowerCase().includes(clean) ||
      cat.toLowerCase().includes(clean) ||
      post.tags?.some((t) => t.toLowerCase().includes(clean))
    ) {
      results.push({
        title: post.title,
        type: 'Insight',
        snippet: excerpt,
        url: `/blog/${post.slug}`,
      });
    }
  });

  // 3. Search Team
  getTeamMembers().forEach((member) => {
    const name = member.name || '';
    const pos = member.position || '';
    const bio = member.shortBiography || '';
    if (
      name.toLowerCase().includes(clean) ||
      pos.toLowerCase().includes(clean) ||
      bio.toLowerCase().includes(clean)
    ) {
      results.push({
        title: `${member.name} (${member.position})`,
        type: 'Team',
        snippet: member.shortBiography,
        url: `/team`,
      });
    }
  });

  // 4. Core Pages
  const corePages = [
    { title: 'Zero-Trust Architecture & Mission', type: 'Page' as const, snippet: 'About SPECTRE DEFEND doctrine, sovereign security values and leadership story.', url: '/about' },
    { title: 'SecOps Incident Response & Contact', type: 'Page' as const, snippet: 'Direct hotline, emergency SLA briefings, and San Francisco headquarters.', url: '/contact' },
    { title: 'Privacy Policy & Data Sovereignty', type: 'Page' as const, snippet: 'Cryptographic data protection, telemetry retention, and tenant privacy.', url: '/privacy' },
    { title: 'Terms of Service & SLA', type: 'Page' as const, snippet: 'Authorized perimeter scanning guidelines, 99.999% availability agreement.', url: '/terms' },
  ];

  corePages.forEach((pg) => {
    if (pg.title.toLowerCase().includes(clean) || pg.snippet.toLowerCase().includes(clean)) {
      results.push(pg);
    }
  });

  return results;
}
