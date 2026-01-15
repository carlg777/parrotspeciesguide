# Codebase Concerns

**Analysis Date:** 2026-01-15

## Tech Debt

**Unused utility function - escapeJsonLd:**
- Issue: `escapeJsonLd()` function defined in `src/lib/structuredData.ts` but not used anywhere
- Files: Function exists in `src/lib/structuredData.ts`, manual JSON escaping used in `src/pages/species/index.astro` (lines 28, 46, 79), `src/pages/es/species/index.astro` (lines 28, 46, 79), `src/pages/species/[slug].astro` (lines 82-83), `src/pages/es/species/[slug].astro` (lines 83-84), `src/pages/index.astro` (line 50), `src/pages/es/index.astro` (line 47)
- Why: Utility created during Phase 1 but pages never migrated to use it
- Impact: Code duplication across 6+ pages using `JSON.stringify(...).replace(/</g, '\\u003c')`
- Fix approach: Replace all manual JSON escaping with `escapeJsonLd()` utility

**Inconsistent string truncation:**
- Issue: Manual truncation using different methods and lengths instead of utility function
- Files: `src/pages/species/index.astro` (line 237 uses `.substring(0, 150)`), `src/pages/es/species/index.astro` (line 237 uses `.slice(0, 120)`), while `src/lib/stringUtils.ts` provides `truncateWithEllipsis()` utility
- Why: Utility created during Phase 1 but existing code not migrated
- Impact: Inconsistent truncation lengths (150 vs 120), different methods (substring vs slice), no ellipsis handling
- Fix approach: Replace all manual truncation with `truncateWithEllipsis()` utility

**Example file not deleted:**
- Issue: `src/lib/__examples__.ts` explicitly marked for deletion after migration (line 5 comment)
- Files: `src/lib/__examples__.ts` (entire 89-line file)
- Why: Created as temporary documentation during Phase 1 refactoring
- Impact: Clutters codebase, confuses developers about what's production code
- Fix approach: Delete file after confirming migration complete

**Stale migration notes:**
- Issue: Multiple files contain "Phase 1" migration notes suggesting incomplete refactoring
- Files: `src/lib/stringUtils.ts` (lines 3-5), `src/lib/structuredData.ts` (lines 3-5), `src/lib/urlUtils.ts` (lines 3-5, 22-24), `src/content/config.ts` (lines 25, 81, 132)
- Why: Migration documentation not removed after completion
- Impact: Unclear if migration is complete or in progress
- Fix approach: Remove or update migration notes to clarify completion status

**Hardcoded domain throughout codebase:**
- Issue: Hardcoded `https://www.parrotspeciesguide.com` in 20+ locations instead of using `Astro.site` config
- Files: `src/pages/species/[slug].astro` (lines 31, 40, 65, 71, 77, 89), `src/pages/es/species/[slug].astro` (lines 31, 40, 66, 72, 78, 90), `src/pages/species/index.astro` (lines 40, 85), `src/pages/es/species/index.astro` (lines 40, 85), `src/pages/index.astro` (line 56), `src/pages/es/index.astro` (line 53), `src/lib/urlUtils.ts` (line 28 default fallback)
- Why: Quick initial implementation before configuration system established
- Impact: Domain changes require updating 20+ locations; breaks staging/preview environments
- Fix approach: Replace all hardcoded URLs with `Astro.site?.href` or pass site URL as parameter

## Known Bugs

**Broken navigation links to non-existent browse page:**
- Symptoms: Call-to-action buttons link to `/browse?search=...` pages that return 404
- Trigger: Click "View Similar Species" button on any species detail page
- Files: `src/pages/species/[slug].astro` (line 183), `src/pages/es/species/[slug].astro` (line 259)
- Workaround: None - links are dead
- Root cause: Browse page never created, but links remain from initial design
- Fix: Either create `/browse` pages or update links to point to `/species` with filters

**Inconsistent language specification in structured data:**
- Symptoms: Spanish pages include `"inLanguage": "es"` in breadcrumb schema, English pages omit language tag
- Trigger: View structured data on any detail page in both languages
- Files: `src/pages/es/species/[slug].astro` (line 36 has language tag), `src/pages/species/[slug].astro` (missing language tag)
- Workaround: Search engines may infer language from URL
- Root cause: Inconsistent implementation between language versions
- Fix: Add `"inLanguage": "en"` to English page structured data

