app.controller("LoginController",function($scope, UserFactory){

	$scope.userLogin = function(){
		// console.log($scope.user);
		UserFactory.authenticate($scope.user)
			.then(function(currentUser){
				$scope.showChatroom = true;
				$scope.loginstatus = "";
			})
			.catch(function(error){
				console.log(error);
				$scope.loginstatus = "invalid";
			})
	}
});