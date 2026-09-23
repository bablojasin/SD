import fs from 'fs';
import path from 'path';

function generateSitemap() {
  const rootDir = process.cwd();
  
  // 1. Read site SEO configuration for siteUrl
  let siteUrl = 'https://SpectreDefend.dpdns.org';
  const seoConfigPath = path.join(rootDir, 'content/site/seo.json');
  if (fs.existsSync(seoConfigPath)) {
    try {
      const seoData = JSON.parse(fs.readFileSync(seoConfigPath, 'utf-8'));
      if (seoData.siteUrl) {
        siteUrl = seoData.siteUrl.replace(/\/$/, '');
      }
    } catch (e) {
      console.warn('Could not parse seo.json, defaulting to https://SpectreDefend.dpdns.org');
    }
  }

  const currentDate = new Date().toISOString().split('T')[0];

  interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }

  const urls: SitemapUrl[] = [
    { loc: `${siteUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: `${siteUrl}/services`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${siteUrl}/team`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${siteUrl}/blog`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
  ];

  // 2. Add dynamic services from content/services/*.json
  const servicesDir = path.join(rootDir, 'content/services');
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.json'));
    for (const file of serviceFiles) {
      try {
        const raw = fs.readFileSync(path.join(servicesDir, file), 'utf-8');
        const svc = JSON.parse(raw);
        const slug = svc.slug || file.replace('.json', '');
        urls.push({
          loc: `${siteUrl}/services/${slug}`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: '0.8',
        });
      } catch (e) {
        console.error(`Error parsing service file ${file}:`, e);
      }
    }
  }

  // 3. Add dynamic blog posts from content/blog/*.json
  const blogDir = path.join(rootDir, 'content/blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
    for (const file of blogFiles) {
      try {
        const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const post = JSON.parse(raw);
        // Exclude drafts or unpublished if flag exists
        if (post.draft === true || post.published === false) {
          continue;
        }
        const slug = post.slug || file.replace('.json', '');
        const postDate = post.publishDate || post.date || currentDate;
        urls.push({
          loc: `${siteUrl}/blog/${slug}`,
          lastmod: postDate,
          changefreq: 'monthly',
          priority: '0.7',
        });
      } catch (e) {
        console.error(`Error parsing blog file ${file}:`, e);
      }
    }
  }

  // 4. Add legal pages from content/legal/*.json
  const legalDir = path.join(rootDir, 'content/legal');
  if (fs.existsSync(legalDir)) {
    const legalFiles = fs.readdirSync(legalDir).filter((f) => f.endsWith('.json'));
    for (const file of legalFiles) {
      try {
        const raw = fs.readFileSync(path.join(legalDir, file), 'utf-8');
        const doc = JSON.parse(raw);
        const slug = doc.slug || file.replace('.json', '');
        urls.push({
          loc: `${siteUrl}/${slug}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.3',
        });
      } catch (e) {
        console.error(`Error parsing legal file ${file}:`, e);
      }
    }
  }

  // Generate XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const publicSitemapPath = path.join(rootDir, 'public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  console.log(`Successfully generated sitemap.xml with ${urls.length} URLs for ${siteUrl}`);

  // 5. Update robots.txt with exact CMS siteUrl
  const robotsPath = path.join(rootDir, 'public/robots.txt');
  const robotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

# AI Search & Indexing Crawlers (Explicitly Allowed for Discoverability)
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

User-agent: ClaudeBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

User-agent: Google-Extended
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

User-agent: CCBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /callback/

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsContent, 'utf-8');
  console.log(`Successfully updated robots.txt referencing ${siteUrl}/sitemap.xml`);

  // 6. Generate dynamic llms.txt for AI & LLM discoverability from CMS content
  const llmsPath = path.join(rootDir, 'public/llms.txt');
  let llmsContent = `# SPECTRE DEFEND — Autonomous Enterprise Cyber Defense & Zero-Trust Architecture
> Official machine-readable overview for AI systems, search engines, and automated research agents.
> Production Canonical: ${siteUrl}

## About SPECTRE DEFEND
SPECTRE DEFEND delivers autonomous zero-trust cyber defense, high-speed telemetry, continuous threat containment, and 24/7 sovereign SOC surveillance protecting mission-critical enterprise architectures worldwide.

## Primary Public Endpoints
- Homepage: ${siteUrl}/
- Services Portfolio: ${siteUrl}/services
- Executive Team & Research Fellows: ${siteUrl}/team
- Company & Mission: ${siteUrl}/about
- Threat Intelligence & Security Insights: ${siteUrl}/blog
- Sovereign SecOps Consultation: ${siteUrl}/contact

## Core Cyber Defense Services
`;

  if (fs.existsSync(servicesDir)) {
    const serviceFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.json'));
    for (const file of serviceFiles) {
      try {
        const raw = fs.readFileSync(path.join(servicesDir, file), 'utf-8');
        const svc = JSON.parse(raw);
        const slug = svc.slug || file.replace('.json', '');
        llmsContent += `
### ${svc.title || slug}
- URL: ${siteUrl}/services/${slug}
- Description: ${svc.description || svc.shortDescription || ''}
${svc.whatIs ? `- Overview: ${svc.whatIs}` : ''}
${svc.whoItIsFor ? `- Target Audience: ${svc.whoItIsFor}` : ''}
${svc.problemSolved ? `- Key Problem Solved: ${svc.problemSolved}` : ''}
${svc.deliverables && Array.isArray(svc.deliverables) ? `- Key Deliverables: ${svc.deliverables.join(', ')}` : ''}
`;
      } catch (e) {
        // ignore
      }
    }
  }

  llmsContent += `
## Threat Intelligence & Research Articles
`;

  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
    for (const file of blogFiles) {
      try {
        const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const post = JSON.parse(raw);
        if (post.draft === true || post.published === false) continue;
        const slug = post.slug || file.replace('.json', '');
        llmsContent += `
### ${post.title}
- URL: ${siteUrl}/blog/${slug}
- Author: ${post.author || 'SPECTRE DEFEND Research Lab'}
- Published: ${post.publishDate || post.date || ''}
- Summary: ${post.excerpt || ''}
`;
      } catch (e) {
        // ignore
      }
    }
  }

  // 7. Load contact details from content/site/settings.json
  let contactEmail = 'REQUIRES BUSINESS CONFIRMATION';
  let contactPhone = 'REQUIRES BUSINESS CONFIRMATION';
  let address = 'REQUIRES BUSINESS CONFIRMATION';
  const settingsPath = path.join(rootDir, 'content/site/settings.json');
  if (fs.existsSync(settingsPath)) {
    try {
      const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      if (settingsData.contactEmail) contactEmail = settingsData.contactEmail;
      if (settingsData.contactPhone) contactPhone = settingsData.contactPhone;
      if (settingsData.address) address = settingsData.address;
    } catch (e) {
      // ignore
    }
  }

  llmsContent += `
## Direct Contact & SecOps Channels
- Emergency SOC Dispatch: ${contactEmail}
- Security Operations Center Phone: ${contactPhone}
- Corporate Headquarters: ${address}
- Security Vulnerability Disclosure: ${siteUrl}/contact
`;

  fs.writeFileSync(llmsPath, llmsContent.trim() + '\n', 'utf-8');
  console.log(`Successfully generated public/llms.txt from CMS content`);
}

generateSitemap();
