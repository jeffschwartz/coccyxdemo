define(['coccyx', 'handlebars'], function(Coccyx, Handlebars){
    'use strict';

    return {
        // The name of the view. Used for lookup and retrieval.
        name: 'login',
        // The id of the html template that this view will use.
        templateId: '#login-template',
        // The id of the html element that will be targeted.
        domTarget: '#nestedviewtarget',
        // Render's the view onto the page.
        render: function(){
            var source = this.$(this.templateId).html(),
                template = Handlebars.compile(source);
            // Blast the template onto the page.
            this.$(this.domTarget).html(template());
        },
        remove: function(){
            // Remove the view from the page.
            this.$(this.domTarget).html('');
        }
    };

});