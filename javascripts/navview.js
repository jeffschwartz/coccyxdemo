define(['handlebars', 'bootstrap'], function(Handlebars){
    'use strict';

    return {
        tagName: 'ul',
        domTargetAttrs: {
            class: 'nav nav-tabs'
        },
        render: function(todos){
            var active = 0,
                all = 0,
                completed = 0,
                source = this.$('#nav-template').html(),
                template = Handlebars.compile(source);
            todos.forEach(function(todo){
                all++;
                active = todo.done ? active : active += 1;
                completed = todo.done ? completed += 1 : completed;
            });
            this.$domTarget.html(template({activeCount: active, allCount: all, completedCount: completed}));
            return this;
        }
    };

});