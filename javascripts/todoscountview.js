define(['handlebars'], function(Handlebars){
    'use strict';

    return {
        domTarget: 'span',
        render: function(count){
            var source = this.$('#todos-count-template').html(),
                template = Handlebars.compile(source);
            this.$domTarget.text(template({todoscount: count}));
            return this;
        }
    };

});