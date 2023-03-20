import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import astroI18next from 'astro-i18next';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		mdx(),
		astroI18next(),
		sitemap(),
		partytown(),
	],
	site: 'https://muetab.com',
});
