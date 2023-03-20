const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
		// require('@tailwindcss/line-clamp'),
	],
	theme: {
		extend: {
			colors: {
				'mue-orange': '#ffb032',
				'mue-orange-dark': '#b94825',
				// 'mue-orange-light': 'rgba(255, 92, 39, 0.7)',
				'mue-orange-light': '#FF8C67',
				'mue-pink': '#dd3b67',
				'mue-pink-dark': '#b13854',
				// 'mue-pink-light': 'rgba(255, 70, 110, 0.67)',
				'mue-pink-light': '#FF829D',
			},
			fontFamily: { 'sans': ['Lexend Deca', ...defaultTheme.fontFamily.sans] },
		},
	},
};
