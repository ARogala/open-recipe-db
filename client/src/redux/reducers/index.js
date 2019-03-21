import { combineReducers } from 'redux';
import { recipes } from './apiGetReducers';

export default combineReducers({
	recipes: recipes
});
