define([], function(){
    'use strict';

    return {
        domTarget: 'div.new-todo-container',
        template: '#new-todo-item-template',
        render: function(){
            this.$domTarget.html(this.$(this.template).html());
        }
    };

});