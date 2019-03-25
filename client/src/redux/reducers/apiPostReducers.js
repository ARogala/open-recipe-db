import {
	POST_RECIPE,
	POST_RECIPE_SUCCESS,
	POST_RECIPE_ERROR
} from '../actions/types';

const initialState = {
	postRecipeRes: { error: null, loaded: false, btnClicked: false, res: [] }
};

export const postRecipeRes = (postRecipeRes = initialState.postRecipeRes, action) => {
	switch (action.type) {
		case POST_RECIPE:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			}
		case POST_RECIPE_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: action.payload.result
			};
		case POST_RECIPE_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			};
		default:
			return postRecipeRes;
	}
};