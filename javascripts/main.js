require.config({
    baseUrl: 'javascripts',
    paths: {
        'jquery': 'libs/jquery',
        'coccyx': 'libs/coccyx',
        'indexcontroller': 'indexcontroller',
        'indexview': 'indexview',
        'loginview': 'loginview',
        'handlebars': 'libs/handlebars',
        'userModel': 'usermodel',
        'mockdb': 'mockdb'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([
    'coccyx', // Coccyx requires jQuery itself, so there is no need to list it here!
    'indexcontroller',
    'indexview',
    'loginview',
    'userModel'
    ],
    function(Coccyx, indexcontroller, indexview, loginview, userModel){
        'use strict';
        // You can call the register methods in any order
        Coccyx.views.registerViews([indexview, loginview]);
        Coccyx.models.registerModels(userModel);
        Coccyx.controllers.registerControllers(indexcontroller);
        // ... but you must call history.start after you have registered all your controllers.
        Coccyx.history.start(true);
    }
);