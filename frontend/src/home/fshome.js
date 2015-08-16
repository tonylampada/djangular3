angular.module('fshome', ['fsapi']);

angular.module('fshome').factory('FSHomeModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fshome').directive('fshome', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'home/fshome.html',
		controller: function($scope, FSHomeModel){

		},
	};
});