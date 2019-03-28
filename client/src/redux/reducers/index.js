import { combineReducers } from 'redux';
import { recipes, recipe, filteredURL } from './apiGetReducers';
import { postRecipeRes } from './apiPostReducers';
import { putRecipeRes } from './apiPutReducers';
import { deleteRecipeRes } from './apiDeleteReducers';
import { pages, page } from './paginationReducers';

export default combineReducers({
	recipes: recipes,
	recipe: recipe,
	filteredURL: filteredURL,
	postRecipeRes: postRecipeRes,
	putRecipeRes: putRecipeRes,
	deleteRecipeRes: deleteRecipeRes,
	pages: pages,
	page: page
});
