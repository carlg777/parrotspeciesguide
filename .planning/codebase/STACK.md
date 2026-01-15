# Technology Stack

**Analysis Date:** 2026-01-15

## Languages

**Primary:**
- TypeScript 5.6.0 - All application code (`package.json`, `tsconfig.json`)

**Secondary:**
- JavaScript (ES modules) - Build scripts and configuration (`astro.config.mjs`)
- Astro components - Template files (`.astro` files throughout `src/`)

## Runtime

**Environment:**
- Node.js 20 - Build and development runtime (`.github/workflows/deploy-siteground.yml`)
- Static HTML output - No server runtime required (pre-rendered at build time)

**Package Manager:**
- npm - Package management
- Lockfile: `package-lock.json` (lockfileVersion 3)

## Frameworks

**Core:**
- Astro 5.14.8 - Static site generator framework (`package.json`, `astro.config.mjs`)
- @astrojs/node 9.5.0 - Node.js adapter for static output (`package.json`)

**Testing:**
- None - No testing framework currently installed

**Build/Dev:**
- Vite (bundled with Astro) - Bundling and dev server (`astro.config.mjs`)
- TypeScript 5.6.0 - Type checking and compilation (`package.json`)
- @astrojs/check 0.9.6 - Astro-specific type checking (dev dependency)

## Key Dependencies

**Critical:**
- astro 5.14.8 - Core framework for static site generation
- Zod (via Astro) - Content collection schema validation (`src/content/config.ts`)

**Infrastructure:**
- Sharp 0.34.5 - Image optimization during build (dev dependency)
- No external runtime dependencies (pure static site)

## Configuration

**Environment:**
- No environment variables required for production build
- Static configuration in `astro.config.mjs`
- Deployment secrets managed via GitHub Actions

**Build:**
- `astro.config.mjs` - Site configuration, i18n setup, static output
- `tsconfig.json` - TypeScript strict mode with Astro presets
- `package.json` - Build scripts: `astro check && astro build`

## Platform Requirements

**Development:**
- Any platform with Node.js 20+
- No external services required for local development
- npm for dependency management

**Production:**
- Static HTML output deployed to any web server
- Currently: SiteGround hosting via rsync SSH deployment
- CI/CD: GitHub Actions for automated builds and deployment
- No server-side runtime required (fully static)

---

*Stack analysis: 2026-01-15*
*Update after major dependency changes*
