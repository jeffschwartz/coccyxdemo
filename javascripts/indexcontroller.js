define(['coccyx', 'indexView', 'loginView', 'usermodel', 'mockdb'], function(Coccyx, indexView, loginView, userModel, mockdb) {
    'use strict';

    var liv = Coccyx.views.extend(loginView);

    var showIndexPage = function(){
        // Extend the user model object
        var model = Coccyx.models.extend(userModel);
        // Set the user model's data to the logged in user.
        model.setData(mockdb.getLoggedInUser(), {readOnly: true});
        // Extend the index view object
        var view = Coccyx.views.extend(indexView);
        // Render the index view.
        view.render(model.getData(), Coccyx.getVersion);
    };

    var showLogin = function(){
        // Render the login view.
        liv.render();
    };

    var loginUser = function(dataHash){
        // Get a user model and use it to validate the dataHash.
        var model = Coccyx.models.extend(userModel);
        // If the data isn't valid then show an alert and exit.
        if(!model.setData(dataHash, {readOnly:true, validate:true})){
            alert('Please enter valid user credentials!');
            return;
        }
        // The data is valid so pass a copy of the data on to the database for update.
        mockdb.loginUser(model.getData());
        // Remove the login view from the page.
        liv.remove('login');
        // Navigate to index page to render the new logged in user.
        Coccyx.history.navigate({trigger: true, url: '/'});
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
