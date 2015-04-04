var router = require('express').Router();
var path = require('path');
var User = require('../models/models.js').User;

router.get('/', function(req, res, next) {
	console.log("got here");
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/login', function(req, res, next) {
	console.log("/login");
	console.log(req.body);

	// User.find({req.body}).exec().then(function())
	//BreakPoint: Checking against database before responding authentication


	res.send(req.body);
});

module.exports = router;