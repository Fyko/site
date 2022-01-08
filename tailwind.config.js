/* eslint-disable unicorn/prefer-module */

const defaults = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
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
	plugins: [require('@tailwindcss/typography')],
};
