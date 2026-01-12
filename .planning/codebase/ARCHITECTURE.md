# Architecture

**Analysis Date:** 2026-01-12

## Pattern Overview

**Overall:** Server-Side Rendered (SSR) Content Site with Bilingual Support

**Key Characteristics:**
- Static content (84 species profiles) served via SSR
- Bilingual routing (English/Spanish)
- File-based routing via Astro pages
- Content Collections for type-safe species data
- Minimal JavaScript - primarily server-rendered HTML

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle page requests
- Contains: Astro pages, layouts, components
- Location: `src/pages/*.astro`, `src/layouts/BaseLayout.astro`, `src/components/*.astro`
- Depends on: Content Collections, i18n utilities
- Used by: End users via browser

**Content Layer:**
- Purpose: Structured species data management
- Contains: 84 species JSON files with care information
- Location: `src/content/species/*.json`
- Schema: `src/content/config.ts` (Zod validation)
- Used by: Pages via `getCollection('species')`

**Utility Layer:**
- Purpose: Shared helpers and i18n support
- Contains: URL utilities, translation functions
- Location: `src/lib/urlUtils.ts`, `src/i18n/utils.ts`
- Depends on: Astro runtime only
- Used by: Pages and layouts

## Data Flow

**Page Request Lifecycle:**

1. User requests page (/, /species, /species/blue-and-gold-macaw)
2. Astro routing matches URL pattern
3. SSR renders .astro template:
   - Loads species data from Content Collections
   - Applies i18n translations based on URL locale
   - Renders HTML with species information
4. HTML sent to browser with minimal JavaScript
5. Client receives fully-rendered page

**State Management:**
- Server-side: Stateless per request (no sessions)
- Client-side: No state management (static content display)
- Data: Loaded fresh from Content Collections per request

## Key Abstractions

**Content Collections:**
- Purpose: Type-safe access to species data
- Examples: `getCollection('species')` returns all 84 species
- Location: `src/content/species/*.json`, schema in `src/content/config.ts`
- Pattern: Astro built-in content management

**i18n Utilities:**
- Purpose: Bilingual routing and translations
- Functions: `getLangFromUrl()`, `useTranslations()`, `getLocalizedPath()`
- Location: `src/i18n/utils.ts`
- Pattern: Custom helpers for Astro i18n

## Entry Points

**Pages:**
- Homepage: `src/pages/index.astro` (category overview)
- Species Index: `src/pages/species/index.astro` (searchable list)
- Species Detail: `src/pages/species/[slug].astro` (individual profiles)
- Spanish: `src/pages/es/species/*.astro` (mirrored structure)

## Error Handling

**Strategy:** Server-side rendering with built-in Astro error handling

**Patterns:**
- 404 pages handled by Astro automatically
- Build-time validation via Content Collections schema
- Type checking via TypeScript strict mode

## Cross-Cutting Concerns

**i18n:**
- Astro built-in i18n routing (`astro.config.mjs`)
- Locale utilities: `src/i18n/utils.ts`
- Translation strings: `src/i18n/locales/*.json`
- Pattern: Separate page trees for `/` (en) and `/es/` (es)

**SEO:**
- Structured data in page head (Open Graph, Twitter Card)
- Canonical URLs for each page
- Alternate language links (hreflang)
- Location: `src/layouts/BaseLayout.astro`

**Styling:**
- CSS file: `public/assets/css/styles.css`
- Inline styles in Astro components
- No CSS framework (vanilla CSS)

---

*Architecture analysis: 2026-01-12*
*Update when major patterns change*
