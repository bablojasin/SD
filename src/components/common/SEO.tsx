import React, { useEffect } from 'react';
import { getSEO, getSiteSettings } from '../../lib/content';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    tags?: string[];
  };
  service?: {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  breadcrumbs?: {
    name: string;
    url: string;
  }[];
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogTitle,
  ogDescription,
  keywords,
  article,
  service,
  faqs,
  breadcrumbs,
  noIndex = false,
}) => {
  const seoConfig = getSEO();
  const siteSettings = getSiteSettings();

  const brandName = seoConfig.siteName || siteSettings.siteName || 'SPECTRE DEFEND';
  const baseUrl = (seoConfig.siteUrl || siteSettings.siteUrl || 'https://SpectreDefend.dpdns.org').replace(/\/$/, '');

  const finalTitle = title
    ? title.includes(brandName)
      ? title
      : (seoConfig.titleTemplate || '%s | SPECTRE DEFEND').replace('%s', title)
    : seoConfig.defaultTitle || `${brandName} | Cybersecurity Solutions & Digital Security`;

  const finalDescription = description || seoConfig.defaultDescription;
  
  const rawOgImage = ogImage || seoConfig.defaultOgImage || '/logo.svg';
  const finalOgImage = rawOgImage.startsWith('http')
    ? rawOgImage
    : `${baseUrl}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`;

  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const cleanPath = currentPathname === '/' ? '/' : currentPathname.replace(/\/$/, '');
  const currentUrl = canonicalUrl || `${baseUrl}${cleanPath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Helper to set or update meta tag
    const setMeta = (nameAttr: string, key: string, content: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard metadata
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('name', 'description', finalDescription);
    
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }

    // OpenGraph social sharing
    setMeta('property', 'og:title', ogTitle || finalTitle);
    setMeta('property', 'og:description', ogDescription || finalDescription);
    setMeta('property', 'og:image', finalOgImage);
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', article ? 'article' : 'website');
    setMeta('property', 'og:site_name', brandName);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter / X card metadata
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle || finalTitle);
    setMeta('name', 'twitter:description', ogDescription || finalDescription);
    setMeta('name', 'twitter:image', finalOgImage);
    if (seoConfig.twitterHandle) {
      setMeta('name', 'twitter:site', seoConfig.twitterHandle);
      setMeta('name', 'twitter:creator', seoConfig.twitterHandle);
    }

    // Search Console verification codes
    if (seoConfig.googleSiteVerification) {
      setMeta('name', 'google-site-verification', seoConfig.googleSiteVerification);
    }
    if (seoConfig.bingSiteVerification) {
      setMeta('name', 'msvalidate.01', seoConfig.bingSiteVerification);
    }

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // 3. Inject Structured Data (JSON-LD)
    const orgAddress = seoConfig.address || siteSettings.address || '742 Evergreen SecOps Boulevard, Suite 500, San Francisco, CA 94107';
    
    const jsonLdOrg = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: seoConfig.organizationName || brandName,
      description: seoConfig.organizationDescription || siteSettings.tagline,
      url: baseUrl,
      logo: seoConfig.organizationLogo || `${baseUrl}/logo.svg`,
      telephone: seoConfig.phone || siteSettings.contactPhone,
      email: seoConfig.email || siteSettings.contactEmail,
      address: {
        '@type': 'PostalAddress',
        streetAddress: orgAddress,
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94107',
        addressCountry: 'US',
      },
      sameAs:
        seoConfig.socialProfiles && seoConfig.socialProfiles.length > 0
          ? seoConfig.socialProfiles
          : Object.values(siteSettings.socialLinks).filter(Boolean),
    };

    const jsonLdWebSite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seoConfig.siteName || brandName,
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/services?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const scriptsToAdd: object[] = [jsonLdOrg, jsonLdWebSite];

    if (breadcrumbs && breadcrumbs.length > 0) {
      scriptsToAdd.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url,
        })),
      });
    }

    if (service) {
      scriptsToAdd.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        serviceType: service.serviceType || 'Cybersecurity Defense',
        provider: {
          '@type': 'Organization',
          name: seoConfig.organizationName || brandName,
          url: baseUrl,
        },
      });
    }

    if (faqs && faqs.length > 0) {
      scriptsToAdd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    if (article) {
      scriptsToAdd.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: finalTitle,
        description: finalDescription,
        image: [finalOgImage],
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: seoConfig.organizationName || brandName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.svg`,
          },
        },
      });
    }

    // Insert or update script tag
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(scriptsToAdd);
  }, [
    finalTitle,
    finalDescription,
    currentUrl,
    finalOgImage,
    ogTitle,
    ogDescription,
    keywords,
    article,
    service,
    faqs,
    breadcrumbs,
    noIndex,
    seoConfig,
    siteSettings,
    baseUrl,
    brandName,
  ]);

  return null;
};
