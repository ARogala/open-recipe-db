import { combineReducers } from 'redux';
import { filteredRecipes } from './apiGetReducers';

export default combineReducers({
	filteredRecipes: filteredRecipes
});
