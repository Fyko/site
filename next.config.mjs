/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: 'source.unsplash.com',
			},
			{
				hostname: 'lastfm.freetls.fastly.net',
			},
			{
				hostname: 'i.scdn.co',
			},
			{
				hostname: 'cdn.discordapp.com',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/my-landscapes',
				destination: 'https://prettylandscapes.com/montage.mp4',
				permanent: false,
			},
			{
				source: '/onlyfans',
				destination: 'https://prettylandscapes.com/montage.mp4',
				permanent: false,
			},
		];
	},
};
