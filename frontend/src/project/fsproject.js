angular.module('fsproject', ['fsapi']);

angular.module('fsproject').factory('FSProjectModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fsproject').controller('ProjectStateCtrl', function($scope, $stateParams, FSProjectModel){

});

angular.module('fsproject').directive('fsproject', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'project/fsproject.html',
		controller: function($scope, FSProjectModel){

		},
	};
});