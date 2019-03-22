import { combineReducers } from 'redux';
import { recipes, recipe } from './apiGetReducers';

export default combineReducers({
	recipes: recipes,
	recipe: recipe
});
