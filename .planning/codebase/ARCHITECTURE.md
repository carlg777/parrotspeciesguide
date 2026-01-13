# Architecture

**Analysis Date:** 2026-01-13

## Pattern Overview

**Overall:** Static Site Generator (SSG) with Server-Side Rendering (SSR) capability - Content-Driven Architecture

**Key Characteristics:**
- Output mode: `server` (SSR enabled via Node.js adapter in `astro.config.mjs`)
- Bilingual routing (English default, Spanish with `/es` prefix)
- File-based content collections (84 JSON species profiles)
- Client-side filtering with JavaScript
- SEO-optimized with structured data (JSON-LD)
- Most pages prerendered at build time (`export const prerender = true`)

## Layers

**Content Layer:**
- Purpose: JSON-based species database
- Contains: 84 species profiles with structured data
- Location: `src/content/species/*.json`
- Schema: Defined via Zod in `src/content/config.ts`
- Accessed via: Astro Content Collections API (`getCollection('species')`)
- Validation: Type-safe with Zod schema enforcement

**Page Layer:**
- Purpose: Route handlers and page templates
- Contains: `.astro` page files defining routes
- Location: `src/pages/`, `src/pages/es/`, `src/pages/species/`, `src/pages/es/species/`
- Depends on: Content layer, layout layer, component layer
- Used by: Browser requests (routes)
- Dynamic routes: `src/pages/species/[slug].astro`, `src/pages/es/species/[slug].astro`

**Layout Layer:**
- Purpose: Master template with header/footer, SEO, meta tags
- Contains: `BaseLayout.astro` wrapper component
- Location: `src/layouts/BaseLayout.astro`
- Depends on: Component layer (Header, Footer)
- Used by: All pages
- Responsibilities: Meta tags, Open Graph, Twitter Cards, canonical URLs, hreflang, structured data injection

**Component Layer:**
- Purpose: Reusable UI components
- Contains: Header, Footer components
- Location: `src/components/Header.astro`, `src/components/Footer.astro`
- Depends on: i18n utilities
- Used by: Layouts

**Utility Layer:**
- Purpose: Helper functions for URLs and internationalization
- Contains: Pure functions with no side effects
- Location: `src/lib/urlUtils.ts`, `src/i18n/utils.ts`
- Depends on: Nothing (leaf nodes)
- Used by: Pages, layouts, components

