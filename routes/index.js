var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res, next) {
	console.log("got here");
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;