require.config({
    baseUrl: 'javascripts',
    paths: {
        'jquery': 'libs/jquery',
        'coccyx': 'libs/coccyx',
        'indexController': 'indexcontroller',
        'indexView': 'indexview',
        'loginView': 'loginview',
        'handlebars': 'libs/handlebars',
        'usermodel': 'usermodel',
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
    'indexController'
    ],
    function(Coccyx, indexController){
        'use strict';
        // You can call the register methods in any order
        // ... but you must call history.start after you have registered all your controllers.
        Coccyx.history.start(true, [indexController]);
    }
);