// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Canonical URL, used for sitemap/RSS/canonical links in later phases.
	site: 'https://affanali.dev',
	integrations: [sitemap()],
	markdown: {
		shikiConfig: { theme: 'github-dark-dimmed' },
	},
});
