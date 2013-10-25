(function(w, tdd, Handlebars){

    'use strict';

    tdd = w.tdd = tdd ? tdd : {};

    tdd.navView =  {
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

}(window, window.tdd, window.Handlebars));
