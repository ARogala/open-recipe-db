import { combineReducers } from 'redux';
import { recipes, recipe } from './apiGetReducers';
import { postRecipeRes } from './apiPostReducers';
import { putRecipeRes } from './apiPutReducers';

export default combineReducers({
	recipes: recipes,
	recipe: recipe,
	postRecipeRes: postRecipeRes,
	putRecipeRes: putRecipeRes
});
