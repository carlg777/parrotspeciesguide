# External Integrations

**Analysis Date:** 2026-01-13

## APIs & External Services

**NONE DETECTED** - This is a static-site architecture with no external API integrations.

## Data Storage

**Databases:**
- None - Pure static generation with Astro's content layer

**File Storage:**
- Local static assets only
- WebP images in `public/assets/img/parrots/` (84+ species images)
- No cloud storage integration (S3, Cloudinary, etc.)

**Caching:**
- None - No Redis, Memcached, or similar caching layers

## Authentication & Identity

**NONE** - No authentication provider integrated.

- No Auth0, Supabase Auth, NextAuth, Clerk, or custom JWT implementation
- Site is fully public, no user accounts

## Monitoring & Observability

**Error Tracking:**
- None - No Sentry, Rollbar, or similar error tracking

**Analytics:**
- None - No Google Analytics, Mixpanel, Plausible, or tracking code detected

**Logs:**
- Stdout/stderr only (Node.js server logs)
- No external logging service (CloudWatch, Datadog, Loggly)

## CI/CD & Deployment

**Hosting:**
- Configured for: https://www.parrotspeciesguide.com - `astro.config.mjs` line 6
- Platform: Node.js standalone server via Astro Node adapter
- No explicit CI/CD configuration files (.github/workflows, .gitlab-ci.yml, etc.)

**CI Pipeline:**
- None detected

## Environment Configuration

**Development:**
- No `.env` files required
- Configuration via `astro.config.mjs` only
- Dev server: `127.0.0.1:4322`

**Production:**
- No environment variables needed
- Site URL hardcoded: `https://www.parrotspeciesguide.com` (in multiple files)
- ⚠️ **Tech Debt**: Domain should be environment variable, not hardcoded

## SEO Integrations

**Structured Data:**
- Schema.org JSON-LD markup embedded in pages
  - Article schema - `src/pages/species/[slug].astro`
  - BreadcrumbList schema - `src/pages/species/[slug].astro`
  - FAQPage schema - `src/pages/index.astro`, `src/pages/es/index.astro`
  - ItemList schema - `src/pages/species/index.astro`

**Sitemap:**
- Dynamic sitemap generation - `src/pages/sitemap.xml.ts`
- Generates URLs for all species + static pages in both languages
- Referenced in `public/robots.txt`

**Meta Tags:**
- Open Graph support in `src/layouts/BaseLayout.astro`
- Twitter Card support in `src/layouts/BaseLayout.astro`
- Canonical URLs via `src/lib/urlUtils.ts`
- hreflang alternates for bilingual content

## Static Assets

**Images:**
- WebP format species images: `public/assets/img/parrots/*.webp`
- Optimized via Sharp (build-time processing)
- Brand logo: `public/assets/img/brand/psg-logo.svg`

**CSS:**
- Custom design system: `public/assets/css/styles.css`
- CSS custom properties for theming
- No CSS framework (Tailwind, Bootstrap, etc.)

## Future Integration Points

**Referenced but Not Implemented:**
- Browse/Marketplace link in `src/pages/species/[slug].astro` (lines 183-185):
  ```
  <a href={`/browse?search=${encodeURIComponent(species.species)}`}>
    See Available {species.species} Listings
  </a>
  ```
- This suggests planned integration with a marketplace (`/browse` endpoint not yet built)

**Planned Features** (per PROJECT.md):
- Newsletter signup (email service integration needed)
- Marketplace integration (Bird Finder)
- Community features (authentication + database needed)

## Technology Summary

This is a **content-focused static site** with **zero external integrations**. The architecture is:
- Pure static generation + SSR capability via Astro
- Self-contained content (84 species in JSON files)
- No database, APIs, or third-party services
- Minimal dependencies (only Astro, TypeScript, Sharp)
- Optimized for performance with WebP images and server-side rendering
- Full SEO implementation with structured data, sitemaps, and meta tags
- No external dependencies means no API keys, no rate limits, no service costs

---

*Integration audit: 2026-01-13*
*Update when adding/removing external services*
