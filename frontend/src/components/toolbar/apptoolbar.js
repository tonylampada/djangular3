angular.module('apptoolbar', ['appauth']);

angular.module('apptoolbar').directive('apptoolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'components/toolbar/apptoolbar.html',
		controller: function($scope, AppAuth, $state){
			$scope.auth = AppAuth;
			$scope.$state = $state;
		}
	};
});
