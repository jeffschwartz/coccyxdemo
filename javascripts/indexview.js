define(['coccyx', 'handlebars'], function(Coccyx, Handlebars){
    'use strict';

    return {
        domTarget: 'div.todo-list-container',
        render: function(todos){
            var source = todos.length ? this.$('#todo-item-template').html() :
                    this.$('#empty-todo-item-template').html(),
                template = Handlebars.compile(source),
                self = this;
            // Update the DOM
            if(todos.length){
                //Show a list of todos
                todos.forEach(function(todo){
                    self.$(self.domTarget).append(template({index: arguments[1], todo: todo.todo}));
                });
            }else{
                //Show an empty list of todos
                self.$(self.domTarget).html(template());
            }
        }
    };

});