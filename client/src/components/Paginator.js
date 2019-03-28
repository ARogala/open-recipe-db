import React from 'react';
import { connect } from 'react-redux';

import { getFilteredRecipes, saveFilteredURL } from '../redux/actions';

//NOTE: limit of 20 recipes per page is fixed on the server
class Paginator extends React.Component {

	nextPage(pages, filteredURL) {
		let { category, subCategory, difficulty, sortBy, skip } = filteredURL;
		console.log(category, subCategory, difficulty, sortBy, skip);
		console.log(pages);
		skip = skip + 20;

		this.props.getFilteredRecipes(category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(category, subCategory, difficulty, sortBy, skip);

	}

	previousPage(currentPage, pages, skip) {

	}

	render() {
		
		const count = this.props.recipes.recipes.count;
		const pages = Math.ceil(count / 20);
		const filteredURL = this.props.filteredURL;

		// console.log(this.props.recipes.recipes.count);
		// console.log(pages);
		// console.log(this.props.filteredURL);
		return (
			<div className="appBtnContainer">
				<button className="appBtn" type="button">
					Previous
				</button>
				<button className="appBtn" type="button" onClick={() => this.nextPage(pages,filteredURL)}>
					Next
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		filteredURL: state.filteredURL,
		recipes: state.recipes
	};
};

const mapDispatchToProps = {
	getFilteredRecipes: getFilteredRecipes,
	saveFilteredURL: saveFilteredURL
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Paginator);
