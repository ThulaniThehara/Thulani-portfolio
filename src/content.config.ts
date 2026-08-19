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

export const collections = { projects };
