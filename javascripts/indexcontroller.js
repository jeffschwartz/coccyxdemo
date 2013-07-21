define(['coccyx', 'mockdb'], function(Coccyx, mockdb) {
    'use strict';

    var showIndexPage = function(){
        // Get the user model.
        var userModel = Coccyx.models.getModel('user');
        // Set the user model's data to the logged in user.
        userModel.setData(mockdb.getLoggedInUser(), {readOnly: true});
        // Render the index view.
        Coccyx.views.render('index', userModel.getData(), Coccyx.getVersion());
    };

    var showLogin = function(){
        // Render the login view.
        Coccyx.views.render('login');
    };

    var loginUser = function(dataHash){
        // Get a user model and use it to validate the dataHash.
        var userModel = Coccyx.models.getModel('user');
        // If the data isn't valid then show an alert and exit.
        if(!userModel.setData(dataHash)){
            alert('Please enter valid user credentials!');
            return;
        }
        // The data is valid so pass a copy of the data on to the database for update.
        mockdb.loginUser(userModel.getData());
        // Remove the login view from the page.
        Coccyx.views.remove('login');
        // Navigate to index page to render the new logged in user.
        Coccyx.router.navigate({trigger: true, url: '/'});
    };

    return {
        // The name of the controller. Used for lookup and retrieval.
        name: '', // We use a name of "" here because this is the root controller, it is nameless!
        // A hash of routes handled by this controller.
        routes: {
            'get /': showIndexPage,
            'get login': showLogin,
            'post login': loginUser
        }
    };

});
