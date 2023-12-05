import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';
import defaults from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{tsx,ts,css}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				blurple: '#5865F2',
			},
			fontFamily: {
				...defaults.fontFamily,
				sans: ['Roboto', ...defaults.fontFamily.sans],
			},
		},
	},
	variants: {
		typography: ['dark'],
		animation: ['motion-safe'],
	},
	plugins: [typography],
} satisfies Config;
