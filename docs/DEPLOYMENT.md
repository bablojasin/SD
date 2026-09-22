# SPECTRE DEFEND • Complete Step-by-Step Production Deployment Guide

This guide provides a linear, unambiguous deployment procedure for **SPECTRE DEFEND** using the custom domain **`https://SpectreDefend.dpdns.org`**, GitHub Pages, Decap CMS, and the Cloudflare OAuth Worker.

---

## STEP 1: REPOSITORY SETUP
1. Initialize or clone the Git repository containing the SPECTRE DEFEND codebase.
2. Ensure all project files, including `public/CNAME`, `public/admin/config.yml`, and `.github/workflows/deploy.yml`, are present.
3. Verify that your remote is set to your production GitHub repository:
   ```bash
   git remote -v
   ```

---

## STEP 2: GITHUB PAGES ACTIVATION
1. Go to your GitHub repository in your browser.
2. Navigate to **Settings** > **Pages** (under the "Code and automation" left sidebar).
3. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions** (do NOT select "Deploy from a branch").
4. Under **Custom domain**:
   - Type: `SpectreDefend.dpdns.org`
   - Click **Save**.

---

## STEP 3: CLOUDFLARE DNS CONFIGURATION
1. Open your Cloudflare Dashboard and navigate to the DNS Zone for your domain (`dpdns.org`).
2. Add the DNS record pointing `SpectreDefend` to your GitHub Pages host:
   - **Type**: `CNAME`
   - **Name**: `SpectreDefend`
   - **Target**: `<YOUR-GITHUB-USERNAME>.github.io` (Replace with your actual GitHub username or organization name).
   - **Proxy Status**: Initially set to **DNS-only (Grey Cloud)** to allow GitHub's Let's Encrypt TLS verification challenge to succeed without proxy interception.
   - **TTL**: Auto.
3. Save the DNS record.

---

## STEP 4: CLOUDFLARE SSL/TLS SETTINGS
1. In the Cloudflare Dashboard, select **SSL/TLS** > **Overview**.
2. Set the encryption mode to **Full** or **Full (Strict)**.
   *(Note: Never use "Flexible", which will cause an infinite HTTP-to-HTTPS redirect loop with GitHub Pages).*
3. Under **SSL/TLS** > **Edge Certificates**:
   - Turn **Always Use HTTPS** to **ON**.
   - Set **Minimum TLS Version** to **TLS 1.2**.

---

## STEP 5: GITHUB OAUTH APPLICATION CREATION
1. In GitHub, open your profile/organization **Settings** > **Developer Settings** > **OAuth Apps**.
2. Click **New OAuth App**.
3. Fill out the application registration form:
   - **Application Name**: `SPECTRE DEFEND Content Manager`
   - **Homepage URL**: `https://SpectreDefend.dpdns.org`
   - **Application Description**: `OAuth authentication proxy for SPECTRE DEFEND Decap CMS`
   - **Authorization Callback URL**: `https://<YOUR-WORKER-DOMAIN>/callback`
     *(If using a workers.dev domain, e.g., `https://spectre-defend-oauth-worker.<subdomain>.workers.dev/callback`)*
4. Click **Register application**.
5. Copy your **Client ID**.
6. Click **Generate a new client secret** and copy the secret immediately to a secure password manager.

---

## STEP 6: CLOUDFLARE WORKER DEPLOYMENT
1. Open your local terminal in the project workspace.
2. Change directory to the worker folder:
   ```bash
   cd worker
   npm install
   ```
3. Verify that `worker/wrangler.jsonc` specifies:
   - `"ALLOWED_ORIGIN": "https://SpectreDefend.dpdns.org"`
   - `"CMS_ORIGIN": "https://SpectreDefend.dpdns.org"`
4. Deploy the worker to Cloudflare:
   ```bash
   npx wrangler deploy
   ```
5. Record the deployed Worker URL (e.g., `https://spectre-defend-oauth-worker.<subdomain>.workers.dev`).

---

## STEP 7: CLOUDFLARE WORKER SECRETS
1. In the `worker` directory, store the GitHub OAuth credentials as encrypted Cloudflare secrets:
   ```bash
   npx wrangler secret put GITHUB_CLIENT_ID
   ```
   Paste your GitHub OAuth Client ID when prompted.
2. Store the GitHub OAuth Client Secret:
   ```bash
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```
   Paste your GitHub OAuth Client Secret when prompted.
3. Verify by querying the health check endpoint:
   ```bash
   curl -I https://<YOUR-WORKER-DOMAIN>/health
   ```
   Expected response: `HTTP/2 200` with JSON status `operational`.

---

## STEP 8: DECAP CMS CONFIGURATION
1. Open `public/admin/config.yml` in your editor.
2. Update the `backend` section with your actual GitHub repository and Worker URL:
   ```yaml
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME
     branch: main
     base_url: https://YOUR-WORKER-DOMAIN
     auth_endpoint: auth

   site_url: "https://SpectreDefend.dpdns.org"
   display_url: "https://SpectreDefend.dpdns.org"
   ```
   *(Ensure `base_url` has no trailing slash and no `/auth` path appended).*

---

## STEP 9: COMMIT AND PUSH
1. Stage all configured changes:
   ```bash
   git add public/admin/config.yml public/CNAME .github/workflows/deploy.yml
   git commit -m "Configure production domain SpectreDefend.dpdns.org and OAuth worker"
   ```
