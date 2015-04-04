app.controller("LoginController",function($scope, UserFactory){

	$scope.userLogin = function(){
		// console.log($scope.user);
		UserFactory.authenticate($scope.user)
			.then(function(response){
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
	}
});