**Localization Layer:**
- Purpose: Translation strings for bilingual support
- Contains: JSON translation files
- Location: `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
- Loaded by: `src/i18n/utils.ts`
- Pattern: Hierarchical dot notation (e.g., `nav.species`, `hero.title`)

## Data Flow

**Static Page Request (Prerendered):**

1. Build time: Astro runs `getCollection('species')` to load all JSON files
2. Build time: `getStaticPaths()` generates routes for each species (84 routes × 2 languages = 168 routes)
3. Build time: Pages rendered to static HTML with embedded structured data
4. Runtime: Node.js server serves prerendered HTML
5. Browser: Client-side JavaScript handles filtering/search (no server requests)

**Example Flow (Species Detail Page):**

1. User visits `/species/blue-and-gold-macaw`
2. Server serves prerendered HTML (generated at build time)
3. HTML includes:
   - Metadata from BaseLayout
   - Species data embedded in page
   - JSON-LD structured data (Article + BreadcrumbList schemas)
   - Localized strings from i18n
4. Page is fully functional without JavaScript (progressive enhancement)

**Client-Side Filtering:**

1. Species list page loads with all species embedded as JSON in `<script>` tag
2. User interacts with search/filter controls
3. JavaScript filters visible species cards (no API calls)
4. Quick Facts buttons trigger predefined filter combinations
5. No server-side interaction for filtering

**State Management:**
- Stateless - No persistent state between requests
- Session: None - No user sessions or authentication
- Client state: Managed via vanilla JavaScript in inline `<script>` tags

## Key Abstractions

**Content Collection (Astro Pattern):**
- Purpose: Type-safe data layer for structured content
- Example: `src/content/species/` directory
- Schema: Defined in `src/content/config.ts` using Zod
- Access pattern: `await getCollection('species')`
- Fields: category, species, slug, image, description, size, weight_grams, temperament, loudness, vocalization, dietaryNeeds, healthPointers, housing, origin

**BaseLayout Component:**
- Purpose: DRY wrapper for all pages
- Location: `src/layouts/BaseLayout.astro`
- Pattern: Slots for `head`, `scripts`, and default content
- Responsibilities:
  - Meta tag generation (title, description, OG, Twitter)
  - Canonical URL management
  - hreflang alternates for bilingual content
  - Header/Footer inclusion
  - Structured data injection via `slot="head"`

**i18n Utilities:**
- Purpose: Language detection and translation lookups
- Location: `src/i18n/utils.ts`
- Key functions:
  - `getLangFromUrl(url: URL)` - Detects language from URL path
  - `useTranslations(lang)` - Returns translation function for given language
  - `getLocalizedPath(path, locale)` - Converts paths between locales
  - `getAlternateLanguage(lang)` - Toggles between en/es
- Pattern: Functional utilities, no classes or state

**URL Utilities:**
- Purpose: Convert relative URLs to absolute for structured data
- Location: `src/lib/urlUtils.ts`
- Function: `toAbsoluteUrl(maybeUrl)` - Handles relative paths, absolute URLs, null/undefined
- Used by: Pages generating JSON-LD (Open Graph images, canonical URLs)

**Client-Side Filtering:**
- Purpose: Real-time species filtering without API calls
- Location: Inline `<script is:inline define:vars>` in `src/pages/species/index.astro`
- Pattern: `filterSpecies()` function + event listeners on search/filter inputs
- Quick Facts: Preset filter combinations (quiet, talkers, beginners, etc.)
- ⚠️ **Tech Debt**: Duplicated logic between English and Spanish versions

## Entry Points

**Home Pages:**
- English: `src/pages/index.astro` - Categories, FAQ, CTA
- Spanish: `src/pages/es/index.astro` - Translated home page

**Species List:**
- English: `src/pages/species/index.astro` - Full species directory with filters
- Spanish: `src/pages/es/species/index.astro` - Translated species list
- Prerendered: Yes (static HTML generated at build time)

**Species Detail (Dynamic Routes):**
- English: `src/pages/species/[slug].astro` - Individual species page
- Spanish: `src/pages/es/species/[slug].astro` - Translated detail page
- Prerendered: Yes (84 routes generated via `getStaticPaths()`)

**Sitemap:**
- Location: `src/pages/sitemap.xml.ts`
- Dynamic: Generates XML for all languages + species at build time
- Referenced: `public/robots.txt`

## Error Handling

**Strategy:** No explicit error handling - Rely on Astro build-time failures

**Patterns:**
- No try/catch around `getCollection()` calls
- No validation that species data exists before rendering
- Build fails if content schema validation fails (Zod)
- ⚠️ **Tech Debt**: Missing runtime error handling for data operations

## Cross-Cutting Concerns

**SEO:**
- Structured data: JSON-LD embedded in `<script type="application/ld+json">`
- Escape pattern: `.replace(/</g, '\\\\u003c')` to prevent XSS in JSON-LD
- ⚠️ **Tech Debt**: Escape pattern duplicated in 10+ files

**Localization:**
- Route-based: `/` for English, `/es/` for Spanish
- Language detection: `getLangFromUrl(Astro.url)`
- Translation lookup: `useTranslations(currentLang)`
- hreflang tags: Generated in BaseLayout for alternate language versions

**Filtering:**
- Server-side: Category grouping and sorting at build time
- Client-side: Real-time search/filter via JavaScript
- No API calls: All data embedded in page HTML

---

*Architecture analysis: 2026-01-13*
*Update when major patterns change*
