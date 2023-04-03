import type { CollectionEntry } from "astro:content";
import type { APIContext } from 'astro';
import { getCollection } from "astro:content";

type Modify<T, R> = Omit<T, keyof R> & R;
type BlogPost = Modify<CollectionEntry<"blog">, {
	slug: string;
}>

export async function getStaticPaths() {
	const parts = import.meta.url.split("/");
	let locale = parts[parts.length - 3];
	locale = locale === "pages" ? "en" : locale;
	const posts: BlogPost[] = await getCollection("blog");
	return posts
		.filter((post) => post.slug.split("/").shift() === locale)
		.map((post) => {
			post.slug = post.slug.split("/").slice(1).join("/");
			return {
				params: { post: post.slug },
				props: { post },
			};
		});
}

export async function get(ctx: APIContext) {
	const post: BlogPost = ctx.props.post;
	return {
		body: JSON.stringify(post),
	};
}
