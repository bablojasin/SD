# SPECTRE DEFEND — Final Production Configuration Checklist

This document consolidates all specific values that require configuration by the project owner to activate the live production deployment.

---

## 1. USER MUST PROVIDE (CONFIGURATION PARAMETERS)

```text
GitHub repository:
REQUIRES USER VALUE (e.g. bablojasin/SD)

GitHub repository owner:
REQUIRES USER VALUE (e.g. bablojasin)

Production branch:
main

GitHub OAuth Client ID:
REQUIRES USER VALUE (from GitHub Developer Settings > OAuth Apps)

GitHub OAuth Client Secret:
CLOUDFLARE SECRET ONLY (Stored via: npx wrangler secret put GITHUB_CLIENT_SECRET)

Cloudflare Worker URL:
REQUIRES USER VALUE (from: npx wrangler deploy)

DNS configuration:
REQUIRES USER ACTION (CNAME record: SpectreDefend -> <owner>.github.io in Cloudflare DNS)

GitHub Pages custom domain:
SpectreDefend.dpdns.org (Set in GitHub Repo Settings > Pages > Custom domain)
```

---

## 2. Step-by-Step Production Activation Runbook

1. **GitHub Repository Settings**:
   - In your GitHub repository, open **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - Under **Custom domain**, enter `SpectreDefend.dpdns.org` and click **Save**.
   - Wait for DNS check to succeed, then check **Enforce HTTPS**.

2. **Cloudflare DNS Configuration**:
   - In Cloudflare DNS for your zone, add:
     - **Type**: `CNAME`
     - **Name**: `SpectreDefend`
     - **Target**: `<your-github-username>.github.io`
     - **Proxy status**: DNS Only (or Proxied after GitHub TLS issues)
     - **TTL**: Auto

3. **Register GitHub OAuth Application**:
   - Go to [GitHub Developer Settings > OAuth Apps > New OAuth App](https://github.com/settings/applications/new).
   - Set **Application name**: `SPECTRE DEFEND Content Manager`
   - Set **Homepage URL**: `https://SpectreDefend.dpdns.org`
   - Set **Authorization callback URL**: `https://<YOUR-WORKER-URL>/callback`
   - Copy the generated **Client ID**.
   - Generate and copy a **Client Secret**.

4. **Deploy Cloudflare Worker & Set Secrets**:
   - In terminal, navigate to `/worker`:
     ```bash
     cd worker
     npx wrangler deploy
     npx wrangler secret put GITHUB_CLIENT_ID
     npx wrangler secret put GITHUB_CLIENT_SECRET
     ```

5. **Update Decap CMS Backend Config**:
   - In `public/admin/config.yml`:
     ```yaml
     backend:
       name: github
       repo: <YOUR_GITHUB_OWNER>/<YOUR_GITHUB_REPO>
       branch: main
       base_url: https://<YOUR-WORKER-URL>
       auth_endpoint: auth
     ```

6. **Deploy & Verify**:
   - Push your code changes to GitHub:
     ```bash
     git add .
     git commit -m "chore: finalize production deployment architecture"
     git push origin main
     ```
   - Open `https://SpectreDefend.dpdns.org/admin/` and authenticate using GitHub OAuth.
   - Edit any content, save, and confirm that the change automatically commits to GitHub and triggers GitHub Pages redeployment.
