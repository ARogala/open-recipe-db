import {CHANGE_STRING} from '../actions/types';

const initialState = {
	dummyReducer: 'just boiler plate redux text'
};

export const dummyReducer = (dummyReducer = initialState.dummyReducer, action) => {
	switch (action.type) {
		case CHANGE_STRING:
			return action.payload;
		default:
			return dummyReducer;
	}
};