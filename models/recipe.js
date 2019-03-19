const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	//slow cooker
	category: {
		type: String,
		required: true
	},
	//meatless
	subCategory: {
		type: String,
		required: true
	},
	starRating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	contributor: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	//easy medium hard
	difficulty: {
		type: String,
		required: true
	},
	prepTime: {
		type: String,
		required: true
	},
	cookTime: {
		type: String,
		required: true
	},
	totalTime: {
		type: String,
		required: true
	},
	ingredients: {
		type: [String],
		required: true
	},
	instructions: {
		type: String,
		required: true
	},
	notes: String
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;
