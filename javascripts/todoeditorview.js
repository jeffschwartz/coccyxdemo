(function(w, tdd, Handlebars){

    'use strict';

    tdd = w.tdd = tdd ? tdd : {};

    tdd.todoEditorView = {
        render: function(todo){
            var source = this.$('#edit-todo-item-template').html(),
                template = Handlebars.compile(source);
            this.$domTarget.html(template({todo: todo}));
            return this;
        }
    };

}(window, window.tdd, window.Handlebars));
