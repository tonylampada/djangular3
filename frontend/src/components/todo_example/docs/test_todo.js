describe("[ixsu9euet736] TODO suite", function() {

    beforeEach(angular.mock.module('todotester'));

    it('[sdjhgdr347hejh] TODO test', inject(function(TodoTester){
        TodoTester.assert_count_todos(0);
        TodoTester.type_and_add('one todo');
        TodoTester.type_and_add('to twodos');
        TodoTester.type_and_add('tdee throdos');
        TodoTester.assert_count_todos(3);
        TodoTester.remove(1);
        TodoTester.assert_count_todos(2);
        TodoTester.assert_todo_text(1, 'tdee throdos');
    }));

});

angular.module('todotester', ['todo']);
angular.module('todotester').factory('TodoTester', function(TODOModel, $timeout){
    var m = {
        assert_count_todos: assert_count_todos,
        type_and_add: type_and_add,
        remove: remove,
        assert_todo_text: assert_todo_text,
    };

    function assert_count_todos(count){
        expect(TODOModel.todos.length).equal(count);
    }

    function type_and_add(s){
        var count = TODOModel.todos.length;
        TODOModel.newtodo = s;
        TODOModel.add();
        expect('').equal(TODOModel.newtodo);
        expect(count).equal(TODOModel.todos.length); //still waiting for the "server" to respond
        $timeout.flush(); //yay, the server responded!
        expect(count + 1).equal(TODOModel.todos.length);
        var saved_todo = TODOModel.todos[count];
        expect(!!saved_todo.id).equal(true);
    }

    function remove(index){
        TODOModel.remove(TODOModel.todos[index]);
    }

    function assert_todo_text(index, text){
        expect(text).equal(TODOModel.todos[index].description);
    }

    return m;
});
