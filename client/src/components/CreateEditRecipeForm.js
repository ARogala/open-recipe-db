import React from 'react';
import CategoryOptions from './CategoryOptions';
import SubCategoryOptions from './SubCategoryOptions';

class CreateEditRecipeForm extends React.Component {
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
			notes: ''
		};
	}

	//fill form with recipe if on edit page
	componentDidUpdate(prevProps) {
		const formState = this.props.formState;
		if (formState !== prevProps.formState) {
			this.setState({
				contributor: formState.contributor,
				date: formState.date,
				title: formState.title,
				category: formState.category,
				subCategory: formState.subCategory,
				rating: formState.rating,
				difficulty: formState.difficulty,
				prepHours: formState.prepHours,
				prepMinutes: formState.prepMinutes,
				cookHours: formState.cookHours,
				cookMinutes: formState.cookMinutes,
				ingredients: formState.ingredients,
				instructions: formState.instructions,
				notes: formState.notes
			});
		}
	}

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
		this.props.passRecipe(recipe);
		this.handleFormReset();
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
		return (
			<form className="form" onSubmit={e => this.handleSubmit(e)}>
				<fieldset className="form__fieldset">
					<legend className="form__legend">{this.props.legendText}</legend>
					<div className="flexContainer">
						<div className="flexBox1">
							<label className="form__label" htmlFor="contributor">
								Contributor:
							</label>
							<div className="form__input-div">
								<input
									className="form__input"
									type="text"
									id="contributor"
									value={this.state.contributor}
									onChange={e => this.handleContributorChange(e)}
									required
								/>
							</div>
							<label className="form__label" htmlFor="date">
								Date:
							</label>
							<div className="form__input-div">
								<input
									className="form__input"
									type="date"
									id="date"
									value={this.state.date}
									onChange={e => this.handleDateChange(e)}
									required
								/>
							</div>
							<label className="form__label" htmlFor="title">
								Title:
							</label>
							<div className="form__input-div">
								<input
									className="form__input"
									type="text"
									id="title"
									value={this.state.title}
									onChange={e => this.handleTitleChange(e)}
									required
								/>
							</div>
							<label className="form__label" htmlFor="category">
								Category:
							</label>
							<div className="form__select-div">
								<select
									className="form__select"
									id="category"
									value={this.state.category}
									onChange={e => this.handleCategoryChange(e)}
									required
								>
									<option value="" disabled>
										--Choose a Category--
									</option>
									<CategoryOptions />
								</select>
							</div>
							<label className="form__label" htmlFor="subCategory">
								SubCategory:
							</label>
							<div className="form__select-div">
								<select
									className="form__select"
									id="subCategory"
									value={this.state.subCategory}
									onChange={e => this.handleSubCategoryChange(e)}
									required
								>
									<option value="" disabled>
										--Choose a SubCategory--
									</option>
									<SubCategoryOptions />
								</select>
							</div>
							<label className="form__label" htmlFor="rating">
								Rating:
							</label>
							<div className="form__select-div">
								<select
									className="form__select"
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
							</div>
							<label className="form__label" htmlFor="difficulty">
								Difficulty:
							</label>
							<div className="form__select-div">
								<select
									className="form__select"
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
							</div>
						</div>
						<div className="flexBox2">
							<fieldset className="form__fieldset form__fieldset-inner">
								<legend className="form__legend">Prep Time</legend>
								<label className="form__label" htmlFor="prepHours">
									Hours:
								</label>
								<div className="form__input-div">
									<input
										className="form__input"
										type="number"
										id="prepHours"
										min="0"
										max="24"
										value={this.state.prepHours}
										onChange={e => this.handlePrepHoursChange(e)}
										required
									/>
								</div>
								<label className="form__label" htmlFor="prepMinutes">
									Minutes:
								</label>
								<div className="form__input-div">
									<input
										className="form__input"
										type="number"
										id="prepMinutes"
										min="0"
										max="60"
										value={this.state.prepMinutes}
										onChange={e => this.handlePrepMinutesChange(e)}
										required
									/>
								</div>
							</fieldset>

							<fieldset className="form__fieldset form__fieldset-inner">
								<legend className="form__legend">Cook Time</legend>
								<label className="form__label" htmlFor="cookHours">
									Hours:
								</label>
								<div className="form__input-div">
									<input
										className="form__input"
										type="number"
										id="cookHours"
										min="0"
										max="24"
										value={this.state.cookHours}
										onChange={e => this.handleCookHoursChange(e)}
										required
									/>
								</div>
								<label className="form__label" htmlFor="cookMinutes">
									Minutes:
								</label>
								<div className="form__input-div">
									<input
										className="form__input"
										type="number"
										id="cookMinutes"
										min="0"
										max="60"
										value={this.state.cookMinutes}
										onChange={e => this.handleCookMinutesChange(e)}
										required
									/>
								</div>
							</fieldset>
						</div>
						<div className="flexBox3">
							<fieldset className="form__fieldset form__fieldset-inner">
								<legend className="form__legend">Ingredients:</legend>
								{this.state.ingredients.map((ingredient, idx) => {
									return (
										<div key={idx} className="form__ingredient-div">
											<div className="form__input-div form__ingredient-input-div">
												<input
													className="form__input form__ingredient-input"
													type="text"
													placeholder={`Ingredient #${idx + 1}`}
													value={ingredient}
													onChange={e => this.handleIngredientChange(e, idx)}
													required
												/>
											</div>
											<button
												className="appBtn ingredientBtn"
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
						</div>
						<div className="flexBox4">
							<label className="form__label" htmlFor="instructions">
								Instructions:
							</label>
							<div className="form__textarea-div">
								<textarea
									className="form__textarea"
									id="instructions"
									spellCheck="true"
									rows="10"
									cols="40"
									value={this.state.instructions}
									onChange={e => this.handleInstructionsChange(e)}
									required
								/>
							</div>
						</div>
						<div className="flexBox5">
							<label className="form__label" htmlFor="notes">
								Notes:
							</label>
							<div className="form__textarea-div">
								<textarea
									className="form__textarea"
									id="notes"
									spellCheck="true"
									rows="10"
									cols="40"
									value={this.state.notes}
									onChange={e => this.handleNotesChange(e)}
								/>
							</div>
						</div>
						<div className="flexBox6">
							<div className="appBtnContainer">
								<button className="appBtn" type="submit" value="Submit">
									{this.props.buttonText}
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
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}

export default CreateEditRecipeForm;
