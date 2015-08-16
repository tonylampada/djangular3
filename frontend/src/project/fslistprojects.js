angular.module('fslistprojects', ['fsapi']);

angular.module('fslistprojects').factory('FSListProjectsModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fslistprojects').directive('fslistprojects', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'project/fslistprojects.html',
		controller: function($scope, FSListProjectsModel){

		},
	};
});