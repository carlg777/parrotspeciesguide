# Task Plan: Content Enhancement & Translation

## Goal
Enhance all 84 parrot species profiles with `careLevel` and `lifespan` metadata, and provide high-quality Spanish translations for the remaining 83 species (Blue and Gold Macaw is already complete).

## Phases

### Phase 1: Planning and Research
- **Goal**: Establish a clear inventory and baseline for all profiles.
- **Status**: in_progress

### Phase 2: Metadata Enhancement (`careLevel`, `lifespan`)
- **Goal**: Populate the `careLevel` and `lifespan` fields for all species.
- **Approach**: Categorize species by type (Macaw, Cockatoo, etc.) to apply common standards, then refine for specific birds.

### Phase 3: Translation Pass
- **Goal**: Translate all species-specific fields from English to Spanish.
- **Approach**: Process in batches. Fields to translate: `species`, `description`, `size`, `temperament`, `loudness`, `vocalization`, `dietaryNeeds`, `healthPointers`, `housing`, `origin`, `lifespan`, `activityLevel`, `socialNeeds`, `noiseTolerance`, `spaceRequirements`, `timeCommitment`.

### Phase 4: Verification
- **Goal**: Ensure the site builds correctly and the localized content displays properly.

## Decisions
- **Metadata first**: Adding `careLevel` and `lifespan` first makes sense so the translations can include these fields in one pass.
- **Batching**: I will process JSON files in batches of 10 to manage the translation load and ensure quality.
