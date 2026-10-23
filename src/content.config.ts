import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Editable page content (also edited through the CMS at /admin).
const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		knownAs: z.string(),
		servicesHeading: z.string(),
		services: z.array(z.object({ title: z.string(), text: z.string() })),
	}),
});

export const collections = { pages };
