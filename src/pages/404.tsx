import { GRAPHQL_URL } from '../server/constants';
import { GetServerSideProps } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
	const props = { props: {} };

	const url = new URL(ctx.req.url!);
	console.log(url);
	const res = await fetch(GRAPHQL_URL, {
		method: 'POST',
		body: JSON.stringify({
			query: getShortLink,
			variables: { short: url.pathname.replace('/', '') },
			operationName: 'GetShortLink',
		}),
	});

	const json = await res.json();
	if ('data' in json) {
		const links: Record<string, string>[] = json.data.short_link;
		if (!links.length) return props;

		return {
			redirect: {
				destination: links[0].long,
				permanent: true,
			},
		};
	}

	return props;
};

const getShortLink = `
  query GetShortLink($short: String!) {
    short_link(where: {short: {_eq: $short}}) {
      long
    }
  }
`;
