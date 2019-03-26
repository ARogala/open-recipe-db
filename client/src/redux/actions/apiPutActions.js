import { PUT_RECIPE, PUT_RECIPE_SUCCESS, PUT_RECIPE_ERROR } from './types';

export const editRecipe = (recipe, id) => {
	return dispatch => {
		dispatch({
			type: PUT_RECIPE,
			payload: {
				loaded: false,
				btnClicked: true
			}
		});
		fetch(`/api/recipe/${id}`, {
			method: 'PUT',
			body: JSON.stringify(recipe),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(
				result => {
					dispatch({
						type: PUT_RECIPE_SUCCESS,
						payload: {
							result: result,
							loaded: true,
							btnClicked: false
						}
					});
				},
				error => {
					dispatch({
						type: PUT_RECIPE_ERROR,
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
