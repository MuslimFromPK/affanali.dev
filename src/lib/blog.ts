import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Minutes to read at ~200 words per minute. */
export function readingTime(post: Post): number {
	const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** Tags in a URL-safe form, e.g. "Bug Bounty" -> "bug-bounty". */
export function tagSlug(tag: string): string {
	return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
