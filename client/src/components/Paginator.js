import React from 'react';
import { connect } from 'react-redux';

import { getFilteredRecipes } from '../redux/actions';

//NOTE: limit of 20 recipes per page is fixed on the server
class Paginator extends React.Component {
	render() {
		console.log(this.props.count);
		const count = this.props.count;
		const pages = Math.ceil(count / 20);
		console.log(pages);
		console.log(this.props.filteredURL);
		return (
			<div className="appBtnContainer">
				<button className="appBtn" type="button">
					Previous
				</button>
				<button className="appBtn" type="button">
					Next
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		filteredURL: state.filteredURL
	};
};

const mapDispatchToProps = {
	getFilteredRecipes: getFilteredRecipes
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Paginator);
