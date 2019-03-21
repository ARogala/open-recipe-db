import { combineReducers } from 'redux';
import { filteredRecipes, randomRecipes } from './apiGetReducers';

export default combineReducers({
	filteredRecipes: filteredRecipes,
	randomRecipes: randomRecipes
});
