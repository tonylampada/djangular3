angular.module('fstoolbar', ['fsauth']);

angular.module('fstoolbar').directive('fstoolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'components/toolbar/fstoolbar.html',
		controller: function($scope, FSAuth){
			$scope.auth = FSAuth;
		}
	};
});
