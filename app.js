const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

if (process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost:27017/recipe', { useNewUrlParser: true });
	mongoose.set('useFindAndModify', false);
	mongoose.connection
		.once('open', () => console.log('connected to db'))
		.on('error', err => {
			console.warn('Warning', err);
		});
}

//define middleware
app.use(bodyParser.json());
routes(app);
//err will be defined if previous middleware throws an err (so if routes throws err)
//next is a function that gets called to run the next middleware in the chain
app.use((err, req, res, next) => {
	res.status(422).send({ error: err._message });
});

module.exports = app;
