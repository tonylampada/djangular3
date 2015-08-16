(function(){
	var deps = [
		'ngMaterial',
		'ui.router',
		'fsngutils',
		'fstoolbar',
		'fshome',
		'fslogin',
		'fsissue',
		'fsproject',
		'fslistprojects',
		'fssearch',
		'fssponsor',
		'fsviewuser',
		'fseditprofile',
		'fsapi',
	];
	if(APP.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('fs_main', deps);

	angular.module('fs_main').config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
	    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	        .state('home', {url: '/', template: '<fshome></fshome>'})
	        .state('login', {url: '/login', template: '<fslogin></fslogin>'})
	        .state('issue', {url: '/issue/:id/:slug', template: '<fsissue></fsissue>', controller: 'IssueStateCtrl'})
	        .state('project', {url: '/project/:id/:slug', template: '<fsproject></fsproject>', controller: 'ProjectStateCtrl'})
	        .state('listprojects', {url: '/project', template: '<fslistprojects></fslistprojects>'})
	        .state('search', {url: '/search', template: '<fssearch></fssearch>', controller: 'SearchStateCtrl'})
	        .state('sponsor', {url: '/sponsor', template: '<fssponsor></fssponsor>', controller: 'SponsorStateCtrl'})
	        .state('viewuser', {url: '/user/:login', template: '<fsviewuser></fsviewuser>', controller: 'ViewUserStateCtrl'})
	        .state('editprofile', {url: '/editprofile', template: '<fseditprofile></fseditprofile>'});
	});

	angular.module('fs_main').controller('FSMainCtrl', function($scope, FSAuth){
	});
})();
