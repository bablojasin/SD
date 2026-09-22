# SPECTRE DEFEND — GitHub OAuth Application Setup

This guide details the exact steps required to register the GitHub OAuth Application for Decap CMS content management on **SPECTRE DEFEND**.

---

## 1. OAuth Application Configuration Parameters

Navigate to:
[GitHub Settings > Developer settings > OAuth Apps > New OAuth App](https://github.com/settings/applications/new)

Enter the exact settings below:

| Field | Production Value | Description |
| :--- | :--- | :--- |
| **Application name** | `SPECTRE DEFEND Content Manager` | Descriptive name shown to authors on authorization screen |
| **Homepage URL** | `https://SpectreDefend.dpdns.org` | Canonical production site URL |
| **Application description** | `Decap CMS GitHub OAuth authorization proxy for SPECTRE DEFEND sovereign portal` | Optional security description |
| **Authorization callback URL** | `<ACTUAL-WORKER-URL>/callback` | **Replace with your actual Cloudflare Worker domain** (e.g. `https://spectre-defend-oauth-worker.<subdomain>.workers.dev/callback`) |

---

## 2. Secrets & Credentials Handling

After creating the OAuth application on GitHub:

1. **Client ID**:
   - Copy the generated `Client ID`.
   - Store it as a Cloudflare Worker secret:
     ```bash
     cd worker
     npx wrangler secret put GITHUB_CLIENT_ID
     ```
2. **Client Secret**:
   - Click **Generate a new client secret**.
   - Copy the secret immediately.
   - **CRITICAL SECURITY RULE**: Store the Client Secret **ONLY** in Cloudflare Worker Secrets:
     ```bash
     cd worker
     npx wrangler secret put GITHUB_CLIENT_SECRET
     ```
   - **NEVER** commit `GITHUB_CLIENT_SECRET` to GitHub.
   - **NEVER** place `GITHUB_CLIENT_SECRET` in `public/admin/config.yml`.
   - **NEVER** place `GITHUB_CLIENT_SECRET` in frontend TypeScript/React code.

---

## 3. Connecting to Decap CMS

Once your Cloudflare Worker is deployed:
1. Open `public/admin/config.yml`.
2. Set:
   ```yaml
   backend:
     name: github
     repo: <OWNER>/<REPOSITORY>
     branch: main
     base_url: https://<ACTUAL-WORKER-URL>
     auth_endpoint: auth
   ```
3. Open `https://SpectreDefend.dpdns.org/admin/` and click **Login with GitHub**.
