const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api/recipe/all', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe/:category/:subCategory/:difficulty/:sortBy', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe/:id', { target: 'http://localhost:3050' }));
};
