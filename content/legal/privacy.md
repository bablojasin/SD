# Privacy Policy — SPECTRE DEFEND

**Effective Date:** September 21, 2026  
**Last Updated:** September 21, 2026  
**Document Ref:** SEC-PRIVACY-2026-V1  

---

## Summary
This Privacy Policy describes how **SPECTRE DEFEND** collects, uses, and protects information when you visit [spectredefend.com](https://spectredefend.com), interact with our diagnostic tools, or submit inquiries for cybersecurity services. We adhere strictly to data minimization and do not run third-party advertising trackers.

---

## 1. Data Controller & Business Identification
This website is operated by SPECTRE DEFEND ("we", "us", or "our").

* **Brand / Trading Name:** SPECTRE DEFEND
* **Legal Entity Name:** `[REQUIRES BUSINESS CONFIRMATION]`
* **Registered Office Address:** `[REQUIRES BUSINESS CONFIRMATION]`
* **Primary Contact Email:** defense@spectredefend.com
* **Privacy & Data Protection Inquiries:** privacy@spectredefend.com

If you have any questions regarding how your data is handled or wish to exercise your statutory rights under applicable privacy legislation (including the EU/UK GDPR and California Consumer Privacy Act / CPRA), please contact us at privacy@spectredefend.com.

---

## 2. Information We Collect on This Website
We practice strict data minimization. We only collect personal information that you intentionally provide to us or that is strictly necessary for the technical operation and security of our web infrastructure:

1. **Contact & SecOps Inquiries:** When you submit the contact form on our website, we collect your name, corporate email address, phone number (optional), company name (optional), subject category, and message text.
2. **Service & Dispatch Subscription:** When you submit your email address through deployment or inquiry forms, we collect your email address solely to deliver the requested service briefing or security advisory.
3. **Threat Diagnostic Simulator:** Inputs entered into the interactive Perimeter Health Check modal (such as a target domain or IP) are evaluated client-side for simulation purposes and are not stored in any user-profiling database.
4. **Administrative Authentication:** For authorized administrative users logging into the Decap CMS portal (`/admin/`), authentication credentials and access tokens are brokered via GitHub OAuth.

---

## 3. Automated Technical Telemetry & Server Logs
When you browse spectredefend.com, our edge network and hosting infrastructure (Cloudflare and GitHub Pages) automatically record standard technical server logs required for network reliability and defense against distributed denial-of-service (DDoS) attacks. These logs may include:

* Your IP address
* Browser type and version
* Operating system
* Referring URL and requested resource path
* Date, time, and HTTP status code of the request

These technical logs are processed on the basis of legitimate interest (maintaining infrastructure security, integrity, and availability) and are not used to identify individuals or merged with personal data.

---

## 4. Cookies and Local Storage Disclosures
SPECTRE DEFEND does not deploy third-party advertising, remarketing, or tracking cookies.

* **Public Visitors:** The public website does not set non-essential advertising or behavioral tracking cookies. Your cookie preference selection is retained locally in your browser (`cookie_consent_preferences`).
* **Content Management (`/admin/`):** When an authorized content editor initiates GitHub OAuth authentication via our serverless proxy (`auth.spectredefend.com`), a strictly necessary HTTP-only session cookie (`oauth_state`) is used with a 10-minute lifetime to prevent Cross-Site Request Forgery (CSRF). Session tokens are stored in the editor's browser `localStorage` to maintain the editing session.

---

## 5. Legal Bases for Processing (GDPR Article 6)
We process personal data only when an applicable legal basis exists:

* **Consent (Art. 6(1)(a) GDPR):** When you actively choose to submit a contact form or request security service information.
* **Performance of a Contract / Pre-Contractual Steps (Art. 6(1)(b) GDPR):** To evaluate service scopes, execute non-disclosure agreements, and prepare engagement proposals at your request.
* **Legitimate Interests (Art. 6(1)(f) GDPR):** To safeguard our web applications against cyber threats, intrusion attempts, and volumetric denial-of-service incidents.

---

## 6. Third-Party Subprocessors & External Resources
We do not sell, rent, or trade your personal information. We disclose information only to vetted service providers strictly necessary to deliver this website:

* **Cloudflare, Inc.:** Edge network caching, DDoS mitigation, and serverless OAuth proxy functions.
* **GitHub, Inc. (Microsoft):** Static web hosting for open-source assets and version-controlled content repository.
* **Google Fonts:** Web typography rendered by the browser.

All service providers are bound by confidentiality obligations and data processing agreements complying with applicable international data transfer mechanisms.

---

## 7. Data Retention & Cryptographic Security
Inquiry data submitted through web forms is retained only as long as necessary to fulfill the operational purpose of the communication or to comply with statutory commercial retention obligations.

All web communications with spectredefend.com are encrypted in transit using Transport Layer Security (TLS 1.2 and TLS 1.3) with modern cipher suites and HTTP Strict Transport Security (HSTS).

---

## 8. Your Statutory Rights
Depending on your location, you may have the following statutory privacy rights:

* **Right of Access:** You may request confirmation of whether we process your personal data and obtain a copy.
* **Right to Rectification:** You may request correction of inaccurate personal data.
* **Right to Erasure ("Right to be Forgotten"):** You may request deletion of your personal data where retention is no longer justified.
* **Right to Restriction of Processing:** You may request that we pause processing under certain circumstances.
* **Right to Data Portability:** You may receive your data in a structured, machine-readable format.
* **Right to Withdraw Consent:** Where processing is based on consent, you may withdraw consent at any time without affecting prior lawful processing.

To exercise any of these rights, email **privacy@spectredefend.com**. We respond to all verified requests within thirty (30) days without undue charge.

---

## 9. Updates to This Privacy Policy
We may update this Privacy Policy periodically to reflect architectural modifications, regulatory revisions, or corporate developments. The "Last Updated" date at the top of this document indicates the most recent revision.
