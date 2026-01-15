# Codebase Structure

**Analysis Date:** 2026-01-15

## Directory Layout

```
parrot-species-guide/
├── .github/              # CI/CD workflows
│   └── workflows/       # GitHub Actions deploy script
├── .planning/           # Project planning documents
├── dist/                # Build output (generated, not committed)
├── node_modules/        # Dependencies (generated, not committed)
├── public/              # Static assets
│   ├── assets/         # Images, CSS
│   └── robots.txt      # SEO directives
├── src/                 # Source code
│   ├── components/     # Reusable UI components
│   ├── content/        # Content collections
│   ├── i18n/           # Internationalization
│   ├── layouts/        # Page templates
│   ├── lib/            # Utility functions
│   └── pages/          # Routes (file-based)
├── astro.config.mjs    # Astro configuration
├── package.json        # Dependencies and scripts
├── package-lock.json   # Dependency lockfile
├── README.md           # Project documentation
└── tsconfig.json       # TypeScript configuration
```

## Directory Purposes

**src/pages/**
- Purpose: File-based routing (Astro convention)
- Contains: `.astro` page components, XML/API routes
- Key files: `index.astro`, `sitemap.xml.ts`, `species/index.astro`, `species/[slug].astro`
- Subdirectories: `es/` (Spanish locale), `species/` (species routes)

**src/content/**
- Purpose: Astro Content Collections (structured data)
- Contains: `config.ts` (Zod schemas), `species/` (84 JSON files)
- Key files: `config.ts` - Zod schema definitions for species
- Subdirectories: `species/` - One JSON file per parrot species

**src/layouts/**
- Purpose: Shared page templates
- Contains: `BaseLayout.astro` - Master layout with meta tags, header, footer
- Key files: `BaseLayout.astro`
- Subdirectories: None

**src/components/**
- Purpose: Reusable UI components
- Contains: `Header.astro`, `Footer.astro`
- Key files: Navigation and footer components
- Subdirectories: None

**src/lib/**
- Purpose: Utility functions and helpers
- Contains: `stringUtils.ts`, `urlUtils.ts`, `structuredData.ts`, `__examples__.ts`
- Key files: Pure functions for string manipulation, URL formatting, JSON-LD escaping
- Subdirectories: None

**src/i18n/**
- Purpose: Internationalization system
- Contains: `utils.ts`, `locales/` (translation JSON files)
- Key files: `utils.ts` - Language routing and translation helpers
- Subdirectories: `locales/` (en.json, es.json)

**public/**
- Purpose: Static assets served as-is
- Contains: Images, CSS, robots.txt
- Key files: `assets/css/styles.css`, `assets/img/parrots/*.webp`, `robots.txt`
- Subdirectories: `assets/img/brand/`, `assets/img/parrots/`, `assets/img/og/`, `assets/css/`

**.github/workflows/**
- Purpose: CI/CD automation
- Contains: `deploy-siteground.yml` - GitHub Actions deployment workflow
- Key files: Build and rsync deployment to SiteGround
- Subdirectories: None

**.planning/**
- Purpose: Project planning and documentation
- Contains: STATE.md, ROADMAP.md, phases/, codebase/
- Key files: Current project state and roadmap
- Subdirectories: `phases/`, `codebase/`

## Key File Locations

**Entry Points:**
- `src/pages/index.astro` - English home page
- `src/pages/es/index.astro` - Spanish home page
- `src/pages/species/index.astro` - Species list
- `src/pages/species/[slug].astro` - Species detail pages

**Configuration:**
- `astro.config.mjs` - Site config, i18n, static output settings
- `tsconfig.json` - TypeScript strict mode configuration
- `package.json` - Dependencies, build scripts
- `.github/workflows/deploy-siteground.yml` - CI/CD pipeline

**Core Logic:**
- `src/content/config.ts` - Species data schema (Zod validation)
- `src/lib/*.ts` - Utility functions
- `src/i18n/utils.ts` - Localization helpers

**Testing:**
- None - No test files present

**Documentation:**
- `README.md` - Setup and deployment instructions
- `src/lib/__examples__.ts` - Usage examples (marked for deletion)

## Naming Conventions

**Files:**
- kebab-case for utility modules: `stringUtils.ts`, `urlUtils.ts`, `structuredData.ts`
- PascalCase for components: `Header.astro`, `Footer.astro`, `BaseLayout.astro`
- kebab-case for content files: `blue-and-gold-macaw.json`, `african-grey-parrot.json`
- Dynamic routes: `[slug].astro` (Astro convention)

**Directories:**
- Lowercase: `src/`, `pages/`, `components/`, `layouts/`, `lib/`, `i18n/`, `content/`
- Language codes: `es/` for Spanish
- Plural for collections: `components/`, `layouts/`, `locales/`

**Special Patterns:**
- `index.astro` - Default route for directory
- `[param].astro` - Dynamic route parameter
- `*.xml.ts` - API routes returning XML
- `*.json` - Data files (content collections, translations)

## Where to Add New Code

**New Page:**
- Primary code: `src/pages/{name}.astro` or `src/pages/{name}/index.astro`
- Spanish version: `src/pages/es/{name}.astro`
- Tests: None (no testing framework)

**New Component:**
- Implementation: `src/components/{Name}.astro`
- Usage: Import into pages or layouts
- Tests: None

**New Utility Function:**
- Implementation: `src/lib/{purpose}Utils.ts`
- Pattern: Pure functions with JSDoc comments
- Tests: None

**New Content Type:**
- Schema: `src/content/config.ts` - Add new collection definition
- Data: `src/content/{collection}/` - JSON files
- Usage: `getCollection('{collection}')` in pages

**New Translation:**
- Keys: `src/i18n/locales/en.json` and `src/i18n/locales/es.json`
- Usage: Via `useTranslations(Astro)` in components

**New Language:**
- Routes: `src/pages/{lang}/` - Copy existing page structure
- Translations: `src/i18n/locales/{lang}.json`
- Config: Update `astro.config.mjs` i18n settings

## Special Directories

**dist/**
- Purpose: Build output directory
- Source: Generated by `astro build`
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: npm dependencies
- Source: Generated by `npm install`
- Committed: No (in .gitignore)

**.astro/**
- Purpose: Astro-generated type definitions
- Source: Generated during development
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-01-15*
*Update when directory structure changes*
