import i18n from "sveltekit-i18n";
import type { Config } from "sveltekit-i18n";

export const supportedLocales = new Set<string>();

const files = import.meta.glob("./**/*.json") as Record<string, () => Promise<{ default: unknown }>>;
const routes: Record<string, undefined | Array<string | RegExp>> = {
	common: undefined,
	home: [/[a-zA-Z-]\//],
	support: [/[a-zA-Z-]\/support\//],
	kb_category: [/^\/support\/kb\/./],
};
const loaders = [];

for (const file in files) {
	const [, locale, namespace] = file.slice(0, -5).split("/");
	supportedLocales.add(locale);
	loaders.push({
		locale: locale,
		key: namespace,
		routes: routes[namespace],
		loader: async () => (await files[file]()).default,
	});
}


const config: Config = ({
	cache: Number.POSITIVE_INFINITY,
	// fallbackLocale: "en", // add missing translations with Weblate instead
	loaders
});


export const { t, locale, locales, loading, loadTranslations } = new i18n(config);