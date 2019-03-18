const Recipe = require('../models/recipe');

module.exports = {
	getAll: function(req, res, next) {
		Recipe.find({})
			.then(recipes => res.send(recipes))
			.catch(next);
	},
	create: function(req, res, next) {
		const recipeProps = req.body;
		Recipe.create(recipeProps)
			.then(recipe => res.send(recipe))
			.catch(next);
	},
	edit: function(req, res, next) {
		const recipeId = req.params.id;
		const recipeProps = req.body;
		Recipe.findByIdAndUpdate({ _id: recipeId }, recipeProps)
			.then(() => Recipe.findById({ _id: recipeId }))
			.then(recipe => res.send(recipe))
			.catch(next);
	},
	delete: function(req, res, next) {
		const recipeId = req.params.id;
		Recipe.findByIdAndRemove({ _id: recipeId })
			.then(recipe => res.status(204).send(recipe))
			.catch(next);
	}
};
