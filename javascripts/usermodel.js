define([], function(){
    "use strict";

    return {
        // Validates the data. Called by models.setData method. If validate returns false,
        // setData will not commit the changes to the model and will return false.
        // If validate returns true, setData will commit the changes to the model and
        // will return true.
        validate: function(dataHash){
            return (dataHash.userEmail && dataHash.userPassword) ? true : false;
        }
    };
});