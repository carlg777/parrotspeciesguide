# Parrot Species Guide

## What This Is

A comprehensive online resource for parrot care, starting with the best species profiles on the web. Covers 84+ parrot species with detailed care information, temperament profiles, housing needs, and health guidance. The foundation for building a complete parrot care ecosystem including guides, articles, and eventually community features.

## Core Value

Best species profiles on the web - information so good that parrot owners and prospective owners bookmark and return to them as their primary reference.

## Requirements

### Validated

- ✓ 84 species profiles with structured data - existing
- ✓ Bilingual support (English/Spanish) - existing
- ✓ Searchable/filterable species listing - existing
- ✓ Individual species detail pages - existing
- ✓ Content Collections for type-safe data - existing
- ✓ SSR with Astro for performance - existing

### Active

- [ ] Enhanced species profiles with richer care information
- [ ] Care guides section (feeding, housing, health, training)
- [ ] Resource library (articles, FAQs, getting started guides)
- [ ] SEO optimization (structured data, rich snippets, meta tags)
- [ ] Species comparison tool
- [ ] Print-friendly care sheets
- [ ] Newsletter signup for parrot care tips
- [ ] Marketplace integration (link to Bird Finder for adoption/purchase)
- [ ] Community features (forums, Q&A, user tips)
- [ ] Mobile app

### Out of Scope

- User accounts initially - Will add when community features are ready
- Direct bird sales/transactions - Link to Bird Finder marketplace instead
- Veterinary advice - Provide educational content, not medical diagnosis

## Context

**Origin:** Extracted from Find Your Parrot marketplace to create a dedicated information resource. The marketplace will focus on transactions while this site focuses on education and care.

**Current State:** Functional standalone site with 84 species profiles, bilingual support, and clean extraction. Already mapped codebase with comprehensive documentation in `.planning/codebase/`.

**Target Audience:**
- Prospective parrot owners researching which species fits their lifestyle
- Current parrot owners seeking care guidance
- Avian enthusiasts wanting comprehensive species information

**SEO Opportunity:** Parrot care is a high-search, underserved niche. Quality content can capture significant organic traffic.

## Constraints

- **SEO is critical**: Must rank well for parrot care searches - informs content structure, technical SEO, and site architecture decisions
- **Content preservation**: 84 existing species profiles are the foundation - all enhancements build on this base
- **Bilingual support**: Maintain English/Spanish throughout as site grows

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Standalone site vs integrated marketplace | Separation of concerns - education vs transactions | — Pending |
| Species profiles as core value | Strong existing content, differentiator in market | — Pending |
| Static content + SSR (Astro) | Performance and SEO benefits, no backend complexity | — Pending |
| Domain: parrotspeciesguide.com | Clear branding, SEO-friendly domain | — Pending |

---
*Last updated: 2026-01-12 after initialization*
