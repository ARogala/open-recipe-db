import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { getRecipeById, editRecipe } from '../redux/actions';

import { formatYYYYMMDD } from '../formatDate';

class EditRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contributor: '',
			date: '',
			title: '',
			category: '',
			subCategory: '',
			rating: '',
			difficulty: '',
			prepHours: '',
			prepMinutes: '',
			cookHours: '',
			cookMinutes: '',
			ingredients: [''],
			instructions: '',
			notes: '',
			toastCount: 0
		};
		//Note: toastCount is only used to ensure toast notify and link to recipe page a displayed once
		//after successful update and not again if user goes back to edit page from recipe page
		//bc navigation between pages does not cause state to reset
	}

	componentDidMount() {
		//get id parameter from url and fetch recipe from api
		const id = this.props.match.params.id;
		this.props.getRecipeById(id);
	}

	componentDidUpdate(prevProps) {
		const { recipe } = this.props.recipe;
		if (this.props.recipe.loaded !== prevProps.recipe.loaded && this.props.recipe.recipe.length === 1) {
			this.setState({
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
			});
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

	handleContributorChange(e) {
		this.setState({
			contributor: e.target.value
		});
	}

	handleDateChange(e) {
		this.setState({
			date: e.target.value
		});
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value
		});
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

	handleRatingChange(e) {
		this.setState({
			rating: e.target.value
		});
	}

	handleDifficultyChange(e) {
		this.setState({
			difficulty: e.target.value
		});
	}

	handlePrepHoursChange(e) {
		this.setState({
			prepHours: e.target.value
		});
	}

	handlePrepMinutesChange(e) {
		this.setState({
			prepMinutes: e.target.value
		});
	}

	handleCookHoursChange(e) {
		this.setState({
			cookHours: e.target.value
		});
	}

	handleCookMinutesChange(e) {
		this.setState({
			cookMinutes: e.target.value
		});
	}

	handleIngredientChange(e, idx) {
		const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
			if (sidx !== idx) {
				return ingredient;
			}

			return e.target.value;
		});
		this.setState({ ingredients: newIngredients });
	}

	addIngredient() {
		this.setState({ ingredients: this.state.ingredients.concat('') });
	}

	removeIngredient(idx) {
		this.setState({
			ingredients: this.state.ingredients.filter((_, sidx) => sidx !== idx)
		});
	}

	handleInstructionsChange(e) {
		this.setState({
			instructions: e.target.value
		});
	}

	handleNotesChange(e) {
		this.setState({
			notes: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const id = this.props.match.params.id;
		const prepTime = {
			hours: parseInt(this.state.prepHours),
			minutes: parseInt(this.state.prepMinutes)
		};

		const cookTime = {
			hours: parseInt(this.state.cookHours),
			minutes: parseInt(this.state.cookMinutes)
		};

		const totalMin = prepTime.hours * 60 + prepTime.minutes + cookTime.hours * 60 + cookTime.minutes;
		const totalHrs = Math.floor(totalMin / 60);
		const min = totalMin - totalHrs * 60;

		const totalTime = {
			hours: totalHrs,
			minutes: min
		};

		const recipe = {
			name: this.state.title,
			category: this.state.category,
			subCategory: this.state.subCategory,
			starRating: this.state.rating,
			contributor: this.state.contributor,
			date: this.state.date,
			difficulty: this.state.difficulty,
			prepTime: prepTime,
			cookTime: cookTime,
			totalTime: totalTime,
			ingredients: this.state.ingredients,
			instructions: this.state.instructions,
			notes: this.state.notes
		};
		this.props.editRecipe(recipe, id);
		this.handleFormReset();

		let count = this.state.toastCount;
		count = count + 1;
		this.setState({ toastCount: count });
	}

	handleFormReset() {
		this.setState({
			contributor: '',
			date: '',
			title: '',
			category: '',
			subCategory: '',
			rating: '',
			difficulty: '',
			prepHours: '',
			prepMinutes: '',
			cookHours: '',
			cookMinutes: '',
			ingredients: [''],
			instructions: '',
			notes: ''
		});
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
					<p>View updated recipe!</p>
					<Link to={`/recipe/${res[0]._id}`}>{`Title: ${res[0].name}`}</Link>
				</div>
			);
		} else {
			return (
				<form className="search" onSubmit={e => this.handleSubmit(e)}>
					<fieldset>
						<legend>Edit recipe</legend>

						<label htmlFor="contributor">Contributor:</label>
						<input
							type="text"
							id="contributor"
							value={this.state.contributor}
							onChange={e => this.handleContributorChange(e)}
							required
						/>

						<label htmlFor="date">Date:</label>
						<input
							type="date"
							id="date"
							value={this.state.date}
							onChange={e => this.handleDateChange(e)}
							required
						/>

						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							value={this.state.title}
							onChange={e => this.handleTitleChange(e)}
							required
						/>

						<label htmlFor="category">Category:</label>
						<select
							className="search__select"
							id="category"
							value={this.state.category}
							onChange={e => this.handleCategoryChange(e)}
							required
						>
							<option value="" disabled>
								--Choose a Category--
							</option>
							<option value="Appetizers">Appetizers</option>
							<option value="Beverages">Beverages</option>
							<option value="Sides">Sides</option>
							<option value="Main Dishes">Main Dishes</option>
							<option value="Breakfast">Breakfast</option>
							<option value="Lunch">Lunch</option>
							<option value="Brunch">Brunch</option>
							<option value="Desserts">Desserts</option>
							<option value="Breads">Breads</option>
							<option value="Soups">Soups</option>
							<option value="Stews & Chili">Stews & Chili</option>
							<option value="Pasta, Sauces, & Noodles">Pasta, Sauces, & Noodles</option>
							<option value="Salad & Dressings">Salad & Dressings</option>
							<option value="Grilling">Grilling</option>
							<option value="Smoked">Smoked</option>
							<option value="Burgers">Burgers</option>
							<option value="Sandwiches">Sandwiches</option>
							<option value="Pizza">Pizza</option>
							<option value="Slow & Pressure Cooker">Slow & Pressure Cooker</option>
							<option value="Skillet & Stir-Fries">Skillet & Stir-Fries</option>
							<option value="Oven Baked & Broiled">Oven Baked & Broiled</option>
							<option value="Beans, Grains, & Rice">Beans, Grains, & Rice</option>
							<option value="Casseroles">Casseroles</option>
						</select>

						<label htmlFor="subCategory">SubCategory:</label>
						<select
							className="search__select"
							id="subCategory"
							value={this.state.subCategory}
							onChange={e => this.handleSubCategoryChange(e)}
							required
						>
							<option value="" disabled>
								--Choose a SubCategory--
							</option>
							<option value="Diet">Diet</option>
							<option value="Meatless & Vegan">Meatless & Vegan</option>
							<option value="Slow & Pressure Cooker">Slow & Pressure Cooker</option>
							<option value="Poultry">Poultry</option>
							<option value="Beef">Beef</option>
							<option value="Pork">Pork</option>
							<option value="Lamb">Lamb</option>
							<option value="Duck">Duck</option>
							<option value="Turkey">Turkey</option>
							<option value="Sausages">Sausages</option>
							<option value="Seafood">Seafood</option>
							<option value="Fruit">Fruit</option>
							<option value="Vegetables">Vegetables</option>
							<option value="Cookies & Biscuits">Cookies & Biscuits</option>
							<option value="Cakes & Cupcakes">Cakes & Cupcakes</option>
							<option value="Custards & Puddings">Custards & Puddings</option>
							<option value="Pies, Tarts, Cobblers, & Crisp">Pies, Tarts, Cobblers, & Crisp</option>
							<option value="Chocolates & Candies">Chocolates & Candies</option>
							<option value="Pastries">Pastries</option>
							<option value="Frozen">Frozen</option>
							<option value="Other">Other</option>
						</select>

						<label htmlFor="rating">Rating:</label>
						<select
							className="search__select"
							id="rating"
							value={this.state.rating}
							onChange={e => this.handleRatingChange(e)}
							required
						>
							<option value="" disabled>
								--Choose a Rating--
							</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>

						<label htmlFor="difficulty">Difficulty:</label>
						<select
							className="search__select"
							id="difficulty"
							value={this.state.difficulty}
							onChange={e => this.handleDifficultyChange(e)}
							required
						>
							<option value="" disabled>
								--Choose a Difficulty--
							</option>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
							<option value="Pro Chef">Pro Chef</option>
						</select>

						<fieldset>
							<legend>Prep Time</legend>
							<label htmlFor="prepHours">Hours:</label>
							<input
								type="number"
								id="prepHours"
								min="0"
								max="24"
								value={this.state.prepHours}
								onChange={e => this.handlePrepHoursChange(e)}
								required
							/>
							<label htmlFor="prepMinutes">Minutes:</label>
							<input
								type="number"
								id="prepMinutes"
								min="0"
								max="60"
								value={this.state.prepMinutes}
								onChange={e => this.handlePrepMinutesChange(e)}
								required
							/>
						</fieldset>

						<fieldset>
							<legend>Cook Time</legend>
							<label htmlFor="cookHours">Hours:</label>
							<input
								type="number"
								id="cookHours"
								min="0"
								max="24"
								value={this.state.cookHours}
								onChange={e => this.handleCookHoursChange(e)}
								required
							/>
							<label htmlFor="cookMinutes">Minutes:</label>
							<input
								type="number"
								id="cookMinutes"
								min="0"
								max="60"
								value={this.state.cookMinutes}
								onChange={e => this.handleCookMinutesChange(e)}
								required
							/>
						</fieldset>

						<fieldset>
							<legend>Ingredients:</legend>
							{this.state.ingredients.map((ingredient, idx) => {
								return (
									<div key={idx}>
										<input
											type="text"
											placeholder={`Ingredient #${idx + 1}`}
											value={ingredient}
											onChange={e => this.handleIngredientChange(e, idx)}
											required
										/>
										<button
											className="appBtn"
											type="button"
											onClick={() => this.removeIngredient(idx)}
										>
											-
										</button>
									</div>
								);
							})}
							<div className="appBtnContainer">
								<button className="appBtn" type="button" onClick={() => this.addIngredient()}>
									Add Ingredient
								</button>
							</div>
						</fieldset>

						<label htmlFor="instructions">Instructions:</label>
						<textarea
							id="instructions"
							spellCheck="true"
							rows="10"
							cols="40"
							value={this.state.instructions}
							onChange={e => this.handleInstructionsChange(e)}
							required
						/>

						<label htmlFor="notes">Notes:</label>
						<textarea
							id="notes"
							spellCheck="true"
							rows="10"
							cols="40"
							value={this.state.notes}
							onChange={e => this.handleNotesChange(e)}
						/>

						<div className="appBtnContainer">
							<button className="appBtn" type="submit" value="Submit">
								Update Recipe
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
