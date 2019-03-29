import {
	GET_FILTERED_RECIPES,
	GET_FILTERED_RECIPES_SUCCESS,
	GET_FILTERED_RECIPES_ERROR,
	SAVE_FILTERED_URL,
	GET_RANDOM_RECIPES,
	GET_RANDOM_RECIPES_SUCCESS,
	GET_RANDOM_RECIPES_ERROR,
	UPDATE_RECIPES_ON_DELETE,
	GET_RECIPE_BYID,
	GET_RECIPE_BYID_SUCCESS,
	GET_RECIPE_BYID_ERROR,
	UPDATE_RECIPE_ON_DELETE
} from '../actions/types';

const initialState = {
	recipes: { error: null, loaded: false, btnClicked: false, recipes: {} },
	recipe: { error: null, loaded: false, recipe: [] },
	filteredURL: {
		title: 'undefined',
		category: 'undefined',
		subCategory: 'undefined',
		difficulty: 'undefined',
		sortBy: 'undefined',
		skip: 0
	}
};

export const recipes = (recipes = initialState.recipes, action) => {
	switch (action.type) {
		case GET_FILTERED_RECIPES:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: {}
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
				recipes: {}
			};
		case GET_RANDOM_RECIPES:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: {}
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
				recipes: {}
			};
		case UPDATE_RECIPES_ON_DELETE:
			return {
				error: null,
				loaded: action.payload.loaded,
				btnClicked: action.payload.btnClicked,
				recipes: action.payload.recipes
			};
		default:
			return recipes;
	}
};

export const recipe = (recipe = initialState.recipe, action) => {
	switch (action.type) {
		case GET_RECIPE_BYID:
			return {
				error: null,
				loaded: action.payload.loaded,
				recipe: []
			};
		case GET_RECIPE_BYID_SUCCESS:
			return {
				error: null,
				loaded: action.payload.loaded,
				recipe: action.payload.result
			};
		case GET_RECIPE_BYID_ERROR:
			return {
				error: action.payload.error,
				loaded: action.payload.loaded,
				recipe: []
			};
		case UPDATE_RECIPE_ON_DELETE:
			return {
				error: null,
				loaded: action.payload.loaded,
				recipe: action.payload.recipe
			};
		default:
			return recipe;
	}
};

export const filteredURL = (filteredURL = initialState.filteredURL, action) => {
	switch (action.type) {
		case SAVE_FILTERED_URL:
			return {
				title: action.payload.title,
				category: action.payload.category,
				subCategory: action.payload.subCategory,
				difficulty: action.payload.difficulty,
				sortBy: action.payload.sortBy,
				skip: action.payload.skip
			};
		default:
			return filteredURL;
	}
};
