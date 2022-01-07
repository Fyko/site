import { api } from '../../server/api';

export default api({
	async GET() {
		return Promise.resolve({
			ping: 'pong',
			time: Date.now(),
		});
	},
});
