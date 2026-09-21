# SPECTRE DEFEND • GitHub OAuth Authentication Specification

## 1. Overview

Decap CMS requires access to GitHub's REST API to commit content updates to the `main` branch of the target repository. Because GitHub OAuth web application flows require a client secret during authorization code exchange, a serverless proxy—the **SPECTRE DEFEND Cloudflare Worker**—is deployed to securely handle this exchange.

---

## 2. OAuth Authentication Flow Diagram

```text
 ┌─────────────┐               ┌───────────────────┐              ┌────────────────┐
 │  Decap CMS  │               │ Cloudflare Worker │              │  GitHub OAuth  │
 └──────┬──────┘               └─────────┬─────────┘              └────────┬───────┘
        │                                │                                 │
        │ 1. Click "Login with GitHub"   │                                 │
        │    Opens popup to /auth        │                                 │
        ├───────────────────────────────>│                                 │
        │                                │                                 │
        │                                │ 2. Generate random state        │
        │                                │    Set secure state cookie      │
        │                                │    Redirect to GitHub           │
        │                                ├────────────────────────────────>│
        │                                │                                 │
        │                                │ 3. User authorizes permissions  │
        │                                │    Redirect to /callback?code=  │
        │                                │<────────────────────────────────┤
        │                                │                                 │
        │                                │ 4. Verify state parameter       │
        │                                │    POST /login/oauth/access_token
        │                                │    with client_secret           │
        │                                ├────────────────────────────────>│
        │                                │                                 │
        │                                │ 5. Returns access_token         │
        │                                │<────────────────────────────────┤
        │                                │                                 │
        │ 6. postMessage Handshake       │                                 │
        │    authorization:github:success│                                 │
        │<───────────────────────────────┤                                 │
        │                                │                                 │
        │ 7. Popup closes; CMS uses token to commit content                │
        v                                v                                 v
```

---

## 3. Creating the GitHub OAuth Application

To configure authentication:

1. Navigate to your GitHub account or organization: **Settings** > **Developer Settings** > **OAuth Apps**.
2. Click **New OAuth App**.
3. Configure the fields:
   - **Application name**: `SPECTRE DEFEND Content Manager`
   - **Homepage URL**: `https://spectredefend.com`
   - **Application description**: `Zero-trust Decap CMS authentication gateway for SPECTRE DEFEND authors.`
   - **Authorization callback URL**:
     `https://auth.spectredefend.com/callback`
     *(Or your Cloudflare Workers URL: `https://spectre-defend-oauth-worker.<subdomain>.workers.dev/callback`)*.
4. Click **Register application**.
5. Copy the generated **Client ID**.
6. Click **Generate a new client secret** and copy the secret immediately.

---

## 4. Storing Secrets in Cloudflare

**CRITICAL SECURITY RULE**: Never put the GitHub Client Secret in the frontend code, HTML, Vite environment files, or Git repository.

Execute these commands in the terminal inside `/worker`:
```bash
cd worker
npx wrangler secret put GITHUB_CLIENT_ID
# Paste your Client ID

npx wrangler secret put GITHUB_CLIENT_SECRET
# Paste your Client Secret
```

---

## 5. Configuring Decap CMS

In `public/admin/config.yml`:

```yaml
backend:
  name: github
  # REPLACE with your exact GitHub repository path
  repo: OWNER/REPOSITORY
  branch: main
  # REPLACE with your Worker OAuth proxy domain
  base_url: https://auth.spectredefend.com
  auth_endpoint: auth
```

---

## 6. Security & Threat Mitigation

| Threat Vector | Mitigation Strategy Implemented |
| :--- | :--- |
| **CSRF Injection** | Worker generates a 48-character cryptographic random state value, stores it in an HTTP-only Lax Secure cookie, and validates returned state upon callback. |
| **Secret Exposure** | Client secret resides solely in Cloudflare's encrypted secrets store and is used only in server-to-server POST requests. |
| **Token Logging** | Worker code contains zero `console.log` statements recording access tokens or authorization codes. |
| **Clickjacking** | Response uses `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`. |
| **Open Redirects** | Redirect targets are strictly locked to GitHub's authorization endpoint and the Worker's own `/callback`. |

---

## 7. Credential Rotation & Incident Response

If a secret is inadvertently exposed:
1. In GitHub Developer Settings, open the OAuth App and click **Revoke all user tokens**.
2. Click **Generate a new client secret**.
3. Delete the old client secret.
4. Run `npx wrangler secret put GITHUB_CLIENT_SECRET` with the new secret.
5. All future logins will immediately use the rotated credential.
