# Coding Conventions

**Analysis Date:** 2026-01-13

## Naming Patterns

**Files:**
- `PascalCase.astro` - Astro components and layouts (e.g., `BaseLayout.astro`, `Header.astro`, `Footer.astro`)
- `kebab-case.astro` - Page files (e.g., `index.astro`, `[slug].astro`)
- `camelCase.ts` - TypeScript utility files (e.g., `urlUtils.ts`)
- `kebab-case.json` - Data files (e.g., `blue-and-gold-macaw.json`, `cockatiel.json`)

**Functions:**
- camelCase for all functions (e.g., `toAbsoluteUrl`, `getLangFromUrl`, `useTranslations`)
- No special prefix for async functions
- Action verbs in present tense (e.g., `get`, `use`, `remove`, `toAbsolute`)

**Variables:**
- camelCase for variables (e.g., `allSpecies`, `currentLang`, `baseUrl`)
- camelCase for constants (e.g., `languages`, `defaultLang`, `translations`)
- No UPPER_SNAKE_CASE convention detected
- No underscore prefix for private members

**Types:**
- PascalCase for type aliases (e.g., `Language`)
- PascalCase for interfaces (e.g., `Props`)
- `type` keyword for unions: `export type Language = keyof typeof languages`
- No `I` prefix for interfaces

## Code Style

**Formatting:**
- 2-space indentation (consistent across all TypeScript and Astro files)
- Single quotes for strings in TypeScript (`'astro:content'`, `'data'`)
- Double quotes in HTML attributes (`class="container"`)
- Semicolons required at end of statements
- No trailing commas in single-line objects

**Linting:**
- No ESLint configuration detected (no `.eslintrc`, `eslint.config.js`)
- No Prettier configuration (no `.prettierrc`)
- No pre-commit hooks configured
- Code style enforced manually or by editor settings

**TypeScript:**
- Strict mode enabled via `tsconfig.json`: `"extends": "astro/tsconfigs/strict"`
- Type annotations on function parameters and return types
- Explicit type exports: `export type Language = ...`

## Import Organization

**Order:**
1. Astro framework imports (`import type { APIRoute } from "astro"`)
2. Astro utilities (`import { getCollection } from "astro:content"`)
3. Relative component imports (`import BaseLayout from "../../layouts/BaseLayout.astro"`)
4. Relative utility imports (`import { getLangFromUrl, useTranslations } from "../../i18n/utils"`)

**Grouping:**
- No blank lines between imports in observed files
- No alphabetical sorting within groups

**Path Aliases:**
- No path aliases configured (no `@/` mapping)
- All imports use relative paths (`../../layouts/BaseLayout.astro`)

## Error Handling

**Patterns:**
- No explicit error handling observed in most files
- No try/catch blocks around `getCollection()` calls
- Build-time failures caught by Astro (Zod schema validation)
- No custom error classes detected

**Error Types:**
- Relying on Astro build process to fail on errors
- Schema validation via Zod in `src/content/config.ts`
- No runtime error boundaries

## Logging

**Framework:**
- No logging framework detected
- No console.log calls in production code
- No structured logging

**Patterns:**
- Errors likely surface as build failures or 500 errors

## Comments

**When to Comment:**
- Minimal inline comments
- HTML comments for section headers: `<!-- Open Graph -->`, `<!-- Twitter Card -->`
- No JSDoc/TSDoc comments observed in utility files

**JSDoc/TSDoc:**
- Not used in this codebase
- Type safety achieved through TypeScript type annotations

**TODO Comments:**
- None detected in source files

## Function Design

**Size:**
- Functions kept concise (mostly under 20 lines)
- Inline arrow functions for simple transformations

**Parameters:**
- Use of optional parameters: `function useTranslations(lang: Language = defaultLang)`
- Typed parameters with TypeScript: `function getLangFromUrl(url: URL): Language`
- Destructuring in function bodies, not parameter lists

**Return Values:**
- Explicit return types in function signatures
- Early returns for guard clauses: `if (pathname.startsWith('/es')) return 'es'`

## Module Design

**Exports:**
- Named exports preferred: `export const toAbsoluteUrl = ...`
- `export function getLangFromUrl(...)`
- `export type Language = ...`
- No default exports detected

**Barrel Files:**
- No barrel files (`index.ts`) used
- Direct imports from source files

## Astro-Specific Patterns

**Component Structure:**
```astro
---
// Frontmatter: imports and logic
import BaseLayout from "../../layouts/BaseLayout.astro";
const allSpecies = await getCollection("species");
---

<!-- Template: HTML with expressions -->
<BaseLayout title="..." description="...">
  <!-- Content here -->
</BaseLayout>
```

**Content Collections:**
- Access via `getCollection('species')`
- Schema validation via Zod in `src/content/config.ts`
- Type-safe data access: `species.data.slug`, `species.data.category`

**Prerendering:**
- All pages use `export const prerender = true` (static generation)
- Dynamic routes use `getStaticPaths()` to generate static pages

**Client-Side JavaScript:**
- Inline `<script>` tags for interactivity
- No separate JavaScript files
- Pattern: `<script is:inline define:vars={{ data }}>` to pass server data to client

**Structured Data (JSON-LD):**
- Embedded in pages as `<script type="application/ld+json">`
- XSS escape pattern: `.replace(/</g, '\\u003c')` applied to JSON strings
- Schema.org types: FAQPage, ItemList, Article, BreadcrumbList

## CSS Conventions

**Custom Properties:**
- CSS variables with `--pf-` prefix (e.g., `--pf-primary-500`, `--pf-font-body`)
- Defined in `public/assets/css/styles.css`

**Class Naming:**
- BEM-like patterns: `species-card__image`, `species-card__link`
- Utility classes: `container`, `button`, `button-secondary`

**Tailwind CSS:**
- Not detected in this codebase
- Custom CSS used instead

---

*Convention analysis: 2026-01-13*
*Update when patterns change*
