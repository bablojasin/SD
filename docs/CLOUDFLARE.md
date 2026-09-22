# SPECTRE DEFEND • Cloudflare Configuration Guide

This guide details the network architecture, DNS setup, SSL/TLS security, and Cloudflare Worker routing for **SPECTRE DEFEND** using the production custom domain **`SpectreDefend.dpdns.org`**.

---

## 1. Architectural Separation

The deployment infrastructure clearly separates three discrete operational layers:

```
[ Visitor / CMS Author ]
           │
           ▼
[ Cloudflare Edge Layer ]
   ├── DNS Resolution & Edge Routing
   ├── TLS Termination & WAF
   └── Edge Cache (Rules for Static vs Dynamic/Admin)
           │
   ┌───────┴─────────────────────────┐
   │                                 │
   ▼                                 ▼
[ Layer 1: GitHub Pages ]   [ Layer 2: Cloudflare Worker ]
• Target: GITHUB_PAGES_TARGET • Domain: WORKER_DOMAIN
• Serves Static SPA Website  • Executes GitHub OAuth Token Exchange
• Serves Decap CMS (/admin/) • Handles /auth and /callback
```

### Configuration Placeholders
The following placeholders must be configured with your actual environment parameters:

- `CUSTOM_DOMAIN=SpectreDefend.dpdns.org`
- `GITHUB_PAGES_TARGET=REQUIRES_CONFIGURATION` (e.g., `<your-username>.github.io` or GitHub Pages IP cluster)
- `WORKER_DOMAIN=REQUIRES_CONFIGURATION` (e.g., `spectre-defend-oauth-worker.<account-subdomain>.workers.dev` or a dedicated custom subdomain)

---

## 2. DNS Configuration (Cloudflare DNS)

Log in to the Cloudflare Dashboard for your domain zone and configure the DNS records:

### A. Production Domain Record

| Record Type | Name / Host | Target / Content | Proxy Status | Description |
|---|---|---|---|---|
| **CNAME** | `SpectreDefend` (or `@` if domain apex) | `GITHUB_PAGES_TARGET` | **DNS-only** (Initially for cert verification) or **Proxied** | Points `SpectreDefend.dpdns.org` to GitHub Pages |

> **IMPORTANT: Proxy Status (DNS-Only vs Proxied)**:
> 1. **Initial Verification Phase**: When first configuring GitHub Pages and issuing the initial GitHub Pages Let's Encrypt TLS certificate, set the Proxy Status to **DNS-only (Grey Cloud)**. This allows GitHub's certificate challenge to communicate directly with GitHub's servers without proxy interference.
> 2. **Production Phase**: Once the domain is verified and the certificate is active in GitHub Pages settings, you may switch Proxy Status to **Proxied (Orange Cloud)** to benefit from Cloudflare's DDoS protection, Web Application Firewall (WAF), and Anycast edge acceleration.

---

## 3. SSL/TLS Encryption Configuration

Navigate to **SSL/TLS** in the Cloudflare Dashboard:

1. **Encryption Mode**:
   - Set to **Full** or **Full (Strict)**.
   - *Why*: **Full (Strict)** validates the certificate on GitHub Pages origin servers. Because GitHub Pages provisions a valid TLS certificate for `SpectreDefend.dpdns.org`, Full (Strict) provides complete end-to-end cryptographic protection.
   - *Warning*: Never use "Flexible", as it causes infinite HTTP-to-HTTPS redirect loops with GitHub Pages.
2. **Edge Certificates**:
   - **Always Use HTTPS**: **Enabled**.
   - **Minimum TLS Version**: **TLS 1.2** (with TLS 1.3 enabled).
   - **Opportunistic Encryption**: **Enabled**.

---

## 4. Cloudflare Worker Configuration

The OAuth authentication service runs as an isolated serverless Worker that securely mediates between Decap CMS and GitHub.

### A. Deployment via Wrangler CLI
Navigate to the worker directory:
```bash
cd worker
npm install
```

Verify `wrangler.jsonc`:
```jsonc
{
  "name": "spectre-defend-oauth-worker",
  "main": "src/index.js",
  "compatibility_date": "2024-09-21",
  "vars": {
    "ALLOWED_ORIGIN": "https://SpectreDefend.dpdns.org",
    "CMS_ORIGIN": "https://SpectreDefend.dpdns.org"
  }
}
```

### B. Worker Custom Domain / Hostname
You have two options for the Worker endpoint:
1. **Cloudflare Workers Subdomain**:
   - Format: `https://spectre-defend-oauth-worker.<account-subdomain>.workers.dev`
   - Set this URL as your `WORKER_DOMAIN`.
2. **Dedicated Custom Subdomain**:
   - Attach a custom domain in Cloudflare Dashboard: **Workers & Pages** > **spectre-defend-oauth-worker** > **Settings** > **Domains & Routes** > **Add Custom Domain** (e.g., `auth.dpdns.org` or similar).

### C. Worker Secrets Management
Never hardcode secrets. Inject them via Wrangler CLI:
```bash
npx wrangler secret put GITHUB_CLIENT_ID
# Prompt: Enter your GitHub OAuth Client ID

npx wrangler secret put GITHUB_CLIENT_SECRET
# Prompt: Enter your GitHub OAuth Client Secret
```

---

## 5. Cache Considerations for Decap CMS

Because Decap CMS is a dynamic administrative client loaded via static HTML (`/admin/`), aggressive edge caching can cause administrative sessions to see stale configuration or auth failures.

### Recommended Cloudflare Cache Rules (Page Rules or Cache Rules):
Create a Cache Rule in Cloudflare Dashboard under **Caching** > **Cache Rules**:

- **Rule 1: Decap CMS Admin Bypass**:
  - **Condition**: URI Path starts with `/admin/`
  - **Settings**:
    - Cache Eligibility: **Bypass cache**
  - *Reason*: Ensures that updates to `/admin/config.yml` and authentication flows are immediately fetched fresh from the origin without edge latency.

- **Rule 2: OAuth Worker Endpoints (if using zone routes)**:
  - **Condition**: URI Path matches `/auth*` or `/callback*`
  - **Settings**:
    - Cache Eligibility: **Bypass cache**
  - *Reason*: OAuth handshakes and state cookies must never be cached.

- **Rule 3: Static Asset Caching**:
  - **Condition**: URI Path starts with `/assets/` or extension in `(js, css, png, jpg, svg, webp, woff2)`
  - **Settings**:
    - Edge Cache TTL: **30 days**
    - Browser Cache TTL: **4 hours**