## Security Considerations

**Unsafe HTML rendering with set:html:**
- Risk: Using `set:html` directive on content fields without sanitization
- Files: `src/pages/species/[slug].astro` (lines 217, 225, 233 render `dietaryNeeds`, `healthPointers`, `housing`), `src/pages/es/species/[slug].astro` (lines 233, 240, 247)
- Current mitigation: Content comes from trusted content collection (JSON files in repo)
- Recommendations: If content source changes to external/user-generated, add HTML sanitization or switch to safe rendering

**Hardcoded site URL in structured data:**
- Risk: Structured data always points to production domain, even in staging/dev
- Files: All pages with structured data (20+ files)
- Current mitigation: Only production deployment is public
- Recommendations: Use `Astro.site?.href` to support multiple environments

## Performance Bottlenecks

**Client-side species data serialization:**
- Problem: Full species dataset embedded in HTML for client-side filtering
- Files: `src/pages/species/index.astro` (line 28), `src/pages/es/species/index.astro` (line 28)
- Measurement: 84 species × all fields serialized to JSON in every page load
- Cause: Client-side filtering requires full dataset
- Improvement path: Monitor payload size; consider pagination or server-side filtering if dataset grows significantly

## Fragile Areas

**Client-side filtering logic:**
- Files: `src/pages/species/index.astro` (lines 270-313), `src/pages/es/species/index.astro` (similar range)
- Why fragile: Complex multi-filter logic with DOM manipulation, no tests
- Common failures: Could break if species data structure changes or new filter types added
- Safe modification: Add inline documentation, test manually with all filter combinations
- Test coverage: None - no automated tests

**i18n routing logic:**
- Files: `src/i18n/utils.ts` (functions: `getLangFromUrl`, `getLocalizedPath`, `removeLocaleFromPath`)
- Why fragile: Manual path parsing and manipulation for language routing
- Common failures: Could break if URL structure changes or new languages added
- Safe modification: Test with all URL patterns (with/without locale, with/without trailing slash)
- Test coverage: None

## Scaling Limits

**Static build for 84 species:**
- Current capacity: Handles 84 species well with static generation
- Limit: Static generation becomes slow with 1000+ species (each generates 2 pages)
- Symptoms at limit: Long build times, large `dist/` directory
- Scaling path: Consider pagination or dynamic rendering for large catalogs

## Dependencies at Risk

**No dependencies at risk:**
- All dependencies are actively maintained
- Astro 5.14.8 is latest stable version
- TypeScript 5.6.0 is current
- No deprecated packages detected

## Missing Critical Features

**No testing infrastructure:**
- Problem: No automated tests for utility functions or page rendering
- Current workaround: Manual testing during development
- Blocks: Confident refactoring, regression prevention, CI/CD quality gates
- Implementation complexity: Medium (add Vitest, write tests for utilities)

**No linting/formatting tools:**
- Problem: No ESLint or Prettier configuration
- Current workaround: Manual code style adherence
- Blocks: Consistent code style, automated code quality checks
- Implementation complexity: Low (add config files, npm scripts)

**Dead translation keys:**
- Problem: Extensive unused translation keys for non-existent pages (browse, dashboard, auth, resources, sell)
- Files: `src/i18n/locales/en.json` (lines 31-52, 70-128), `src/i18n/locales/es.json` (similar ranges)
- Current workaround: Keys simply ignored
- Blocks: Clean localization files, clear understanding of actual features
- Implementation complexity: Low (remove unused keys)

## Test Coverage Gaps

**Utility functions untested:**
- What's not tested: All functions in `src/lib/*.ts` and `src/i18n/utils.ts`
- Risk: Breaking changes to utilities go unnoticed
- Priority: High - utilities are reused across many pages
- Difficulty to test: Low - pure functions, easy to test

**Content schema validation untested:**
- What's not tested: Zod schema validation behavior in `src/content/config.ts`
- Risk: Schema changes could break existing content
- Priority: Medium - build fails provide some protection
- Difficulty to test: Medium - requires test content files

**i18n routing untested:**
- What's not tested: Language detection, path localization, translation fallbacks
- Risk: URL routing could break for certain patterns
- Priority: Medium - core functionality but low change frequency
- Difficulty to test: Medium - requires test URLs and request simulation

---

*Concerns audit: 2026-01-15*
*Update as issues are fixed or new ones discovered*
