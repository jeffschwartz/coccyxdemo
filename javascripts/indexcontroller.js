define(['coccyx', 'newtodoeditorview', 'todoitemslistview', 'mockdb'], function(v, newtodoeditorview, todoItemsListView, mockdb) {
    'use strict';

    var todosListView,
        todosCollection;

    var newToDoItemAdd = function newToDoItemAdd(){
        var $ntdi = this.$('#new-todo-item'),
            todo;
        if($ntdi.val()){
            todo = {todo: $ntdi.val(), done: false};
            mockdb.addToDo(todo);
            todosCollection.push(todo);
            todosListView.$domTarget.empty();
            v.$('div.todo-list-container').html(todosListView.render(todosCollection.getData()).domTarget);
            newToDoItemClear.call(this);
        }else{
            $ntdi.focus();
        }
    };

    var newToDoItemClear = function newToDoItemClear(){
        var $ntdi = this.$('#new-todo-item');
        $ntdi.val('');
        $ntdi.focus();
    };

    var showIndexPage = function(){
        // Extend the view object and render it.
        var view1 = v.views.extend(newtodoeditorview, {controller: this, events: {'click #new-todo-item-add': newToDoItemAdd, 'click #new-todo-item-clear': newToDoItemClear}});
        v.$('div.new-todo-container').html(view1.render().domTarget);
        // Extend the user model object
        todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        // Extend the index view object and render it.
        todosListView = v.views.extend(todoItemsListView);
        v.$('div.todo-list-container').html(todosListView.render(todosCollection.getData()).domTarget);
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
