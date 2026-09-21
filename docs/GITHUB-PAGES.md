# SPECTRE DEFEND • GitHub Pages Deployment

## 1. Overview

**SPECTRE DEFEND** is hosted as a static web application on **GitHub Pages**, leveraging **GitHub Actions** for automated builds and deployment.

---

## 2. GitHub Pages Configuration

### A. Repository Settings
In your GitHub repository settings:
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch").
3. Under **Custom domain**:
   - Enter your production domain: `spectredefend.com` (or `www.spectredefend.com`).
   - Enable **Enforce HTTPS**.

### B. Custom Domain (CNAME)
When using custom domain on GitHub Pages with GitHub Actions:
- GitHub Pages creates or validates the `CNAME` record associated with the repository settings.
- If configuring manually, place a `CNAME` file in the root of the output directory containing your domain name (`spectredefend.com`).

---

## 3. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The production pipeline is located at `.github/workflows/deploy.yml`.

### Key Pipeline Stages:
1. **Trigger**: Executes on every push to the `main` branch or manual trigger via `workflow_dispatch`.
2. **Permissions**:
   - `contents: read`: Retrieves code and CMS content files.
   - `pages: write`: Authorizes deployment to the GitHub Pages environment.
   - `id-token: write`: Authorizes OpenID Connect (OIDC) token exchange with GitHub.
3. **Environment Setup**: Provisions Node.js 20 on an `ubuntu-latest` runner.
4. **Build Command**:
   ```bash
   npm ci || npm install
   npm run build
   ```
5. **Asset Integrity Verification**:
   Validates the existence of critical files prior to deployment:
   - `dist/index.html`
   - `dist/404.html` (SPA fallback)
   - `dist/admin/index.html` (Decap CMS)
   - `dist/admin/config.yml` (Decap CMS configuration)
   - `dist/robots.txt`
   - `dist/sitemap.xml`
   - `dist/assets/brand/spectre-defend-logo.svg`
6. **Artifact Packaging**: Uses `actions/upload-pages-artifact@v3` targeting the `dist` directory.
7. **Deployment**: Uses `actions/deploy-pages@v4` to publish the artifact to the `github-pages` environment.

---

## 4. Single-Page Application (SPA) Deep Link Routing

GitHub Pages natively serves static files matching requested file paths. If a visitor directly accesses a route such as `https://spectredefend.com/services/cloud-security`, GitHub Pages returns a 404 response.

To guarantee seamless deep links:
1. **`public/404.html`**: Catches the initial 404 response, serializes the target path and query parameters into a URI search parameter (`?p=/<path>&q=<query>`), and immediately redirects to `/`.
2. **`index.html` Inline Script**: When the root document loads, it inspects `window.location.search`. If `?p=` is detected, it decodes the original path and issues `window.history.replaceState(null, null, path)` before React mounts.
3. **React Router**: Mounts with the restored route without causing a browser reload or visual glitch.

---

## 5. Rollback Procedure

If a commit introduces an issue:
1. In the GitHub repository, navigate to **Actions**.
2. Locate the previous successful deployment run.
3. Click **Re-run all jobs**, OR
4. Execute `git revert <commit-hash>` and push to `main` to trigger a clean automated build.
