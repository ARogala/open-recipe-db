import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { getRecipeById, deleteRecipe, updateRecipes, updateRecipe } from '../redux/actions';

import { formatMMDDYYYY } from '../formatDate';
/*
	conditional rendering is complicated... however component logic is easy
	1. component mounts get the recipe by id and display it
	2. User clicked delete btn. delete recipe and (componentDidUpdate)
		a. remove deleted recipe from recipe state so we cannot display deleted recipe
		   on the recipe page (ie this page)
		b. remove deleted recipe from recipes state so we cannot display the deleted
		   recipe on the home page
	3. conditionaly render this pages state 
*/
class Recipe extends React.Component {
	componentDidMount() {
		//get id parameter from url and fetch recipe from api
		const id = this.props.match.params.id;
		this.props.getRecipeById(id);
	}

	delete(id) {
		confirmAlert({
			title: 'Delete this recipe?',
			message:
				'Are you sure you want to delete this recipe? This can not be undone! Please only delete recipes you uploaded!!',
			buttons: [
				{
					label: 'Yes Delete',
					onClick: () => this.props.deleteRecipe(id)
				},
				{
					label: 'No',
					onClick: () => {
						return;
					}
				}
			]
		});
	}

	//update/remove recipes and recipe once after deleteRecipe success
	componentDidUpdate(prevProps) {
		if (
			this.props.deleteRecipeRes.loaded !== prevProps.deleteRecipeRes.loaded &&
			this.props.deleteRecipeRes.res.length === 1
		) {
			let recipes = this.props.recipes.recipes.all;
			let count = this.props.recipes.recipes.count;
			count = count - 1;
			const id = this.props.match.params.id;
			recipes = recipes.filter(recipe => recipe._id !== id);
			this.props.updateRecipes({ all: recipes, count: count });
			this.props.updateRecipe();
			this.notify();
		}
	}

	notify = () => {
		toast.success('Recipe deleted successfully!', {
			position: toast.POSITION.TOP_CENTER
		});
	};

	renderError = () => {
		return (
			<div className="recipe">
				<p>
					Sorry an error has occured. Perhaps we are cooking too much and went over the api limit! Slow down!
				</p>
			</div>
		);
	};

	renderLoader = () => {
		return (
			<div className="recipe">
				<div className="recipe__loader">
					<div>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};

	renderRecipe = recipe => {
		let ingredients = recipe[0].ingredients.map((ingredient, index) => {
			return <li key={index}>{ingredient}</li>;
		});
		let recipeDOM = (
			<ul className="recipeList">
				<li className="recipeList__recipeLI">
					<p className="recipeList__title">{`${recipe[0].name}`}</p>
					<ul className="recipeList__recipeUL">
						<li>{`Contributor: ${recipe[0].contributor}`}</li>
						<li>{`Category: ${recipe[0].category}`}</li>
						<li>{`SubCategory: ${recipe[0].subCategory}`}</li>
						<li>{`Difficulty: ${recipe[0].difficulty}`}</li>
						<li>{`Rating: ${recipe[0].starRating}`}</li>
						<li>{`Prep Time: ${recipe[0].prepTime.hours} hours and ${
							recipe[0].prepTime.minutes
						} minutes`}</li>
						<li>{`Cook Time: ${recipe[0].cookTime.hours} hours and ${
							recipe[0].cookTime.minutes
						} minutes`}</li>
						<li>{`Total Time: ${recipe[0].totalTime.hours} hours and ${
							recipe[0].totalTime.minutes
						} minutes`}</li>
						<li>{`Date: ${formatMMDDYYYY(recipe[0].date)}`}</li>
						<li className="recipeList__ingredientsLI">
							<p>Ingredients:</p>
							<ul>{ingredients}</ul>
						</li>
						<li className="recipeList__instructionsLI">
							<p className="recipeList__instructionsLI-p">Instructions:</p>
							<ul>
								<p>{recipe[0].instructions}</p>
							</ul>
						</li>
						<li className="recipeList__notesLI">
							<p className="recipeList__notesLI-p">Notes:</p>
							<ul>
								<p>{recipe[0].notes}</p>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		);
		return recipeDOM;
	};

	render() {
		const getError = this.props.recipe.error;
		const getLoaded = this.props.recipe.loaded;
		const getRecipe = this.props.recipe.recipe;

		const deleteError = this.props.deleteRecipeRes.error;
		const deleteLoaded = this.props.deleteRecipeRes.loaded;
		const btnClicked = this.props.deleteRecipeRes.btnClicked;
		const res = this.props.deleteRecipeRes.res;
		//console.log('delete res: ', this.props.deleteRecipeRes);
		//console.log('get recipe: ', this.props.recipe);
		//api will send an error obj on recipes if server error occurs
		if (getError || getRecipe.error || deleteError || res.error) {
			return this.renderError();
		} else if (getLoaded === false || (deleteLoaded === false && btnClicked === true)) {
			return this.renderLoader();
		} else if (getRecipe.length === 1) {
			return (
				<div>
					<p>Recipe details</p>
					<Link to={`/edit/${getRecipe[0]._id}`}>Edit Recipe</Link>
					<button className="appBtn" type="button" onClick={() => this.delete(getRecipe[0]._id)}>
						Delete Recipe
					</button>
					{this.renderRecipe(getRecipe)}
				</div>
			);
		} else {
			return (
				<div>
					<p>Your recipe was successfully deleted.</p>
					<Link to={`/`}>Back</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		recipe: state.recipe,
		recipes: state.recipes,
		deleteRecipeRes: state.deleteRecipeRes
	};
};

const mapDispatchToProps = {
	getRecipeById: getRecipeById,
	deleteRecipe: deleteRecipe,
	updateRecipes: updateRecipes,
	updateRecipe: updateRecipe
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recipe);
