angular.module('cameras', ['appapi']);

angular.module('cameras').factory('CamerasRepository', function(AppApi){
	var m = {
		loading: false,
		cameras: [],
	};

	angular.extend(m, {
		init: init,
	});

	function init(){
		m.loading = true;
		AppApi.list_cameras().then(function(result){
			m.cameras = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('cameras').directive('cameras', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'cameras/cameras.html',
		controller: function($scope, CamerasRepository){
			CamerasRepository.init();
			$scope.repo = CamerasRepository;
		},
	};
});