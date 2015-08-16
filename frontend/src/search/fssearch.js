angular.module('fssearch', ['fsapi']);

angular.module('fssearch').factory('FSSearchModel', function(FSApi){
	var m = {
		searchform: {
			text: ''
		},
		loading: false,
		issues: []
	};
	angular.extend(m, {
		search: search
	});

	function search(evt){
		m.loading = true;
		FSApi.list_issues({q: m.searchform.text}).then(function(result){
			m.issues = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('fssearch').controller('SearchStateCtrl', function($scope, $stateParams, FSSearchModel){

});

angular.module('fssearch').directive('fssearch', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'search/fssearch.html',
		controller: function($scope, FSSearchModel){
			var m = $scope.m = FSSearchModel;
		},
	};
});
