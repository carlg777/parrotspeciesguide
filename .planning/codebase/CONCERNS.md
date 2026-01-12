# Codebase Concerns

**Analysis Date:** 2026-01-12

## Tech Debt

**No significant technical debt** - This is a freshly created standalone site extracted from a larger codebase. Code is clean and minimal.

## Known Bugs

**No known bugs** - Site is newly created and functional in testing.

## Security Considerations

**No security concerns** - This is a public content site with:
- No user input
- No authentication
- No forms or data submission
- Only static content display

## Performance Bottlenecks

**Content Collection loading:**
- Issue: All 84 species loaded on every page request
- File: `src/pages/species/index.astro`, `src/pages/index.astro`
- Measurement: Not measured yet (site is new)
- Cause: `getCollection('species')` loads all content
- Improvement path: Astro automatically optimizes this - verify performance in production

**Image optimization:**
- Issue: 84 WebP images (various sizes) served as static assets
- Location: `public/assets/img/parrots/*.webp`
- Measurement: Not measured
- Cause: No image optimization pipeline
- Improvement path: Add Astro Image service or use CDN with automatic resizing

## Fragile Areas

**i18n dependencies:**
- Files: `src/i18n/utils.ts`, copied from main site
- Why fragile: Complex translation utilities for simple use case
- Common failures: May have unused functions or over-engineering
- Safe modification: Review and simplify `src/i18n/utils.ts` to only needed functions
- Test coverage: None

**Spanish page synchronization:**
- Files: `src/pages/es/**/*.astro` must mirror `src/pages/**/*.astro`
- Why fragile: Manual duplication - easy to forget updating Spanish pages
- Common failures: English page updated, Spanish page outdated
- Safe modification: Use automated checks or shared components
- Test coverage: None

## Scaling Limits

**No scaling limits identified** - Content is static, no database or external dependencies.

Potential future limits:
- If species count grows beyond 500, may need pagination
- If adding user features (search, favorites), would need backend

## Dependencies at Risk

**No at-risk dependencies** - Minimal dependency footprint:
- Astro 5.14.8 - Actively maintained
- @astrojs/node 9.5.0 - Official Astro adapter

## Missing Critical Features

**Search functionality:**
- Problem: No search on species index page
- Current workaround: Browser find (Cmd+F)
- Blocks: Users can't easily filter by characteristics (size, noise level, etc.)
- Implementation complexity: Low (client-side filtering already in copied page code)

**Metadata enrichment:**
- Problem: Basic meta tags, could add structured data for search engines
- Current workaround: None
- Blocks: Reduced SEO visibility
- Implementation complexity: Low (add JSON-LD structured data to species pages)

## Test Coverage Gaps

**No test coverage** - No testing infrastructure implemented

**What's not tested:**
- Content schema validation (84 species JSON files match schema)
- i18n routing (English/Spanish pages render correctly)
- Image existence (all referenced images exist)
- Build process (all pages compile without errors)

**Recommended first tests:**
1. Content validation: Verify all species files match Zod schema
2. Build smoke test: Ensure `npm run build` succeeds
3. Image reference check: Verify all species have corresponding images

---

*Concerns audit: 2026-01-12*
*This is a new, clean codebase with minimal concerns*
