import { defineCollection, z } from 'astro:content';

const speciesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Core identification fields
    category: z.string(),
    species: z.string(),
    slug: z.string(),
    image: z.string(),
    description: z.string(),

    // Physical characteristics
    size: z.string(),
    weight_grams: z.number(),

    // Behavior and personality
    temperament: z.string(),
    loudness: z.string(),
    loudness_icon: z.string(),
    vocalization: z.string(),

    // Care requirements (existing)
    dietaryNeeds: z.string(),
    healthPointers: z.string(),
    housing: z.string(),

    // Origin
    origin: z.string(),

    // Enhanced care fields (Phase 1 - optional for gradual migration)

    // Expected lifespan in years (e.g., "15-25 years", "30-40 years")
    lifespan: z.string().optional(),

    // Care difficulty level for prospective owners
    careLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),

    // Energy level and activity patterns (e.g., "High energy, requires 3-4 hours daily activity")
    activityLevel: z.string().optional(),

    // Socialization requirements and interaction needs
    socialNeeds: z.string().optional(),

    // Noise expectations and guidance for owners
    noiseTolerance: z.string().optional(),

    // Detailed space requirements beyond basic housing
    spaceRequirements: z.string().optional(),

    // Daily time investment needed for care and interaction
    timeCommitment: z.string().optional(),
  }),
});

export const collections = {
  species: speciesCollection,
};
