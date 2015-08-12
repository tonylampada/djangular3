angular.module('fsajax', ['ngCookies']);

angular.module('fsajax').config(
    function($httpProvider){
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }
);

angular.module('fsajax').factory('FSAjax', function($http, $cookies, $log){

    var FSAjax = {
        get: get,
        post: post,
    };

    function get(url, params){
        if(!params){
            params = {};
        }
        return $http({
            method: 'GET',
            url: url,
            params: params
        });
    }

    function post(url, params){
        if(!params){
            params = {};
        }
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
        return $http({
            method: 'POST',
            url: url,
            data: $.param(params)
        });
    }

    return FSAjax;
});
