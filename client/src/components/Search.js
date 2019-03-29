import React from 'react';
import { connect } from 'react-redux';

import CategoryOptions from './CategoryOptions';
import SubCategoryOptions from './SubCategoryOptions';
import { getFilteredRecipes, getRandomRecipes, saveFilteredURL, savePage } from '../redux/actions';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: 'undefined',
			subCategory: 'undefined',
			difficulty: 'undefined',
			sortBy: 'undefined'
		};
	}

	handleCategoryChange(e) {
		this.setState({
			category: e.target.value
		});
	}

	handleSubCategoryChange(e) {
		this.setState({
			subCategory: e.target.value
		});
	}

	handleDifficultyChange(e) {
		this.setState({
			difficulty: e.target.value
		});
	}

	handleSortByChange(e) {
		this.setState({
			sortBy: e.target.value
		});
	}
	/*
		note must reset page to one (1) when user queries the DB.
		page state only gets updated when user clicks next or previous
		thus must reset the current page to 1 when a new search is send to the DB.
	*/
	handleSubmit(e) {
		e.preventDefault();
		const category = this.state.category;
		const subCategory = this.state.subCategory;
		const difficulty = this.state.difficulty;
		const sortBy = this.state.sortBy;
		const skip = 0;
		this.props.getFilteredRecipes(category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(category, subCategory, difficulty, sortBy, skip);
		this.props.savePage(1);
	}

	getAllRecipes() {
		const skip = 0;
		this.props.getFilteredRecipes('undefined', 'undefined', 'undefined', 'undefined', 'starRating', skip);
		this.props.saveFilteredURL('undefined', 'undefined', 'undefined', 'undefined', 'starRating', skip);
		this.props.savePage(1);
	}

	handleFormReset() {
		this.setState({
			category: 'undefined',
			subCategory: 'undefined',
			difficulty: 'undefined',
			sortBy: 'undefined'
		});
	}

	render() {
		return (
			<div>
				<div className="appBtnContainer">
					<button className="appBtn" type="button" onClick={() => this.props.getRandomRecipes()}>
						Random Recipes
					</button>
					<button className="appBtn" type="button" onClick={() => this.getAllRecipes()}>
						All Recipes
					</button>
				</div>
				<form className="search" onSubmit={e => this.handleSubmit(e)}>
					<fieldset>
						<legend>Search Recipes Database</legend>
						<label htmlFor="category">Category:</label>
						<select
							className="search__select"
							id="category"
							value={this.state.category}
							onChange={e => this.handleCategoryChange(e)}
						>
							<option value="undefined">--Choose a Category--</option>
							<CategoryOptions />
						</select>
						<label htmlFor="subCategory">SubCategory:</label>
						<select
							className="search__select"
							id="subCategory"
							value={this.state.subCategory}
							onChange={e => this.handleSubCategoryChange(e)}
						>
							<option value="undefined">--Choose a SubCategory--</option>
							<SubCategoryOptions />
						</select>
						<label htmlFor="difficulty">Difficulty:</label>
						<select
							className="search__select"
							id="difficulty"
							value={this.state.difficulty}
							onChange={e => this.handleDifficultyChange(e)}
						>
							<option value="undefined">--Choose a Difficulty--</option>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
							<option value="Pro Chef">Pro Chef</option>
						</select>
						<label htmlFor="sortBy">Sort By:</label>
						<select
							className="search__select"
							id="sortBy"
							value={this.state.sortBy}
							onChange={e => this.handleSortByChange(e)}
						>
							<option value="undefined">--Sort Results By--</option>
							<option value="starRating">Star Rating</option>
							<option value="totalTime">Total Time</option>
							<option value="date">Date</option>
						</select>
						<div className="appBtnContainer">
							<button className="appBtn" type="submit" value="Submit">
								Search
							</button>
							<button
								className="appBtn"
								type="button"
								value="Reset"
								onClick={() => this.handleFormReset()}
							>
								Cancel
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = {
	getFilteredRecipes: getFilteredRecipes,
	getRandomRecipes: getRandomRecipes,
	saveFilteredURL: saveFilteredURL,
	savePage: savePage
};

export default connect(
	null,
	mapDispatchToProps
)(Search);
