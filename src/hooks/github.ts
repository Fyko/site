import useSWR from 'swr';

interface User {
	avatar_url: string;
	bio: string;
	blog: string;
	company: string;
	created_at: string;
	email: string | null;
	events_url: string;
	followers: number;
	followers_url: string;
	following: number;
	following_url: string;
	gists_url: string;
	gravatar_id: string;
	hireable: boolean;
	html_url: string;
	id: number;
	location: string;
	login: string;
	name: string;
	node_id: string;
	organizations_url: string;
	public_gists: number;
	public_repos: number;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	twitter_username: string;
	type: string;
	updated_at: string;
	url: string;
}

/**
 * SWR wrapper that retusn a full github user object from the public api
 *
 * @param username - The github username to fetch data for
 * @returns An SWRREsponse fulfilled with the github user
 */
export function useGitHubUser(username: string) {
	return useSWR<User, Error>(`https://api.github.com/users/${username}`);
}

export interface PinnedRepo {
	description: string;
	forks: string;
	language: string;
	languageColor: string;
	owner: string;
	repo: string;
	stars: string;
}

/**
 * SWR wrapper that returns github repositories for a user
 *
 * @param username - The github username to fetch pinned repos for
 * @returns An SWRResponse fulfilled with an array of pinned github repos
 */
export function useGitHubPinnedRepos(username: string) {
	const resp = useSWR<PinnedRepo[], Error>(`https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=${username}`);

	return {
		...resp,
		data: resp.data?.map((item) => {
			const data: PinnedRepo & { url: string } = {
				...item,
				url: `https://github.com/${item.owner}/${item.repo}`,
			};

			return data;
		}),
	};
}
