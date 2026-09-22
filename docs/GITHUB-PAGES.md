# SPECTRE DEFEND • GitHub Pages Deployment & Custom Domain Guide

This document outlines the complete configuration for hosting **SPECTRE DEFEND** on **GitHub Pages** using GitHub Actions and the custom domain **`SpectreDefend.dpdns.org`**.

---

## 1. Overview & Architecture

- **Brand**: SPECTRE DEFEND
- **Production Domain**: `https://SpectreDefend.dpdns.org`
- **Hosting Platform**: GitHub Pages
- **Deployment Engine**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Routing Engine**: Single-Page Application (SPA) with `404.html` redirect bridge and `index.html` state hydration

---

## 2. GitHub Pages Repository Settings

To activate GitHub Pages for your repository:

1. Open your repository on GitHub.
2. Navigate to **Settings** > **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown menu (do **NOT** choose "Deploy from a branch").
4. Under **Custom domain**:
   - Enter: `SpectreDefend.dpdns.org`
   - Click **Save**.
   - GitHub will verify the DNS record pointing to GitHub Pages.
5. Under **Enforce HTTPS**:
   - Check **Enforce HTTPS** as soon as GitHub issues the TLS certificate (usually completes within 15–60 minutes after DNS propagation).
   - HTTPS is strictly mandatory for OAuth callback security and browser privacy.

---

## 3. CNAME File Architecture & Behavior

### Why `public/CNAME` is Critical
GitHub Pages requires a file named `CNAME` containing the exact custom domain in the published artifact root (`dist/CNAME`).

- **Source File**: `public/CNAME`
- **File Content**:
  ```text
  SpectreDefend.dpdns.org
  ```
- **Strict Format Rules**:
  - Must contain ONLY `SpectreDefend.dpdns.org`.
  - Must NOT contain `https://` or `http://`.
  - Must NOT contain path slashes (`/`), spaces, or comments.
- **Build Behavior**:
  Vite automatically copies all assets from the `public/` directory directly into the root of `dist/` during `npm run build`. As a result, `dist/CNAME` is generated on every build.

### Preventing CNAME Removal
In standard setups without a `public/CNAME` file, a new build wipe and publish step can remove the custom domain setting in GitHub Pages. By storing `public/CNAME` in version control and adding an explicit verification check in `.github/workflows/deploy.yml`:
```bash
test -f dist/CNAME || exit 1
grep -qx "SpectreDefend.dpdns.org" dist/CNAME || (echo "CNAME mismatch!" && exit 1)
```
the deployment will automatically fail and prevent publishing if `CNAME` is ever missing or corrupted.

### How to Recover If a Build Removes the CNAME
If GitHub Pages resets or drops the custom domain:
1. Confirm that `public/CNAME` exists with `SpectreDefend.dpdns.org`.
2. Commit and push to `main` (or run `workflow_dispatch` in Actions).
3. If necessary, re-enter `SpectreDefend.dpdns.org` under **Settings** > **Pages** in the GitHub repository.

---

## 4. DNS Relationship with GitHub Pages

For the custom domain `SpectreDefend.dpdns.org`:
- If `SpectreDefend.dpdns.org` is configured as a CNAME record in DNS, it points to `<YOUR-GITHUB-USERNAME>.github.io`.
- GitHub Pages verifies that the incoming request header `Host: SpectreDefend.dpdns.org` matches the configured custom domain in the repository settings.
- Cloudflare or your DNS provider handles routing the traffic to GitHub's infrastructure.

---

## 5. Deployment Workflow (`.github/workflows/deploy.yml`)

The automated CI/CD pipeline triggers on every push to `main`:
1. **Source Checkout**: `actions/checkout@v4` pulls the complete repository.
2. **Environment Setup**: Provisions Node.js 20 with npm caching.
3. **Dependency Installation**: Runs `npm ci || npm install`.
4. **Build & Sitemap Generation**:
   - `npm run build` runs `vite build` and executes `scripts/generate-sitemap.ts`.
   - Generates all pages, asset bundles, `dist/CNAME`, `dist/robots.txt`, `dist/sitemap.xml`, and `dist/llms.txt`.
5. **Artifact Integrity Verification**:
   Validates critical production assets:
   - `dist/index.html` (Application shell)
   - `dist/404.html` (Deep link routing handler)
   - `dist/CNAME` (Custom domain declaration matching `SpectreDefend.dpdns.org`)
   - `dist/admin/index.html` (Decap CMS)
   - `dist/admin/config.yml` (Decap CMS config)
   - `dist/robots.txt` & `dist/sitemap.xml`
6. **Publishing**: Packages `dist/` with `actions/upload-pages-artifact@v3` and publishes with `actions/deploy-pages@v4`.

---

## 6. How to Verify Deployment

1. **Verify GitHub Action Status**:
   - Go to the **Actions** tab in your GitHub repository.
   - Verify that the workflow `Deploy SPECTRE DEFEND to GitHub Pages` ran and completed green.
2. **Verify HTTP/HTTPS Response**:
   ```bash
   curl -IL https://SpectreDefend.dpdns.org
   ```
   Check for `HTTP/2 200` or `HTTP/1.1 200 OK`.
3. **Verify CNAME**:
   ```bash
   curl https://SpectreDefend.dpdns.org/CNAME
   ```
   Must return: `SpectreDefend.dpdns.org`.
4. **Verify CMS Entrypoint**:
   Visit `https://SpectreDefend.dpdns.org/admin/` in your browser. Decap CMS should load and display the login screen.
5. **Verify SPA Deep Linking**:
   Visit `https://SpectreDefend.dpdns.org/services/access-management`. Confirm the page directly loads without a 404 error.

---

## 7. Common Troubleshooting Scenarios

| Issue | Root Cause | Solution |
|---|---|---|
| **404 Not Found on Root Domain** | GitHub Pages build hasn't completed or Pages Source is incorrect. | Ensure Source is set to **GitHub Actions** and wait for the workflow to complete. |
| **CNAME verification failed** | DNS record has not propagated or contains typos. | Check DNS records and allow TTL to expire. Re-save in GitHub Pages settings. |
| **Certificate generation pending** | Let's Encrypt / GitHub TLS issuance takes up to 24 hours. | Ensure DNS is verified; certificate usually issues in under 30 minutes. |
| **Direct links return 404** | Missing `404.html` in build output. | Confirm `public/404.html` is present and verified by the deployment workflow. |
