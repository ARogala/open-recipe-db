import { GET_FILTERED_RECIPES, GET_FILTERED_RECIPES_SUCCESS, GET_FILTERED_RECIPES_ERROR } from '../actions/types';

const initialState = {
	filteredRecipes: { error: null, loaded: false, btnClicked: false, recipes: null }
};

export const filteredRecipes = (filteredRecipes = initialState.filteredRecipes, action) => {
	switch (action.type) {
		case GET_FILTERED_RECIPES:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: null
			};
		case GET_FILTERED_RECIPES_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: action.payload.result
			};
		case GET_FILTERED_RECIPES_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: null
			};
		default:
			return filteredRecipes;
	}
};
