import type { CollectionEntry } from "astro:content";
import type { APIContext } from 'astro';
import { getCollection } from "astro:content";

type Modify<T, R> = Omit<T, keyof R> & R;
type Changelog = Modify<CollectionEntry<"changelog">, {
	slug: string;
}>

export async function getStaticPaths() {
	const versions: Changelog[] = await getCollection("changelog");
	const locales = new Set(versions.map((version) => version.slug.split("/").shift()));
	return [...locales].map((locale) => {
		return versions
			.filter((version) => version.slug.split("/").shift() === locale)
			.map((version) => {
				version.slug = version.slug.split("/").slice(1).join("/");
				return {
					params: { locale, version: version.slug },
					props: { version },
				};
			});
	});
}

export async function get(ctx: APIContext) {
	const version: Changelog = ctx.props.version;
	return {
		body: JSON.stringify(version),
	};
}
