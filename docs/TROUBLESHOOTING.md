# SPECTRE DEFEND • Operational Troubleshooting & Diagnostic Guide

This document contains solutions for common operational, deployment, and authentication issues.

---

## 1. Decap CMS Authentication Issues

### Symptom: "Failed to authenticate with GitHub" or Infinite Spinning
- **Cause 1**: The GitHub OAuth Application Callback URL does not match the Worker endpoint.
  - **Resolution**: Open GitHub **Developer Settings** > **OAuth Apps** > **SPECTRE DEFEND Content Manager**. Verify that the **Authorization callback URL** is set to `https://auth.spectredefend.com/callback` (or your exact Worker subdomain).
- **Cause 2**: Missing secrets in Cloudflare Worker.
  - **Resolution**: Run `npx wrangler secret list` in `/worker`. If `GITHUB_CLIENT_ID` or `GITHUB_CLIENT_SECRET` is missing, re-add them via `npx wrangler secret put GITHUB_CLIENT_ID` and `npx wrangler secret put GITHUB_CLIENT_SECRET`.
- **Cause 3**: Mismatched `base_url` in `public/admin/config.yml`.
  - **Resolution**: Verify line 13 in `public/admin/config.yml`:
    ```yaml
    base_url: https://auth.spectredefend.com
    auth_endpoint: auth
    ```

### Symptom: "CSRF state verification failed"
- **Cause**: The OAuth state cookie was dropped or blocked by browser third-party cookie restrictions, or the session timed out.
- **Resolution**:
  1. The Cloudflare Worker sets `SameSite=Lax; Secure`. Ensure HTTPS is enabled.
  2. Disable browser extensions that aggressively block popup session cookies for `spectredefend.com`.

---

## 2. GitHub Pages Deployment Issues

### Symptom: Direct Deep Links (e.g. `/services/cloud-security`) Return 404
- **Cause**: GitHub Pages cannot find a static directory named `/services/cloud-security/index.html`.
- **Resolution**:
  1. Ensure `public/404.html` exists and contains the SPA redirect script.
  2. Ensure `index.html` has the inline script that decodes `window.location.search` (`?p=/...`).
  3. Verify that `404.html` is present in the `dist/` build directory.

### Symptom: GitHub Actions Fails on `Upload Artifact`
- **Cause**: The `npm run build` command failed or output directory is missing.
- **Resolution**: Run `npm run build` locally. Inspect console output for any TypeScript or Vite compilation errors. Ensure `.github/workflows/deploy.yml` sets `path: dist`.

---

## 3. Cloudflare & DNS Issues

### Symptom: "Error 525: SSL Handshake Failed" or "Error 526: Invalid SSL"
- **Cause**: Cloudflare is set to "Full (Strict)" but GitHub Pages has not yet provisioned its Let's Encrypt certificate for the custom domain.
- **Resolution**:
  1. In Cloudflare, temporarily set SSL mode to **Full** (not Strict) while GitHub Pages validates the custom domain certificate.
  2. In GitHub repository **Settings** > **Pages**, confirm that the custom domain says **DNS check successful** and **Certificate issued**.
  3. Once confirmed, switch Cloudflare back to **Full (Strict)**.

### Symptom: Too Many Redirects (Redirect Loop)
- **Cause**: Cloudflare SSL is set to **Flexible** while GitHub Pages enforces HTTPS, creating an infinite HTTP <-> HTTPS loop.
- **Resolution**: Set Cloudflare SSL/TLS mode to **Full (Strict)**. Never use Flexible with GitHub Pages.

---

## 4. Content & Build Issues

### Symptom: Content Changes Made via Git Do Not Show Up
- **Cause 1**: Browser cache or Cloudflare edge cache is serving stale assets.
  - **Resolution**: In Cloudflare, purge the cache for the updated URL, or perform a hard browser refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`).
- **Cause 2**: GitHub Actions build failed on syntax error in edited JSON/YAML file.
  - **Resolution**: Check the GitHub **Actions** tab for any workflow run errors. Use a linter to validate the edited content file.
