import { POST_RECIPE, POST_RECIPE_SUCCESS, POST_RECIPE_ERROR } from './types';

export const postRecipe = recipe => {
	return dispatch => {
		dispatch({
			type: POST_RECIPE,
			payload: {
				loaded: false,
				btnClicked: true
			}
		});
		fetch(`/api/recipe`, {
			method: 'POST',
			body: JSON.stringify(recipe),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(
				result => {
					dispatch({
						type: POST_RECIPE_SUCCESS,
						payload: {
							result: result,
							loaded: true,
							btnClicked: false
						}
					});
				},
				error => {
					dispatch({
						type: POST_RECIPE_ERROR,
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
