angular.module('fsapi', []);
angular.module('fsapi').factory('FSApi', function($q, $timeout, $log){
	var fsapi = {
		add: _mockasync(add),
		login: _mockasync(login),
		logout: _mockasync(logout),
		whoami: _mockasync(whoami),
		list_issues: _mockasync(list_issues),
		get_user_details: _mockasync(get_user_details),
	};

	var who = {
		authenticated: true,
		user: {
			username: 'johndoe',
			name: 'Fake User',
		},
	};

	function add(todo){
		var newtodo = angular.copy(todo);
		newtodo.id = Math.floor(Math.random() * 1E9);
		return newtodo;
	}

	function login(username, password){
		var fakeuser = {
			username: username,
			name: 'Fake User',
		};
		who = {
			authenticated: true,
			user: fakeuser,
		};
		return fakeuser;
	}

	function logout(){
		who = {
			authenticated: false
		};
	}

	function whoami(){
		return who;
	}

	function list_issues(filters){
		return [
			{project_name: 'TimeTravel', title: 'Invent a time machine'},
			{project_name: 'Delorean', title: 'Lower warp speed to 88mph'}
		];
	}

	function get_user_details(username){
		var fakeuser = {
			username: username,
			name: 'Fake User',
			has_paypal: true,
			has_bitcoin: false,
		};
		return fakeuser;
	}

	function _mockasync(f){
		return function(){
			var _arguments = arguments;
			var _this = this;
			if(!APP.MOCK){
				APP.MOCK = {};
			}
			if(APP.MOCK.timeout === undefined){
				APP.MOCK.timeout = 500;
			}
			var deferred = $q.defer();
			$timeout(function(){
				try{
					var result = f.apply(_this, _arguments);
					deferred.resolve({data: result});
				} catch(ex){
					$log.error(ex);
					deferred.reject(ex); //TODO: simulate http stuff
				}
			}, APP.MOCK.timeout);
			return deferred.promise;
		};
	}

	return fsapi;
});
