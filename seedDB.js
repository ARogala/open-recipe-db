const faker = require('faker');

function createRecipe() {
	return {
		name: faker.lorem.sentence(),
		category: category[randomBetween(0, category.length)],
		subCategory: subCategory[randomBetween(0, subCategory.length)],
		starRating: randomBetween(1, 5),
		contributor: faker.name.findName(),
		date: faker.date.past(),
		difficulty: difficulty[randomBetween(0, difficulty.length)],
		prepTime: faker.lorem.word(),
		cookTime: faker.lorem.word(),
		totalTime: faker.lorem.word(),
		ingredients: fillIngredients(),
		instructions: faker.lorem.paragraphs(),
		notes: faker.lorem.paragraph()
	};
}

function randomBetween(min, max) {
	return ~~(Math.random() * (max - min)) + min;
}

function fillIngredients() {
	let ranNum = randomBetween(5, 15);
	let ingredients = [];

	for (let i = 0; i < ranNum; i++) {
		ingredients.push(faker.lorem.word());
	}
	return ingredients;
}

const difficulty = ['easy', 'medium', 'hard', 'pro chef'];

const category = [
	'Appetizers',
	'Beverages',
	'Soups',
	'Stews & Chili',
	'Pasta, Sauces, & Noodles',
	'Salad & Dressings',
	'Grilling',
	'Sides',
	'Main Dishes',
	'Breakfast',
	'Lunch',
	'Brunch',
	'Desserts',
	'Breads',
	'Slow Cooker & Pressure Cooker',
	'Burgers',
	'Sandwiches',
	'Pizza',
	'Skillet & Stir-Fries',
	'Oven Baked & Broiled',
	'Beans, Grains, & Rice',
	'Casseroles'
];

const subCategory = [
	'Diet',
	'Slow Cooker & Pressure Cooker',
	'Meatless & Vegan',
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
	'Frozen',
	'Pies, Tarts, Cobblers, & Crisp',
	'Chocolates & Candies',
	'Pastries',
	'Other'
];

const recipe = createRecipe();
console.log(recipe);