2. Push to the `main` branch of your GitHub repository:
   ```bash
   git push origin main
   ```

---

## STEP 10: GITHUB ACTIONS BUILD VERIFICATION
1. In GitHub, click the **Actions** tab.
2. Select the workflow titled **Deploy SPECTRE DEFEND to GitHub Pages**.
3. Inspect the run logs to ensure:
   - Dependencies installed cleanly.
   - `npm run build` completed without errors.
   - The verification step confirmed `dist/index.html`, `dist/404.html`, `dist/CNAME`, `dist/admin/config.yml`, `dist/robots.txt`, and `dist/sitemap.xml`.
   - The `deploy-pages` step succeeded.

---

## STEP 11: CUSTOM DOMAIN VERIFICATION
1. Go back to GitHub **Settings** > **Pages**.
2. Verify that **Custom domain** displays `SpectreDefend.dpdns.org` with a green checkmark indicating "DNS check successful".

---

## STEP 12: HTTPS CERTIFICATE ISSUANCE
1. Under **Settings** > **Pages**, confirm that the TLS certificate status shows "Certificate issued" or "Enforce HTTPS" is active.
2. If "Enforce HTTPS" is unchecked, check the box.

---

## STEP 13: DNS PROXY ACTIVATION (IF DESIRED)
1. If you wish to enable Cloudflare's edge proxy:
   - In Cloudflare DNS for `dpdns.org`, edit the `SpectreDefend` CNAME record.
   - Change Proxy status from **DNS-only (Grey Cloud)** to **Proxied (Orange Cloud)**.
   - Save the record.
2. Confirm Cloudflare SSL/TLS is set to **Full (Strict)**.

---

## STEP 14: CMS LOGIN VERIFICATION
1. Open your browser in an incognito/private window.
2. Navigate to `https://SpectreDefend.dpdns.org/admin/`.
3. Confirm the Decap CMS login screen loads.
4. Click the **Login with GitHub** button.
5. Verify:
   - A popup window opens pointing to your Worker's `/auth`.
   - The popup redirects to GitHub's authorization consent page.
   - Upon clicking authorize, the popup closes automatically.
   - The CMS administrative dashboard loads and displays your content collections.

---

## STEP 15: CMS CONTENT EDIT TEST
1. In Decap CMS, navigate to **Blog Posts** or **Site Settings & Branding**.
2. Make a minor test update (e.g., editing a draft post or updating a description string).
3. Click **Save** and then **Publish**.

---

## STEP 16: GIT COMMIT CREATION TEST
1. Go to your GitHub repository in a new tab.
2. Inspect the latest commits on the `main` branch.
3. Confirm that Decap CMS created a commit (e.g., "Update Post ...") authored by your GitHub user.

---

## STEP 17: AUTOMATIC REDEPLOY TEST
1. In the GitHub repository, click **Actions**.
2. Confirm that the commit created by Decap CMS automatically triggered the `Deploy SPECTRE DEFEND to GitHub Pages` workflow.
3. Confirm the workflow builds and deploys successfully.

---

## STEP 18: PUBLIC SITEMAP VERIFICATION
1. Open `https://SpectreDefend.dpdns.org/sitemap.xml` in your browser or with curl:
   ```bash
   curl -s https://SpectreDefend.dpdns.org/sitemap.xml | grep "https://SpectreDefend.dpdns.org"
   ```
2. Verify:
   - All URLs use `https://SpectreDefend.dpdns.org`.
   - `/admin/`, `/auth`, and `/callback` are NOT listed in the sitemap.

---

## STEP 19: ROBOTS.TXT VERIFICATION
1. Open `https://SpectreDefend.dpdns.org/robots.txt`:
   ```bash
   curl -s https://SpectreDefend.dpdns.org/robots.txt
   ```
2. Verify:
   - `Disallow: /admin/`, `Disallow: /auth/`, and `Disallow: /callback/` are present.
   - `Sitemap: https://SpectreDefend.dpdns.org/sitemap.xml` is present.

---

## STEP 20: SPA ROUTING TEST
1. Open a direct deep-link URL in your browser:
   `https://SpectreDefend.dpdns.org/services/access-management`
2. Refresh the browser page with Ctrl+F5 / Cmd+Shift+R.
3. Confirm that the page loads cleanly with complete navigation and content without displaying a GitHub Pages 404 error.

---

## STEP 21: CONTACT FORM / WORKER ENDPOINT TEST (IF APPLICABLE)
1. If using the Cloudflare Worker `/contact` endpoint:
   ```bash
   curl -X POST https://<YOUR-WORKER-DOMAIN>/contact \
     -H "Content-Type: application/json" \
     -H "Origin: https://SpectreDefend.dpdns.org" \
     -d '{"name":"SecOps Verification","email":"audit@spectredefend.com","message":"Testing secure dispatch link."}'
   ```
2. Confirm a `200 OK` response with a dispatch tracking ID.

---

## STEP 22: PRODUCTION READINESS SIGN-OFF
1. Verify:
   - Production domain `https://SpectreDefend.dpdns.org` loads with valid HTTPS.
   - Zero console errors in browser DevTools.
   - Decap CMS authentication and editing functional.
   - Automatic CI/CD pipeline triggers on all CMS changes.
2. Sign off on production readiness.
