define([], function(){

    /**
     * Simulates a real database.
     */

    'use strict';

    // The logged in user info.
    var logedInUser = {
        userEmail: 'johndoe@nsa.gov',
        userPassword: 'noyefnb'
    };

    return {
        // Returns the logged in user info.
        getLoggedInUser: function(){
            return logedInUser;
        },
        // Updates the logged in user info.
        loginUser: function(dataHash){
            logedInUser.userEmail = dataHash.userEmail;
            logedInUser.userPassword = dataHash.userPassword;
        }
    };
});