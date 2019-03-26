const faker = require('faker');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb://localhost:27017/recipe', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.connection
	.once('open', () => {
		console.log('connected to db');
		Recipe.estimatedDocumentCount()
			.then(count => {
				const MINIMUM_RECIPES = 500;
				const RECIPES_TO_ADD = 1500;
				const drop = false;
				console.log('db count: ', count);
				if (count < MINIMUM_RECIPES && drop === false) {
					let recipes = [];
					for (let i = 0; i < RECIPES_TO_ADD; i++) {
						recipes.push(createRecipe());
					}
					Recipe.insertMany(recipes)
						.then(() => console.log('recipes added to db'))
						.catch(e => console.log(e));
				} else if (drop) {
					dropDB();
				}
			})
			.catch(e => console.log(e));
	})
	.on('error', err => {
		console.warn('Warning', err);
	});

function createRecipe() {
	const time = getTime();
	return {
		name: faker.lorem.sentence(),
		category: category[randomBetween(0, category.length - 1)],
		subCategory: subCategory[randomBetween(0, subCategory.length - 1)],
		starRating: randomBetween(1, 5),
		contributor: faker.name.findName(),
		date: getDate(),
		difficulty: difficulty[randomBetween(0, difficulty.length - 1)],
		prepTime: time[0],
		cookTime: time[1],
		totalTime: time[2],
		ingredients: fillIngredients(),
		instructions: faker.lorem.paragraphs(),
		notes: faker.lorem.paragraph()
	};
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomBetween(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTime() {
	const prepTime = {
		hours: randomBetween(0, 1),
		minutes: randomBetween(0, 60)
	};
	const cookTime = {
		hours: randomBetween(0, 8),
		minutes: randomBetween(0, 60)
	};
	const totalMin = prepTime.hours * 60 + prepTime.minutes + cookTime.hours * 60 + cookTime.minutes;
	const totalHrs = Math.floor(totalMin / 60);
	const min = totalMin - totalHrs * 60;
	const totalTime = {
		hours: totalHrs,
		minutes: min
	};

	return [prepTime, cookTime, totalTime];
}

function getDate() {
	const randomDate = faker.date.past();
	const year = randomDate.getFullYear();
	let month = randomDate.getMonth() + 1;
	let day = randomDate.getDate();
	if (month <= 9) {
		month = '0' + month;
	}
	if (day <= 9) {
		day = '0' + day;
	}

	//year-mm-dd
	const date = `${year}-${month}-${day}`;

	return date;
}

function fillIngredients() {
	let ranNum = randomBetween(5, 15);
	let ingredients = [];

	for (let i = 0; i < ranNum; i++) {
		ingredients.push(faker.lorem.word());
	}
	return ingredients;
}

const difficulty = ['Easy', 'Medium', 'Hard', 'Pro Chef'];

const category = [
	'Appetizers',
	'Beverages',
	'Sides',
	'Main Dishes',
	'Breakfast',
	'Lunch',
	'Brunch',
	'Desserts',
	'Breads',
	'Soups',
	'Stews & Chili',
	'Pasta, Sauces, & Noodles',
	'Salad & Dressings',
	'Grilling',
	'Smoked',
	'Burgers',
	'Sandwiches',
	'Pizza',
	'Slow & Pressure Cooker',
	'Skillet & Stir-Fries',
	'Oven Baked & Broiled',
	'Beans, Grains, & Rice',
	'Casseroles'
];

const subCategory = [
	'Diet',
	'Meatless & Vegan',
	'Slow & Pressure Cooker',
	'Poultry',
	'Beef',
	'Pork',
	'Lamb',
	'Duck',
	'Turkey',
	'Sausages',
	'Seafood',
	'Fruit',
	'Vegetables',
	'Cookies & Biscuits',
	'Cakes & Cupcakes',
	'Custards & Puddings',
	'Pies, Tarts, Cobblers, & Crisp',
	'Chocolates & Candies',
	'Pastries',
	'Frozen',
	'Other'
];

function dropDB() {
	const { recipes } = mongoose.connection.collections;
	recipes
		.drop()
		.then(() => console.log('recipes dropped'))
		.catch(e => console.log(e));
}
