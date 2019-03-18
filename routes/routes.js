const RecipeController = require('../controllers/recipe_controller');

module.exports = app => {
	app.post('/api/recipe', RecipeController.create);

	app.put('/api/recipe/:id', RecipeController.edit);

	app.delete('/api/recipe/:id', RecipeController.delete);
};
