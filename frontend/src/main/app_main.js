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
		'appajax',
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
	        .state('viewuser', {url: '/user/:login', template: '<appviewuser></appviewuser>', controller: 'ViewUserStateCtrl'})
	});

	angular.module('app_main').controller('AppMainCtrl', function($scope, AppAuth){
	});

	angular.module('app_main').run(function(AppAjax){
		AppAjax.set_error_handler(function(response){
			if(response.status == 401 && response.data.not_authenticated){
				alert('Voce não está logado. Faça login pra ter acesso a esta funcionalidade');
			}
		})
	})
})();
