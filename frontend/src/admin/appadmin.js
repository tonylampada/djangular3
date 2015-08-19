angular.module('appadmin', ['appapi']);

angular.module('appadmin').factory('AppAdminModel', function(AppApi){
	var m = {};

	return m;
});

angular.module('appadmin').directive('appadmin', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		template: '<iframe class="admin-iframe" src="/admin"></iframe>',
	};
});