# SPECTRE DEFEND • Project Overview

## 1. Executive Summary

**SPECTRE DEFEND** is an enterprise-grade cybersecurity web platform delivering autonomous zero-trust cyber defense, active threat interception, and 24/7 sovereign SOC surveillance. The platform combines a dark, futuristic visual aesthetic with a static website architecture deployed to **GitHub Pages**, secured through **Cloudflare**, and content-managed via **Decap CMS** using a dedicated **Cloudflare Worker** GitHub OAuth proxy.

---

## 2. Core Brand Rules

| Directive | Specification |
| :--- | :--- |
| **Official Brand Name** | **SPECTRE DEFEND** (Strictly capitalized as shown). |
| **Forbidden Variations** | Never use *Securify*, *Securefy*, *SpectreDefend*, *Spectre Defense*, *Spectre Security*, or *Specter Defend*. |
| **Official Logo** | Production SVG suite in `/public/assets/brand/spectre-defend-logo.svg`. No embedded bitmaps, no generic shield substitutes. |
| **Color Language** | Deep near-black (`#050807`), pure white typography (`#FFFFFF`), metallic dark borders, and precision neon-lime green accents (`#B7FF00`). |

---

## 3. Technology Stack

- **Frontend Core**: React 18 + TypeScript + Vite.
- **Styling**: Tailwind CSS with custom hardware/cyber design system tokens.
- **Animations**: `motion` (Motion for React) + CSS keyframe hardware animations.
- **Icons**: `lucide-react`.
- **Content Management**: Decap CMS / TKCMS (accessible at `/admin/`) backed by GitHub API.
- **Routing**: React Router v6 with single-page application deep-link decoding for GitHub Pages (`404.html` fallback protocol).
- **Authentication Proxy**: Cloudflare Worker (`worker/src/index.js`) executing GitHub OAuth authorization code exchange without exposing client secrets.
- **Hosting & CDN**: GitHub Pages (Static hosting) + Cloudflare (DNS, HTTPS, Edge Security, OAuth Worker).

---

## 4. Architectural Summary

```text
                                  ┌─────────────────────────────┐
                                  │   USER / SECURITY VISITOR   │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │   CUSTOM DOMAIN / DNS       │
                                  │  (SpectreDefend.dpdns.org)  │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │      CLOUDFLARE EDGE        │
                                  │   (DNS / CDN / SSL / WAF)   │
                                  └──────────────┬──────────────┘
                                                 │
                 ┌───────────────────────────────┴───────────────────────────────┐
                 │                                                               │
                 ▼                                                               ▼
  ┌─────────────────────────────┐                                 ┌─────────────────────────────┐
  │        GITHUB PAGES         │                                 │     CLOUDFLARE WORKER       │
  │     (Static Frontend)       │                                 │   (auth.spectredefend.com)  │
  │                             │                                 │                             │
  │  - Single Page Application  │                                 │  - /auth (State + Redirect) │
  │  - Deep Link Fallback (404) │                                 │  - /callback (Token Exch.)  │
  │  - Decap CMS Portal (/admin)│                                 │  - /contact (Form Handler)  │
  └──────────────┬──────────────┘                                 └──────────────┬──────────────┘
                 │                                                               │
                 │                                                               ▼
                 │                                                ┌─────────────────────────────┐
                 │                                                │     GITHUB OAUTH API        │
                 │                                                │ (token exchange w/ secrets) │
                 │                                                └──────────────┬──────────────┘
                 │                                                               │
                 └───────────────────────────────┬───────────────────────────────┘
                                                 │
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │      GITHUB REPOSITORY      │
                                  │  (spectredefend/website)    │
                                  │                             │
                                  │  - main branch commits      │
                                  │  - content/ changes         │
                                  │  - automated GH Action run  │
                                  └─────────────────────────────┘
```

---

## 5. Key System Directories

- `/content/`: Structured JSON and YAML content for branding, navigation, footer, services, blog, team, testimonials, and legal pages.
- `/public/`: Static files served directly (Decap CMS `/admin/`, logos, robots.txt, sitemap.xml, web manifests, 404 fallback).
- `/public/assets/brand/`: Official vector SVG master logos and variants.
- `/src/`: React components, pages, design system tokens, and CMS data binding loaders.
- `/worker/`: Production Cloudflare Worker OAuth proxy source, configuration (`wrangler.jsonc`), and documentation.
- `/docs/`: Architectural, operational, security, and maintenance documentation.
- `/.github/workflows/`: GitHub Actions static build and GitHub Pages deployment workflow.

---

## 6. Implementation Status Matrix

| Component | Status | Verification Note |
| :--- | :--- | :--- |
| **Brand Standardization** | Verified | Zero references to legacy naming across entire repository. |
| **Official Vector Logo Suite** | Verified | Sharp vector geometry with all required master/symbol/dark/light variants. |
| **Hero Spacing & Composition** | Verified | Unified 3-zone composition (34% / 36% / 30%) with controlled tight gaps. |
| **Decap CMS Configuration** | Verified | Functional `/admin/` portal configured with GitHub backend and Worker OAuth proxy. |
| **GitHub Pages Deployment** | Verified | `.github/workflows/deploy.yml` with automated build and artifact validation. |
| **Cloudflare Worker OAuth Proxy** | Verified | Dedicated `worker/` project with CSRF cookies, security headers, and secret isolation. |
| **SPA Deep Link Fallback** | Verified | Preserved via `public/404.html` redirect and `index.html` state hydration. |
| **SEO & Sitemaps** | Verified | Dynamic structured data, Open Graph cards, sitemap.xml, and crawler directives in robots.txt. |
