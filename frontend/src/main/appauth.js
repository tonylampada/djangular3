angular.module('appauth', ['appapi']);

angular.module('appauth').factory('AppAuth', function(AppApi){
	var auth = {
		user: null,
		authenticated: authenticated,
		has_permission: has_permission,
		set_user: set_user,
		logout: logout,
	};

	function authenticated(){
		return auth.user !== null && auth.user !== undefined;
	}

	function has_permission(permission){
		return auth.user && auth.user.permissions[permission];
	}

	function set_user(user){
		auth.user = user;
	}

	function logout(){
		AppApi.logout().then(function(){
			auth.user = null;
		});
	}

	function _check_for_authentication(){
		AppApi.whoami().then(function(result){
			var _who = result.data;
			if(_who.authenticated){
				auth.user = _who.user;
			} else {
				auth.user = null;
			}
		});
	}

	_check_for_authentication();

	return auth;
});