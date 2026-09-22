# SPECTRE DEFEND — Production Testing Matrix

| Category | Test Item | Verification Method | Status |
| :--- | :--- | :--- | :--- |
| **Local Build** | `npm install` | Clean dependency tree resolution | `[x] PASS` |
| **Local Build** | `npm run build` | Vite production build produces `dist/` | `[x] PASS` |
| **CI / CD** | GitHub Actions build | Workflow file `.github/workflows/deploy.yml` triggers on `push` to `main` | `[x] READY FOR CI` |
| **Hosting** | GitHub Pages deployment | Automated action `actions/deploy-pages@v4` publishes `dist/` | `[ ] REQUIRES RUNNER EXECUTION` |
| **Domain** | Custom domain configuration | `CNAME` present in root and `public/` containing `SpectreDefend.dpdns.org` | `[x] CODE PASS` |
| **SSL / TLS** | HTTPS enforcement | Cloudflare Edge & GitHub Pages SSL certificate | `[ ] EXTERNAL VERIFICATION REQUIRED` |
| **DNS** | DNS CNAME resolution | `SpectreDefend.dpdns.org` CNAME pointing to Pages target | `[ ] EXTERNAL VERIFICATION REQUIRED` |
| **CMS** | Admin Portal Load | `/admin/index.html` loads Decap CMS bundle | `[x] CODE PASS` |
| **CMS** | Decap Config | Backend configured for GitHub with Worker `base_url` | `[x] CONFIG READY` |
| **OAuth** | Worker `/auth` | Generates cryptographically secure CSRF state token & redirects to GitHub | `[x] CODE PASS` |
| **OAuth** | Worker `/callback` | Validates CSRF state, exchanges code for access token via server-to-server POST | `[x] CODE PASS` |
| **OAuth** | PostMessage Isolation | Restricts target origin strictly to `https://SpectreDefend.dpdns.org` | `[x] CODE PASS` |
| **CMS Workflow** | CMS Login & Content Commit | Author edits JSON/Markdown and commits to GitHub `main` | `[ ] EXTERNAL USER ACTION REQUIRED` |
| **Static Assets** | Robots.txt | `dist/robots.txt` disallows `/admin/`, allows public pages & AI crawlers | `[x] PASS` |
| **Static Assets** | Sitemap.xml | `dist/sitemap.xml` includes all canonical URLs | `[x] PASS` |
| **Static Assets** | 404 Deep Linking | `dist/404.html` preserves SPA routing paths | `[x] PASS` |
| **SPA Routing** | Homepage (`/`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | About (`/about`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Services (`/services`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Service Detail (`/services/threat-detection`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Blog (`/blog`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Blog Detail (`/blog/zero-trust-architecture-guide`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Contact (`/contact`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Legal: Privacy (`/privacy`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Legal: Terms (`/terms`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Legal: Refund Policy (`/refund-policy`) | Tested in SPA router | `[x] PASS` |
| **SPA Routing** | Legal: Cookie Policy (`/cookie-policy`) | Tested in SPA router | `[x] PASS` |
| **Security** | Zero Exposed Secrets | Automated scan confirms no hardcoded API keys or secrets in source code | `[x] PASS` |
