# Codebase Concerns

**Analysis Date:** 2026-01-13

## Tech Debt

**Hardcoded domain URLs throughout codebase:**
- Issue: Domain `https://www.parrotspeciesguide.com` hardcoded in 20+ locations instead of using environment variables or Astro's `site` configuration
- Files: `src/lib/urlUtils.ts` (line 26), `src/pages/index.astro` (line 56), `src/pages/species/index.astro` (lines 40, 85), `src/pages/species/[slug].astro` (lines 31, 65-77, 89), `src/pages/es/index.astro` (line 48), `src/pages/es/species/index.astro` (lines 40, 85), `src/pages/es/species/[slug].astro` (lines 31, 66-78, 90), `src/pages/sitemap.xml.ts` (line 7)
- Why: Rapid development without centralizing configuration
- Impact: Changing domain or deploying to staging requires manual updates across all files. `astro.config.mjs` has `site` config but not being used consistently.
- Fix approach: Create environment variable `PUBLIC_SITE_URL`, update `astro.config.mjs` to use it, replace all hardcoded URLs with `import.meta.env.SITE` or `Astro.site.href`

**Duplicate client-side filter logic:**
- Issue: `filterSpecies()` function implemented twice with diverging logic
- Files: `src/pages/species/index.astro` (lines 270-357) vs `src/pages/es/species/index.astro` (lines 259-341)
- Why: Separate English and Spanish pages created independently
- Impact: Logic divergence causes inconsistent behavior between language versions. Spanish version has hardcoded string `'Quiet'` (line 319) where English version uses dynamic values. Maintenance burden doubled.
- Fix approach: Extract filter logic to `src/lib/filterSpecies.ts`, import in both pages, pass locale-specific translations as parameters

**Duplicate structured data escape pattern:**
- Issue: `.replace(/</g, '\\u003c')` XSS escape pattern repeated 10+ times across pages
- Files: `src/pages/index.astro` (line 50), `src/pages/species/index.astro` (lines 28, 46, 79), `src/pages/species/[slug].astro` (lines 82-83), `src/pages/es/index.astro` (line 47), `src/pages/es/species/index.astro` (lines 28, 46, 79), `src/pages/es/species/[slug].astro` (lines 83-84)
- Why: Each page independently implements JSON-LD escaping
- Impact: Hard to maintain. If escape pattern changes or additional sanitization needed, must update 10+ locations.
- Fix approach: Create `src/lib/structuredData.ts` with `escapeJsonLd(obj)` utility, replace all inline escaping with utility function calls

**Inconsistent string truncation between languages:**
- Issue: English version truncates descriptions at 150 characters, Spanish at 120 characters
- Files: `src/pages/species/index.astro` (line 237) uses `.substring(0, 150)`, `src/pages/es/species/index.astro` (line 237) uses `.slice(0, 120)`
- Why: Different developers or evolution over time
- Impact: UX inconsistency between language versions. Spanish users see less preview text.
- Fix approach: Standardize truncation length (e.g., 150 for both) and method (use `.slice()` consistently), add utility function `truncateWithEllipsis(text, length)`

## Known Bugs

**Ellipsis appended to short descriptions:**
- Symptoms: Species with descriptions shorter than 150/120 characters show `...` suffix anyway
- Trigger: Any species card on list page where `description.length < 150`
- Files: `src/pages/species/index.astro` (line 237), `src/pages/es/species/index.astro` (line 237)
- Workaround: None for users
- Root cause: No length check before appending ellipsis: `{description.substring(0, 150)}...`
- Fix: Add conditional: `{description.length > 150 ? description.substring(0, 150) + '...' : description}`

**No fallback for missing description:**
- Symptoms: If species JSON lacks `description` field, page shows empty card or JavaScript error
- Trigger: Invalid or incomplete species JSON file
- Files: All pages rendering `species.data.description`
- Workaround: Schema validation in `src/content/config.ts` prevents this at build time
- Root cause: No runtime validation that required fields exist
- Fix: Add optional chaining `species.data.description?.substring(...)` or provide default text

## Security Considerations

**Unsanitized HTML rendering with set:html:**
- Risk: `set:html` directive renders content fields as raw HTML without sanitization
- Files: `src/pages/species/[slug].astro` (lines 217, 225, 233), `src/pages/es/species/[slug].astro` (lines 233, 240, 247)
- Current mitigation: Content comes from JSON files in `src/content/species/` under version control (not user-generated)
- Recommendations:
  1. If content will ever come from external sources, add HTML sanitization library (e.g., `sanitize-html`)
  2. Document in comments why `set:html` is safe here (controlled content)
  3. Consider switching to Markdown for structured content fields (safer pattern)

**No Content Security Policy (CSP) headers:**
- Risk: No CSP headers configured, vulnerable to XSS if any injection vulnerability exists
- Files: None - missing configuration
- Current mitigation: Static site with no user input or dynamic content
- Recommendations: Add CSP headers via Astro middleware or hosting platform (Vercel/Netlify headers)

**No environment variable validation:**
- Risk: Missing or malformed environment variables won't be caught until runtime/build
- Files: No `.env.example`, no validation logic
- Current mitigation: All configuration is hardcoded (no env vars used)
- Recommendations: Create `.env.example` when migrating to environment-based configuration

## Performance Bottlenecks

