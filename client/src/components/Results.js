import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import Paginator from './Paginator';

import { formatMMDDYYYY } from '../formatDate';

class Results extends React.Component {
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
			<div className="loader">
				<p>Getting Recipes!</p>
				<div className="loader__div">	
					<Loader type="Puff" color="#00BFFF" height="100" width="100" />
				</div>
			</div>
		);
	};
	renderRecipeList = recipes => {
		let recipesList = recipes.map((recipe, index) => {
			return (
				<li key={index} className="recipeList__recipeLI">
					<div className="recipeList__link-div">
						<Link className="recipeList__link" to={`/recipe/${recipe._id}`}>{`${recipe.name}`}</Link>
					</div>
					<ul className="recipeList__recipeUL">
						<li>{`Contributor: ${recipe.contributor}`}</li>
						<li>{`Category: ${recipe.category}`}</li>
						<li>{`SubCategory: ${recipe.subCategory}`}</li>
						<li>{`Difficulty: ${recipe.difficulty}`}</li>
						<li>{`Rating: ${recipe.starRating}`}</li>
						<li>{`Total Time: ${recipe.totalTime.hours} hours and ${recipe.totalTime.minutes} minutes`}</li>
						<li>{`Date: ${formatMMDDYYYY(recipe.date)}`}</li>
					</ul>
				</li>
			);
		});
		return recipesList;
	};

	render() {
		//console.log('Recipes: ', this.props.recipes);
		const { error, loaded, btnClicked, recipes } = this.props.recipes;
		//api will send an error obj on recipes if server error occurs
		if (error || recipes.error) {
			return this.renderError();
		} else if (loaded === false && btnClicked === true) {
			return this.renderLoader();
		} else if (loaded === true && recipes.all) {
			return (
				<div className="results">
					<p className="results__p">Total Results: {recipes.count}</p>
					<ul className="recipeList">{this.renderRecipeList(recipes.all)}</ul>
					<Paginator />
				</div>
			);
		} else {
			return (
				<div className="results">
					<p className="results__p">Search the database or get some random recipes.</p>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

export default connect(
	mapStateToProps,
	null
)(Results);
