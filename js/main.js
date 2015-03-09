// Filename: main.js

require.config({
    paths: {
        jquery: '../public/libs/jquery/dist/jquery',
        underscore: '../public/libs/underscore/underscore',
        backbone: '../public/libs/backbone/backbone'
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
    ], function(app) {
    // The "app" dependency is passed in as "app"
    app.initialize();
});
