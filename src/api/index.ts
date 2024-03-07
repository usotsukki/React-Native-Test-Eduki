import {API} from './config';

export const getSearchResults = async (query: string, page: number) => {
	try {
		const response = await API.get(`elastic`, {
			params: {
				limit: 20,
				p: page,
				q: query,
				world: 'de',
			},
		});
		return response?.data;
	} catch (error) {
		console.error('getSearchResults', error);
		return error;
	}
};
