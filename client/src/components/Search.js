import React from 'react';

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

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.category);
		console.log(this.state.subCategory);
		console.log(this.state.difficulty);
		console.log(this.state.sortBy);
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
						>
							<option value="undefined">--Choose a SubCategory--</option>
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

export default Search;
