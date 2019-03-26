import {
	DELETE_RECIPE,
	DELETE_RECIPE_SUCCESS,
	DELETE_RECIPE_ERROR
} from '../actions/types';

const initialState = {
	deleteRecipeRes: { error: null, loaded: false, btnClicked: false, res: [] }
};

export const deleteRecipeRes = (deleteRecipeRes = initialState.deleteRecipeRes, action) => {
	switch (action.type) {
		case DELETE_RECIPE:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			}
		case DELETE_RECIPE_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: action.payload.result
			};
		case DELETE_RECIPE_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				res: []
			};
		default:
			return deleteRecipeRes;
	}
};