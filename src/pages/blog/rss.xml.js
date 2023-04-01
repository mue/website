import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function get(context) {
	const collection = await getCollection('changelog');
	return rss({
		// TODO: https://docs.astro.build/en/guides/rss/
	});
}
