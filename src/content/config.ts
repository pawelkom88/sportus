import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  faq: faqCollection,
};

export type FAQ = typeof faqCollection
