export interface BrandingConfig {
  brandName: string;
  wordmark?: string;
  brandTagline: string;
  brandDescription: string;
  logoAltText: string;
  primaryLogo?: string;
  logoImage: string;
  lightLogo: string;
  darkLogo: string;
  symbolLogo: string;
  whiteLogo?: string;
  blackLogo?: string;
  monochromeLogo?: string;
  favicon: string;
  appleTouchIcon: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  siteUrl: string;
  logoText: string;
  logoImage?: string;
  favicon?: string;
  appleTouchIcon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
  };
  operationalStatus: string;
}

export interface BusinessInfo {
  legalName: string;
  tradingName: string;
  businessAddress: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  privacyEmail: string;
  legalEmail: string;
  supportEmail: string;
  registrationNumber: string;
  taxId: string;
  operatingHours: string;
}

export interface NavItem {
  label: string;
  href: string;
  openInNewTab?: boolean;
  isVisible?: boolean;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  primaryCta: {
    label: string;
    href: string;
  };
}

export interface FooterConfig {
  footerLogo?: string;
  companyDescription: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  quickLinks: NavItem[];
  servicesLinks: NavItem[];
  legalLinks: NavItem[];
  newsletterHeading?: string;
  newsletterDescription?: string;
  ctaText?: string;
  ctaLink?: string;
  copyright: string;
}

export interface SEOConfig {
  siteName?: string;
  siteTitle?: string;
  siteDescription?: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  defaultSocialImage?: string;
  organizationName?: string;
  organizationDescription?: string;
  organizationLogo?: string;
  twitterHandle: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  phone?: string;
  email?: string;
  address?: string;
  socialProfiles?: string[];
}

export interface HomePageContent {
  hero: {
    smallLabel: string;
    headlinePrimary: string;
    headlineHighlight: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    image: string;
    imageAlt: string;
    statsNumber: string;
    statsLabel: string;
    statsBadge: string;
    badgeText: string;
    serviceRows: {
      id: string;
      label: string;
      serviceId: string;
    }[];
  };
  aboutPreview: {
    sectionLabel: string;
    heading: string;
    description: string;
    ctaLabel: string;
    ctaLink: string;
    globeImage: string;
  };
  servicesSection: {
    sectionLabel: string;
    heading: string;
    description: string;
  };
  securityShowcase: {
    sectionLabel: string;
    heading: string;
    description: string;
  };
  testimonialsSection: {
    sectionLabel: string;
    heading: string;
  };
  blogSection: {
    sectionLabel: string;
    heading: string;
    description: string;
    postCount: number;
  };
  ctaSection: {
    sectionLabel: string;
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
  };
  faqs?: ServiceFAQ[];
}

export interface AboutPageContent {
  sectionLabel: string;
  heading: string;
  highlightText: string;
  description: string;
  heroImage: string;
  doctrineHeading: string;
  story: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  faqs?: ServiceFAQ[];
}

export interface ContactPageContent {
  sectionLabel: string;
  heading: string;
  description: string;
  responseSLA: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  generalEmail: string;
  headquarters: {
    city: string;
    address: string;
  };
  regionalCenters: {
    city: string;
    region: string;
    lead: string;
  }[];
  faqs?: ServiceFAQ[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id?: string;
  slug: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  featuredImage?: string;
  icon?: string;
  iconName?: string; // backwards compatibility
  description?: string; // backwards compatibility
  longDescription?: string; // backwards compatibility
  category?: string;
  order?: number;
  isFeatured?: boolean;
  features: string[];
  metrics: string;
  seoTitle?: string;
  seoDescription?: string;
  // AI Search & Semantic Answer Engine Fields
  whatIs?: string;
  howItWorks?: string;
  whyItMatters?: string;
  whoItIsFor?: string;
  deliverables?: string[];
  faqs?: ServiceFAQ[];
  relatedServices?: string[];
}

export interface TeamMember {
  name: string;
  slug: string;
  position: string;
  profileImage: string;
  shortBiography: string;
  fullBiography: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  highlightMetric: string;
  displayOrder?: number;
}

export interface BlogPostItem {
  id?: string;
  title: string;
  slug: string;
  featuredImage?: string;
  imageAlt?: string;
  imageUrl?: string; // backwards compatibility
  excerpt: string;
  content?: string;
  author: string;
  authorRole?: string;
  authorImage?: string;
  publishDate?: string;
  date?: string; // backwards compatibility
  readTime: string;
  category: string;
  tags?: string[];
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface LegalPageContent {
  title: string;
  slug: string;
  lastUpdated: string;
  effectiveDate: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export interface SecurityAuditResult {
  target: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  checks: {
    name: string;
    status: 'passed' | 'warning' | 'critical';
    details: string;
  }[];
}
