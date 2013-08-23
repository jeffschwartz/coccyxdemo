define(['handlebars'], function(Handlebars){
    'use strict';

    return {
        // tagName: 'small',
        // domTargetAttrs: {
        //     class: 'total-todos-count-container'
        // },
        domTarget: 'small',
        render: function(count){
            var source = this.$('#todos-count-template').html(),
                template = Handlebars.compile(source);
            this.$domTarget.text(template({todoscount: count}));
            return this;
        }
    };

});