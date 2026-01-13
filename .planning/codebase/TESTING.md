# Testing Patterns

**Analysis Date:** 2026-01-13

## Test Framework

**Runner:**
- None configured
- No test framework installed (no Jest, Vitest, Mocha)

**Assertion Library:**
- Not applicable (no tests)

**Run Commands:**
```bash
# No test commands available
npm test                              # Not defined
```

## Test File Organization

**Location:**
- No test files found
- Search for `*.test.ts`, `*.spec.ts`, `__tests__/` directories: 0 results

**Naming:**
- Not applicable (no test files)

**Structure:**
- No test directory structure

## Test Structure

**Suite Organization:**
- Not applicable (no tests configured)

**Patterns:**
- No testing patterns established

## Mocking

**Framework:**
- No mocking library configured

**Patterns:**
- Not applicable (no tests)

**What to Mock:**
- Not defined

**What NOT to Mock:**
- Not defined

## Fixtures and Factories

**Test Data:**
- No test fixtures or factories

**Location:**
- No fixtures directory

## Coverage

**Requirements:**
- No coverage targets defined
- No coverage tooling configured

**Configuration:**
- Not applicable

**View Coverage:**
- Not available

## Test Types

**Unit Tests:**
- Not present

**Integration Tests:**
- Not present

**E2E Tests:**
- Not present

## Build-Time Validation

**Type Checking:**
- TypeScript type checking via `astro check` in build process
- Runs before build: `"build": "astro check && astro build"` (from `package.json`)
- Validates `.astro` files and imported TypeScript modules

**Content Schema Validation:**
- Zod schema validation in `src/content/config.ts`
- Validates all 84 species JSON files at build time
- Fails build if data doesn't match schema

**Build Scripts:**
```bash
npm run dev        # Development server with hot reload
npm run build      # Type check + build (fails on type errors or invalid content)
npm run preview    # Preview production build locally
```

## Areas That Would Benefit from Tests

**1. i18n Utilities (`src/i18n/utils.ts`):**
- `getLangFromUrl(url: URL): Language` - URL parsing logic for language detection
- `useTranslations(lang: Language)` - Translation lookup with fallback
- `getLocalizedPath(path: string, locale: Language): string` - Path transformation
- `removeLocaleFromPath(path: string): string` - Locale prefix removal
- `getAlternateLanguage(currentLang: Language): Language` - Language toggle
- **Risk:** URL edge cases, path transformation bugs affecting routing

**2. URL Utilities (`src/lib/urlUtils.ts`):**
- `toAbsoluteUrl(maybeUrl: string | undefined | null): string | undefined`
- Handles: relative paths, absolute URLs, null/undefined inputs
- Complex logic: URL construction, protocol detection
- **Risk:** Broken canonical URLs, invalid structured data

**3. Content Collections Schema (`src/content/config.ts`):**
- Zod schema for 84 species JSON files (20+ fields each)
- Fields: category, species, slug, image, description, size, weight_grams, temperament, loudness, vocalization, dietary needs, health, housing, origin
- **Risk:** Schema changes breaking existing data, missing required fields

**4. Client-Side Filtering (Inline JavaScript in pages):**
- `filterSpecies()` function in `src/pages/species/index.astro` (lines ~270-313)
- Multi-term search, origin filter, loudness filter
- Quick facts button handlers (lines ~315-353)
- **Risk:** Filter combinations not working, search breaking on edge cases
- **Tech Debt:** Logic duplicated between English and Spanish versions

**5. SEO/Structured Data:**
- JSON-LD generation for Schema.org compliance
- Examples in: `src/pages/species/index.astro`, `src/pages/species/[slug].astro`, `src/pages/index.astro`
- XSS escape pattern: `.replace(/</g, '\\u003c')` applied manually
- **Risk:** Invalid Schema.org JSON, missing structured data fields

**6. Sitemap Generation (`src/pages/sitemap.xml.ts`):**
- Dynamic XML sitemap for 84 species × 2 languages = 168 routes
- Handles: static paths, species paths, bilingual routes
- **Risk:** Missing URLs in sitemap, incorrect lastmod dates

## Current Verification Strategy

**Build-Time Validation:**
- TypeScript compiler catches type errors
- Astro Content Collections validate JSON structure via Zod
- Build fails on invalid data or type errors

**Manual Testing:**
- Development server (`npm run dev`) for local verification
- Preview build (`npm run preview`) for production simulation
- Manual browser testing for functionality

**No Automated Testing:**
- No unit tests for business logic
- No integration tests for data flow
- No E2E tests for user interactions
- No visual regression tests

## Recommendations for Future Testing

**Quick Win - Unit Tests (Vitest):**
1. Test `src/lib/urlUtils.ts` - URL transformation edge cases
2. Test `src/i18n/utils.ts` - Language detection and path manipulation
3. Test client-side filter logic (extract to module first)

**Integration Tests:**
1. Content schema validation (verify all species data is valid)
2. Locale file completeness (ensure all keys present in both en/es)
3. Sitemap generation (verify correct number of URLs)

**E2E Tests (Playwright):**
1. Species page filtering and search
2. Language switching between English/Spanish
3. Quick facts button interactions
4. Navigation and routing

**Test Framework Recommendation:**
- **Vitest** - Lightweight, Vite-native, works well with Astro
- Co-locate tests: `src/lib/urlUtils.test.ts` alongside `src/lib/urlUtils.ts`
- Start with utility functions (highest value, easiest to test)

## Summary

| Aspect | Status | Details |
|--------|--------|---------|
| **Test Framework** | ❌ None | No Jest, Vitest, or Mocha configured |
| **Test Files** | ❌ 0 | No `.test.ts`, `.spec.ts`, or `__tests__/` |
| **Test Dependencies** | ❌ None | Only `@astrojs/check`, `typescript`, `sharp` |
| **Type Checking** | ✅ Active | `astro check` runs in build process |
| **Content Validation** | ✅ Active | Zod schema validates 84 JSON species files |
| **Linting** | ❌ None | No ESLint or Prettier configured |
| **Formatters** | ❌ Manual | No automated code formatting |
| **Code Coverage** | ❌ N/A | No coverage tools installed |
| **Manual Testing** | ✅ Active | Dev server + browser testing |

---

*Testing analysis: 2026-01-13*
*Update when test patterns change*
