angular.module('fsviewuser', ['fsapi']);

angular.module('fsviewuser').factory('FSViewUserModel', function(FSApi){
	var m = {
		loading: false,
		user: null,
		load: load,
	};

	function load(username){
		m.loading = true;
		FSApi.get_user_details(username).then(function(result){
			m.user = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('fsviewuser').controller('ViewUserStateCtrl', function($scope, $stateParams, FSViewUserModel){
	var login = $stateParams.login;
	FSViewUserModel.load(login);
});

angular.module('fsviewuser').directive('fsviewuser', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'viewuser/fsviewuser.html',
		controller: function($scope, FSViewUserModel){
			$scope.m = FSViewUserModel;
		},
	};
});