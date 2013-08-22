define(['handlebars', 'bootstrap'], function(Handlebars){
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
                this.$domTarget.empty();
                todos.forEach(function(todo){
                    self.$domTarget.append(template(todo));
                });
            }else{
                //Show an empty list of todos
                self.$domTarget.html(template());
            }
            return this;
        }
    };

});