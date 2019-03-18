const Recipe = require('../models/recipe');

module.exports = {
	create: function(req, res, next) {
		const recipeProps = req.body;
		Recipe.create(recipeProps)
			.then(recipe => res.send(recipe))
			.catch(next);
	}
};
