const Recipe = require('../models/recipe');

module.exports = {
	create: function(req, res, next) {
		console.log(req.body);
	}
};
