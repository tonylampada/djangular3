angular.module('fsissue', ['fsapi']);

angular.module('fsissue').factory('FSIssueModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fsissue').controller('IssueStateCtrl', function($scope, $stateParams, FSIssueModel){

});

angular.module('fsissue').directive('fsissue', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'issue/fsissue.html',
		controller: function($scope, FSIssueModel){

		},
	};
});