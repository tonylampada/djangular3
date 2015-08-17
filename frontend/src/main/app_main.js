(function(){
	var deps = [
		'ui.router',
		'apptoolbar',
		'apphome',
		'applogin',
		'appadmin',
		'appviewuser',
		'appapi',
		'cameras',
	];
	if(APP.USE_TEAMPLE_CACHE){
		deps.push('apptemplates');
	}
	angular.module('app_main', deps);

	angular.module('app_main').config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
	    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	        .state('home', {url: '/', template: '<apphome></apphome>'})
	        .state('admin', {url: '/admin', template: '<appadmin></appadmin>'})
	        .state('cameras', {url: '/cameras', template: '<cameras></cameras>'})
	        .state('login', {url: '/login', template: '<applogin></applogin>'})
	    //     .state('camera', {url: '/camera', template: '<appcameras></appcameras>'})
	    //     .state('viewuser', {url: '/user/:login', template: '<fsviewuser></fsviewuser>', controller: 'ViewUserStateCtrl'})
	});

	angular.module('app_main').controller('AppMainCtrl', function($scope, AppAuth){
	});
})();
