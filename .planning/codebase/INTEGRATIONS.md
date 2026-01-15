# External Integrations

**Analysis Date:** 2026-01-15

## APIs & External Services

**Payment Processing:**
- Not applicable - No payment processing

**Email/SMS:**
- Not applicable - No email or SMS services

**External APIs:**
- None - Fully self-contained static site

## Data Storage

**Databases:**
- None - All data stored as local JSON files in `src/content/species/*.json`

**File Storage:**
- Local file system - 84+ parrot species data files
- Public assets - Images in `public/assets/img/parrots/*.webp`

**Caching:**
- None - Relies on HTTP caching headers only

## Authentication & Identity

**Auth Provider:**
- Not applicable - No authentication required

**OAuth Integrations:**
- None

## Monitoring & Observability

**Error Tracking:**
- None detected

**Analytics:**
- None detected

**Logs:**
- Build logs via GitHub Actions
- No runtime logging (static site)

## CI/CD & Deployment

**Hosting:**
- SiteGround - Static HTML hosting
- Deployment: Automated via GitHub Actions on main branch push
- Configuration: SSH deployment using rsync - `.github/workflows/deploy-siteground.yml`

**CI Pipeline:**
- GitHub Actions - Build and deployment workflow
- Workflow: `.github/workflows/deploy-siteground.yml`
- Secrets: SG_HOST, SG_PORT, SG_USER, SG_SSH_KEY, SG_PATH (stored in GitHub)
- Build steps: Install dependencies, type check, build static site, deploy via rsync

## Environment Configuration

**Development:**
- No environment variables required
- All configuration in `astro.config.mjs`
- Local development: `npm run dev`

**Staging:**
- Not configured

**Production:**
- Static site URL: https://www.parrotspeciesguide.com
- Configured in: `astro.config.mjs`, multiple utility files
- Deployment credentials: GitHub Actions secrets

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Management

**Content Source:**
- Local JSON files - 84 parrot species in `src/content/species/*.json`
- Schema validation - Zod schemas in `src/content/config.ts`
- Astro Content Collections API - `getCollection('species')`

**Internationalization:**
- Manual i18n system - `src/i18n/utils.ts`
- Translation files - `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
- No external translation service

**SEO & Structured Data:**
- JSON-LD Schema.org markup - Embedded in pages
- Sitemap generation - `src/pages/sitemap.xml.ts`
- robots.txt - `public/robots.txt`
- No external SEO tools

---

*Integration audit: 2026-01-15*
*Update when adding/removing external services*
