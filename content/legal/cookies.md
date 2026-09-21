# Cookie Policy — SPECTRE DEFEND

**Effective Date:** September 21, 2026  
**Last Updated:** September 21, 2026  
**Document Ref:** SEC-COOKIES-2026-V1  

---

## Summary
This Cookie Policy explains how **SPECTRE DEFEND** utilizes cookies and client-side storage technologies on [spectredefend.com](https://spectredefend.com). We do not use third-party tracking or advertising cookies.

---

## 1. What Are Cookies and Storage Technologies?
Cookies are small text files placed on your device by websites you visit. They are widely used to ensure websites function securely and efficiently. Similar technologies include browser local storage (`localStorage`) and session cookies.

---

## 2. Our Approach to Cookies & Tracking
SPECTRE DEFEND strictly minimizes tracking:

* **No Advertising or Tracking Cookies:** We do not deploy third-party advertising cookies, cross-site tracking pixels, or behavioral profiling tools.
* **No Third-Party Analytics:** We do not load Google Analytics, Meta/Facebook Pixel, or commercial marketing trackers on this website.
* **Minimal Necessary Storage:** We use only strictly necessary storage mechanisms required for essential security, administrative authentication, and saving your preferences.

---

## 3. Complete Inventory of Cookies and Storage Keys
The following is the exhaustive inventory of storage technologies used across our domain:

### 1. `cookie_consent_preferences`
* **Category:** Strictly Necessary / Preference
* **Type:** Browser `localStorage`
* **Purpose:** Stores your cookie preference selection so that you are not repeatedly prompted on subsequent page visits.
* **Duration:** Persistent until browser storage is cleared.

### 2. `oauth_state`
* **Category:** Strictly Necessary / Security
* **Type:** HTTP-only, Secure Cookie (`SameSite=Lax`)
* **Host:** `auth.spectredefend.com` (Cloudflare Worker)
* **Purpose:** Cryptographic CSRF state token used during GitHub OAuth authentication for authorized content editors accessing the Decap CMS portal (`/admin/`).
* **Duration:** 10 minutes.

### 3. `decap-cms-user`
* **Category:** Strictly Necessary / Operational
* **Type:** Browser `localStorage`
* **Host:** `spectredefend.com/admin/`
* **Purpose:** Stores encrypted session credentials for authenticated content editors editing site markdown files via GitHub API.
* **Duration:** Persistent until explicit logout.

---

## 4. Managing and Disabling Cookies
You can control and manage storage technologies in several ways:

* **On-Site Preference Center:** You can view and update your cookie preferences at any time by clicking **"Cookie Settings"** in the website footer.
* **Browser Controls:** Most web browsers allow you to manage cookie settings, delete existing cookies, and block new cookies through their settings/preferences menu. Please note that disabling strictly necessary cookies may prevent administrative logins to the CMS portal (`/admin/`).

---

## 5. Policy Updates and Contact Information
If we introduce any new functional cookies or services in the future, this policy will be updated immediately with full disclosures.

For questions regarding our cookie practices, please contact:
* **Privacy Officer:** privacy@spectredefend.com
* **General Information:** defense@spectredefend.com
* **Brand:** SPECTRE DEFEND
* **Legal Entity:** `[REQUIRES BUSINESS CONFIRMATION]`
