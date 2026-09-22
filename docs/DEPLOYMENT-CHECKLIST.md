# SPECTRE DEFEND • Production Deployment Checklist

Use this checklist during production provisioning for **`https://SpectreDefend.dpdns.org`**. Check off each item `[x]` as it is completed.

---

- [ ] **STEP 1: REPOSITORY SETUP**
  - [ ] Cloned repository and verified clean working tree.
  - [ ] Confirmed `public/CNAME` contains exact domain `SpectreDefend.dpdns.org`.
  - [ ] Confirmed `.github/workflows/deploy.yml` contains CNAME verification check.

- [ ] **STEP 2: GITHUB PAGES ACTIVATION**
  - [ ] Opened GitHub repository > **Settings** > **Pages**.
  - [ ] Selected **Source** as **GitHub Actions**.
  - [ ] Entered custom domain `SpectreDefend.dpdns.org` and saved.

- [ ] **STEP 3: CLOUDFLARE DNS CONFIGURATION**
  - [ ] Added `CNAME` record for `SpectreDefend` in Cloudflare DNS pointing to `<GITHUB-USERNAME>.github.io`.
  - [ ] Set Proxy Status to **DNS-only (Grey Cloud)** for initial TLS verification.

- [ ] **STEP 4: CLOUDFLARE SSL/TLS SETTINGS**
  - [ ] Set SSL/TLS Encryption mode to **Full** or **Full (Strict)**.
  - [ ] Enabled **Always Use HTTPS**.
  - [ ] Set Minimum TLS Version to **TLS 1.2**.

- [ ] **STEP 5: GITHUB OAUTH APPLICATION CREATION**
  - [ ] Created new OAuth App in GitHub Developer Settings.
  - [ ] Set Homepage URL to `https://SpectreDefend.dpdns.org`.
  - [ ] Set Authorization callback URL to `https://<WORKER_DOMAIN>/callback`.
  - [ ] Generated and securely recorded **Client ID** and **Client Secret**.

- [ ] **STEP 6: CLOUDFLARE WORKER DEPLOYMENT**
  - [ ] Installed dependencies in `/worker`.
  - [ ] Verified `wrangler.jsonc` specifies `ALLOWED_ORIGIN: "https://SpectreDefend.dpdns.org"`.
  - [ ] Ran `npx wrangler deploy` and recorded the Worker URL (`https://<WORKER_DOMAIN>`).

- [ ] **STEP 7: CLOUDFLARE WORKER SECRETS**
  - [ ] Executed `npx wrangler secret put GITHUB_CLIENT_ID` with the GitHub Client ID.
  - [ ] Executed `npx wrangler secret put GITHUB_CLIENT_SECRET` with the GitHub Client Secret.
  - [ ] Verified `GET https://<WORKER_DOMAIN>/health` returns `200 OK` operational.

- [ ] **STEP 8: DECAP CMS CONFIGURATION**
  - [ ] Updated `public/admin/config.yml` with real repository owner/name.
  - [ ] Set `base_url: https://<WORKER_DOMAIN>` in `public/admin/config.yml`.
  - [ ] Confirmed `site_url` and `display_url` point to `https://SpectreDefend.dpdns.org`.

- [ ] **STEP 9: COMMIT AND PUSH**
  - [ ] Staged all configuration changes (`git add .`).
  - [ ] Committed and pushed to `main` branch on GitHub (`git push origin main`).

- [ ] **STEP 10: GITHUB ACTIONS BUILD VERIFICATION**
  - [ ] Checked GitHub Actions tab for workflow `Deploy SPECTRE DEFEND to GitHub Pages`.
  - [ ] Confirmed build passed with zero errors and artifact deployed.

- [ ] **STEP 11: CUSTOM DOMAIN VERIFICATION**
  - [ ] Verified GitHub Pages settings show `SpectreDefend.dpdns.org` with green checkmark.

- [ ] **STEP 12: HTTPS CERTIFICATE ISSUANCE**
  - [ ] Verified TLS certificate issued by GitHub Pages / Let's Encrypt.
  - [ ] Checked **Enforce HTTPS** box in GitHub Pages settings.

- [ ] **STEP 13: DNS PROXY ACTIVATION (IF DESIRED)**
  - [ ] Switched Cloudflare CNAME record proxy status to **Proxied (Orange Cloud)**.
  - [ ] Verified no redirect loops occur when visiting the site.

- [ ] **STEP 14: CMS LOGIN VERIFICATION**
  - [ ] Visited `https://SpectreDefend.dpdns.org/admin/` in browser.
  - [ ] Clicked "Login with GitHub" and authorized app via popup.
  - [ ] Confirmed popup closed and CMS dashboard loaded successfully.

- [ ] **STEP 15: CMS CONTENT EDIT TEST**
  - [ ] Made a test edit to a post or site setting in Decap CMS.
  - [ ] Clicked "Save" and "Publish".

- [ ] **STEP 16: GIT COMMIT CREATION TEST**
  - [ ] Verified commit appears in GitHub repository history under `main` branch.

- [ ] **STEP 17: AUTOMATIC REDEPLOY TEST**
  - [ ] Verified the new commit triggered a new GitHub Actions deployment run.
  - [ ] Confirmed site re-deployed automatically without manual intervention.

- [ ] **STEP 18: PUBLIC SITEMAP VERIFICATION**
  - [ ] Fetched `https://SpectreDefend.dpdns.org/sitemap.xml`.
  - [ ] Confirmed all URLs use `https://SpectreDefend.dpdns.org`.
  - [ ] Confirmed `/admin/`, `/auth`, and `/callback` are excluded.

- [ ] **STEP 19: ROBOTS.TXT VERIFICATION**
  - [ ] Fetched `https://SpectreDefend.dpdns.org/robots.txt`.
  - [ ] Confirmed Disallow directives for `/admin/`, `/auth/`, `/callback/` and correct Sitemap URL.

- [ ] **STEP 20: SPA ROUTING TEST**
  - [ ] Tested deep direct URL `https://SpectreDefend.dpdns.org/services/access-management`.
  - [ ] Verified page loads and refreshes without 404 error.

- [ ] **STEP 21: CONTACT FORM / WORKER ENDPOINT TEST (IF APPLICABLE)**
  - [ ] Tested `/contact` API endpoint or web form with test payload.
  - [ ] Verified successful dispatch response.

- [ ] **STEP 22: PRODUCTION READINESS SIGN-OFF**
  - [ ] Verified visual design, branding, and logos remain pristine.
  - [ ] Production site live and verified at `https://SpectreDefend.dpdns.org`.
