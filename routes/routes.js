const RecipeController = require('../controllers/recipe_controller');
//routing order matters
//https://stackoverflow.com/questions/17735610/node-js-express-route-naming-and-ordering-how-is-precedence-determined/17735823
//https://stackoverflow.com/questions/32603818/order-of-router-precedence-in-express-js
module.exports = app => {
	app.get('/api/recipe/all', RecipeController.getAll);

	app.get('/api/recipe/random', RecipeController.getRandom);

	app.get('/api/recipe/:id', RecipeController.getById);

	app.get('/api/recipe/:category/:subCategory/:difficulty/:sortBy', RecipeController.getFiltered);

	app.post('/api/recipe', RecipeController.create);

	app.put('/api/recipe/:id', RecipeController.edit);

	app.delete('/api/recipe/:id', RecipeController.delete);
};
