import throttle from 'lodash/throttle';

import {
	GET_FILTERED_RECIPES,
	GET_FILTERED_RECIPES_SUCCESS,
	GET_FILTERED_RECIPES_ERROR,
	GET_RANDOM_RECIPES,
	GET_RANDOM_RECIPES_SUCCESS,
	GET_RANDOM_RECIPES_ERROR
} from './types';

/*5sec throttle
define the throttled fetch outside the action creator otherwise
everytime the action creator gets called it will retrun a new throttle function
and throttle will not work as intended
*/
const filteredRecipes = throttle((dispatch, category, subCategory, difficulty, sortBy) => {
	fetch(`/api/recipe/${category}/${subCategory}/${difficulty}/${sortBy}`)
		.then(res => res.json())
		.then(
			result => {
				dispatch({
					type: GET_FILTERED_RECIPES_SUCCESS,
					payload: {
						result: result,
						loaded: true,
						btnClicked: false
					}
				});
			},
			error => {
				dispatch({
					type: GET_FILTERED_RECIPES_ERROR,
					payload: {
						error: error,
						loaded: true,
						btnClicked: false
					}
				});
			}
		);
}, 5000);

/*
export const getFilteredRecipes = (p1,p2,p3,p4) => dispatch => filteredRecipes(dispatch, p1,p2,p3,p4);
'https://jsonplaceholder.typicode.com/users'

action creator returns a function with dispatch which then returns the outer filteredRecipes function
with dispatch and the arguments (thunk can now execute this throttled function properly).

Alt short hand syntax above as well as a test json placeholder endpoint
see https://gist.github.com/krstffr/245fe83885b597aabaf06348220c2fe9
*/

export const getFilteredRecipes = (category, subCategory, difficulty, sortBy) => {
	return dispatch => {
		dispatch({
			type: GET_FILTERED_RECIPES,
			payload: {
				loaded: false,
				btnClicked: true
			}
		});
		return filteredRecipes(dispatch, category, subCategory, difficulty, sortBy);
	};
};

const randomRecipes = throttle(dispatch => {
	fetch(`/api/recipe/random`)
		.then(res => res.json())
		.then(
			result => {
				dispatch({
					type: GET_RANDOM_RECIPES_SUCCESS,
					payload: {
						result: result,
						loaded: true,
						btnClicked: false
					}
				});
			},
			error => {
				dispatch({
					type: GET_RANDOM_RECIPES_ERROR,
					payload: {
						error: error,
						loaded: true,
						btnClicked: false
					}
				});
			}
		);
}, 5000);

export const getRandomRecipes = () => {
	return dispatch => {
		dispatch({
			type: GET_RANDOM_RECIPES,
			payload: {
				loaded: false,
				btnClicked: true
			}
		});
		return randomRecipes(dispatch);
	};
};
