import React from 'react';
import { connect } from 'react-redux';

import { getFilteredRecipes, saveFilteredURL, savePages, savePage } from '../redux/actions';

//NOTE: limit of 20 recipes per page is fixed on the server
class Paginator extends React.Component {
	componentDidMount() {
		const count = this.props.recipes.recipes.count;
		const pages = Math.ceil(count / 20);
		this.props.savePages(pages);
	}

	//on page 1 skip = 0
	nextPage() {
		let { title, category, subCategory, difficulty, sortBy, skip } = this.props.filteredURL;
		const pages = this.props.pages;

		skip = skip + 20;
		const page = skip / 20 + 1;
		if (page > pages) return;

		this.props.getFilteredRecipes(title, category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(title, category, subCategory, difficulty, sortBy, skip);
		this.props.savePage(page);
	}

	previousPage() {
		let { title, category, subCategory, difficulty, sortBy, skip } = this.props.filteredURL;

		const page = skip / 20;
		skip = skip - 20;
		if (page < 1) return;

		this.props.getFilteredRecipes(title, category, subCategory, difficulty, sortBy, skip);
		this.props.saveFilteredURL(title, category, subCategory, difficulty, sortBy, skip);
		this.props.savePage(page);
	}

	render() {
		const pages = this.props.pages;
		const page = this.props.page;

		if (pages === 1) {
			return (
				<p style={{ textAlign: 'center' }}>
					Page {page} of {pages}
				</p>
			);
		} else if (pages === 0) {
			return null;
		} else if (page === 1) {
			return (
				<div className="appBtnContainer">
					<button className="appBtn" type="button" onClick={() => this.nextPage()}>
						Next
					</button>
					<p>
						Page {page} of {pages}
					</p>
				</div>
			);
		} else if (pages === page) {
			return (
				<div className="appBtnContainer">
					<button className="appBtn" type="button" onClick={() => this.previousPage()}>
						Previous
					</button>
					<p>
						Page {page} of {pages}
					</p>
				</div>
			);
		} else {
			return (
				<div className="appBtnContainer">
					<button className="appBtn" type="button" onClick={() => this.previousPage()}>
						Previous
					</button>
					<button className="appBtn" type="button" onClick={() => this.nextPage()}>
						Next
					</button>
					<p>
						Page {page} of {pages}
					</p>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		filteredURL: state.filteredURL,
		recipes: state.recipes,
		pages: state.pages,
		page: state.page
	};
};

const mapDispatchToProps = {
	getFilteredRecipes: getFilteredRecipes,
	saveFilteredURL: saveFilteredURL,
	savePages: savePages,
	savePage: savePage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Paginator);
