const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
		// require('@tailwindcss/line-clamp'),
		plugin(({ addVariant }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
		}),
		plugin(({
			addUtilities, matchUtilities, theme,
		}) => {
			addUtilities(
				{ '.mue-splash': { backgroundImage: 'radial-gradient(circle farthest-side at 50% 50%, var(--mue-splash-color), transparent)' } },
			);
			matchUtilities(
				{ 'mue-splash': value => ({ '--mue-splash-color': value }) },
				{ values: theme('colors') },
			);
		}),
		plugin(({
			matchUtilities, theme,
		}) => {
			matchUtilities(
				{ 'text-shadow': value => ({ textShadow: value }) },
				{ values: theme('textShadow') },
			);
		}),
	],
	theme: {
		extend: {
			colors: {
				'mue-almond': 'BlanchedAlmond',
				'mue-orange': '#ffb032',
				'mue-orange-dark': '#b94825',
				// 'mue-orange-light': 'rgba(255, 92, 39, 0.7)',
				'mue-orange-light': '#ff8c67',
				// 'mue-pale': '#FBBEBE',
				'mue-pink': '#dd3b67',
				'mue-pink-dark': '#b13854',
				// 'mue-pink-light': 'rgba(255, 70, 110, 0.67)',
				'mue-pink-light': '#ff829d',
			},
			fontFamily: { 'sans': ['Lexend Deca', ...defaultTheme.fontFamily.sans] },
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				// eslint-disable-next-line sort-keys
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
		},
	},
};
