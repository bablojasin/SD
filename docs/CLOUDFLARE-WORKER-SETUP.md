# SPECTRE DEFEND — Cloudflare Worker Deployment Guide

The Cloudflare Worker located in `/worker` acts as the serverless OAuth proxy for Decap CMS, keeping your `GITHUB_CLIENT_SECRET` completely isolated from client browsers.

---

## Architecture Flow

```text
USER
  │
  ▼
https://SpectreDefend.dpdns.org/admin/
  │
  ▼
Decap CMS
  │
  ▼
Cloudflare Worker /auth
  │
  ▼
GitHub OAuth
  │
  ▼
Cloudflare Worker /callback
  │
  ▼
Decap CMS popup (via restricted origin postMessage)
  │
  ▼
GitHub API
  │
  ▼
Repository
  │
  ▼
CMS content commit
  │
  ▼
GitHub Actions
  │
  ▼
GitHub Pages
  │
  ▼
https://SpectreDefend.dpdns.org
```

---

## 1. Prerequisites

- Node.js 20+ installed.
- Cloudflare Account with Wrangler CLI authenticated:
  ```bash
  npx wrangler login
  ```

---

## 2. Step-by-Step Deployment

### Step 1: Navigate to the Worker Directory
```bash
cd worker
```

### Step 2: Configure Environment Variables
In `worker/wrangler.toml`, confirm or update:
```toml
[vars]
CMS_ORIGIN = "https://SpectreDefend.dpdns.org"
ALLOWED_ORIGIN = "https://SpectreDefend.dpdns.org"
GITHUB_REPOSITORY_OWNER = "REQUIRES_CONFIGURATION"
GITHUB_REPOSITORY_NAME = "REQUIRES_CONFIGURATION"
GITHUB_BRANCH = "main"
```

### Step 3: Deploy the Worker
Deploy the worker to obtain your live Cloudflare Worker URL:
```bash
npx wrangler deploy
```
*Note the returned Worker domain: e.g. `https://spectre-defend-oauth-worker.<your-subdomain>.workers.dev`.*

### Step 4: Add Encrypted Secrets to Cloudflare
Inject your GitHub OAuth credentials securely into Cloudflare:
```bash
# Enter your GitHub Client ID when prompted:
npx wrangler secret put GITHUB_CLIENT_ID

# Enter your GitHub Client Secret when prompted (STRICTLY CONFIDENTIAL):
npx wrangler secret put GITHUB_CLIENT_SECRET

# Optional notification webhook:
npx wrangler secret put NOTIFICATION_WEBHOOK_URL
```

### Step 5: Update GitHub OAuth Application Callback
In GitHub Developer Settings > OAuth Apps:
- Set **Authorization callback URL** to: `https://<YOUR-ACTUAL-WORKER-DOMAIN>/callback`

### Step 6: Update Decap CMS Configuration
In `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: YOUR_GITHUB_OWNER/YOUR_GITHUB_REPO
  branch: main
  base_url: https://YOUR_ACTUAL_WORKER_DOMAIN
  auth_endpoint: auth
```

---

## 3. Worker Endpoint Verification

Once deployed, test each endpoint:

### Test `/health`
```bash
curl -i https://<YOUR-ACTUAL-WORKER-DOMAIN>/health
```
*Expected response: HTTP 200 with status JSON.*

### Test `/auth`
```bash
curl -i https://<YOUR-ACTUAL-WORKER-DOMAIN>/auth
```
*Expected response: HTTP 302 Redirecting to `https://github.com/login/oauth/authorize` with `Set-Cookie: oauth_state=...; HttpOnly; Secure; SameSite=Lax`.*

### Test `/callback`
```bash
curl -i "https://<YOUR-ACTUAL-WORKER-DOMAIN>/callback"
```
*Expected response: HTML error notification indicating missing code, strictly transmitted to `https://SpectreDefend.dpdns.org`.*

### Test CMS Login
1. Open `https://SpectreDefend.dpdns.org/admin/`.
2. Click **Login with GitHub**.
3. Authorize via GitHub popup.
4. Verify Decap CMS dashboard loads.
