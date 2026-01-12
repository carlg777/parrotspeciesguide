# External Integrations

**Analysis Date:** 2026-01-12

## APIs & External Services

**None** - This is a standalone static content site with no external API dependencies.

## Data Storage

**Local File System:**
- 84 species JSON files in `src/content/species/*.json`
- Managed via Astro Content Collections
- No database required

**Image Storage:**
- 84 species images in `public/assets/img/parrots/*.webp`
- Served directly as static assets
- No CDN or cloud storage

**Caching:**
- None - Content served fresh per request
- Browser caching via standard HTTP headers

## Authentication & Identity

**None** - Public content site with no authentication required

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None

**Logs:**
- Stdout/stderr only during development
- No external logging service

## CI/CD & Deployment

**Hosting:**
- Not yet deployed
- Configured for standalone Node.js server
- Can be deployed to any Node.js hosting platform

**CI Pipeline:**
- None

## Environment Configuration

**Development:**
- No environment variables required
- Configuration in `astro.config.mjs` only
- Port: 4322

**Production:**
- No environment variables required
- Domain: parrotspeciesguide.com (configured in astro.config.mjs)
- Deployment: Node.js standalone server

## Webhooks & Callbacks

**None** - No webhook integrations

---

## Integration Opportunities

Since this is a standalone content site with no external dependencies, potential future integrations could include:

1. **Analytics:** Google Analytics or Plausible for visitor tracking
2. **CDN:** Cloudflare or similar for image delivery
3. **Search:** Algolia or Typesense for advanced species search
4. **Comments:** Disqus or similar for user discussions on species pages

---

*Integration audit: 2026-01-12*
*No external integrations currently implemented*
