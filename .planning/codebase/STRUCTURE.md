# Codebase Structure

**Analysis Date:** 2026-01-13

## Directory Layout

```
Parrot Species Guide/
├── .planning/          # Project management documents
├── public/             # Static assets (images, CSS, robots.txt)
│   └── assets/         # Images and stylesheets
├── src/                # Source code
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content Collections (species data)
│   ├── i18n/           # Internationalization
│   ├── layouts/        # Page layout templates
│   ├── lib/            # Utility functions
│   └── pages/          # Route handlers (file-based routing)
├── astro.config.mjs    # Astro framework configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Directory Purposes

**public/**
- Purpose: Static assets served directly without processing
- Contains: Images (webp format), CSS stylesheets, robots.txt, favicon
- Key files: `public/assets/css/styles.css`, `public/robots.txt`
- Subdirectories: `assets/img/parrots/` (84 species images), `assets/css/`

**src/components/**
- Purpose: Reusable Astro UI components
- Contains: Header and Footer components
- Key files: `Header.astro` (navigation with language switcher), `Footer.astro` (site footer)
- Subdirectories: None (flat structure)

**src/content/**
- Purpose: Astro Content Collections for type-safe structured data
- Contains: Species profiles as JSON files, collection schema definition
- Key files: `config.ts` (Zod schema), `species/*.json` (84 species profiles)
- Subdirectories: `species/` (JSON data files, one per species)

**src/i18n/**
- Purpose: Internationalization utilities and translations
- Contains: Language detection functions, translation lookup utilities, locale JSON files
- Key files: `utils.ts` (i18n helper functions), `locales/en.json`, `locales/es.json`
- Subdirectories: `locales/` (translation strings for English and Spanish)

**src/layouts/**
- Purpose: Page layout templates that wrap content
- Contains: Base layout with SEO, meta tags, header/footer
- Key files: `BaseLayout.astro` (master wrapper for all pages)
- Subdirectories: None

**src/lib/**
- Purpose: Utility functions and helpers
- Contains: URL transformation utilities for structured data
- Key files: `urlUtils.ts` (toAbsoluteUrl function)
- Subdirectories: None

**src/pages/**
- Purpose: File-based routing (each .astro file = route)
- Contains: Page templates for home, species list, species detail, sitemap
- Key files: `index.astro` (home), `species/index.astro` (list), `species/[slug].astro` (detail)
- Subdirectories: `es/` (Spanish routes), `species/` (species routes), `es/species/` (Spanish species routes)

**.planning/**
- Purpose: Project management and GSD workflow documents
- Contains: PROJECT.md, ROADMAP.md, STATE.md, codebase documentation
- Key files: `PROJECT.md` (project overview), `ROADMAP.md` (7 phases), `STATE.md` (current progress)
- Subdirectories: `codebase/` (architecture documentation)

## Key File Locations

**Entry Points:**
- `src/pages/index.astro` - English home page
- `src/pages/es/index.astro` - Spanish home page
- `src/pages/species/index.astro` - English species list (prerendered)
- `src/pages/species/[slug].astro` - English species detail page (dynamic route, prerendered)
- `src/pages/es/species/index.astro` - Spanish species list
- `src/pages/es/species/[slug].astro` - Spanish species detail page

**Configuration:**
- `astro.config.mjs` - Astro framework config (SSR, i18n, Node.js adapter)
- `tsconfig.json` - TypeScript strict mode configuration
- `package.json` - Dependencies, scripts (dev, build, preview)
- `public/robots.txt` - SEO crawler instructions

**Core Logic:**
- `src/content/config.ts` - Content Collections schema (Zod validation)
- `src/i18n/utils.ts` - Language detection and translation lookup
- `src/lib/urlUtils.ts` - URL transformation for structured data
- `src/layouts/BaseLayout.astro` - SEO meta tags, hreflang, canonical URLs

**Data:**
- `src/content/species/*.json` - 84 species profiles with structured data

**Styling:**
- `public/assets/css/styles.css` - Global CSS with custom properties

**SEO:**
- `src/pages/sitemap.xml.ts` - Dynamic XML sitemap generation

## Naming Conventions

**Files:**
- `PascalCase.astro` - Astro components and layouts (`BaseLayout.astro`, `Header.astro`)
- `kebab-case.astro` - Page files and routes (`index.astro`, `[slug].astro`)
- `camelCase.ts` - TypeScript utility modules (`urlUtils.ts`)
- `kebab-case.json` - Data files (`blue-and-gold-macaw.json`, `green-cheeked-conure.json`)
- `.md` - Documentation files in `.planning/` (`PROJECT.md`, `ROADMAP.md`)

**Directories:**
- `lowercase` - All directories (`components/`, `layouts/`, `pages/`)
- `locale-prefix` - Language-specific routes (`es/` for Spanish)
- `plural-names` - Collection directories (`locales/`, `species/`)

**Special Patterns:**
- `[slug].astro` - Dynamic route parameter (generates static pages via `getStaticPaths()`)
- `*.xml.ts` - Programmatic endpoint (sitemap generation)
- `config.ts` - Configuration/schema files
- `index.astro` - Default route for directory (e.g., `/species/` → `species/index.astro`)

## Where to Add New Code

**New Species Profile:**
- Primary data: `src/content/species/{species-slug}.json` (follow schema in `src/content/config.ts`)
- Image: `public/assets/img/parrots/{species-slug}.webp`
- Validation: Schema in `src/content/config.ts` (Zod)

**New Page Route:**
- English: `src/pages/{route-name}.astro` or `src/pages/{route-name}/index.astro`
- Spanish: `src/pages/es/{route-name}.astro` or `src/pages/es/{route-name}/index.astro`
- Layout: Wrap with `<BaseLayout>` from `src/layouts/BaseLayout.astro`
- Translations: Add keys to `src/i18n/locales/en.json` and `src/i18n/locales/es.json`

**New Component:**
- Implementation: `src/components/{ComponentName}.astro`
- Usage: Import in pages/layouts with `import ComponentName from '../../components/ComponentName.astro'`

**New Utility Function:**
- Shared helpers: `src/lib/{purposeUtils}.ts`
- Type definitions: `src/lib/{types}.ts` or inline in file
- i18n utilities: `src/i18n/utils.ts` (extend existing file)

**New Translation Strings:**
- English: `src/i18n/locales/en.json` (hierarchical keys, e.g., `"nav.species"`)
- Spanish: `src/i18n/locales/es.json` (matching keys)
- Usage: `const t = useTranslations(currentLang)` then `t('key.path')`

**New Static Asset:**
- Images: `public/assets/img/` (use webp format for performance)
- CSS: `public/assets/css/` (or add to `styles.css`)
- Reference in code: `/assets/img/filename.webp` (absolute path from public root)

## Special Directories

**src/content/species/**
- Purpose: Astro Content Collection - validated species data
- Source: Manually created JSON files
- Committed: Yes
- Schema: Validated by Zod schema in `src/content/config.ts`
- Access: Only via `getCollection('species')` API

**src/pages/**
- Purpose: File-based routing - each .astro file becomes a route
- Source: Manually created page templates
- Committed: Yes
- Special: `[slug]` files generate multiple routes via `getStaticPaths()`

**public/**
- Purpose: Static assets served directly without processing
- Source: Images, CSS, robots.txt
- Committed: Yes
- Build: Copied as-is to output directory

**.planning/**
- Purpose: GSD (Get Shit Done) project management workflow
- Source: Created by `/gsd:*` slash commands
- Committed: Yes
- Usage: Reference for Claude Code during planning and execution

**node_modules/**
- Purpose: Installed npm dependencies
- Source: Auto-generated by `npm install`
- Committed: No (in `.gitignore`)

**dist/**
- Purpose: Build output from `astro build`
- Source: Generated by Astro compiler
- Committed: No (in `.gitignore`)

---

*Structure analysis: 2026-01-13*
*Update when directory structure changes*
