define(['coccyx'], function(v){
    'use strict';

    return {
        template: '#new-todo-item-template',
        render: function(){
            this.$domTarget.html(this.$(this.template).html());
            return this;
        }
    };

});