import React from 'react';
import { connect } from 'react-redux';

import { getFilteredRecipes, saveFilteredURL } from '../redux/actions';

//NOTE: limit of 20 recipes per page is fixed on the server
class Paginator extends React.Component {
	//on page 1 skip = 0
	nextPage(pages, filteredURL) {
		let { category, subCategory, difficulty, sortBy, skip } = filteredURL;
		skip = skip + 20;
		const page = skip / 20 + 1;
		
		if (page > pages) return;
		console.log(category, subCategory, difficulty, sortBy, skip);
		console.log('Pages: ', pages);
		console.log('Page: ', page);
		this.props.getFilteredRecipes(category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(category, subCategory, difficulty, sortBy, skip);
	}

	previousPage(pages, filteredURL) {
		let { category, subCategory, difficulty, sortBy, skip } = filteredURL;
		const page = skip / 20;
		skip = skip - 20
		if (page < 1) return;
		console.log(category, subCategory, difficulty, sortBy, skip);
		console.log('Pages: ', pages);
		console.log('Page: ', page);
		this.props.getFilteredRecipes(category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(category, subCategory, difficulty, sortBy, skip);

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
				<button className="appBtn" type="button"onClick={() => this.previousPage(pages, filteredURL)} >
					Previous
				</button>
				<button className="appBtn" type="button" onClick={() => this.nextPage(pages, filteredURL)}>
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
