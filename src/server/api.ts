import { createAPI } from 'nextkit';

export const api = createAPI({
	onError: async (_, __, error) => {
		console.warn(error);

		return Promise.resolve({
			status: 500,
			message: error.message,
		});
	},
});
