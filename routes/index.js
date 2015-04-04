var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res, next) {
	console.log("got here");
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/login', function(req, res, next) {
	console.log("/login");
	console.log(req.body);
	res.send(req.body);
});

module.exports = router;