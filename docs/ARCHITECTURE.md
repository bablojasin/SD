# SPECTRE DEFEND • Architecture Specification

## 1. System Topology

The SPECTRE DEFEND deployment topology completely separates static content delivery from privileged authentication operations:

```text
                                  ┌─────────────────────────────┐
                                  │      Client Web Browser     │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
                        ┌─────────────────────────────────────────────────┐
                        │             Cloudflare Edge Network             │
                        │           - SSL/TLS Full (Strict)               │
                        │           - DNS Anycast Routing                 │
                        │           - DDoS Protection / Web Application   │
                        │             Firewall                            │
                        └──────────────┬───────────────────┬──────────────┘
                                       │                   │
                                       ▼                   ▼
                        ┌────────────────────────┐  ┌────────────────────────┐
                        │   Static Route:        │  │   Auth Route:          │
                        │   spectredefend.com/*  │  │   auth.spectredefend.  │
                        │                        │  │   com/*                │
                        └──────────────┬─────────┘  └──────────────┬─────────┘
                                       │                           │
                                       ▼                           ▼
                        ┌────────────────────────┐  ┌────────────────────────┐
                        │  GitHub Pages Edge     │  │  Cloudflare Worker     │
                        │  - Static files in     │  │  - /auth               │
                        │    dist/               │  │  - /callback           │
                        │  - 404.html SPA router │  │  - /contact            │
                        └──────────────┬─────────┘  └──────────────┬─────────┘
                                       │                           │
                                       │                           │ [Token Exchange]
                                       │                           ▼
                                       │            ┌────────────────────────┐
                                       │            │  GitHub OAuth API      │
                                       │            │  - Client ID + Secret  │
                                       │            └──────────────┬─────────┘
                                       │                           │
                                       ▼                           ▼
                        ┌────────────────────────────────────────────────────┐
                        │                  GitHub Repository                 │
                        │              (e.g. spectredefend/website)          │
                        │  - Branch: main                                    │
                        │  - Content commits via Decap CMS API calls         │
                        │  - GitHub Actions automated build & deployment     │
                        └────────────────────────────────────────────────────┘
```

---

## 2. Component Breakdown

### A. Frontend Layer (GitHub Pages)
- **Role**: Serves pre-compiled, static HTML, CSS, JavaScript bundles, vector assets, and CMS admin configuration.
- **Routing Strategy**: Single Page Application (SPA) driven by React Router v6.
- **Direct Link Support**: Handled via `public/404.html` capturing initial path parameters (`?p=/<path>`) and restoring them inside `index.html` via `window.history.replaceState`.
- **Content Hydration**: All site content is pre-bundled or statically fetched from structured JSON/YAML definitions in `/content/`.

### B. Authentication Layer (Cloudflare Worker)
- **Role**: Acts as a stateless, secure authentication gateway for Decap CMS authors.
- **Zero Client Secrets**: Decap CMS does not possess the `GITHUB_CLIENT_SECRET`. The Worker holds this secret in Cloudflare's hardware security module environment (`env.GITHUB_CLIENT_SECRET`).
- **Endpoints**:
  - `GET /auth`: Generates a cryptographic state token, stores it in an HTTP-only Lax Secure cookie, and issues a 302 redirect to GitHub's OAuth authorization portal.
  - `GET /callback`: Validates the returned state token against the cookie, performs an outbound HTTPS POST to `https://github.com/login/oauth/access_token`, receives the access token, and responds with an HTML page executing a `window.opener.postMessage` handshake into the Decap CMS popup window.
  - `POST /contact`: Validates visitor contact payloads, performs sanitization, assigns a cryptographic dispatch ID, and optionally forwards dispatches to configured enterprise webhooks.

### C. Content Management Layer (Decap CMS)
- **Location**: Static entry point at `/admin/index.html` referencing `/admin/config.yml`.
- **Backend Type**: `backend: name: github`.
- **Repository Operations**: Authorized users make commits directly to the `main` branch of the target GitHub repository using their scoped GitHub access token.
- **Media Workflow**: Uploaded media is committed directly into `public/images/uploads/` or `public/assets/uploads/` and referenced by relative web paths.

---

## 3. Communication Protocols

| Leg | Protocol | Source | Destination | Payload |
| :--- | :--- | :--- | :--- | :--- |
| **1. Site Access** | HTTPS | Browser | Cloudflare -> GitHub Pages | Static bundle assets |
| **2. CMS Launch** | HTTPS | Browser | Browser (`/admin/`) | Decap CMS application |
| **3. OAuth Init** | HTTPS | CMS Popup | Cloudflare Worker (`/auth`) | OAuth scopes & state |
| **4. Auth Handshake** | HTTPS Redirect | Worker | GitHub OAuth Portal | Client ID, State, Callback |
| **5. Auth Callback** | HTTPS | GitHub | Cloudflare Worker (`/callback`) | Auth code & state |
| **6. Token Exchange**| HTTPS POST | Worker | GitHub API | Client ID, Client Secret, Code |
| **7. Token Delivery**| `postMessage`| Popup HTML | CMS Opener Window | Access token (`token: ...`) |
| **8. Content Commit**| HTTPS REST | Decap CMS | GitHub REST API | Git tree & commit payload |
| **9. Auto-Deploy** | Webhook | GitHub Push | GitHub Actions | Builds & deploys to Pages |

---

## 4. Disaster Recovery & Fallback Design

- **Static Resilience**: If the Cloudflare Worker or GitHub API encounters an outage, the public website remains 100% operational on GitHub Pages because it does not depend on any server runtime for visitor traffic.
- **CMS Redundancy**: If Decap CMS is temporarily unreachable, administrators with GitHub repository access can edit `/content/` files directly through the GitHub web UI or Git CLI; pushing changes to `main` immediately triggers the same automated deployment pipeline.
