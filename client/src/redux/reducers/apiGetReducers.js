import {
	GET_FILTERED_RECIPES,
	GET_FILTERED_RECIPES_SUCCESS,
	GET_FILTERED_RECIPES_ERROR,
	GET_RANDOM_RECIPES,
	GET_RANDOM_RECIPES_SUCCESS,
	GET_RANDOM_RECIPES_ERROR
} from '../actions/types';

const initialState = {
	recipes: { error: null, loaded: false, btnClicked: false, recipes: null }
};

export const recipes = (recipes = initialState.recipes, action) => {
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
		case GET_RANDOM_RECIPES:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: null
			};
		case GET_RANDOM_RECIPES_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: action.payload.result
			};
		case GET_RANDOM_RECIPES_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: null
			};
		default:
			return recipes;
	}
};
