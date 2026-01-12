# Technology Stack

**Analysis Date:** 2026-01-12

## Languages

**Primary:**
- TypeScript 5.6 - All application code

**Secondary:**
- JavaScript - Configuration files (astro.config.mjs)

## Runtime

**Environment:**
- Node.js (inferred from package type: "module")
- Browser runtime for client-side hydration

**Package Manager:**
- npm - Package manager
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro 5.14.8 - SSR web framework with Node adapter (`astro.config.mjs`)
- Mode: Server-side rendering for dynamic routes

**Testing:**
- None - No test framework configured yet

**Build/Dev:**
- TypeScript 5.6 - Type checking and compilation
- Astro built-in bundler (Vite under the hood)

## Key Dependencies

**Critical:**
- @astrojs/node 9.5.0 - Node.js adapter for SSR deployment (`astro.config.mjs`)
- astro 5.14.8 - Core framework for pages and content collections

**Infrastructure:**
- Astro Content Collections - Type-safe content management for 84 species JSON files

## Configuration

**Environment:**
- No environment variables required (standalone species site)
- Configuration via `astro.config.mjs`

**Build:**
- `astro.config.mjs` - Astro configuration with i18n support (en/es)
- `tsconfig.json` - Extends Astro strict TypeScript config
- `src/content/config.ts` - Content collection schema (species)

## Platform Requirements

**Development:**
- Any platform with Node.js (macOS/Linux/Windows)
- No external dependencies or services required

**Production:**
- Server-side rendering requires Node.js runtime
- Configured for standalone mode (`adapter: node({ mode: "standalone" })`)
- Port: 4322 (configurable via environment)
- Static assets served from public/ directory

---

*Stack analysis: 2026-01-12*
*Update after major dependency changes*
