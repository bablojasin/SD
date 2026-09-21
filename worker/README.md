# SPECTRE DEFEND • Cloudflare OAuth Worker

This directory contains the production-grade Cloudflare Worker providing the secure GitHub OAuth authentication proxy for **Decap CMS / TKCMS**.

## Architecture & Security Model

```text
Decap CMS Admin (/admin/)
       │
       ▼
Cloudflare Worker (/auth) ──[CSRF State + Scopes]──▶ GitHub OAuth Login
       │                                                    │
       │                                           User Authorizes
       │                                                    │
       ▼                                                    ▼
Cloudflare Worker (/callback) ◀──[Authorization Code]───────┘
       │
       ▼
GitHub API (https://github.com/login/oauth/access_token)
  [Exchanges Code + GITHUB_CLIENT_ID + GITHUB_CLIENT_SECRET]
       │
       ▼
Cloudflare Worker receives access_token
       │
       ▼
Secure postMessage Handshake to Decap CMS Opener Window
(Secret never exposed to client/browser; access_token delivered directly to CMS)
```

## Security Controls Implemented

1. **Zero Client-Side Secrets**: `GITHUB_CLIENT_SECRET` is stored strictly as an encrypted Cloudflare Worker Secret and never reaches the browser or GitHub repository.
2. **CSRF State Verification**: Cryptographically generated random state tokens with secure `HttpOnly; Secure; SameSite=Lax` cookies prevent request forgery.
3. **No Logging of Credentials**: Access tokens and client secrets are strictly excluded from console logs and runtime telemetry.
4. **Security Headers**: All worker responses enforce:
   - `Content-Security-Policy: default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline';`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
   - `Referrer-Policy: no-referrer`
5. **CORS & Origin Validation**: Restricted to configured authorized origins.

## Deployment Instructions

### 1. Install Wrangler CLI (if not installed)

```bash
npm install -g wrangler
# or run via npx
```

### 2. Authenticate with Cloudflare

```bash
npx wrangler login
```

### 3. Set Required Secrets in Cloudflare

```bash
# In the worker directory:
cd worker

# 1. Set GitHub Client ID
npx wrangler secret put GITHUB_CLIENT_ID
# Enter your GitHub OAuth App Client ID when prompted

# 2. Set GitHub Client Secret (Never commit to Git!)
npx wrangler secret put GITHUB_CLIENT_SECRET
# Enter your GitHub OAuth App Client Secret when prompted

# 3. (Optional) Set Notification Webhook URL for contact form dispatches
npx wrangler secret put NOTIFICATION_WEBHOOK_URL
```

### 4. Deploy the Worker

```bash
npx wrangler deploy
```

After deployment, your Worker endpoint will be displayed:
```text
https://spectre-defend-oauth-worker.<your-subdomain>.workers.dev
```
Or your custom domain:
```text
https://auth.spectredefend.com
```

### 5. Update Decap CMS Configuration

In `/public/admin/config.yml`, ensure the `base_url` matches your deployed Worker URL:

```yaml
backend:
  name: github
  repo: OWNER/REPOSITORY
  branch: main
  base_url: https://auth.spectredefend.com
  auth_endpoint: auth
```
