angular.module('appviewuser', ['appapi']);

angular.module('appviewuser').factory('AppViewUserModel', function(AppApi){
	var m = {
		loading: false,
		user: null,
		load: load,
	};

	function load(username){
		m.loading = true;
		AppApi.get_user_details(username).then(function(result){
			m.user = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('appviewuser').controller('ViewUserStateCtrl', function($scope, $stateParams, AppViewUserModel){
	var login = $stateParams.login;
	AppViewUserModel.load(login);
});

angular.module('appviewuser').directive('appviewuser', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'viewuser/appviewuser.html',
		controller: function($scope, AppViewUserModel){
			$scope.m = AppViewUserModel;
		},
	};
});