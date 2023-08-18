import {
	defineConfig,
	presetWind,
	presetAttributify,
	presetIcons,
} from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	extractors: [
		extractorSvelte(),
	],
	presets: [
		presetWind(),
		presetAttributify(),
		presetIcons(),
	],
	shortcuts: { 'mue-button': 'm-4 py-4 px-8 rounded-full bg-rose-200 text-black hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-opacity-80 transition duration-300 ease-in-out' },
	theme: {
		colors: {
			'mue': {
				'almond': 'BlanchedAlmond',
				'orange': '#ffb032',
				'orange-dark': '#b94825',
				'orange-light': '#ff8x67',
				'pink': '#dd3b67',
				'pink-dark': '#b13854',
				'pink-light': '#ff829s',
			},
		},
		fontFamily: { 'sans': 'Lexend Deca' },
	},
});
