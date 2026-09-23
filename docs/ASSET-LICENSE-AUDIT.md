# Asset, Media & Copyright Compliance Audit
**Document Ref:** SEC-ASSET-AUDIT-2026-V1  
**Project:** SPECTRE DEFEND  
**Audit Scope:** Public Images, SVG Icons, Vector Logos, Diagrams, Branding Assets  

---

## 1. Asset Inventory & Provenance

| Asset Path | Description | Visual Type | Format & Resolution | Licensing Status / Attribution Source |
| :--- | :--- | :--- | :--- | :--- |
| `/images/hero_cyber_defense_shield_1789577844799.webp` | 3D Cyber Defense Shield with heavy metallic padlock, graphite carbon fiber, and neon rim lighting | Hero Visual Artwork | WebP (Responsive: 480w, 800w, 1024w) | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. All commercial rights owned by project. |
| `/images/about_3d_globe_1789575901855.webp` | Holographic 3D wireframe globe with orbital rings and cryptographic shield overlay | About Section Visual | WebP (Responsive: 480w, 800w, 1024w) | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. |
| `/images/soc_war_room_1789575925158.webp` | Global SOC Cyber Command Room with multi-display telemetry and defensive radar screens | Bento / Showcase Visual | WebP (Responsive: 480w, 800w, 1376w) | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. |
| `/assets/images/services_threat_detection_1789575924765.jpg` | High-tech threat detection matrix visual | Service Detail Visual | JPEG | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. |
| `/assets/images/server_security_rack_1789575952898.jpg` | Enterprise server security rack with illuminated network cables | Service Detail Visual | JPEG | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. |
| `/assets/images/cyber_analyst_desk_1789575942605.jpg` | Incident response analyst workstation with hardware security keys | Service Detail Visual | JPEG | Proprietary custom AI-synthesized asset generated specifically for SPECTRE DEFEND project. |
| `/logo.svg`, `/logo-light.svg`, `/logo-dark.svg`, `/logo-symbol.svg` | SPECTRE DEFEND geometric shield & cyber monogram vectors | SVG Vector Brand Marks | Clean scalable SVG code | Custom vector assets authored in repository for SPECTRE DEFEND. No third-party copyright restrictions. |
| `lucide-react` | Interface icons (Shield, Lock, Cpu, Globe, Terminal, etc.) | SVG Icon Library | React Components | Open Source (ISC License). Permissive for commercial and non-commercial web use. |

---

## 2. Review of External / Stock Photo Dependencies

1. **Unsplash References in Mock Data:**
   * An inspection revealed that `src/data/mockData.ts` previously referenced several Unsplash profile headshots for mock testimonials.
   * **Action Taken:** `TESTIMONIALS_DATA` array has been emptied (`[]`), removing all external Unsplash avatar dependencies from public runtime rendering.
   * This mitigates risks associated with displaying likenesses of private individuals as clients or reviewers without documented model releases or testimonials agreements.

2. **Self-Hosted Local Assets:**
   * All active images rendered across public pages are hosted locally within `/public/images/` and `/public/assets/images/`.
   * Zero third-party hotlinked images are loaded during visitor browsing, ensuring no image CDN can track visitors or revoke asset delivery.

3. **Responsive Art Direction & Performance:**
   * Images utilize modern `<picture>` elements with WebP compression and responsive `srcset` breakpoints (480w, 800w, 1024w, 1376w) with appropriate `loading="lazy"` and `decoding="async"` attributes to preserve page speed and avoid cumulative layout shifts.
