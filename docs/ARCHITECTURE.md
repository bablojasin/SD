# SPECTRE DEFEND • Complete System Architecture & Operational Lifecycle

This document specifies the end-to-end architecture and the complete 20-step lifecycle flow for **SPECTRE DEFEND** operating on the production domain **`https://SpectreDefend.dpdns.org`**.

---

## 1. System Topology Overview

```text
                                  ┌─────────────────────────────┐
                                  │      Client Web Browser     │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
                        ┌─────────────────────────────────────────────────┐
                        │             Cloudflare Edge Network             │
                        │           - SSL/TLS Full (Strict)               │
                        │           - Anycast DNS (SpectreDefend.dpdns)   │
                        │           - DDoS Protection & Edge Caching      │
                        └──────────────┬───────────────────┬──────────────┘
                                       │                   │
                                       ▼                   ▼
                        ┌────────────────────────┐  ┌────────────────────────┐
                        │   Static Web Route:    │  │   Auth Worker Route:   │
                        │   SpectreDefend.dpdns. │  │   WORKER_DOMAIN        │
                        │   org/*                │  │                        │
                        └──────────────┬─────────┘  └──────────────┬─────────┘
                                       │                           │
                                       ▼                           ▼
                        ┌────────────────────────┐  ┌────────────────────────┐
                        │  GitHub Pages Origin   │  │  Cloudflare Worker     │
                        │  - Pre-built static SPA│  │  - /auth               │
                        │  - 404.html deep link  │  │  - /callback           │
                        │  - Decap CMS (/admin/) │  │  - Secrets in Worker   │
                        └──────────────┬─────────┘  └──────────────┬─────────┘
                                       │                           │
                                       │                           │ [Token Exchange]
                                       │                           ▼
                                       │            ┌────────────────────────┐
                                       │            │  GitHub OAuth API      │
                                       │            │  - Client ID & Secret  │
                                       │            └──────────────┬─────────┘
                                       │                           │
                                       ▼                           ▼
                        ┌────────────────────────────────────────────────────┐
                        │                  GitHub Repository                 │
                        │  - Branch: main                                    │
                        │  - Content commits via Decap CMS API calls         │
                        │  - GitHub Actions automated build & deployment     │
                        └────────────────────────────────────────────────────┘
```

---

## 2. Complete 20-Step Operational Flow

The complete operational flow of SPECTRE DEFEND executes across 20 distinct stages:

1. **User visits `https://SpectreDefend.dpdns.org`**: The visitor or content author initiates a request in their web browser for the production site.
2. **Cloudflare handles DNS and edge caching/security**: Cloudflare's Anycast DNS resolves the hostname, applies Web Application Firewall (WAF) checks, terminates TLS securely, and checks edge cache rules.
3. **GitHub Pages serves the built Vite application**: The pre-compiled static HTML, JavaScript, CSS bundles, and assets in the deployment artifact are served to the user's browser.
4. **Router handles SPA paths via 404 fallback**: If the user visits a deep link (e.g., `/services/access-management`), GitHub Pages serves `404.html`, which encodes the route query and passes control to `index.html` where React Router hydrates the view instantly without 404 errors.
5. **Decap CMS loads from `/admin/`**: When an authorized editor visits `https://SpectreDefend.dpdns.org/admin/`, the single-page Decap CMS administrative interface initializes and reads `public/admin/config.yml`.
6. **User clicks login**: The editor clicks the "Login with GitHub" button to initiate authentication.
7. **Browser requests Worker `/auth`**: Decap CMS launches a secure OAuth popup window directed to the configured Cloudflare Worker endpoint `https://<WORKER_DOMAIN>/auth`.
8. **Worker redirects to GitHub OAuth**: The Cloudflare Worker validates the requesting origin, generates a cryptographically random CSRF `state` parameter, sets an HTTP-only Lax Secure cookie, and issues a 302 redirect to `https://github.com/login/oauth/authorize`.
9. **User authorizes application**: GitHub presents the consent screen to the editor requesting repository and user scopes; the editor clicks "Authorize".
10. **GitHub redirects to Worker `/callback`**: After authorization, GitHub redirects the popup window back to `https://<WORKER_DOMAIN>/callback?code=...&state=...`.
11. **Worker validates request and state**: The Cloudflare Worker verifies that the callback contains an authorization code and checks that the returned `state` query parameter matches the secure `oauth_state` cookie.
12. **Worker exchanges code for token using client secret**: The Worker executes an isolated server-to-server HTTPS POST request to `https://github.com/login/oauth/access_token`, sending the authorization code along with `GITHUB_CLIENT_ID` and the encrypted `GITHUB_CLIENT_SECRET`.
13. **Worker sends `postMessage` to Decap CMS window**: The Worker renders an HTML response that dispatches a `postMessage` payload (`authorization:github:success:{"token":"...","provider":"github"}`) strictly targeted to `https://SpectreDefend.dpdns.org`.
14. **Decap receives token**: The Decap CMS opener window receives and verifies the access token and automatically closes the popup window.
15. **Decap connects directly to GitHub API**: Decap CMS uses the acquired Bearer token to communicate directly with the GitHub REST API (`https://api.github.com/repos/OWNER/REPO`).
16. **Content edits made in CMS**: The author writes blog posts, updates cybersecurity service specifications, or modifies site metadata using the structured CMS interface.
17. **Decap commits changes to GitHub repo**: Upon clicking "Publish", Decap CMS makes authenticated GitHub API calls to create a commit on the `main` branch containing the modified JSON/YAML/Markdown files.
18. **GitHub repository receives commit**: The commit is recorded in the Git history of the target repository.
19. **GitHub Actions triggers deployment workflow**: The push event automatically triggers `.github/workflows/deploy.yml`.
20. **Site rebuilds and updates on GitHub Pages**: The workflow checks out the repository, installs dependencies, runs `npm run build`, generates fresh sitemaps, verifies all production artifacts (including `dist/CNAME`), and deploys the updated site to GitHub Pages.

---

## 3. Resilience & Zero-Trust Boundary Summary

- **Static Separation**: The public website does not depend on the Cloudflare Worker to serve traffic. If the worker or GitHub experiences downtime, the live site at `https://SpectreDefend.dpdns.org` remains 100% accessible.
- **Zero Secrets in Frontend**: Neither the GitHub Client Secret nor repository credentials ever exist in the frontend code, browser storage, or Git repository.
- **Origin Scoping**: All Worker responses are strictly locked to `https://SpectreDefend.dpdns.org`, mitigating token interception and unauthorized iframe embedding.
