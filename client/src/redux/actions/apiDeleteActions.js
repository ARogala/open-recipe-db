import { DELETE_RECIPE, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR } from './types';

export const deleteRecipe = id => {
	return dispatch => {
		dispatch({
			type: DELETE_RECIPE,
			payload: {
				loaded: false,
				btnClicked: true
			}
		});
		fetch(`/api/recipe/${id}`, {
			method: 'DELETE'
		})
			.then(res => res.json())
			.then(
				result => {
					console.log(result);
					dispatch({
						type: DELETE_RECIPE_SUCCESS,
						payload: {
							result: result,
							loaded: true,
							btnClicked: false
						}
					});
				},
				error => {
					console.log(error);
					dispatch({
						type: DELETE_RECIPE_ERROR,
						payload: {
							error: error,
							loaded: true,
							btnClicked: false
						}
					});
				}
			);
	};
};
