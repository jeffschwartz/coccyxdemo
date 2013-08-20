define(['handlebars'], function(Handlebars){
    'use strict';

    return {
        render: function(todos){
            var source = todos.length ? this.$('#todo-item-template').html() :
                    this.$('#empty-todo-item-template').html(),
                template = Handlebars.compile(source),
                self = this;
            // Update the DOM
            if(todos.length){
                //Show a list of todos
                todos.forEach(function(todo){
                    self.$domTarget.append(template({index: arguments[1], todo: todo.todo}));
                });
            }else{
                //Show an empty list of todos
                self.$domTarget.html(template());
            }
            return this;
        }
    };

});