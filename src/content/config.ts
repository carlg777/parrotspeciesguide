import { defineCollection, z } from 'astro:content';

/**
 * Species Collection Schema
 *
 * Defines the data structure for all parrot species profiles in the guide.
 *
 * CORE FIELDS (Required):
 * - category: Species category (e.g., "Macaw", "Amazon", "Cockatoo")
 * - species: Full common name (e.g., "Blue and Gold Macaw")
 * - slug: URL-friendly identifier (e.g., "blue-and-gold-macaw")
 * - image: Path to species image (e.g., "/assets/img/species/macaw-blue-gold.jpg")
 * - description: Brief overview of the species (1-2 paragraphs)
 * - size: Physical size description (e.g., "Large - 33 inches")
 * - weight_grams: Typical weight in grams (e.g., 900)
 * - temperament: Personality traits (e.g., "Friendly, intelligent, social")
 * - loudness: Noise level description (e.g., "Very Loud")
 * - loudness_icon: Icon representation (e.g., "🔊🔊🔊")
 * - vocalization: Vocal abilities (e.g., "Excellent talker, mimics sounds")
 * - dietaryNeeds: Feeding requirements (paragraph format)
 * - healthPointers: Common health concerns (paragraph format)
 * - housing: Cage and environment requirements (paragraph format)
 * - origin: Geographic origin (e.g., "South America")
 *
 * ENHANCED FIELDS (Optional - Phase 1):
 * These fields support richer care information and are optional during migration.
 *
 * - lifespan: Expected lifespan
 *   Format: "X-Y years" (e.g., "15-25 years", "30-40 years", "50+ years")
 *
 * - careLevel: Care difficulty for prospective owners
 *   Values: "beginner" (low maintenance, forgiving), "intermediate" (moderate experience needed),
 *           "advanced" (expert care, demanding requirements)
 *
 * - activityLevel: Energy level and activity patterns
 *   Format: Description of daily activity needs (e.g., "High energy, requires 3-4 hours daily out-of-cage time")
 *
 * - socialNeeds: Socialization and interaction requirements
 *   Format: Description of social behavior and owner interaction needs
 *
 * - noiseTolerance: Realistic noise expectations for owners
 *   Format: Guidance on noise patterns, frequency, and managing expectations
 *
 * - spaceRequirements: Detailed space needs beyond basic housing
 *   Format: Room size, flight space, play area recommendations
 *
 * - timeCommitment: Daily time investment needed
 *   Format: Hours per day for care, interaction, training, cleaning
 *
 * MIGRATION NOTE: All enhanced fields are optional to maintain backward compatibility
 * with existing species data. Content editors can populate these fields gradually.
 */
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

/**
 * Guides Collection Schema
 *
 * Defines the structure for standalone care guide pages that provide comprehensive
 * educational resources on parrot care topics.
 *
 * REQUIRED FIELDS:
 * - slug: URL-friendly identifier (e.g., "feeding-basics", "cage-setup")
 * - title: Bilingual guide titles
 *   Format: { en: string, es: string }
 * - description: SEO-optimized descriptions for search engines
 *   Format: { en: string, es: string }
 * - category: Organization category for guides
 *   Values: "feeding" (nutrition and diet), "housing" (cages and environment),
 *           "health" (medical care and wellness), "training" (behavior and socialization)
 * - order: Display order in navigation (numeric sorting)
 *   Format: number (e.g., 1, 2, 3)
 *
 * OPTIONAL FIELDS:
 * - icon: SVG icon identifier for navigation display
 *   Format: string (e.g., "utensils", "home", "heart-pulse", "graduation-cap")
 *
 * CONTENT:
 * - Markdown body content handled by Astro's content collections
 * - Supports all standard markdown features (headings, lists, emphasis, links)
 * - Images can be referenced via relative or absolute paths
 *
 * BILINGUAL SUPPORT:
 * - Title and description objects support English (en) and Spanish (es)
 * - Content markdown can include language-specific sections if needed
 * - Follow existing i18n patterns from species collection
 */
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // URL identifier
    slug: z.string(),

    // Bilingual titles for guide pages
    title: z.object({
      en: z.string(),
      es: z.string(),
    }),

    // SEO descriptions for search engines
    description: z.object({
      en: z.string(),
      es: z.string(),
    }),

    // Category for organization and navigation
    category: z.enum(['feeding', 'housing', 'health', 'training']),

    // Optional icon identifier for UI display
    icon: z.string().optional(),

    // Display order in navigation (lower numbers appear first)
    order: z.number(),
  }),
});

export const collections = {
  species: speciesCollection,
  guides: guidesCollection,
};

/*
 * VALIDATION EXAMPLES
 *
 * Example 1: Minimal valid species (existing format, all required fields)
 * {
 *   "category": "Parakeet",
 *   "species": "Budgerigar",
 *   "slug": "budgerigar",
 *   "image": "/assets/img/species/budgerigar.jpg",
 *   "description": "Popular small parrot, excellent for beginners...",
 *   "size": "Small - 7 inches",
 *   "weight_grams": 30,
 *   "temperament": "Friendly, playful, social",
 *   "loudness": "Moderate",
 *   "loudness_icon": "🔊🔊",
 *   "vocalization": "Can learn words and phrases",
 *   "dietaryNeeds": "Seed mix, pellets, fresh vegetables...",
 *   "healthPointers": "Watch for respiratory issues...",
 *   "housing": "Minimum 18x18x18 inches cage...",
 *   "origin": "Australia"
 * }
 *
 * Example 2: Enhanced species (with optional Phase 1 fields)
 * {
 *   "category": "Macaw",
 *   "species": "Blue and Gold Macaw",
 *   "slug": "blue-and-gold-macaw",
 *   "image": "/assets/img/species/macaw-blue-gold.jpg",
 *   "description": "Stunning large parrot known for intelligence...",
 *   "size": "Large - 33 inches",
 *   "weight_grams": 900,
 *   "temperament": "Intelligent, social, affectionate",
 *   "loudness": "Very Loud",
 *   "loudness_icon": "🔊🔊🔊",
 *   "vocalization": "Excellent talker, mimics sounds",
 *   "dietaryNeeds": "Varied diet with nuts, fruits, vegetables...",
 *   "healthPointers": "Prone to feather plucking if bored...",
 *   "housing": "Large aviary or room-sized cage...",
 *   "origin": "South America",
 *   "lifespan": "30-40 years",
 *   "careLevel": "advanced",
 *   "activityLevel": "Very high energy, requires 4-6 hours daily out-of-cage time and mental stimulation",
 *   "socialNeeds": "Highly social, bonds strongly with family, requires daily interaction",
 *   "noiseTolerance": "Extremely loud vocalizations morning and evening, not suitable for apartments",
 *   "spaceRequirements": "Minimum 200 sq ft play area, large outdoor aviary ideal",
 *   "timeCommitment": "3-5 hours daily for interaction, training, and enrichment activities"
 * }
 *
 * Example 3: Field format expectations
 * - lifespan: Always include "years" unit (e.g., "15-25 years", "50+ years")
 * - careLevel: Exactly "beginner", "intermediate", or "advanced" (lowercase)
 * - All string fields: Use complete sentences, avoid truncation
 * - Numeric ranges: Use hyphen format (e.g., "30-40 years", "3-5 hours")
 */
