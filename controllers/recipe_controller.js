const Recipe = require('../models/recipe');
/* the response for each endpoint has the following form
getById     	[{}]
getRandom       { all: [{},{},{}], count: 20 }
getFiltered		{ all: [{},{},{}], count: 20 }
create			[{}]
edit			[{}]
delete			[{ msg: 'delete successful' }]
*/
module.exports = {
	getById: function(req, res, next) {
		Recipe.find({ _id: req.params.id })
			.then(recipe => res.send(recipe))
			.catch(next);
	},
	getRandom: function(req, res, next) {
		Recipe.aggregate([{ $sample: { size: 20 } }])
			.then(recipes => res.send({ all: recipes, count: recipes.length }))
			.catch(next);
	},
	getFiltered: function(req, res, next) {
		const skip = parseInt(req.params.skip);
		const query = Recipe.find(getConditions(req.params)[0])
			.sort(getConditions(req.params)[1])
			.skip(skip)
			.limit(20);

		Promise.all([query, Recipe.find(getConditions(req.params)[0]).countDocuments()])
			.then(results => res.send({ all: results[0], count: results[1] }))
			.catch(next);
	},
	create: function(req, res, next) {
		const recipeProps = req.body;
		Recipe.create(recipeProps)
			.then(recipe => res.send([recipe]))
			.catch(next);
	},
	edit: function(req, res, next) {
		const recipeId = req.params.id;
		const recipeProps = req.body;
		Recipe.findByIdAndUpdate({ _id: recipeId }, recipeProps)
			.then(() => Recipe.findById({ _id: recipeId }))
			.then(recipe => res.send([recipe]))
			.catch(next);
	},
	delete: function(req, res, next) {
		const recipeId = req.params.id;
		Recipe.findByIdAndRemove({ _id: recipeId })
			.then(() => res.status(200).send([{ msg: 'delete successful' }]))
			.catch(next);
	}
};

function getConditions(params) {
	let filterConditions = {};
	let sortConditions = {};
	if (params.name !== 'undefined') {
		filterConditions.$text = { $search: params.name };
	}
	if (params.category !== 'undefined') {
		filterConditions.category = params.category;
	}
	if (params.subCategory !== 'undefined') {
		filterConditions.subCategory = params.subCategory;
	}
	if (params.difficulty !== 'undefined') {
		filterConditions.difficulty = params.difficulty;
	}
	if (params.sortBy === 'starRating') {
		sortConditions.starRating = -1;
	}
	if (params.sortBy === 'date') {
		sortConditions.date = -1;
	}
	if (params.sortBy === 'totalTime') {
		sortConditions.totalTime = 1;
	}
	return [filterConditions, sortConditions];
}