**Redundant getCollection() calls:**
- Problem: `getCollection('species')` called twice in detail pages
- Files: `src/pages/species/[slug].astro` (lines 8, 20), `src/pages/es/species/[slug].astro` (lines 8, 20)
- Measurement: Build time impact (not measured, but unnecessary)
- Cause: First call in `getStaticPaths()`, second call in component body for data access
- Improvement path: Astro should cache this internally, but worth verifying. Pass collection data through `props` instead of re-fetching.

**No image optimization beyond WebP:**
- Problem: All images are WebP but no responsive image sizes or lazy loading
- Files: All species images in `public/assets/img/parrots/` (84 images)
- Measurement: Not measured
- Cause: Manual image conversion without responsive image strategy
- Improvement path: Use Astro's `<Image>` component for automatic optimization, generate multiple sizes, implement lazy loading

## Fragile Areas

**Client-side filtering logic:**
- Files: `src/pages/species/index.astro` (lines 270-357), `src/pages/es/species/index.astro` (lines 259-341)
- Why fragile: Complex inline JavaScript with no tests, duplicated between pages, many edge cases
- Common failures: Filter combinations not clearing properly, search terms with special characters, loudness filter not matching all variants
- Safe modification: Extract to separate module first, add unit tests, then refactor
- Test coverage: None

**i18n path manipulation:**
- Files: `src/i18n/utils.ts` (all functions)
- Why fragile: String manipulation with URL parsing, assumes specific path structure (`/es/` prefix)
- Common failures: Edge cases with trailing slashes, nested paths, query parameters
- Safe modification: Add unit tests before modifying, test with various URL formats
- Test coverage: None

**Structured data JSON-LD generation:**
- Files: All page files with structured data (10+ files)
- Why fragile: Manual JSON construction with string escaping, easy to break Schema.org compliance
- Common failures: Invalid JSON due to missing escaping, incorrect schema types, broken URLs in structured data
- Safe modification: Use structured data utility library or validate output with Schema.org validator
- Test coverage: None - manual validation only

## Scaling Limits

**Static site generation with 84+ species:**
- Current capacity: 84 species × 2 languages = 168 static pages
- Limit: ~1000 species before build times become painful (Astro SSG overhead)
- Symptoms at limit: Slow builds (5+ minutes), memory issues during generation
- Scaling path: Implement on-demand ISR (Incremental Static Regeneration) or switch to SSR with caching

**No CDN or caching strategy:**
- Current capacity: Depends on hosting platform (likely Vercel/Netlify defaults)
- Limit: Unknown - no traffic data
- Symptoms at limit: Slow page loads, high bandwidth costs
- Scaling path: Add CDN (CloudFlare), implement cache headers, optimize static assets

## Dependencies at Risk

**No outdated or deprecated dependencies detected:**
- All dependencies are current and actively maintained
- Astro 5.14.8 is recent (December 2024)
- No security vulnerabilities reported

## Missing Critical Features

**No 404 error page:**
- Problem: No custom 404 page for invalid species slugs or routes
- Current workaround: Default server 404 (not branded)
- Blocks: Poor UX when users access broken links
- Implementation complexity: Low (create `src/pages/404.astro`)

**No robots.txt dynamic generation:**
- Problem: Static `public/robots.txt` doesn't account for environment (dev/staging should block crawlers)
- Current workaround: Manual robots.txt editing
- Blocks: Staging sites could be indexed by search engines
- Implementation complexity: Low (convert to `src/pages/robots.txt.ts`)

**No search functionality:**
- Problem: Only client-side filtering on species list page, no full-text search
- Current workaround: Users manually browse or use browser find (Ctrl+F)
- Blocks: Can't search across species characteristics, care information, or descriptions
- Implementation complexity: Medium (requires search index, possibly Algolia or Pagefind)

**No offline support:**
- Problem: Site requires network connection, no service worker or PWA features
- Current workaround: None
- Blocks: Poor experience on flaky mobile connections
- Implementation complexity: Medium (add service worker, cache strategy)

## Test Coverage Gaps

**No unit tests for utilities:**
- What's not tested: `src/lib/urlUtils.ts` (URL transformation logic), `src/i18n/utils.ts` (5 functions)
- Risk: URL edge cases, path manipulation bugs, language detection failures
- Priority: High (core functionality)
- Difficulty to test: Low (pure functions, easy to unit test)

**No tests for client-side filtering:**
- What's not tested: Filter logic in `src/pages/species/index.astro` and Spanish equivalent
- Risk: Filter combinations breaking, search not working, quick facts buttons not functioning
- Priority: High (critical user-facing feature)
- Difficulty to test: Medium (inline JavaScript, needs extraction or E2E tests)

**No validation that structured data is valid:**
- What's not tested: JSON-LD structured data in all pages
- Risk: Invalid Schema.org markup, broken rich snippets in search results
- Priority: Medium (affects SEO)
- Difficulty to test: Low (JSON schema validation available)

**No E2E tests for user flows:**
- What's not tested: Navigation, language switching, species browsing
- Risk: Broken links, routing issues, JavaScript errors going unnoticed
- Priority: Medium (but important for regressions)
- Difficulty to test: Medium (requires Playwright/Cypress setup)

---

*Concerns audit: 2026-01-13*
*Update as issues are fixed or new ones discovered*
