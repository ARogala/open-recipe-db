const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api/recipe/random', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe/:id', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe/:name/:category/:subCategory/:difficulty/:sortBy/:skip', { target: 'http://localhost:3050' }));
	app.use(proxy('/api/recipe', { target: 'http://localhost:3050' }));	
};
