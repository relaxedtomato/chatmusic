var router = require('express').Router();
var path = require('path');
var User = require('../models').User;
var passport = require('passport');

// Init Passport's configuration
require('../config')(passport);

// passport init
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res, next) {
	console.log("got here");
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/login', function(req, res, next) {
	console.log("/login");
	console.log(req.body);

	passport.authenticate('local-login', {
	    successRedirect: '/loginSuccess',
	    failureRedirect: '/loginFailure'
	});

	res.send(req.body);
});

router.get('/loginSuccess', function(req, res, next) {
	res.send("Successful Login");
});

router.get('/loginFailure', function(req, res, next) {
	res.send("Failed Login");
});

module.exports = router;