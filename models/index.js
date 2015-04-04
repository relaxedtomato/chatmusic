var bluebird = require('bluebird');
// var User = bluebird.promisifyAll(models.User);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatmusic');
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));

var userSchema = new mongoose.Schema({
	user_name: String,
	display_name: String,
	user_email: String,
	user_password: String
});

module.exports = {
	User: bluebird.promisifyAll(mongoose.model('User', userSchema))   
};