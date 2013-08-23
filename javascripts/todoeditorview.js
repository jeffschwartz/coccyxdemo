define(['handlebars'], function(Handlebars){
    'use strict';

    return {
        render: function(todo){
            var source = this.$('#edit-todo-item-template').html(),
                template = Handlebars.compile(source);
            this.$domTarget.html(template({todo: todo}));
            return this;
        }
    };

});