import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
  }),
});

const contactCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    company: z.string(),
  }),
})

export const collections = {
  faq: faqCollection,
  contact: contactCollection
};

export type FAQ = typeof faqCollection
export type Contact = typeof contactCollection
