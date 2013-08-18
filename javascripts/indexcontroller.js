define(['coccyx', 'indexView', 'mockdb'], function(v, indexView, mockdb) {
    'use strict';

    var showIndexPage = function(){
        // Extend the user model object
        var todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        // Extend the index view object
        var view = v.views.extend(indexView);
        // Render the index view.
        view.render(todosCollection.getData());
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
