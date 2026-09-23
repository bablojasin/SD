# Comprehensive Cookie & Local Storage Inventory
**Document Ref:** SEC-COOKIE-INV-2026-V1  
**Project:** SPECTRE DEFEND  
**Audit Scope:** Production Website, Sub-domains, CMS Administration  
**Regulatory Standards:** ePrivacy Directive 2002/58/EC (amended by 2009/136/EC), GDPR Art. 5(3), CCPA/CPRA  

---

## 1. Audit Methodology & Scope

A thorough code-level audit was conducted across the SPECTRE DEFEND repository to inspect:
1. `document.cookie` reads and writes.
2. `window.localStorage` and `window.sessionStorage` keys.
3. Third-party network requests and tracking script inclusions in `index.html`.
4. Decap CMS authentication flows.

---

## 2. Cookie & Storage Inventory

| Key / Identifier | Technology | Provider / Host | Category | Lifespan | Purpose | Exemption Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`cookie_consent_preferences`** | Browser `localStorage` | Client-Side (`SpectreDefend.dpdns.org`) | **Strictly Necessary / Preference** | Persistent until local cache clear | Stores user's cookie consent choices (`strictlyNecessary`, `analytics`, `marketing`, `timestamp`) so that the banner does not repeatedly re-appear. | **Exempt** (User-requested preference retention) |
| **`oauth_state`** | HTTP-only Cookie (`Secure`, `SameSite=Lax`) | `auth.spectredefend.com` (Cloudflare Worker) | **Strictly Necessary / Security** | 10 minutes | Cryptographic nonce generated during GitHub OAuth login to prevent Cross-Site Request Forgery (CSRF) attacks when authorized editors access Decap CMS. | **Exempt** (Strictly necessary for security and user-initiated authentication) |
| **`decap-cms-user`** | Browser `localStorage` | Client-Side (`/admin/`) | **Strictly Necessary / Operational** | Persistent until user explicitly logs out | Retains the authenticated administrator's encrypted GitHub token required to manage website markdown files via GitHub API. | **Exempt** (Strictly necessary to deliver requested CMS service to authenticated user) |

---

## 3. Absence of Third-Party Trackers & Advertising Pixels

The repository was verified to contain **zero instances** of:
* Google Analytics (`gtag.js`, `analytics.js`)
* Google Tag Manager (`gtm.js`)
* Meta / Facebook Pixel
* LinkedIn Insight Tag
* Hotjar / CrazyEgg / Clarity session recorders
* Criteo or programmatic ad retargeting pixels

---

## 4. Consent Banner Technical Compliance

1. **Prior Consent:** No non-essential storage is accessed before user interaction.
2. **Granularity:** The cookie preferences center allows independent toggling of *Analytics & Telemetry* and *Marketing & Cross-Site Tracking* (both toggled OFF by default).
3. **Equally Prominent Choices:**
   * "Accept All" and "Essential Only" buttons are provided side-by-side with clear visual weighting.
   * Users can reject all non-essential storage in a single click via "Essential Only".
4. **Persistent Setting Recall:**
   * The website footer features a dedicated **"Cookie Preferences"** button accessible from every page.
   * Clicking this trigger dispatches a custom DOM event (`open-cookie-settings`) that re-opens the configuration modal, enabling users to modify or withdraw consent at any time.
