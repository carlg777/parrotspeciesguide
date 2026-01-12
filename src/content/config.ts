import { defineCollection, z } from 'astro:content';

const speciesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.string(),
    species: z.string(),
    slug: z.string(),
    image: z.string(),
    description: z.string(),
    size: z.string(),
    weight_grams: z.number(),
    temperament: z.string(),
    loudness: z.string(),
    loudness_icon: z.string(),
    vocalization: z.string(),
    dietaryNeeds: z.string(),
    healthPointers: z.string(),
    housing: z.string(),
    origin: z.string(),
  }),
});

export const collections = {
  species: speciesCollection,
};
