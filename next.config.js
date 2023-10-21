/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			'source.unsplash.com',
			'lastfm.freetls.fastly.net',
			'i.scdn.co',
			'cdn.discordapp.com',
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
			{
				source: '/discord',
				destination: 'https://discord.com/invite/PNvQWVjCVC',
				permanent: true,
			},
		];
	},
};
