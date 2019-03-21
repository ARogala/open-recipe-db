import React from 'react';
import { connect } from 'react-redux';

class Recipe extends React.Component {
	renderRecipe = () => {
		const id = this.props.match.params.id;

		console.log(id);
	}
	render() {
		console.log(this.props.match.params);
		console.log(this.props.recipes);
		return (
			<div>
				<p>Render Individual Recipe details</p>
				{this.renderRecipe()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

export default connect(mapStateToProps, null)(Recipe);
