import React from 'react';
import { SiSpotify } from 'react-icons/si';
import { useLanyard } from 'use-lanyard';

export const DISCORD_ID = '492374435274162177';

export function Song() {
	const { data: user } = useLanyard(DISCORD_ID);

	const className =
		'text-right select-none sm:select-text w-full inline-flex text-lg rounded-sm focus:outline-none focus:opacity-100 focus:ring items-center space-x-2 no-underline opacity-50 hover:opacity-100 h-12 mt-0.5';

	if (!user?.spotify) {
		return (
			<p className={className}>
				<span>Not playing anything</span>
				<span>
					<SiSpotify />
				</span>
			</p>
		);
	}

	return (
		<a
			target="_blank"
			rel="noreferrer"
			className={className}
			href={`https://open.spotify.com/track/${user.spotify.track_id}`}
		>
			<span className="truncate">
				Listening to {user.spotify.song} by {user.spotify.artist}
			</span>
			<span>
				<SiSpotify />
			</span>
		</a>
	);
}
