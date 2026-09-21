# SPECTRE DEFEND

Autonomous Enterprise Cyber Defense & Zero-Trust Intelligence

A production-grade, static-first cybersecurity web application featuring **Decap CMS** content management, a serverless **Cloudflare Worker** OAuth proxy, responsive glassmorphism interfaces, and dynamic zero-trust threat intelligence.

---

## Architecture Overview

```text
[Visitor Web Browser] ── HTTPS ──▶ [Cloudflare Edge (WAF/DNS/SSL)]
                                           │
               ┌───────────────────────────┴───────────────────────────┐
               │                                                       │
               ▼                                                       ▼
   [GitHub Pages (dist/)]                                 [Cloudflare Worker]
- 100% Static React SPA                                - /auth (OAuth Init & CSRF)
- 404.html SPA Deep Link Router                        - /callback (Token Exchange)
- Decap CMS Portal (/admin/)                           - /contact (SecOps Dispatch)
               │                                                       │
               │                                                       ▼
               │                                            [GitHub OAuth API]
               │                                         (Zero client secrets)
               │                                                       │
               └───────────────────────────┬───────────────────────────┘
                                           │
                                           ▼
                             [GitHub Repository (main)]
                              - Git-versioned CMS content
                              - Automated GitHub Actions build
```

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, `lucide-react` icons, `motion` animations.
- **Content Management**: [Decap CMS](https://decapcms.org/) (TKCMS) storing content in git-versioned JSON & YAML files (`/content/`).
- **Authentication**: Serverless Cloudflare Worker (`worker/src/index.js`) executing GitHub OAuth token exchanges without exposing client secrets.
- **Hosting & CDN**: GitHub Pages (Static hosting) + Cloudflare (DNS, HTTPS, Edge Security, DDoS mitigation).
- **Form Dispatch**: SecOps contact form endpoint with validation and webhook forwarding (`/contact`).

---

## Brand Standards

- **Official Brand Name**: **SPECTRE DEFEND** (Strictly capitalized as shown).
- **Brand Identity**: Dark cyber aesthetic with high contrast (`#050807`), pure white typography, and vibrant neon-lime green accents (`#B7FF00`).
- **Official Vector Logos**: Located in `/public/assets/brand/` with master, symbol, dark, light, white, black, and favicon variants.

---

## Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment to GitHub Pages
├── content/                    # CMS-managed content
│   ├── blog/                   # Threat intelligence articles (*.json)
│   ├── legal/                  # Privacy policy, terms, and cookie policies
│   ├── pages/                  # Page content (home, about, contact)
│   ├── services/               # Modular enterprise defense service offerings
│   ├── settings/               # YAML settings (branding, site, navigation, footer, seo)
│   ├── site/                   # JSON settings (branding, site, navigation, footer, seo)
│   ├── team/                   # Leadership team and threat researchers
│   └── testimonials/           # Verified enterprise testimonials
├── docs/                       # Complete production documentation suite
│   ├── PROJECT-OVERVIEW.md     # Executive summary & tech stack
│   ├── ARCHITECTURE.md         # System topology & communication protocols
│   ├── SETUP.md                # Developer setup & local workflows
│   ├── CMS.md                  # Decap CMS user & collection guide
│   ├── GITHUB-PAGES.md         # GitHub Pages & SPA deep link guide
│   ├── CLOUDFLARE.md           # DNS records, SSL/TLS, and edge caching
│   ├── OAUTH.md                # GitHub OAuth app setup & security
│   ├── SECURITY.md             # Threat modeling, CSP, and security headers
│   ├── DEPLOYMENT.md           # 17-step end-to-end deployment checklist
│   ├── CONTENT-STRUCTURE.md    # Content directory & JSON schema reference
│   ├── SEO.md                  # Meta tags, Open Graph, schema.org & sitemaps
│   ├── TROUBLESHOOTING.md      # Diagnostic & operational resolution guide
│   ├── AI-HANDOFF.md           # Mandatory rules for future AI coding agents
│   ├── CHANGELOG.md            # Version release notes
│   └── IMPLEMENTATION-REPORT.md# Final audit & verification report
├── public/
│   ├── 404.html                # Single Page Application deep link router
│   ├── admin/                  # Decap CMS dashboard (index.html & config.yml)
│   ├── assets/brand/           # Official vector SVG logo suite & variants
│   ├── images/uploads/         # Uploaded media assets from CMS
│   ├── favicon.svg             # Favicon vector icon
│   ├── apple-touch-icon.svg    # High-resolution iOS touch icon
│   ├── robots.txt              # Search engine and AI crawler directives
│   └── sitemap.xml             # Canonical search engine XML sitemap
├── src/
│   ├── components/             # Reusable UI components & section blocks
│   ├── lib/
│   │   └── content.ts          # Central data access layer (Vite glob imports)
│   ├── pages/                  # Route views (Home, About, Services, Team, Blog, Contact, Legal)
│   ├── types.ts                # TypeScript domain interfaces
│   ├── App.tsx                 # Client-side router & global state
│   └── main.tsx                # Application root entry point
├── worker/                     # Cloudflare Worker OAuth proxy
│   ├── src/index.js            # OAuth token exchange & /contact handler
│   ├── wrangler.jsonc          # Cloudflare Worker configuration
│   ├── package.json            # Worker package manifest
│   └── README.md               # Worker deployment & secrets guide
├── .gitignore                  # Security and build exclusions
├── .env.example                # Environment variable declarations
├── index.html                  # HTML entry point with SPA handler
├── package.json                # Project dependencies & scripts
└── vite.config.ts              # Vite build configuration
```

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to preview the website.  
Open `http://localhost:3000/admin/` to inspect the Decap CMS portal.

### 3. Validate & Build for Production
```bash
npm run lint
npm run build
```
Generates production static files in `dist/`.

---

## Decap CMS Setup

The CMS is accessible at `/admin/`.

1. In `public/admin/config.yml`, set your repository:
   ```yaml
   backend:
     name: github
     repo: OWNER/REPOSITORY
     branch: main
     base_url: https://auth.spectredefend.com
     auth_endpoint: auth
   ```
2. Authors authenticate with their GitHub account. Commits are pushed directly to the `main` branch, triggering an automated GitHub Actions deployment.

---

## Cloudflare OAuth Worker Setup

The Cloudflare Worker in `/worker` securely manages GitHub OAuth without exposing secrets.

```bash
cd worker
npm install

# Authenticate with Cloudflare
npx wrangler login

# Set encrypted secrets (Never commit secrets to Git!)
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET

# Deploy the worker
npx wrangler deploy
```

Refer to [`docs/OAUTH.md`](./docs/OAUTH.md) and [`docs/CLOUDFLARE.md`](./docs/CLOUDFLARE.md) for full instructions.

---

## Documentation Index

For in-depth operational and architectural specifications, consult the `/docs` directory:

- [Project Overview](./docs/PROJECT-OVERVIEW.md)
- [System Architecture](./docs/ARCHITECTURE.md)
- [Developer Setup](./docs/SETUP.md)
- [Decap CMS Guide](./docs/CMS.md)
- [GitHub Pages Deployment](./docs/GITHUB-PAGES.md)
- [Cloudflare & DNS Architecture](./docs/CLOUDFLARE.md)
- [GitHub OAuth Specification](./docs/OAUTH.md)
- [Security Policy & Threat Modeling](./docs/SECURITY.md)
- [End-to-End Production Deployment](./docs/DEPLOYMENT.md)
- [Content Storage & Schema Reference](./docs/CONTENT-STRUCTURE.md)
- [SEO & Discoverability](./docs/SEO.md)
- [Operational Troubleshooting](./docs/TROUBLESHOOTING.md)
- [AI Coding Agent Handoff Manual](./docs/AI-HANDOFF.md)
- [Project Changelog](./docs/CHANGELOG.md)
- [Final Implementation Report](./docs/IMPLEMENTATION-REPORT.md)

---

## License & Security

Built with zero-trust architectural standards. Licensed under the MIT License.  
To report vulnerabilities, see [`docs/SECURITY.md`](./docs/SECURITY.md) or contact `security@spectredefend.com`.
