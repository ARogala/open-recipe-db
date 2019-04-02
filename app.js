const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const keys = require('./config/keys');
const app = express();

// url for local dev without mlab
// mongodb://localhost:27017/recipe
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
	mongoose.set('useFindAndModify', false);
	mongoose.connection
		.once('open', () => {
			console.log('connected to db');
		})
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
	res.status(422).send({ error: err.message });
});

if(process.env.NODE_ENV === 'production') {
	// express will serve up production assets
	// like our main.js and main.css files from client build
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesnt recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
