import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import UnoCSS from 'unocss/astro';
import mdx from '@astrojs/mdx';
import astroI18next from 'astro-i18next';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { remarkReadingTime } from './plugins.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({ config: { applyBaseStyles: false } }), // https://docs.astro.build/en/guides/integrations-guide/tailwind/#configapplybasestyles
		// UnoCSS({ injectReset: true }),
		mdx(),
		astroI18next(),
		svelte(),
		sitemap(),
		partytown(),
	],
	markdown: { remarkPlugins: [remarkReadingTime] },
	// site: 'https://muetab.com',
	site: 'http://localhost:3000',
	ssr: { noExternal: ['svelte-transition'] },
	trailingSlash: 'always',
});
