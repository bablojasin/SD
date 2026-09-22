# SPECTRE DEFEND — Cloudflare DNS Configuration Guide

## Production Domain
```text
SpectreDefend.dpdns.org
```

---

## 1. Required DNS Record Table

In your Cloudflare DNS Management Console for the zone, create/verify the following record:

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Type** | `CNAME` | Standard alias pointing subdomain to GitHub Pages |
| **Name** | `SpectreDefend` | Subdomain prefix (resolves to `SpectreDefend.dpdns.org`) |
| **Target** | `REQUIRES GITHUB PAGES TARGET CONFIRMATION` | `<github-username>.github.io` (Confirm in GitHub Settings > Pages) |
| **TTL** | `Auto` | Managed automatically by Cloudflare Edge |
| **Proxy Status** | `DNS Only` (Grey Cloud) during initial verification, or `Proxied` (Orange Cloud) | Recommended: start with DNS only until GitHub verifies domain certificate, then enable Proxy if desired |

> **IMPORTANT:** Do NOT invent the GitHub Pages DNS target. In your GitHub repository under **Settings > Pages**, GitHub displays your authoritative Pages target (typically `<owner>.github.io` or `<organization>.github.io`).

---

## 2. DNS & GitHub Pages Requirements

1. **DNS Target Resolution**:
   - `SpectreDefend.dpdns.org` must resolve directly to your authoritative GitHub Pages destination (`<owner>.github.io`).
2. **GitHub Pages Custom Domain Setting**:
   - The repository Pages configuration (**Settings > Pages > Custom domain**) must be set to `SpectreDefend.dpdns.org`.
   - The GitHub Pages repository setting is the authoritative custom-domain configuration for the Actions deployment.
3. **HTTPS Provisioning**:
   - Once DNS propagation and ownership verification complete in GitHub Pages, check **Enforce HTTPS** in GitHub Pages settings.
4. **No Conflicting Records**:
   - Do NOT create conflicting `A`, `AAAA`, or duplicate `CNAME` records for the `SpectreDefend` hostname.
   - Any prior temporary or test records pointing to other IP addresses must be removed.

---

## 3. Verification Commands

Run locally or from a terminal once DNS has been configured:

```bash
# Verify CNAME resolution
dig CNAME SpectreDefend.dpdns.org +short

# Verify HTTP status & TLS certificate
curl -ILs https://SpectreDefend.dpdns.org | head -n 10
```

> **Note on Verification:** This document provides configuration parameters. DNS status cannot be marked as "live" or "working" until external DNS records are actually provisioned and verified by your DNS provider and GitHub Pages.
