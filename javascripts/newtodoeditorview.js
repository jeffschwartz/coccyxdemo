(function(w, tdd){

    'use strict';

    tdd = w.tdd = tdd ? tdd : {};

    tdd.newTodoEditorView = {
        template: '#new-todo-item-template',
        render: function(){
            this.$domTarget.html(this.$(this.template).html());
            return this;
        }
    };

}(window, window.tdd));
