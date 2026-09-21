# SPECTRE DEFEND • End-to-End Production Deployment Guide

Follow this sequential checklist to deploy **SPECTRE DEFEND** from an empty state to a fully functional, custom-domain, content-managed production environment.

---

## Deployment Checklist (17 Sequential Steps)

### Phase 1: Local Verification
- [ ] **Step 1: Install Dependencies**
  ```bash
  npm ci || npm install
  ```
- [ ] **Step 2: Validate Build & Linting**
  ```bash
  npm run lint
  npm run build
  ```
  Ensure `/dist` builds with zero errors.

---

### Phase 2: GitHub Repository Setup
- [ ] **Step 3: Push Code to GitHub Repository**
  Create a GitHub repository (e.g. `spectredefend/website`) and push the `main` branch.
- [ ] **Step 4: Configure GitHub Pages**
  In repository **Settings** > **Pages**:
  - Source: **GitHub Actions**.
  - Custom domain: `spectredefend.com`.
  - Enforce HTTPS: **Checked**.

---

### Phase 3: Cloudflare Edge & DNS Setup
- [ ] **Step 5: Configure Cloudflare DNS**
  In Cloudflare Dashboard:
  - Add Apex `A` and `AAAA` records pointing to GitHub Pages IPs.
  - Add `CNAME` for `www` pointing to `spectredefend.com`.
  - Set proxy status to **Proxied (Orange Cloud)**.
- [ ] **Step 6: Configure SSL/TLS Settings**
  Set SSL/TLS to **Full (Strict)** and enable **Always Use HTTPS**.

---

### Phase 4: OAuth App & Worker Authentication
- [ ] **Step 7: Create GitHub OAuth Application**
  In GitHub **Settings** > **Developer Settings** > **OAuth Apps**:
  - App Name: `SPECTRE DEFEND Content Manager`.
  - Homepage URL: `https://spectredefend.com`.
  - Callback URL: `https://auth.spectredefend.com/callback`.
- [ ] **Step 8: Deploy Cloudflare Worker**
  ```bash
  cd worker
  npx wrangler deploy
  ```
- [ ] **Step 9: Store Worker Secrets in Cloudflare**
  ```bash
  npx wrangler secret put GITHUB_CLIENT_ID
  npx wrangler secret put GITHUB_CLIENT_SECRET
  ```
- [ ] **Step 10: Configure Worker Custom Domain**
  In Cloudflare Workers dashboard, bind the worker to `auth.spectredefend.com`.

---

### Phase 5: CMS Configuration & Final Verification
- [ ] **Step 11: Update Decap CMS Config**
  In `public/admin/config.yml`:
  - Set `repo: YOUR_ORG/YOUR_REPO`.
  - Set `base_url: https://auth.spectredefend.com`.
  Commit and push to `main`.
- [ ] **Step 12: Verify Automated GitHub Actions Deployment**
  Monitor the workflow in GitHub **Actions**. Confirm the build and deploy jobs succeed.
- [ ] **Step 13: Test Public Website**
  Navigate to `https://spectredefend.com/`. Verify that the homepage, hero, about, services, team, blog, and contact pages load cleanly.
- [ ] **Step 14: Test Direct Deep Links (SPA Routing)**
  Refresh on `https://spectredefend.com/services/cloud-security`. Verify that the page loads without a 404 error.
- [ ] **Step 15: Test Decap CMS Login**
  Navigate to `https://spectredefend.com/admin/`. Click **Login with GitHub**. Confirm that the popup authenticates and unlocks the editor.
- [ ] **Step 16: Test Content Publishing**
  Make a minor edit in Decap CMS and click **Publish**. Verify that a new Git commit appears on `main` and triggers an automated deployment.
- [ ] **Step 17: Verify SEO & Security Headers**
  Inspect `https://spectredefend.com/robots.txt` and `https://spectredefend.com/sitemap.xml`. Verify HTTPS certificate grade and CSP headers.
