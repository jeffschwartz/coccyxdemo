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
                template = Handlebars.compile(source),
                self = this;
            // Blast the template onto the page.
            this.$(this.domTarget).html(template());
            // Handle the cancel login button event - delegate
            // the event to a child element of the dom target to
            // prevent ghost events.
            this.$('#nestedviewtarget').find('content:first-child').on('click', '#cancellogin', function(){
                self.remove();
            });
            // Publish pubsub event:
            // topic = 'login view', data = 'showing'.
            Coccyx.pubsub.publish('login view', 'showing');
        },
        remove: function(){
            // Remove the view from the page and remove all
            // delegated events created in the render method.
            this.$(this.domTarget).empty();
            // Publish pubsub event
            // topic = 'login view', data = 'hidden'.
            Coccyx.pubsub.publish('login view', 'hidden');
        }
    };

});