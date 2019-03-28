import { SAVE_PAGES, SAVE_PAGE } from '../actions/types';

const initialState = {
	pages: 1,
	page: 1
};

export const pages = (pages = initialState.pages, action) => {
	switch (action.type) {
		case SAVE_PAGES:
			return action.payload.pages;
		default:
			return pages;
	}
};

export const page = (page = initialState.page, action) => {
	switch (action.type) {
		case SAVE_PAGE:
			return action.payload.page;
		default:
			return page;
	}
};

