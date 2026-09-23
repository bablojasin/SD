# Data Inventory, Flow Mapping & Minimization Audit
**Document Ref:** SEC-DATA-INV-2026-V1  
**Project:** SPECTRE DEFEND  
**Audit Scope:** Public Website, Client Intake Forms, Diagnostic Modals, Admin Interfaces  
**Standard Benchmarks:** EU/UK GDPR (Articles 5, 6, 13, 25), California CPRA, Pakistan PECA & Draft Data Protection Bill  

---

## 1. Data Minimization Doctrine

SPECTRE DEFEND operates under the doctrine of **Privacy by Design and Data Minimization**:
1. Only data strictly necessary to respond to client inquiries or maintain web infrastructure availability is collected.
2. No covert behavioral trackers, third-party analytics pixels, or commercial data broker scripts are loaded.
3. Interactive diagnostics (e.g., Perimeter Scanner) execute computations client-side without logging or persisting target domain inputs in profiling databases.
4. Optional fields in forms are explicitly marked and never required.

---

## 2. Complete Data Inventory Matrix

| Data Element | Collection Point | Purpose / Legal Basis | Mandatory / Optional | Retention Period | Storage Location / Encryption | Shared Third Parties |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Name** | Contact Form (`/contact`) | Communication & Identity Verification (GDPR Art. 6(1)(b)) | **Mandatory** | 12 months after resolution or duration of contract | Cloudflare edge proxy / Encrypted transit (TLS 1.3) | None |
| **Corporate Email** | Contact Form (`/contact`), Quick Dispatch | Responding to SecOps inquiry, sending service dossiers (GDPR Art. 6(1)(b)) | **Mandatory** | 12 months or duration of enterprise contract | Encrypted in transit | Vetted contact mail relay (Cloudflare Worker endpoint) |
| **Phone Number** | Contact Form (`/contact`) | Urgent telephone callback for active breach escalations | **Optional** | 12 months or duration of contract | Encrypted in transit | None |
| **Company Name** | Contact Form (`/contact`) | B2B enterprise scoping & conflict-of-interest screening | **Optional** | 12 months or duration of contract | Encrypted in transit | None |
| **Technical Scope / Message** | Contact Form (`/contact`) | Assessing architectural environment, cloud posture, requirements | **Mandatory** | 12 months or duration of contract | Encrypted in transit | None |
| **Consent Affirmation** | Contact Form (`/contact`) | Proof of explicit informed consent (GDPR Art. 6(1)(a)) | **Mandatory** | Logged with submission timestamp | Client-side validated, logged in inquiry record | None |
| **Diagnostic Target (Domain/IP)** | Threat Scanner Modal | Client-side simulation of perimeter check | User-entered | Transient in browser memory only; **never stored** | Client-side React state | None |
| **Cookie Preferences** | Cookie Consent Banner | Storing visitor preference choice (Essential vs Non-Essential) | System | Persistent until cache cleared | Browser `localStorage` (`cookie_consent_preferences`) | None |
| **IP Address & User-Agent** | Edge HTTP Requests | Network routing, volumetric DDoS defense, server logs (GDPR Art. 6(1)(f)) | Automated | 30 days rolling edge logs | Cloudflare CDN edge servers | Cloudflare, Inc. |
| **OAuth Credentials** | CMS Admin (`/admin/`) | Authenticating content editors | Administrative only | 10 minutes (`oauth_state` cookie); session in `localStorage` | HTTP-only cookie + browser storage | GitHub, Inc. (Microsoft) |

---

## 3. Data Flow Diagram & Architecture

```
[Public Visitor]
       │
       ▼
 [Cloudflare Edge CDN] ──────> [TLS 1.3 / HSTS Termination]
       │
       ├─► [Static Assets (HTML/JS/Images)] ──> Rendered in Browser
       │
       ├─► [Interactive Scanner] ──> Executed in Local Browser Memory (No backend egress)
       │
       ├─► [Contact Form Submission]
       │         │
       │         ▼
       │   [VITE_CONTACT_ENDPOINT / Edge Worker]
       │         │
       │         ▼
       │   [SecOps Ingestion & PGP Encrypted Dispatch]
       │
       └─► [CMS Admin /admin/] ──> [GitHub OAuth Proxy] (Restricted to Authorized Editors)
```

---

## 4. Verification of Form Minimization Controls

1. **Contact Page Form (`/src/pages/ContactPage.tsx`):**
   * Fields `phone` and `company` are strictly optional.
   * Users can successfully submit a technical inquiry with only Name, Email, and Scope Description.
   * Clear visual indicator `(Optional)` displayed alongside helper text.
   * Consent checkbox must be affirmatively checked; validation blocks submission with clear accessible error message if skipped.

2. **Perimeter Diagnostic Modal (`/src/components/ThreatScannerModal.tsx`):**
   * Authorization checkbox required prior to running simulation.
   * Explicit notice informing the user that the scan is a client-side architecture simulation.
   * No data transmission to profiling or analytics backends.

3. **Threat Intelligence Wire Subscription (`Footer` / `CTA`):**
   * Requires only an email address.
   * Double opt-in confirmation pattern with clear unsubscribe instructions on delivery.
