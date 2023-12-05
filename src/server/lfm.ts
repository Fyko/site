import urlcat from 'urlcat';

// Method is the "RPC call" to request for, e.g. `user.gettoptracks`
export type LastFMParams = Record<string, string> & { method: string };

export class LastFM {
	public constructor(private readonly apiKey: string) {}

	public async getTopTracks(
		user: string,
		period: '1month' | '3month' | '6month' | '7day' | '12month' | 'overall' = 'overall',
	): Promise<LastFMGetTrack[]> {
		const res = await this.req<GetTopTracks>('get', {
			user,
			method: 'user.gettoptracks',
			period,
		});

		return res.toptracks.track;
	}

	protected async req<ReturnType>(method: string, params: LastFMParams) {
		const url = urlcat('https://ws.audioscrobbler.com/2.0/', {
			api_key: this.apiKey,
			format: 'json',
			...params,
		});

		const request = await fetch(url);
		const response = (await request.json()) as ReturnType;

		if (request.status >= 400) {
			throw new Error(`Last.fm API error failed with status ${request.status}`);
		}

		return response;
	}
}

export interface LastFMGetTrack {
	'@attr': {
		rank: string;
	};
	artist: {
		mbid: string;
		name: string;
		url: string;
	};
	duration: string;
	image: {
		'#text': string;
		size: string;
	}[];
	mbid: string;
	name: string;
	playcount: string;
	streamable: {
		'#text': string;
		fulltrack: string;
	};
	url: string;
}

export interface GetTopTracks {
	toptracks: {
		'@attr': {
			page: string;
			perPage: string;
			total: string;
			totalPages: string;
			user: string;
		};
		track: LastFMGetTrack[];
	};
}
