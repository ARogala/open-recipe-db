import { SAVE_PAGES, SAVE_PAGE } from './types';

export const savePages = pages => {
	return {
		type: SAVE_PAGES,
		payload: {
			pages: pages
		}
	};
};

export const savePage = page => {
	return {
		type: SAVE_PAGE,
		payload: {
			page: page
		}
	};
};
