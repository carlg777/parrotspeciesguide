# Coding Conventions

**Analysis Date:** 2026-01-12

## Naming Patterns

**Files:**
- kebab-case for all files (base-layout.astro, url-utils.ts)
- [param].astro for dynamic routes ([slug].astro)
- index.astro for default pages

**Functions:**
- camelCase for all functions (getLangFromUrl, useTranslations)
- No special prefix for async functions

**Variables:**
- camelCase for variables (currentLang, allSpecies)
- No constants observed yet

**Types:**
- PascalCase for interfaces (Props interface in BaseLayout)
- No type prefix convention

## Code Style

**Formatting:**
- No Prettier or ESLint config detected
- Manual formatting
- 2-space indentation (inferred from .astro files)
- Double quotes for strings (Astro/TypeScript files)
- Semicolons present in TypeScript

**Linting:**
- Astro check via `npm run lint` (checks TypeScript and Astro files)
- TypeScript strict mode (extends astro/tsconfigs/strict)
- No ESLint configuration

## Import Organization

**Order:**
1. Astro imports (from "astro/...")
2. Component imports (../)
3. Utility imports (../)

**Grouping:**
- No strict blank line separation
- Imports grouped by type (Astro built-ins, components, utilities)

**Path Aliases:**
- No path aliases configured
- Relative imports used throughout (../, ./)

## Error Handling

**Patterns:**
- Build-time validation via Content Collections schema
- TypeScript strict type checking
- No runtime error handling observed (static content)

**Error Types:**
- Zod schema validation errors in `src/content/config.ts`
- TypeScript compile-time errors

## Logging

**Framework:**
- None - No logging configured
- Server console output only during dev

**Patterns:**
- No logging in production
- Development logs from Astro dev server

## Comments

**When to Comment:**
- Configuration files have inline comments explaining settings
- Example: `// English at /, Spanish at /es/` in astro.config.mjs

**JSDoc/TSDoc:**
- Not used in current codebase

**TODO Comments:**
- None observed

## Function Design

**Size:**
- Small focused functions in utilities
- Page logic inline in Astro frontmatter

**Parameters:**
- Simple function signatures
- Destructuring used in component props

**Return Values:**
- Explicit returns where applicable
- Astro components render directly (no return)

## Module Design

**Exports:**
- Named exports for utilities
- Astro components don't use exports (file = component)
- Content Collections exported via `collections` object

**Barrel Files:**
- No index.ts re-exports
- Direct imports from files

---

*Convention analysis: 2026-01-12*
*Update when patterns change*
