app.factory("UserFactory",function($http){
	//return
	return {
		authenticate: function(user){
			// console.log(user);
			return $http.post('/login',user).then(function(response){
				return response.data;
			});
		} //add more methods as objects
	}
});