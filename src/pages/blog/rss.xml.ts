import rss from '@astrojs/rss';
import type { CollectionEntry } from "astro:content";
import type { APIContext } from 'astro';
import { getCollection } from "astro:content";
import getLocale from "@lib/getLocale";
import { localizePath } from 'astro-i18next';

type Modify<T, R> = Omit<T, keyof R> & R;
type BlogPost = Modify<CollectionEntry<"blog">, {
	slug: string;
}>;

export async function get(ctx: APIContext) {
	const locale = getLocale(new URL(ctx.request.url).pathname);
	let posts: BlogPost[] = await getCollection("blog");
	posts = posts
		.filter((post) => post.slug.split("/").shift() === locale)
		.map((post) => {
			post.slug = post.slug.split("/").slice(1).join("/");
			return post;
		});
		console.log(posts)
	return rss({
		title: 'Mue Blog',
		description: '',
		site: ctx.site.toString(),
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.publishedAt,
			description: '',
			customData: '',
			link: localizePath(`/blog/${post.slug}`, locale),
		})),
	});
}
