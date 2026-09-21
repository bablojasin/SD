# SPECTRE DEFEND • Project Changelog

All notable changes to the **SPECTRE DEFEND** architecture, design system, and deployment pipeline are documented in this file.

---

## [2.1.0] - 2026-09-21
### Added
- **Cloudflare OAuth Worker (`worker/`)**:
  - Implemented production-grade serverless GitHub OAuth authentication handler (`worker/src/index.js`).
  - Added cryptographic CSRF state token generation and verification via secure HTTP-only cookies.
  - Implemented server-to-server authorization code exchange with GitHub API preventing client secret exposure.
  - Added clean postMessage handshake protocol for Decap CMS popup window.
  - Configured `worker/wrangler.jsonc` and `worker/package.json`.
  - Added contact dispatch handler (`/contact`) with validation, rate limiting, and webhook dispatch support.
- **Production CI/CD Workflow (`.github/workflows/deploy.yml`)**:
  - Automated Node.js 20 build and GitHub Pages deployment.
  - Integrated pre-flight asset integrity verification.
- **YAML Settings Suite (`content/settings/`)**:
  - Added `branding.yml`, `site.yml`, `navigation.yml`, `footer.yml`, and `seo.yml`.
- **Complete Enterprise Documentation Suite (`docs/`)**:
  - Added `PROJECT-OVERVIEW.md`, `ARCHITECTURE.md`, `SETUP.md`, `CMS.md`, `GITHUB-PAGES.md`, `CLOUDFLARE.md`, `OAUTH.md`, `SECURITY.md`, `DEPLOYMENT.md`, `CONTENT-STRUCTURE.md`, `SEO.md`, `TROUBLESHOOTING.md`, `AI-HANDOFF.md`, `CHANGELOG.md`, and `IMPLEMENTATION-REPORT.md`.

### Changed
- Updated `.gitignore` to strictly exclude `.dev.vars`, `.dev.vars.*`, `.wrangler/`, and all sensitive environment credentials.
- Updated `README.md` to reflect complete enterprise deployment architecture.

---

## [2.0.0] - 2026-09-21
### Added
- **Official Master Vector Logo Suite (`public/assets/brand/`)**:
  - Vector reconstruction of the official SPECTRE DEFEND shield, outer telemetry rings, inner geometric nodes, and wordmark.
  - Generated variants: Master logo, symbol-only, dark theme, light theme, white monochrome, black monochrome, and favicon.
- **Decap CMS Full Configuration (`public/admin/config.yml`)**:
  - Configured collections for site branding, general settings, navigation, footer, global SEO, home page sections, services, blog insights, leadership team, testimonials, and legal policies.
- **Decap CMS Portal Entry (`public/admin/index.html`)**:
  - Embedded Decap CMS script with custom styling matching dark cybersecurity aesthetic.
- **SPA Deep Linking for GitHub Pages**:
  - Implemented `public/404.html` redirect capturing deep paths and `index.html` inline script restoring history state.
- **SEO & Structured Data**:
  - Added `public/sitemap.xml` covering 100% of canonical routes.
  - Added `public/robots.txt` with directives for search and AI web crawlers.
  - Integrated Schema.org JSON-LD structured organization data.

### Fixed
- **Hero Section Composition**:
  - Restructured `Hero.tsx` layout into a unified 3-zone composition (34% content, 36% 3D cyber visual, 30% stats telemetry card).
  - Eliminated excessive horizontal blank space while preserving visual weight and balance.
- **Brand Name Uniformity**:
  - Enforced strict spelling of **SPECTRE DEFEND** across all code, metadata, JSON content, and configuration files.
