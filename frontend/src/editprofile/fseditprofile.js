angular.module('fseditprofile', ['fsapi']);

angular.module('fseditprofile').factory('FSEditProfileModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fseditprofile').directive('fseditprofile', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'editprofile/fseditprofile.html',
		controller: function($scope, FSEditProfileModel){

		},
	};
});