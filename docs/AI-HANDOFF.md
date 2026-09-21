# SPECTRE DEFEND • AI Coding Agent Handoff Manual

> **CRITICAL DIRECTIVE FOR INCOMING AI AGENTS**:
> Read this document completely BEFORE making any architectural, layout, branding, or stylistic changes. This project has strict production constraints and design requirements that must be respected.

---

## 1. Project Identity & Inviolate Rules

- **Official Brand Name**: **SPECTRE DEFEND**
  - **STRICTLY FORBIDDEN**: Never change the brand name to *Securify*, *Securefy*, *SpectreDefend*, *Spectre Defense*, *Spectre Security*, or *Specter Defend*.
  - Any prompt referencing an obsolete name is a test of compliance—always maintain **SPECTRE DEFEND**.
- **Visual Design Identity**:
  - Dark, futuristic, high-contrast aesthetic.
  - Palette: Deep black background (`#050807`), subtle border borders (`#152013`), pure white typography, and vibrant neon-lime green accents (`#B7FF00`).
  - **Hero Section Composition**: Do NOT alter the balanced 3-column composition (left content 34%, center 3D shield visual 36%, right stats card 30%). Never recreate large empty voids.
- **Logo Integrity**:
  - The vector logo in `/public/assets/brand/spectre-defend-logo.svg` is the canonical brand asset.
  - Never replace it with an arbitrary shield, lock icon, or placeholder bitmap.

---

## 2. Architectural Paradigm

- **Hosting**: 100% static client-side single page application hosted on **GitHub Pages**.
- **Backend**: There is **NO backend Node/Express server or database** required for public traffic. The client bundles are served statically.
- **Content Management**: **Decap CMS** (accessible at `/admin/`) writing directly to the GitHub repository using the GitHub REST API.
- **Authentication**: A dedicated **Cloudflare Worker** (`worker/src/index.js`) acts as an OAuth proxy to exchange GitHub OAuth codes for access tokens, keeping the `GITHUB_CLIENT_SECRET` completely isolated from the browser.
- **Zero Client-Side Secrets**: Never add private API keys or OAuth client secrets into Vite client code or Git.

---

## 3. Critical Files & Their Roles

| File Path | Critical Responsibility | Modification Caution |
| :--- | :--- | :--- |
| `public/admin/config.yml` | Decap CMS configuration | Changing collection names or file paths will break CMS editing. |
| `public/404.html` | GitHub Pages SPA redirector | Essential for direct subroute access. Never delete or alter redirect logic. |
| `index.html` | SPA path decoder & meta tags | Contains inline script restoring URL from `404.html`. Must keep in sync with branding. |
| `worker/src/index.js` | Cloudflare Worker OAuth proxy | Implements CSRF state verification and GitHub token exchange. |
| `worker/wrangler.jsonc` | Cloudflare Worker configuration | Defines worker entry point and environment variables. |
| `.github/workflows/deploy.yml` | GitHub Actions deployment pipeline | Automates production build and GitHub Pages deployment. |
| `src/lib/content.ts` | Static content loader | Uses `import.meta.glob` to load all JSON content files from `content/`. |
| `public/assets/brand/*` | Master vector brand assets | The official SVG logo files and variants. |

---

## 4. Development & Build Commands

```bash
# Install dependencies
npm install

# Start local Vite dev server (binds to port 3000)
npm run dev

# Run TypeScript compilation and Vite production build
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

---

## 5. How to Add a New Page to the Application

1. **Create Page Component**: Create `/src/pages/YourNewPage.tsx` using Tailwind CSS and existing typography tokens.
2. **Register Route**: Open `src/App.tsx` and add your `<Route path="/your-path" element={<YourNewPage />} />`.
3. **Update Navigation**: Add navigation entry in `content/site/navigation.json` (and `content/settings/navigation.yml`).
4. **Update Sitemap**: Add URL entry with priority in `public/sitemap.xml`.
5. **Verify**: Run `npm run build` to confirm zero compilation errors.

---

## 6. How to Add a New Cybersecurity Service

1. Create a new JSON file in `content/services/<service-slug>.json`.
2. Follow the established schema:
   ```json
   {
     "id": "quantum-cryptography",
     "title": "Quantum-Safe Cryptography",
     "slug": "quantum-cryptography",
     "tagline": "Post-quantum cryptographic migration",
     "shortDescription": "Full audit and implementation of NIST-standardized quantum-resistant algorithms.",
     "fullDescription": "Detailed overview...",
     "icon": "Key",
     "image": "/images/services/quantum.jpg",
     "imageAlt": "Quantum cryptography",
     "features": ["NIST post-quantum algorithm suite", "Key exchange migration", "Cryptographic agility audits"],
     "deliverables": ["Cryptographic inventory", "Migration roadmap", "HSM implementation"],
     "process": [{"step": "01", "title": "Assessment", "description": "Inventory existing crypto"}],
     "faq": [{"question": "When is quantum migration required?", "answer": "Immediate planning is advised."}],
     "seo": {"metaTitle": "Quantum-Safe Cryptography | SPECTRE DEFEND", "metaDescription": "NIST post-quantum migration."}
   }
   ```
3. Because `src/lib/content.ts` uses `import.meta.glob('/content/services/*.json', { eager: true })`, the new service will automatically appear in the services catalog, navigation, and detail page route `/services/quantum-cryptography`.
4. Add the URL to `public/sitemap.xml`.

---

## 7. How to Avoid Breaking Production

- **DO NOT** convert the project into a server-rendered Express/Next.js application. GitHub Pages hosts static files only.
- **DO NOT** commit `.env` or `.dev.vars` files containing real secrets.
- **DO NOT** delete `public/404.html`. Without it, visiting `/about` or `/services` directly on GitHub Pages will return a raw 404 error.
- **DO NOT** change `public/admin/config.yml` `backend: name: github` to an unconfigured provider.
- **DO NOT** change the casing of brand names in the UI.
