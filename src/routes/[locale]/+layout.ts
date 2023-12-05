import { loadTranslations } from "$lib/i18n";

// ! this means that the theme must be applied client-side
export const prerender = true;

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url }) => {
	const { pathname } = url;
	const locale = pathname.split("/")[1];

	await loadTranslations(locale, pathname); // keep this just before the `return`

	return {};
};