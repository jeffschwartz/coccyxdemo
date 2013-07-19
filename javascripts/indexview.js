define(['coccyx', 'handlebars'], function(Coccyx, Handlebars){
    'use strict';

    return {
        // The name of the view. Used for lookup and retrieval.
        name: 'index',
        // The id of the html template that this view will use.
        templateId: '#index-template',
        // The id of the html element that will be targeted.
        domTarget: '#content',
        // Render's the view onto the page.
        render: function(userModel){
            var source = this.$(this.templateId).html(),
                template = Handlebars.compile(source);
            // Blast the template onto the page with user model's data.
            this.$(this.domTarget).html(template(userModel.getData()));
        }
    };

});