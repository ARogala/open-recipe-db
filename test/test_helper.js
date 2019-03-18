const mongoose = require('mongoose');
//before the test runs connect to the db
before(done => {
	mongoose.connect('mongodb://localhost:27017/recipe_test', { useNewUrlParser: true });
	mongoose.connection
		.once('open', () => done())
		.on('error', err => {
			console.warn('Warning', err);
		});
});
//before each test drop the recipes collection
beforeEach(done => {
	const { recipes } = mongoose.connection.collections;
	recipes
		.drop()
		.then(() => done())
		.catch(() => done());
});
