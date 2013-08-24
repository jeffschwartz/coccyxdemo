define(['handlebars', 'bootstrap'], function(Handlebars){
    'use strict';

    return {
        render: function(todos){
            var source = todos.length ? this.$('#todo-item-template').html() :
                    this.$('#empty-todo-item-template').html(),
                template = Handlebars.compile(source),
                self = this;
            if(todos.length){
                //Show a list of todos
                this.$domTarget.empty();
                todos.forEach(function(todo){
                    var t = template(todo);
                    console.log(t);
                    self.$domTarget.append(t);
                    if(todo.done){
                        self.$domTarget.find('article[data-id="' + todo.id + '"]').find('input:text').addClass('done');
                    }
                });
            }else{
                //Show an empty list of todos
                self.$domTarget.html(template());
            }
            return this;
        }
    };

});