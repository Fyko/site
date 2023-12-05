import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const getShortLink = `
  query GetShortLink($short: String!) {
    short_link(where: {short: {_eq: $short}}) {
      long
    }
  }
`;

export default function Error() {
	const [errorContent, setErrorContent] = useState('404 - Page Not Found');

	const router = useRouter();
	useEffect(() => {
		async function run() {
			console.log(router);
			const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'anonymous' },
				body: JSON.stringify({
					query: getShortLink,
					variables: { short: router.asPath.replace('/', '') },
					operationName: 'GetShortLink',
				}),
			});

			const json = await res.json();
			if ('data' in json) {
				const links: Record<string, string>[] = json.data.short_link;
				if (links.length) {
					setErrorContent('Redirecting...');
					return router.push(links[0].long);
				}
			}
		}

		void run();
	}, [router, setErrorContent]);

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold sm:text-3xl md:text-5xl">{errorContent}</h1>
		</div>
	);
}
