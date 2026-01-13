# Technology Stack

**Analysis Date:** 2026-01-13

## Languages

**Primary:**
- TypeScript 5.6.0 - All application code (`package.json`, `tsconfig.json`)
- Astro Component Language - `.astro` files throughout `src/pages/`, `src/layouts/`, `src/components/`
- JSON - 84 species data files in `src/content/species/`

**Secondary:**
- JavaScript (ESM) - Build scripts, config files (`package.json` type: "module")
- CSS - Custom styles in `public/assets/css/styles.css`

## Runtime

**Environment:**
- Node.js 18+ - Required by Astro 5.14.8
- Browser (Client-side) - Web-based SSR + static generation

**Package Manager:**
- npm - Package manifest `package.json`
- Lockfile: `package-lock.json` (v3, 6,391 lines)

## Frameworks

**Core:**
- Astro 5.14.8 - `package.json`, `astro.config.mjs` - Static site generator with SSR capability
- @astrojs/node 9.5.0 - `package.json`, `astro.config.mjs` - Node.js adapter for SSR (standalone mode)

**Build/Dev:**
- @astrojs/check 0.9.6 - `package.json` - TypeScript-aware linter
- Sharp 0.34.5 - `package.json` - Image optimization (WebP conversion)
- TypeScript 5.6.0 - `tsconfig.json` - Strict mode enabled

## Key Dependencies

**Critical:**
- astro ^5.14.8 - Core framework for site generation
- @astrojs/node ^9.5.0 - SSR adapter for standalone Node.js server
- sharp ^0.34.5 - Image optimization pipeline

**Infrastructure:**
- Zod (via Astro) - Schema validation for content collections in `src/content/config.ts`
- Astro Content Collections API - Type-safe data layer for 84 species JSON files

## Configuration

**Environment:**
- No environment variables required
- Site URL configured in `astro.config.mjs`: `https://www.parrotspeciesguide.com`
- Dev server: `127.0.0.1:4322` (non-standard port)

**Build:**
- `astro.config.mjs` - Site configuration, SSR adapter, i18n settings
- `tsconfig.json` - TypeScript strict mode, React JSX support (for future integration)
- `package.json` - npm scripts (dev, build, preview, astro)

**Build Scripts:**
```bash
npm run dev          # Development server on :4322
npm run build        # astro check && astro build
npm run preview      # Preview production build
```

**Content Management:**
- Astro Content Collections - Type-safe JSON data layer
- Schema validation via Zod in `src/content/config.ts`
- 84 JSON species profiles in `src/content/species/`

**Internationalization:**
- Manual i18n implementation via `src/i18n/utils.ts`
- Astro i18n config in `astro.config.mjs` (en/es locales)
- Translation files: `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
- Bilingual support: English (default), Spanish (/es prefix)

## Platform Requirements

**Development:**
- Node.js 18+ (required by Astro 5.14.8)
- Any platform with Node.js support (macOS/Linux/Windows)
- No external dependencies beyond npm packages

**Production:**
- Node.js standalone server (via @astrojs/node adapter)
- SSR mode enabled (`output: "server"` in config)
- Can also be deployed as static site (prerender: true on most pages)

---

*Stack analysis: 2026-01-13*
*Update after major dependency changes*
