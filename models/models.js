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
	User: mongoose.model('User', userSchema)   
};