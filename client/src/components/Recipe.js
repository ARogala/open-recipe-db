import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { getRecipeById } from '../redux/actions';

class Recipe extends React.Component {
	componentDidMount() {
		//get id parameter from url and fetch recipe from api
		const id = this.props.match.params.id;
		this.props.getRecipeById(id);
	}
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
						<p>Getting Recipe!</p>
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
			<ul>
				<li>
					{`Title: ${recipe[0].name}`}
					<ul>
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
						<li>{`Date: ${recipe[0].date}`}</li>
						<li>
							Ingredients:
							<ul>{ingredients}</ul>
						</li>
						<li>
							Instructions:
							<ul>
								<p>{recipe[0].instructions}</p>
							</ul>
						</li>
						<li>
							Notes:
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
		const { error, loaded, recipe } = this.props.recipe;
		//api will send an error obj on recipes if server error occurs
		if (error || recipe.error) {
			return this.renderError();
		} else if (loaded && recipe.length !== 0) {
			return (
				<div>
					<p>Recipe details</p>
					<Link to={`/edit/${recipe[0]._id}`}>Edit Recipe</Link>
					{this.renderRecipe(recipe)}
				</div>
			);
		} else {
			return this.renderLoader();
		}
	}
}

const mapStateToProps = state => {
	return {
		recipe: state.recipe
	};
};

const mapDispatchToProps = {
	getRecipeById: getRecipeById
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recipe);
