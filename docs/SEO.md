# SPECTRE DEFEND • SEO & Discoverability Specification

## 1. Technical SEO Strategy

**SPECTRE DEFEND** uses a multi-layered technical SEO architecture to ensure maximum organic search visibility across standard search engines and modern AI discovery agents:
- **Clean Semantic HTML5**: Standard header, main, section, nav, aside, and footer markup with strict hierarchical heading structures (H1 -> H2 -> H3).
- **Static Pre-Rendering**: Fast page loads and minimal JavaScript execution overhead.
- **Canonical URLs**: Canonical link tags preventing duplicate content indexing across protocol or domain variations.
- **Dynamic Meta Tags**: Page-specific titles, descriptions, and Open Graph / Twitter image tags loaded from CMS data.

---

## 2. Meta Tags & Social Cards

Every page renders compliant Open Graph and Twitter Card tags:

```html
<!-- Primary Meta Tags -->
<title>SPECTRE DEFEND — Autonomous Cyber Defense & Zero-Trust Intelligence</title>
<meta name="title" content="SPECTRE DEFEND — Autonomous Cyber Defense & Zero-Trust Intelligence" />
<meta name="description" content="SPECTRE DEFEND safeguards enterprise infrastructure, clouds, networks, and digital assets against modern cyber threats with autonomous intelligence." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://SpectreDefend.dpdns.org/" />
<meta property="og:title" content="SPECTRE DEFEND — Autonomous Cyber Defense & Zero-Trust Intelligence" />
<meta property="og:description" content="SPECTRE DEFEND safeguards enterprise infrastructure, clouds, networks, and digital assets against modern cyber threats with autonomous intelligence." />
<meta property="og:image" content="https://SpectreDefend.dpdns.org/images/og-spectre-defend.jpg" />

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://SpectreDefend.dpdns.org/" />
<meta property="twitter:title" content="SPECTRE DEFEND — Autonomous Cyber Defense & Zero-Trust Intelligence" />
<meta property="twitter:description" content="SPECTRE DEFEND safeguards enterprise infrastructure, clouds, networks, and digital assets against modern cyber threats with autonomous intelligence." />
<meta property="twitter:image" content="https://SpectreDefend.dpdns.org/images/og-spectre-defend.jpg" />
```

---

## 3. Schema.org JSON-LD Structured Data

The root application provides verified Schema.org structured data declaring the organization and service taxonomy:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SPECTRE DEFEND",
  "legalName": "SPECTRE DEFEND Inc.",
  "url": "https://SpectreDefend.dpdns.org",
  "logo": "https://SpectreDefend.dpdns.org/assets/brand/spectre-defend-logo.svg",
  "description": "Autonomous enterprise cybersecurity, active zero-trust network protection, and 24/7 sovereign SOC surveillance.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-412-2923",
    "contactType": "customer service",
    "email": "defense@spectredefend.com",
    "areaServed": "Global",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://twitter.com/spectredefend",
    "https://github.com/spectredefend",
    "https://linkedin.com/company/spectredefend"
  ]
}
```

---

## 4. Robots.txt & AI Bot Policies

Located at `public/robots.txt`:
- **Allowed Pages**: All public service, blog, team, about, and contact pages.
- **Disallowed Pages**: CMS administration (`/admin/`) and authentication endpoints (`/auth/`, `/callback/`).
- **AI Search Crawlers**: Explicitly granted indexing permissions for **GPTBot**, **ClaudeBot**, **Google-Extended**, and **PerplexityBot** to ensure presence in conversational search summaries.
- **Sitemap Directive**: Declares `Sitemap: https://SpectreDefend.dpdns.org/sitemap.xml`.

---

## 5. XML Sitemap Specifications

Located at `public/sitemap.xml`:
- Contains 100% of canonical site routes (homepage, about, services, individual service slugs, blog, individual article slugs, team, contact, legal).
- Includes `<lastmod>`, `<changefreq>`, and proportional `<priority>` weightings (1.0 for homepage, 0.9 for services index, 0.8 for service/detail pages).
