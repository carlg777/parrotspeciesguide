# Coding Conventions

**Analysis Date:** 2026-01-15

## Naming Patterns

**Files:**
- kebab-case for multi-word files: `stringUtils.ts`, `structuredData.ts`, `blue-and-gold-macaw.json`
- PascalCase for Astro components: `Header.astro`, `Footer.astro`, `BaseLayout.astro`
- Dynamic routes: `[slug].astro`, `[param].astro` (Astro convention)
- Test files: None present
- API routes: `sitemap.xml.ts` (type extension for output format)

**Functions:**
- camelCase for all functions: `truncateWithEllipsis()`, `toAbsoluteUrl()`, `escapeJsonLd()`
- Getter pattern: `getLangFromUrl()`, `getLocalizedPath()`, `getAlternateLanguage()`
- Hook-style naming: `useTranslations()` (React convention adapted for i18n)
- No special prefix for async functions (implicit from return type)

**Variables:**
- camelCase for variables: `currentLang`, `searchInput`, `relatedSpecies`, `structuredData`
- Descriptive names: `maybeUrl`, `siteUrl`, `maxLength`, `sortedSpecies`
- No underscore prefix for private (TypeScript doesn't use this convention)

**Types:**
- PascalCase for interfaces: No interfaces found
- PascalCase for types: `Language`, `Props` (common pattern in Astro)
- Union types: `type Language = keyof typeof languages`
- No enum usage detected

## Code Style

**Formatting:**
- Tool: None (no Prettier or ESLint config detected)
- Line length: Appears to respect ~120 characters
- Indentation: 2 spaces (consistent across all files)
- Quotes: Single quotes for strings
- Semicolons: Required (present on all statements)

**Linting:**
- Tool: None detected
- No .eslintrc or eslint.config.js found
- Code style maintained through manual conventions

## Import Organization

**Order:**
1. Framework imports: `import { defineCollection, z } from 'astro:content'`
2. Internal relative imports: `import Header from "../components/Header.astro"`
3. Utility imports: `import { getLangFromUrl } from "../i18n/utils"`

**Grouping:**
- No strict grouping or blank lines between import groups
- Imports generally organized by type (framework, then local)
- No alphabetical sorting enforced

**Path Aliases:**
- None configured (uses relative paths: `../`, `./`)
- All imports use relative path notation

## Error Handling

**Patterns:**
- Build-time validation via Zod schemas in `src/content/config.ts`
- No runtime try/catch blocks detected (static site)
- TypeScript strict mode catches type errors at compile time
- Build fails on validation errors

**Error Types:**
- Schema validation errors: Zod throws during build if content invalid
- Type errors: TypeScript compiler errors prevent build
- No runtime error handling needed (pre-rendered static HTML)

**Logging:**
- No logging framework
- Build-time errors output to console
- No runtime logging (static site)

## Logging

**Framework:**
- None - Static site with no runtime logging

**Patterns:**
- Build-time console output only
- No structured logging
- No log levels (debug, info, warn, error)

## Comments

**When to Comment:**
- File headers with migration notes: "Created during Phase 1..."
- Function documentation with JSDoc
- Inline comments for non-obvious logic (sparse usage)
- Schema validation examples in `src/content/config.ts`

**JSDoc/TSDoc:**
- Required for utility functions
- Format includes @param, @returns, @example tags
- Example from `src/lib/urlUtils.ts`:
```typescript
/**
 * Converts a relative or absolute URL to a fully qualified absolute URL
 * @param maybeUrl - URL string (relative or absolute) or null/undefined
 * @param siteUrl - Base site URL (default: 'https://www.parrotspeciesguide.com')
 * @returns Absolute URL with domain, or undefined if input is null/undefined
 * @example
 * toAbsoluteUrl('/uploads/image.jpg') // => 'https://www.parrotspeciesguide.com/uploads/image.jpg'
 */
```

**TODO Comments:**
- None found in active code
- Migration notes present indicating planned refactoring

## Function Design

**Size:**
- Generally concise (<50 lines)
- Some page components longer due to template nature
- Utility functions well-scoped to single responsibility

**Parameters:**
- Type-annotated: `maxLength: number = 150`
- Default values used: `function truncateWithEllipsis(text: string, maxLength: number = 150)`
- Optional parameters: `siteUrl?: string`
- Descriptive names: `maybeUrl`, `targetLang`, `currentLang`

**Return Values:**
- Explicit return type annotations: `: string`, `: Language`, `: void`
- Early returns for guard clauses
- Undefined returned explicitly for null/undefined inputs

## Module Design

**Exports:**
- Named exports preferred: `export function toAbsoluteUrl(...)`
- Arrow function exports: `export const toAbsoluteUrl = (...) => {...}`
- Default exports for Astro components (implicit)

**Barrel Files:**
- None - Direct imports from specific files
- No index.ts re-exports

**File Organization:**
- One concern per file: `stringUtils.ts`, `urlUtils.ts`, `structuredData.ts`
- Pure functions grouped by domain
- No circular dependencies detected

## TypeScript Patterns

**Configuration:**
- Strict mode enabled via `"extends": "astro/tsconfigs/strict"`
- JSX support: `"jsx": "react-jsx"`
- Type-safe throughout

**Type Usage:**
- Union types: `type Language = keyof typeof languages`
- Optional properties: `description?: string`, `canonical?: string`
- Zod for runtime validation: `z.object()`, `z.string()`, `z.enum()`
- Interface pattern in Astro components:
```typescript
interface Props {
  title: string;
  description?: string;
}
```

---

*Convention analysis: 2026-01-15*
*Update when patterns change*
