import React from 'react';
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
		let recipeDOM = recipe.map((recipe, index) => {
			return (
				<ul key={index}>
					<li>
						{`Title: ${recipe.name}`}
						<ul>
							<li>{`Contributor: ${recipe.contributor}`}</li>
							<li>{`Category: ${recipe.category}`}</li>
							<li>{`SubCategory: ${recipe.subCategory}`}</li>
							<li>{`Difficulty: ${recipe.difficulty}`}</li>
							<li>{`Total Time: ${recipe.totalTime.hours} hours and ${
								recipe.totalTime.minutes
							} minutes`}</li>
							<li>{`Rating: ${recipe.starRating}`}</li>
							<li>{`Date: ${recipe.date}`}</li>
						</ul>
					</li>
				</ul>
			);
		});
		return recipeDOM;
	};
	render() {
		console.log(this.props.recipe);
		const { error, loaded, recipe } = this.props.recipe;
		// console.log(recipe);
		//api will send an error obj on recipes if server error occurs
		if (error || recipe.error) {
			return this.renderError();
		} else if (loaded && recipe.length !== 0) {
			return (
				<div>
					<p>Recipe details</p>
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
