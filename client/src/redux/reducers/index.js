import { combineReducers } from 'redux';
import { recipes, recipe } from './apiGetReducers';
import { postRecipeRes } from './apiPostReducers';

export default combineReducers({
	recipes: recipes,
	recipe: recipe,
	postRecipeRes: postRecipeRes
});
