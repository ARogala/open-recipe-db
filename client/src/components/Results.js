import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

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
			<div className="recipe">
				<div className="recipe__loader">
					<div>
						<p>Getting Recipes!</p>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};
	renderRecipeList = recipes => {
		let recipesList = recipes.map((recipe, index) => {
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
		return recipesList;
	};

	render() {
		console.log('Recipes: ', this.props.recipes);
		const result = this.props.recipes;

		const error = result.error;
		const loaded = result.loaded;
		const btnClicked = result.btnClicked;
		if (error) {
			return this.renderError();
		} else if (loaded === false && btnClicked === true) {
			return this.renderLoader();
		} else if (result.recipes !== null && loaded === true) {
			return (
				<div>
					<p>Total Results: {result.recipes.count}</p>
					{this.renderRecipeList(result.recipes.all)}
				</div>
			);
		} else {
			return <div>Query the Data base for results</div>;
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
