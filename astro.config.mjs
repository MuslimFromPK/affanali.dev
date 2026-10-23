// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Canonical URL, used for sitemap/RSS/canonical links in later phases.
	site: 'https://affanali.dev',
	markdown: {
		shikiConfig: { theme: 'github-dark-dimmed' },
	},
});
