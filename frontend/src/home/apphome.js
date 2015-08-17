angular.module('apphome', ['appapi']);

angular.module('apphome').factory('AppHomeModel', function(AppApi){
	var m = {};

	return m;
});

angular.module('apphome').directive('apphome', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'home/apphome.html',
		controller: function($scope, AppHomeModel){

		},
	};
});