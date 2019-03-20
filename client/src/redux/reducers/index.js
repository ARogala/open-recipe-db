import { combineReducers } from 'redux';

const initialState = {
	dummyReducer: 'just boiler plate redux text'
};

const dummyReducer = (dummyReducer = initialState.dummyReducer, action) => {
	switch (action.type) {
		case 'CHANGE_STRING':
			return action.payload;
		default:
			return dummyReducer;
	}
};

export default combineReducers({
	dummyReducer: dummyReducer
})
