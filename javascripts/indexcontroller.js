define(['coccyx', 'newtodoeditorview', 'todoitemslistview', 'mockdb'], function(v, newtodoeditorview, todoItemsListView, mockdb) {
    'use strict';

    var showIndexPage = function(){
        // Extend the view object and render it.
        v.views.extend(newtodoeditorview).render();
        // Extend the user model object
        var todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        // Extend the index view object and render it.
        v.views.extend(todoItemsListView).render(todosCollection.getData());
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
