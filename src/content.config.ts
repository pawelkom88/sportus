import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/contact" }),
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
