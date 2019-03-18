const RecipeController = require('../controllers/recipe_controller');

module.exports = app => {
	app.post('/api/recipe', RecipeController.create);
};
