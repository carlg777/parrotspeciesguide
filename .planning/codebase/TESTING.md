# Testing Patterns

**Analysis Date:** 2026-01-15

## Test Framework

**Runner:**
- None installed

**Assertion Library:**
- None

**Run Commands:**
```bash
# No test commands available
npm run dev                # Development server
npm run build             # Build with type checking
npm run preview           # Preview production build
```

## Test File Organization

**Location:**
- No test files present

**Naming:**
- N/A - No testing framework configured

**Structure:**
- N/A

## Test Structure

**Suite Organization:**
- None - No test framework

**Patterns:**
- Not applicable

## Mocking

**Framework:**
- None

**Patterns:**
- N/A

**What to Mock:**
- N/A

**What NOT to Mock:**
- N/A

## Fixtures and Factories

**Test Data:**
- `src/lib/__examples__.ts` contains usage examples (not tests)
- Example patterns show expected function behavior
- 84+ species JSON files serve as real data fixtures in `src/content/species/`

**Location:**
- `src/lib/__examples__.ts` - Usage examples demonstrating utility functions
- `src/content/species/` - Production content serves as data fixtures

## Coverage

**Requirements:**
- No coverage tracking

**Configuration:**
- None

**View Coverage:**
- N/A

## Test Types

**Unit Tests:**
- None present

**Integration Tests:**
- None present

**E2E Tests:**
- None present

## Quality Assurance Approach

**Type Checking:**
- TypeScript strict mode enabled via `tsconfig.json`
- Astro type checking via `@astrojs/check` package
- Build script includes: `astro check && astro build`
- Build fails on type errors

**Content Validation:**
- Zod schema validation in `src/content/config.ts`
- Species data validated at build time
- Required/optional field enforcement
- Enum validation for careLevel, category, etc.

**Manual Testing:**
- Development preview via `npm run dev`
- Production build preview via `npm run preview`
- No automated test suite

## Common Patterns

**Async Testing:**
- N/A

**Error Testing:**
- N/A

**Snapshot Testing:**
- Not used

## Recommended Test Targets

Based on codebase analysis, these functions would benefit from unit tests if testing is added:

**High Value Test Targets:**

1. **String Utilities** - `src/lib/stringUtils.ts`
   - `truncateWithEllipsis()` - Test edge cases, exact lengths, exceeding lengths

2. **URL Utilities** - `src/lib/urlUtils.ts`
   - `toAbsoluteUrl()` - Test relative/absolute URLs, null handling, custom siteUrl

3. **Structured Data** - `src/lib/structuredData.ts`
   - `escapeJsonLd()` - Test XSS prevention, JSON serialization

4. **i18n Utilities** - `src/i18n/utils.ts`
   - `getLangFromUrl()` - Test path parsing
   - `getLocalizedPath()` - Test locale prefix logic
   - `removeLocaleFromPath()` - Test locale stripping
   - `useTranslations()` - Test translation fallbacks

5. **Content Schema** - `src/content/config.ts`
   - Zod validation behavior for valid/invalid content

## Test Framework Recommendations

**If adding tests, consider:**
- Vitest - Fast, Vite-native test runner (matches Astro's build tool)
- Co-located test files: `*.test.ts` alongside source
- Test utilities in `tests/` directory
- Coverage target: Focus on utility functions (high reuse, pure functions)

---

*Testing analysis: 2026-01-15*
*Update when test patterns change*
