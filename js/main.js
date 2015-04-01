// Filename: main.js

require.config({
    paths: {
        jquery: '../public/libs/jquery/dist/jquery',
        underscore: '../public/libs/underscore/underscore',
        backbone: '../public/libs/backbone/backbone',
        Slidebars: '../public/libs/Slidebars/distribution/0.10/slidebars.min'
    },
    shim: {
        Slidebars: ['jquery']
    }
});

require([
    'app'
    ], function(app) {
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();      
});
