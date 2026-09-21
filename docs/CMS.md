# SPECTRE DEFEND • Decap CMS Documentation

## 1. CMS Portal Location & Access

The Decap CMS portal is located at:
```text
https://spectredefend.com/admin/
```

- **Authentication Method**: GitHub OAuth.
- **Backend Provider**: `backend: name: github`.
- **Target Repository**: Configured in `public/admin/config.yml` via `repo: OWNER/REPOSITORY`.
- **Target Branch**: `main`.

---

## 2. Authentication Workflow

1. The author opens `https://spectredefend.com/admin/`.
2. The user clicks **Login with GitHub**.
3. A browser popup opens, directing to the Cloudflare Worker `/auth` endpoint.
4. The Worker validates state and redirects the author to GitHub's authorization consent screen.
5. The author approves access to the repository.
6. GitHub redirects back to the Worker `/callback` endpoint with an authorization code.
7. The Worker securely exchanges the code with GitHub for an OAuth access token.
8. The Worker sends the access token back to the Decap CMS parent window via `postMessage`.
9. The Decap CMS dashboard unlocks, and the author can now edit content directly.

---

## 3. Content Collections

The CMS configuration in `/public/admin/config.yml` defines the following collections:

### A. Site Settings & Branding
- **Branding**: Official brand name, wordmark text, logos (master, symbol, dark, light, monochrome), favicon, and brand descriptions.
- **Branding (YAML)**: Direct editing of `content/settings/branding.yml`.
- **General Settings**: Contact email, telephone, physical headquarters address, telemetry status message, and social URLs.
- **Header Navigation**: Custom links, menu labels, and primary header CTA button.
- **Footer Content**: Company mission summary, quick links, service category links, and legal links.
- **Global SEO**: Meta titles, default description, Open Graph / Twitter cards, and search console verification tokens.

### B. Home Page
- **Hero Section**: Eyebrow label, main title, highlighted green text, description, button labels/links, 3D shield visual, and stats metrics.
- **About Preview**: Section heading, summary copy, and 3D globe imagery.
- **Services Showcase**: Section heading and intro text.
- **Security Capabilities**: Core cybersecurity capability features and tech stack metrics.
- **Testimonials & Blog Headers**: Customizable showcase headings.

### C. Pages
- **About Page**: Detailed company history, operational philosophy, cybersecurity pillars, and timeline.
- **Contact Page**: Dispatch form titles, response SLAs, direct telephone lines, and emergency hotline.

### D. Services Collection (`content/services/*.json`)
Manage all individual cybersecurity services. Each service entry supports:
- `title`, `slug`, `tagline`
- `shortDescription`, `fullDescription`
- `icon`, `image`, `imageAlt`
- `features` (bulleted security capabilities)
- `deliverables` (tangible outputs provided to client)
- `process` (step-by-step deployment phases)
- `faq` (frequently asked questions)
- `ctaTitle`, `ctaDescription`, `ctaButtonText`
- `seo` (`metaTitle`, `metaDescription`, `ogImage`)

### E. Insights / Blog Collection (`content/blog/*.json`)
Manage all cybersecurity threat intelligence articles:
- `title`, `slug`, `excerpt`, `content`
- `author` (name, role, avatar)
- `publishDate`, `readTime`
- `category`, `tags`
- `featuredImage`, `featuredImageAlt`
- `featured` (boolean toggle for home page highlights)
- `seo` (`metaTitle`, `metaDescription`, `ogImage`)

### F. Team Collection (`content/team/*.json`)
- `name`, `role`, `bio`, `avatar`, `certifications`, `socialLinks`, `order`.

### G. Testimonials Collection (`content/testimonials/*.json`)
- `author`, `role`, `company`, `content`, `rating`, `avatar`.

### H. Legal Pages (`content/legal/*.json`)
- **Privacy Policy**, **Terms of Service**, and **Cookie Policy**.

---

## 4. How Changes Are Published

1. When an author saves content in Decap CMS, the CMS initiates an authenticated GitHub REST API request.
2. A new Git commit is generated directly on the `main` branch.
3. The push event triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`).
4. GitHub Actions builds the static site with the updated content in under 60 seconds.
5. The updated production distribution is published to GitHub Pages.
6. Cloudflare serves the refreshed content globally.

---

## 5. Adding New Content Step-by-Step

### How to Add a New Service
1. Navigate to `/admin/` and click **Services** in the left sidebar.
2. Click **New Service**.
3. Provide the service name (e.g. `Quantum-Safe Cryptography`), unique slug (`quantum-cryptography`), icon name, and description.
4. Add feature items and deployment process steps.
5. Click **Publish**.
6. The new service page will automatically exist at `/services/quantum-cryptography` and be indexed in the services directory.

### How to Add a New Blog Post
1. Navigate to `/admin/` and click **Insights / Blog**.
2. Click **New Insights / Blog**.
3. Fill in title, publication date, author details, excerpt, and full markdown or rich text body.
4. Upload a featured image.
5. Click **Publish**.
6. The new article will be published at `/blog/<your-slug>`.
