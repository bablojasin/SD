# SPECTRE DEFEND • Cloudflare Configuration & DNS Architecture

## 1. Cloudflare Role & Responsibilities

Cloudflare acts as the edge perimeter for the SPECTRE DEFEND infrastructure:
- **Anycast DNS**: Routes visitor traffic to the nearest global point of presence.
- **SSL/TLS Encryption**: Enforces end-to-end encryption between visitor, Cloudflare edge, and GitHub Pages.
- **Edge Caching & CDN**: Caches static assets (images, JavaScript, CSS) while bypassing dynamic endpoints.
- **OAuth Worker**: Executes serverless GitHub OAuth token exchange for Decap CMS authors.
- **Web Application Firewall (WAF)**: Mitigates DDoS attacks and malicious bot traffic.

---

## 2. DNS Record Configuration

Configure the following DNS records in the Cloudflare Dashboard for your domain (`spectredefend.com`):

### A. Root Apex & WWW Records (Pointing to GitHub Pages)

| Type | Name | Content / Target | Proxy Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (apex) | `185.199.108.153` | Proxied (Orange Cloud) | GitHub Pages Anycast IP 1 |
| **A** | `@` (apex) | `185.199.109.153` | Proxied (Orange Cloud) | GitHub Pages Anycast IP 2 |
| **A** | `@` (apex) | `185.199.110.153` | Proxied (Orange Cloud) | GitHub Pages Anycast IP 3 |
| **A** | `@` (apex) | `185.199.111.153` | Proxied (Orange Cloud) | GitHub Pages Anycast IP 4 |
| **AAAA**| `@` (apex) | `2606:50c0:8000::153` | Proxied (Orange Cloud) | GitHub Pages IPv6 1 |
| **AAAA**| `@` (apex) | `2606:50c0:8001::153` | Proxied (Orange Cloud) | GitHub Pages IPv6 2 |
| **AAAA**| `@` (apex) | `2606:50c0:8002::153` | Proxied (Orange Cloud) | GitHub Pages IPv6 3 |
| **AAAA**| `@` (apex) | `2606:50c0:8003::153` | Proxied (Orange Cloud) | GitHub Pages IPv6 4 |
| **CNAME**| `www` | `spectredefend.com` | Proxied (Orange Cloud) | Canonical WWW alias |

### B. Cloudflare Worker OAuth Subdomain

Attach the Cloudflare Worker to a dedicated authentication subdomain:

| Type | Name | Content / Target | Proxy Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Custom Domain** | `auth` | `spectre-defend-oauth-worker` | Proxied (Cloudflare) | Worker Custom Domain (`auth.spectredefend.com`) |

*(Alternative: Use the default Cloudflare Workers subdomain `https://spectre-defend-oauth-worker.<subdomain>.workers.dev`)*.

---

## 3. SSL/TLS Encryption Settings

In **SSL/TLS** > **Overview**:
- **Encryption Mode**: Select **Full (Strict)**.
- **Always Use HTTPS**: **Enabled** (**SSL/TLS** > **Edge Certificates**).
- **Minimum TLS Version**: **TLS 1.2** (TLS 1.3 enabled).
- **HSTS (HTTP Strict Transport Security)**:
  - Max-Age: `31536000` (1 year).
  - Include Subdomains: `Enabled`.
  - Preload: `Enabled`.

---

## 4. Cloudflare Worker Secret Management

Cloudflare Worker secrets are encrypted at rest and never exposed to the browser or stored in Git:

```bash
cd worker

# 1. Set GitHub OAuth Client ID
npx wrangler secret put GITHUB_CLIENT_ID
# Enter your Client ID

# 2. Set GitHub OAuth Client Secret
npx wrangler secret put GITHUB_CLIENT_SECRET
# Enter your Client Secret

# 3. Optional Notification Webhook URL
npx wrangler secret put NOTIFICATION_WEBHOOK_URL
# Enter your Webhook URL
```

---

## 5. Caching Rules & Page Rules

### Admin & Auth Exclusion Rule
Create a Cache Rule to prevent caching CMS or OAuth authentication responses:
- **Rule Name**: `Bypass CMS & Auth Caching`
- **Matching Expression**:
  `http.request.uri.path starts_with "/admin" or http.request.uri.path starts_with "/auth" or http.request.uri.path starts_with "/callback"`
- **Cache Eligibility**: **Bypass Cache**

### Static Asset Edge Rule
- **Rule Name**: `Cache Static Production Assets`
- **Matching Expression**:
  `http.request.uri.path starts_with "/assets" or http.request.uri.path contains ".svg" or http.request.uri.path contains ".jpg"`
- **Edge Cache TTL**: `30 days`
- **Browser Cache TTL**: `7 days`
