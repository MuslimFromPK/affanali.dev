import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
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

// The CMS may save a cleared optional field as '' — treat that as unset.
const optionalUrl = z.preprocess((v) => (v === '' ? undefined : v), z.url().optional());

// Blog posts: one folder per post (index.md + its images).
const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			cover: image().optional(),
			coverAlt: z.string().default(''),
			coverCaption: z.string().optional(),
			coverCaptionUrl: optionalUrl,
			// Set for posts republished from elsewhere (e.g. Medium).
			originalUrl: optionalUrl,
			draft: z.boolean().default(false),
			// Unlisted review link: /preview/<token>/ . Obscurity only, not auth.
			previewToken: z.string().optional(),
		}),
});

// CVEs / advisories, listed on /research. Values must match the official CVE record.
const research = defineCollection({
	loader: file('src/data/research.json', { parser: (text) => JSON.parse(text).entries }),
	schema: z.object({
		id: z.string().regex(/^CVE-\d{4}-\d{4,}$/),
		title: z.string(),
		product: z.string(),
		productUrl: optionalUrl,
		platform: z.string(),
		affected: z.string(),
		fixedIn: z.string().optional(),
		weakness: z.string(),
		cvss: z.number().min(0).max(10),
		severity: z.enum(['None', 'Low', 'Medium', 'High', 'Critical']),
		vector: z.string().optional(),
		published: z.coerce.date(),
		reach: z.string().optional(),
		creditedVia: z.string(),
		advisoryUrl: z.url(),
	}),
});

export const collections = { pages, blog, research };
