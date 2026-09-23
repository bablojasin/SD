# Third-Party Typography & Software License Audit
**Document Ref:** SEC-LICENSES-2026-V1  
**Project:** SPECTRE DEFEND  
**Audit Scope:** Fonts, Client-Side JavaScript Packages, Framework Dependencies  

---

## 1. Web Typography & Font Licenses

SPECTRE DEFEND utilizes three distinct open-source typeface families to establish its high-contrast cybersecurity aesthetic:

| Font Family | Usage | Foundry / Author | License Type | Commercial Use Permitted? | Ingestion Method |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Manrope** | Primary Sans-Serif Body & Structural UI | Mikhail Sharanda, Mirtha Type | SIL Open Font License, 1.1 (OFL-1.1) | **Yes (Unrestricted)** | Google Fonts CDN with preconnect |
| **Space Grotesk** | Display Headings & Hero Typography | Florian Karsten | SIL Open Font License, 1.1 (OFL-1.1) | **Yes (Unrestricted)** | Google Fonts CDN with preconnect |
| **JetBrains Mono** | Code Snippets, Monospace Badges, Metrics | JetBrains s.r.o. | SIL Open Font License, 1.1 (OFL-1.1) | **Yes (Unrestricted)** | Google Fonts CDN with preconnect |

### 1.1 SIL Open Font License, Version 1.1 Terms Summary:
* Allows use, study, modification, and redistribution freely.
* Allows bundling and embedding with commercial software or websites without royalty or licensing fees.
* Fonts cannot be sold on their own.

### 1.2 Privacy Consideration for Google Fonts CDN:
* Google Fonts are fetched directly from `fonts.googleapis.com` and `fonts.gstatic.com`.
* Under German court rulings (LG München 2022 regarding remote Google Fonts loading and IP exposure), remote font loading may be considered an unauthorized transmission of visitor IP addresses.
* **Legal Disclosure Implemented:** Google Fonts CDN is explicitly disclosed as a third-party subprocessor in Section 6 of the Privacy Policy (`/content/legal/privacy.md` and `/privacy`).
* **Optional Future Optimization:** Download font files into `/public/fonts/` and serve locally via `@font-face` css rules if 100% air-gapped font self-hosting is required by enterprise compliance leads.

---

## 2. Software Dependencies License Review (`package.json`)

| Package Name | Primary Role | License | Risk Level |
| :--- | :--- | :--- | :--- |
| `react` / `react-dom` | UI Framework | MIT | None (Permissive) |
| `react-router-dom` | Client Routing | MIT | None (Permissive) |
| `lucide-react` | Interface Iconography | ISC | None (Permissive) |
| `tailwindcss` | Utility CSS Framework | MIT | None (Permissive) |
| `vite` | Build Tool & Bundler | MIT | None (Permissive) |
| `typescript` | Static Typing | Apache 2.0 | None (Permissive) |

All frontend runtime and build dependencies are governed by standard permissive open-source licenses (MIT, ISC, Apache 2.0). There are zero copyleft (GPL / AGPL) dependencies that would impose reciprocal source-disclosure obligations on the proprietary code of SPECTRE DEFEND.
