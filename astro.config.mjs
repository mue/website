import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import astroI18next from 'astro-i18next';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({ config: { applyBaseStyles: false } }), // https://docs.astro.build/en/guides/integrations-guide/tailwind/#configapplybasestyles
		mdx(),
		astroI18next(),
		svelte(),
		sitemap(),
		partytown(),
	],
	site: 'https://muetab.com',
});
