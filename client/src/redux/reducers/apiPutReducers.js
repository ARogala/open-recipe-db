import {
	PUT_RECIPE,
	PUT_RECIPE_SUCCESS,
	PUT_RECIPE_ERROR
} from '../actions/types';

const initialState = {
	putRecipeRes: { error: null, loaded: false, btnClicked: false, res: [] }
};

export const putRecipeRes = (putRecipeRes = initialState.putRecipeRes, action) => {
	switch (action.type) {
		case PUT_RECIPE:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			}
		case PUT_RECIPE_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: action.payload.result
			};
		case PUT_RECIPE_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			};
		default:
			return putRecipeRes;
	}
};