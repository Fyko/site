import ms from '@naval-base/ms';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import IORedis from 'ioredis';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { FaHashtag } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { MdExplicit } from 'react-icons/md';
import { SiSpotify } from 'react-icons/si';
import SpotifyWebAPI from 'spotify-web-api-node';
import Banner from '../components/banner';
import { Details } from '../components/details';
import { Modal } from '../components/modal';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';
import type { LastFMGetTrack } from '../server/lfm';
import { LastFM } from '../server/lfm';
import { rand } from '../util/types';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

dayjs.extend(relativeTime);

interface Props {
	readonly randomLastFMTrack: LastFMGetTrack;
	readonly topTracks: TrackObjectFull[];
}

export default function AboutPage({ topTracks, randomLastFMTrack }: Props) {
	return (
		<div className="space-y-8">
			<h1 className="block text-3xl font-bold sm:text-4xl md:text-6xl">About</h1>
			<Banner />
			<p className="opacity-80">
				Howdy folks! My name's Carter! I'm a software engineer currently based in Denver, Colorado. I love spending time
				with my friends, writing code, and drinking coffee. I founded my company,{' '}
				<a href="https://sycer.dev" rel="noreferrer" target="_blank">
					Sycer Development
				</a>{' '}
				in December of 2019 and offered Discord bots to sneaker "cook groups". Now, I work for{' '}
				<a href="https://pushas.com" rel="noreferrer" target="_blank">
					Truffle
				</a>{' '}
				-- we're building a platform to give content creators control over their growth and audiences.
			</p>

			<h2 className="text-3xl font-bold" id="music">
				<a href="#music">
					<FaHashtag size={18} className="-mt-1 inline" />
				</a>{' '}
				Music
			</h2>

			<p>
				I listen to a lot of Spotify and have always had a passion for music ever since . Over the last 3 months, I've
				played the song <span className="font-bold">{randomLastFMTrack.name}</span> by{' '}
				<span className="font-bold">{randomLastFMTrack.artist.name}</span> exactly{' '}
				<span className="font-bold">{randomLastFMTrack.playcount}</span> times! Below you can find an up-to-date
				collection of my favourite songs of all time.
			</p>

			<div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
				{topTracks.map((track) => (
					<Track key={track.id} track={track} />
				))}
			</div>
		</div>
	);
}

function Track({ track }: { readonly track: TrackObjectFull }) {
	const [statsOpen, setStatsOpen] = useState(false);

	const image = track.album.images[0].url;
	const artists = track.artists.map((artist) => artist.name).join(', ');

	const close = () => {
		setStatsOpen(false);
	};

	const open = () => {
		setStatsOpen(true);
	};

	const album = track.album as AlbumObjectFull;

	return (
		<button
			key={track.id}
			type="button"
			className="group flex flex-col space-y-2 text-left align-top no-underline outline-none focus:outline-none focus:ring focus:ring-offset-4 dark:focus:ring-offset-gray-900"
			aria-roledescription="Opens a stats modal"
			onClick={open}
		>
			<Modal isOpen={statsOpen} setIsOpen={close} title={<SiSpotify size={24} />}>
				<div className="space-y-4">
					<div className="relative aspect-[3/1]">
						<Image
							src={image}
							layout="fill"
							alt={`Album cover art of ${track.album.name} by ${artists}`}
							className="rounded-md object-cover"
						/>
					</div>

					<a
						href={track.external_urls.spotify}
						className="group flex justify-between rounded-md border bg-gray-100 p-3 no-underline dark:border-0 dark:bg-gray-900"
						target="_blank"
						rel="noreferrer"
					>
						<div>
							<h2 className="text-2xl font-bold group-hover:underline">{track.name}</h2>
							<h3 className="text-sm italic text-gray-400">By {artists}</h3>
						</div>

						<div>
							<HiExternalLink size={24} />
						</div>
					</a>

					<div>
						<Details
							details={[
								{
									name: 'Released:',
									value: (
										<span>
											{dayjs(album.release_date).fromNow()} ({dayjs(album.release_date).format('DD MMM YYYY')})
										</span>
									),
								},
								{
									name: 'Album:',
									value: album.name,
								},
								{
									name: 'Duration:',
									value: ms(track.duration_ms, true),
								},
							]}
						/>
					</div>
				</div>
			</Modal>

			<div className="image-span-block w-full overflow-hidden rounded-md">
				<Image
					src={image}
					className="grayscale-[50%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
					alt={`Album cover art for ${track.name} by ${artists}`}
					width={400}
					height={400}
				/>
			</div>

			<h2 className="py-0.5 text-lg">
				<span className="font-bold">
					{track.explicit && <MdExplicit className="-mt-1 inline" />} {track.name}
				</span>{' '}
				<span className="text-neutral-700 dark:text-neutral-400">• {artists}</span>
			</h2>
		</button>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const redis = new IORedis(REDIS_URL);

	const [token, refresh] = await redis.mget(SPOTIFY_REDIS_KEYS.AccessToken, SPOTIFY_REDIS_KEYS.RefreshToken);

	let api: SpotifyWebAPI;

	if (!token && refresh) {
		// If we don't have a token but we do have a refresh token

		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			refreshToken: refresh,
		});

		const result = await api.refreshAccessToken();

		await redis.set(
			SPOTIFY_REDIS_KEYS.AccessToken,
			result.body.access_token,
			'EX',

			// Expires is in seconds as per https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
			result.body.expires_in,
		);

		// If spotify wants us to use a new refresh token, we'll need to update it
		if (result.body.refresh_token) {
			await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token);
		}
	} else if (token) {
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			accessToken: token,
		});
	} else {
		throw new Error('No tokens available');
	}

	const tracks = await api.getMyTopTracks({
		time_range: 'medium_term',
	});

	await redis.quit();

	const lfm = new LastFM(LAST_FM_API_KEY);
	const topLFMTracks = await lfm.getTopTracks('fyk3o', '3month');

	return {
		props: {
			topTracks: tracks.body.items,
			randomLastFMTrack: rand(topLFMTracks),
		},
		revalidate: 120,
	};
};
