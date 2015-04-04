var bluebird = require('bluebird');
var mongoose = require('mongoose');
var models = require('./models');
var User = models.User;

var data = {
	User: [
		{user_name: "richard_chat", display_name: "Richard", user_email: "richard@richard.net", user_password: "rockandroll"},
		{user_name: "sam_123", display_name: "Sam", user_email: "sam@sam.com", user_password: "rockandroll"},
		{user_name: "ash_coffee", display_name: "Ash!", user_email: "ash@ashryanbeats.com", user_password: "rockandroll"}
	]
};

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {

    	bluebird.all(data.User.map(function(row) {
    		return User.create(row);
    	}))
    		.then(function(saved) {
    			return console.log(saved);
    		})
    		.catch(function(error) {
    			return console.log(error);
    	});
        
        // console.log("Dropped old data, now inserting data");
        // async.each(Object.keys(data),
        //     function(modelName, outerDone) {
        //         async.each(data[modelName],
        //             function(d, innerDone) {
        //                 models[modelName].create(d, innerDone);
        //             },
        //             outerDone
        //         );
        //     },
        //     function(err) {
        //         console.log("Finished inserting data");
        //         console.log("Control-C to quit");
        //     }
        // );
    });
});