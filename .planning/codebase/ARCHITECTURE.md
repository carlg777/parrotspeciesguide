# Architecture

**Analysis Date:** 2026-01-15

## Pattern Overview

**Overall:** Content-driven static site generator (JAMstack architecture)

**Key Characteristics:**
- Pre-rendered static HTML at build time
- Content Collections for structured data
- Multi-locale support (English and Spanish)
- Client-side filtering with serialized data
- SEO-optimized with Schema.org structured data

## Layers

**Content Layer:**
- Purpose: Authoritative data source for all parrot species
- Contains: JSON files with Zod schema validation
- Location: `src/content/species/*.json`, `src/content/config.ts`
- Depends on: Nothing (pure data)
- Used by: Page components via `getCollection('species')`

**Page/Route Layer:**
- Purpose: Define routes and handle rendering logic
- Contains: Astro page components with frontmatter logic
- Location: `src/pages/*.astro`, `src/pages/species/*.astro`, `src/pages/es/**/*.astro`
- Depends on: Content layer, utility layer, layout layer
- Used by: Astro router (file-based routing)

**Layout Layer:**
- Purpose: Shared page templates and structure
- Contains: Master layouts with meta tags and common UI
- Location: `src/layouts/BaseLayout.astro`
- Depends on: Component layer, utility layer
- Used by: All pages

**Component Layer:**
- Purpose: Reusable UI components
- Contains: Header, Footer components
- Location: `src/components/Header.astro`, `src/components/Footer.astro`
- Depends on: i18n utilities
- Used by: Layouts and pages

**Utility/Library Layer:**
- Purpose: Pure functions for common operations
- Contains: String manipulation, URL formatting, i18n helpers, structured data generation
- Location: `src/lib/*.ts`, `src/i18n/utils.ts`
- Depends on: Nothing (pure functions)
- Used by: Pages, layouts, components

## Data Flow

**Static Page Generation:**

1. Build process starts (`astro build`)
2. Astro reads content collections from `src/content/species/*.json`
3. Zod validation runs on all species data (`src/content/config.ts`)
4. For each page in `src/pages/`:
   - `getStaticPaths()` generates route parameters
   - `getCollection('species')` loads species data
   - Data filtered/sorted/transformed in frontmatter
   - Structured data (JSON-LD) generated for SEO
   - Template rendered with props
5. Static HTML output written to `dist/`
6. Build artifacts deployed to hosting

**Client-Side Filtering (Species List):**

1. User visits `/species` or `/es/species`
2. Pre-rendered HTML loads with serialized species data embedded
3. JavaScript hydrates filter controls
4. User interactions trigger `filterSpecies()` function
5. DOM updated to show/hide species cards
6. No server requests needed (all client-side)

**State Management:**
- Stateless - No persistent state between page loads
- Client-side state limited to filter UI on species list pages
- No global state management

## Key Abstractions

**Content Collection:**
- Purpose: Type-safe species data access
- Location: `src/content/config.ts` (schema), `src/content/species/*.json` (data)
- Pattern: Astro Content Collections API with Zod validation
- Examples: 84+ species files with consistent structure

**i18n Utilities:**
- Purpose: Internationalization and localization
- Location: `src/i18n/utils.ts`
- Pattern: Functional utilities for language routing and translation
- Key functions: `getLangFromUrl()`, `useTranslations()`, `getLocalizedPath()`

**URL Utilities:**
- Purpose: URL normalization and absolute URL generation
- Location: `src/lib/urlUtils.ts`
- Pattern: Pure functions with backward compatibility
- Key function: `toAbsoluteUrl()` with optional site URL parameter

**Structured Data Helpers:**
- Purpose: Safe JSON-LD embedding for SEO
- Location: `src/lib/structuredData.ts`
- Pattern: XSS-safe escaping function
- Key function: `escapeJsonLd()` (defined but currently unused)

## Entry Points

**Home Page:**
- Location: `src/pages/index.astro`, `src/pages/es/index.astro`
- Triggers: User navigates to `/` or `/es/`
- Responsibilities: Display overview, FAQ structured data, link to species browsing

**Species List:**
- Location: `src/pages/species/index.astro`, `src/pages/es/species/index.astro`
- Triggers: User navigates to `/species` or `/es/species`
- Responsibilities: Display all species, client-side filtering, ItemList structured data

**Species Detail:**
- Location: `src/pages/species/[slug].astro`, `src/pages/es/species/[slug].astro`
- Triggers: User navigates to `/species/{slug}` or `/es/species/{slug}`
- Responsibilities: Display species details, related species, Article + BreadcrumbList structured data

**Sitemap API:**
- Location: `src/pages/sitemap.xml.ts`
- Triggers: Build process or user navigates to `/sitemap.xml`
- Responsibilities: Generate XML sitemap with all routes in both languages

## Error Handling

**Strategy:** Build-time validation prevents runtime errors

**Patterns:**
- Zod schema validation at build time for all content
- TypeScript strict mode catches type errors
- Astro type checking via `@astrojs/check`
- No runtime error handling needed (static site)

## Cross-Cutting Concerns

**Logging:**
- Build-time only via console output
- No runtime logging (static HTML)

**Validation:**
- Zod schemas for content collections (`src/content/config.ts`)
- TypeScript for compile-time type safety
- Build fails on validation errors

**SEO:**
- Schema.org JSON-LD on all pages
- Meta tags and Open Graph in `BaseLayout.astro`
- Sitemap generation at build time
- hreflang tags for language alternates

**Internationalization:**
- File-based routing: `/` for English, `/es/` for Spanish
- Translation keys in JSON files: `src/i18n/locales/`
- Language-aware utilities: `src/i18n/utils.ts`
- Configured in `astro.config.mjs`

---

*Architecture analysis: 2026-01-15*
*Update when major patterns change*
