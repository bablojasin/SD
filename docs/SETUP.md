# SPECTRE DEFEND • Developer Setup Guide

This guide describes how to run, develop, and test the **SPECTRE DEFEND** platform locally and prepare it for production deployment.

---

## 1. Prerequisites

- **Node.js**: `v20.x` or higher recommended.
- **npm**: `v10.x` or higher.
- **Git**: Installed and configured with your GitHub credentials.
- **Cloudflare Wrangler** (Optional for local worker testing): `npm install -g wrangler`.

---

## 2. Local Environment Setup

### A. Clone the Repository
```bash
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
```

### B. Install Dependencies
```bash
npm install
```

### C. Configure Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```

Review `.env` variables:
```env
# Optional Cloudflare Worker or contact dispatch endpoint
VITE_CONTACT_ENDPOINT=""
```

---

## 3. Local Development Workflows

### Running the Frontend
```bash
npm run dev
```
The development server will boot on `http://localhost:3000` (or `http://localhost:5173`).
- Navigate to `http://localhost:3000/` to test the public website.
- Navigate to `http://localhost:3000/admin/` to inspect the Decap CMS portal.

### Running TypeScript Validation
```bash
npm run lint
```

### Running the Production Build
```bash
npm run build
```
The output is written to `/dist`.

### Previewing the Production Build Locally
```bash
npm run preview
```

---

## 4. Local Cloudflare Worker Development

To test the OAuth Worker locally:
```bash
cd worker
npm install

# Run the worker locally
npx wrangler dev
```

For local testing with live GitHub OAuth, create `.dev.vars` inside `/worker`:
```env
GITHUB_CLIENT_ID="YOUR_LOCAL_TEST_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_LOCAL_TEST_CLIENT_SECRET"
ALLOWED_ORIGIN="http://localhost:3000"
```
*(Note: `.dev.vars` is strictly excluded from version control by `.gitignore`)*.

---

## 5. Local CMS Testing Options

Decap CMS supports two local modes:

1. **GitHub Mode (Live)**: In `/public/admin/config.yml`, set `repo: OWNER/REPOSITORY` and configure your Worker URL in `base_url`.
2. **Local Git Backend Mode (Proxy)**: If you want to test CMS commits locally without connecting to GitHub:
   ```bash
   npx decap-server
   ```
   In `/public/admin/config.yml`, set `local_backend: true`.
   *(Ensure `local_backend: false` prior to committing to production).*
