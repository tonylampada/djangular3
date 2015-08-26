//This is a toy component to demonstrate how to make them

angular.module('todo', ['appapi']);

angular.module('todo').factory('TODOModel', function(AppApi){
    var m = {
        newtodo: '',
        adding: false,
        todos: [],
    };

    angular.extend(m, {
        add: add,
        remove: remove,
    });

    function add(){
        var todo = {description: m.newtodo};
        m.adding = true;
        AppApi.add(todo).then(function(result){
            var saved_todo = result.data;
            m.todos.push(saved_todo);
        }).finally(function(){
            m.adding = false;
        });
        m.newtodo = '';
    }

    function remove(todo){
        var idx = m.todos.indexOf(todo);
        m.todos.splice(idx, 1);
        //TODO: remove the todo using an API
    }

    return m;
});

angular.module('todo').directive('todo', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: APP.BASE_URL+'components/todo_example/todo.html',
        controller: function($scope, TODOModel){
            var m = $scope.m = TODOModel;
        }
    };
});

function teste_pra_brincar_com_todo_no_console(){
    var m = {
        newtodo: '',
        todos: [],
        add: function(){
            var todo = {description: m.newtodo};
            m.todos.push(todo);
            m.newtodo = '';
        },
        remove: function(idx){
            m.todos.splice(idx, 1);
        },
        print: function(){
            console.log(JSON.stringify(m, null, 4));
        }
    };
}