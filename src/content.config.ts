import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    shortDescription: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    year: z.union([z.number(), z.string()]).default(2024),
    category: z.string(),
    projectType: z.string().optional(),
    icon: z.string().optional(),
    frontendTech: z.array(z.string()).default([]),
    backendTech: z.array(z.string()).default([]),
    databaseTech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    duration: z.string().optional(),
    team: z.string().optional(),
    thumbnail: z.string().optional(),
    heroImage: z.string().optional(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    status: z.enum(['Completed', 'In Progress', 'Production', 'Prototype', 'Archived']).default('Completed'),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    externalUrl: z.string().url(),
    // Reading time as shown on the external blog. Falls back to a body word-count
    // estimate when omitted — but the body here is only a summary, so prefer setting it.
    readingTime: z.number().int().positive().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    author: z.string().default('Thulani'),
    status: z.enum(['Published', 'Draft']).default('Published'),
  }),
});

export const collections = { projects, articles };
