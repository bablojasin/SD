# SPECTRE DEFEND • Content Storage & Schema Reference

All editorial content is stored as structured files within the `/content/` directory, allowing version-controlled content changes through Decap CMS or standard Git pull requests.

---

## Content Directory Map

```text
content/
├── settings/
│   ├── branding.yml           # Master brand typography, vector logo paths, and theme colors
│   ├── site.yml               # Global organization data, headquarters, telephone, status
│   ├── navigation.yml         # Header menu navigation links and primary CTA
│   ├── footer.yml             # Footer columns, quick links, and copyright
│   └── seo.yml                # Global SEO defaults, meta titles, social cards
│
├── site/
│   ├── branding.json          # Mirrored JSON schema consumed directly by frontend
│   ├── settings.json          # Mirrored JSON schema for site metadata
│   ├── navigation.json        # Mirrored JSON schema for header navigation
│   ├── footer.json            # Mirrored JSON schema for footer layout
│   └── seo.json               # Mirrored JSON schema for SEO metadata
│
├── pages/
│   ├── home.json              # Home page hero copy, metrics, and showcase previews
│   ├── about.json             # About page company story, mission, pillars, timeline
│   └── contact.json           # Contact page telemetry information and SecOps numbers
│
├── services/                  # Individual service definitions (*.json)
│   ├── access-management.json
│   ├── cloud-security.json
│   ├── endpoint-protection.json
│   ├── network-security.json
│   ├── penetration-testing.json
│   ├── security-monitoring.json
│   ├── threat-detection.json
│   └── vulnerability-assessment.json
│
├── blog/                      # Threat intelligence insights (*.json)
│   ├── building-stronger-defense.json
│   ├── cloud-security-risks.json
│   ├── continuous-threat-monitoring.json
│   └── zero-trust-architecture-guide.json
│
├── team/                      # Leadership & engineering team members (*.json)
│   ├── alex-mercer.json
│   ├── elena-rostova.json
│   ├── marcus-vance.json
│   └── sarah-chen.json
│
├── testimonials/              # Verified enterprise client reviews (*.json)
│   ├── apex-capital.json
│   ├── nexus-cloud.json
│   └── vertex-logistics.json
│
└── legal/                     # Legal disclosures (*.json)
    ├── cookies.json
    ├── privacy.json
    └── terms.json
```

---

## Detailed Collection Schemas

### 1. Service Schema (`content/services/*.json`)
```json
{
  "id": "cloud-security",
  "title": "Cloud Security Architecture",
  "slug": "cloud-security",
  "tagline": "Multi-cloud perimeter defense & container isolation",
  "shortDescription": "Full-spectrum posture management and runtime protection for AWS, Azure, and GCP.",
  "fullDescription": "In-depth overview of the service architecture...",
  "icon": "Cloud",
  "image": "/images/services/cloud-security.jpg",
  "imageAlt": "Cloud infrastructure defense",
  "features": [
    "Continuous Cloud Security Posture Management (CSPM)",
    "Kubernetes and container runtime telemetry",
    "Automated drift detection and compliance remediation"
  ],
  "deliverables": [
    "Full-tier architecture audit report",
    "Real-time posture dashboards",
    "Automated Terraform/Pulumi security policies"
  ],
  "process": [
    { "step": "01", "title": "Discovery", "description": "Cloud asset discovery..." },
    { "step": "02", "title": "Hardening", "description": "IAM and network policy enforcement..." },
    { "step": "03", "title": "Monitoring", "description": "Active runtime telemetry..." }
  ],
  "faq": [
    { "question": "Which cloud providers are supported?", "answer": "AWS, Azure, GCP, and hybrid on-prem environments." }
  ],
  "seo": {
    "metaTitle": "Cloud Security Architecture | SPECTRE DEFEND",
    "metaDescription": "Multi-cloud zero-trust perimeter defense and workload hardening.",
    "ogImage": "/images/og-cloud-security.jpg"
  }
}
```

### 2. Blog Article Schema (`content/blog/*.json`)
```json
{
  "id": "zero-trust-architecture-guide",
  "title": "Demystifying Zero-Trust Architecture in 2026",
  "slug": "zero-trust-architecture-guide",
  "excerpt": "A deep technical analysis of zero-trust microsegmentation and identity verification in enterprise networks.",
  "content": "Full markdown or rich text article body...",
  "author": {
    "name": "Sarah Chen",
    "role": "Chief Threat Architect",
    "avatar": "/images/team/sarah-chen.jpg"
  },
  "publishDate": "2026-08-15",
  "readTime": "6 min read",
  "category": "Architecture",
  "tags": ["Zero Trust", "Cloud", "Identity"],
  "featuredImage": "/images/blog/zero-trust.jpg",
  "featuredImageAlt": "Zero-trust network topology diagram",
  "featured": true,
  "seo": {
    "metaTitle": "Demystifying Zero-Trust Architecture | SPECTRE DEFEND",
    "metaDescription": "Technical guide to zero-trust microsegmentation.",
    "ogImage": "/images/blog/zero-trust.jpg"
  }
}
```
