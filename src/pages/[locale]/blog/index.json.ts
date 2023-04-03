import type { CollectionEntry } from "astro:content";
import type { APIContext } from 'astro';
import { getCollection } from "astro:content";
import getLocale from "@lib/getLocale";

type Modify<T, R> = Omit<T, keyof R> & R;
type BlogPost = Modify<CollectionEntry<"blog">, {
	slug: string;
}>

export async function getStaticPaths() {
	const posts: BlogPost[] = await getCollection("blog");
	const locales = new Set(posts.map((post) => post.slug.split("/").shift()));
	return [...locales].map((locale) => ({ params: { locale } }));
}

export async function get(ctx: APIContext) {
	let posts: BlogPost[] = await getCollection("blog");
	posts = posts
		.filter((post) => post.slug.split("/").shift() === ctx.params.locale)
		.map((post) => {
			post.slug = post.slug.split("/").slice(1).join("/");
			return post;
		});
	return {
		body: JSON.stringify(posts),
	};
}
