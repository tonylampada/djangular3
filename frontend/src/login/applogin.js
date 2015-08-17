angular.module('applogin', ['appapi']);

angular.module('applogin').factory('AppLoginModel', function(AppAuth, AppApi, $state){
	var m = {
		username: '',
		password: '',
		loading: false,
		login: login,
	};

	function login(){
		m.loading = true;
		AppApi.login(m.username, m.password).then(function(result){
			var logged_user = result.data;
			if(logged_user){
				AppAuth.set_user(result.data);
				$state.go('home');
			} else {
				alert('wrong credentials');
			}
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('applogin').directive('applogin', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'login/applogin.html',
		controller: function($scope, AppLoginModel){
			$scope.m = AppLoginModel;
		},
	};
});
