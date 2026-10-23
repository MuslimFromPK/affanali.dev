import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/blog';
import site from '../data/site.json';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: `${site.name} (${site.handle}) — Blog`,
		description: 'Security write-ups: AI red teaming, bug bounty, and web/API security.',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			categories: post.data.tags,
		})),
	});
}
