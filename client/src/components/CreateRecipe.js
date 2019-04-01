import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import CreateEditRecipeForm from './CreateEditRecipeForm';

import { postRecipe } from '../redux/actions';

import errorIcon from '../images/error.svg';

class CreateRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toastCount: 0
		};
		//Note: toastCount used to ensure toast notify and link to recipe page are displayed only once
		//after successful upload and not again if user goes back to create page from recipe page
		//bc navigation between pages does not cause state to reset
	}

	renderError = () => {
		return (
			<div className="error">
				<img className="error__img" src={errorIcon} alt="error" />
				<p>
					Sorry an error has occured. Perhaps we are cooking too much and went over the api limit! Slow down!
				</p>
			</div>
		);
	};

	renderLoader = () => {
		return (
			<div className="loader">
				<p>Uploading Recipe</p>
				<div className="loader__div">
					<Loader type="Puff" color="#00BFFF" height="100" width="100" />
				</div>
			</div>
		);
	};

	notify = () => {
		toast.success('Recipe uploaded successfully!', {
			position: toast.POSITION.TOP_CENTER
		});
	};

	passRecipe(recipe) {
		this.props.postRecipe(recipe);

		let count = this.state.toastCount;
		count = count + 1;
		this.setState({ toastCount: count });
	}

	render() {
		//console.log(this.props.postRecipeRes);
		const { error, loaded, btnClicked, res } = this.props.postRecipeRes;
		//console.log(res);
		//api will send an error obj on res if server error occurs

		if (error || res.error) {
			return this.renderError();
		} else if (loaded === false && btnClicked === true) {
			return this.renderLoader();
		} else if (res.length === 1 && this.state.toastCount === 1) {
			return (
				<div>
					{this.notify()}
					<p>View your recipe!</p>
					<Link to={`/recipe/${res[0]._id}`}>{`Title: ${res[0].name}`}</Link>
				</div>
			);
		} else {
			return (
				<CreateEditRecipeForm
					passRecipe={recipe => this.passRecipe(recipe)}
					legendText="Add a new recipe"
					buttonText="Upload Recipe"
				/>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		postRecipeRes: state.postRecipeRes
	};
};

const mapDispatchToProps = {
	postRecipe: postRecipe
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateRecipe);
