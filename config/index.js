//load the local-passport module 
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/index').User;

module.exports = function(passport) {
	passport.serializeUser(function(user, next) {
		next(null, user.id);
	});

	passport.deserializeUser(function(id, next) {
		User
		.findById(id)
		.then(function(user) {
			next(null, user);
		})
		.catch(function (err) {
			next(err);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'user_name',
		passwordField: 'user_password'
	}, function(user_name, user_password, next) {
		User
		.findOne({ user_name : user_name })
		.then(function(user) {
			// do things here
			if (user.user_password === user_password)
				next(null, user);
			else {
				next(null, false, {message : "invalid password"});
			}
		})
		.catch(function(err) {
			next(err);
		});
	}));
};