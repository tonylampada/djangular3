angular.module('fsapi', ['fsajax']);

angular.module('fsapi').factory('FSApi', function(FSAjax){
	var fsapi = {
		add: todo,
		login: login,
		logout: logout,
		whoami: whoami,
		list_issues: list_issues,
		get_user_details: todo,
	};

	function todo(){}

	function login(username, password){
		return FSAjax.post('/api/login', {username: username, password: password});
	}

	function logout(){
		return FSAjax.get('/api/logout');
	}

	function whoami(){
		return FSAjax.get('/api/whoami');
	}

	function list_issues(filters){
		return FSAjax.get('/api/list_issues', {filters: angular.toJson(filters)});
	}

	return fsapi;
});
