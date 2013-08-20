define(['coccyx', 'newtodoeditorview', 'todoitemslistview', 'mockdb'], function(v, newtodoeditorview, todoItemsListView, mockdb) {
    'use strict';

    var showIndexPage = function(){
        // Extend the view object and render it.
        var view1 = v.views.extend(newtodoeditorview);
        v.$('div.new-todo-container').html(view1.render().domTarget);
        // Extend the user model object
        var todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        // Extend the index view object and render it.
        var view2 = v.views.extend(todoItemsListView);
        v.$('div.todo-list-container').html(view2.render(todosCollection.getData()).domTarget);
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
