var router = require('express').Router();
var path = require('path');
var User = require('../models').User;

module.exports = function(passport) {
	router.get('/', function(req, res, next) {
		console.log(req.session);
		res.sendFile(path.join(__dirname, '../views/index.html'));

	});

	router.post('/login', passport.authenticate('local-login'), function(req, res, next) {
		console.log("/login");
		res.send(req.user);
	});

	return router;
}