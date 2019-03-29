import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import CreateEditRecipeForm from './CreateEditRecipeForm';
import { getRecipeById, editRecipe } from '../redux/actions';
import { formatYYYYMMDD } from '../formatDate';

class EditRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formState: {},
			toastCount: 0
		};
		//Note: toastCount used to ensure toast notify and link to recipe page are displayed only once
		//after successful update and not again if user goes back to edit page from recipe page
		//bc navigation between pages does not cause state to reset

		//formState is the recipe found by getRecipeById and it is passed to the form to display
	}

	componentDidMount() {
		//get id parameter from url and fetch recipe from api
		const id = this.props.match.params.id;
		this.props.getRecipeById(id);
	}

	componentDidUpdate(prevProps) {
		const { recipe } = this.props.recipe;
		if (this.props.recipe.loaded !== prevProps.recipe.loaded && this.props.recipe.recipe.length === 1) {
			this.setState({formState: {
				contributor: recipe[0].contributor,
				date: formatYYYYMMDD(recipe[0].date),
				title: recipe[0].name,
				category: recipe[0].category,
				subCategory: recipe[0].subCategory,
				rating: recipe[0].starRating,
				difficulty: recipe[0].difficulty,
				prepHours: recipe[0].prepTime.hours,
				prepMinutes: recipe[0].prepTime.minutes,
				cookHours: recipe[0].cookTime.hours,
				cookMinutes: recipe[0].cookTime.minutes,
				ingredients: recipe[0].ingredients,
				instructions: recipe[0].instructions,
				notes: recipe[0].notes
			}});
		}
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
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};

	notify = () => {
		toast.success('Recipe updated successfully!', {
			position: toast.POSITION.TOP_CENTER
		});
	};

	passRecipe(recipe) {
		const id = this.props.match.params.id;
		
		this.props.editRecipe(recipe, id);

		let count = this.state.toastCount;
		count = count + 1;
		this.setState({ toastCount: count });
	}

	render() {
		//console.log('Recipe: ', this.props.recipe);
		//console.log('putRecipeRes: ', this.props.putRecipeRes);
		const getError = this.props.recipe.error;
		const getLoaded = this.props.recipe.loaded;
		const getRecipe = this.props.recipe.recipe;

		const putError = this.props.putRecipeRes.error;
		const putLoaded = this.props.putRecipeRes.loaded;
		const btnClicked = this.props.putRecipeRes.btnClicked;
		const res = this.props.putRecipeRes.res;

		if (getError || getRecipe.error || putError || res.error) {
			return this.renderError();
		} else if (getLoaded === false || (putLoaded === false && btnClicked === true)) {
			return this.renderLoader();
		} else if (res.length === 1 && this.state.toastCount === 1) {
			return (
				<div>
					{this.notify()}
					<p>View updated recipe.</p>
					<Link to={`/recipe/${res[0]._id}`}>{`Title: ${res[0].name}`}</Link>
				</div>
			);
		} else {
			return (
				<CreateEditRecipeForm 
					passRecipe={(recipe) => this.passRecipe(recipe)}
					formState={this.state.formState}
					legendText='Edit recipe'
					buttonText='Update Recipe'
				/>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		recipe: state.recipe,
		putRecipeRes: state.putRecipeRes
	};
};

const mapDispatchToProps = {
	getRecipeById: getRecipeById,
	editRecipe: editRecipe
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditRecipe);
