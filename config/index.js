//load the local-passport module 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/index').User;

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	//invoked on every request by passport.session. it enables us to load additional user information on every request 
	//the userobject is attached to the request as req.user which makes it accessbile in our request handling 
	passport.deserializeUser(function(id, next){
		User.findById(id).then(next);
	});

	// Set Middleware for passport..?
	passport.use('local-login', new LocalStrategy({
		usernameField: 'user_name', 
		passwordField: 'user_password', 
		passReqToCallback: true
	}, function(req, user_name, user_password, next) {
		User
		.findOne({'user_name': user_name})
		.then(function(user) {
			console.log('User found'); 

			if (!user) return next(null, false, 'Wrong UserName.');
			if (!user.validatePassword(password)) return next(null, false, 'Wrong Password!');

			//the middleware will call req.login (a passport function attached to the request)
			//this calls our passport.serializeUser method 
			return next(null, user);
		})
		.catch(next);
	}));
};