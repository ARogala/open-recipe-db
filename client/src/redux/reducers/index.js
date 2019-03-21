import { combineReducers } from 'redux';
import { dummyReducer } from './apiGetReducers';


export default combineReducers({
	dummyReducer: dummyReducer
})
