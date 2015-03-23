// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'routes/appRouter'
    ], function($, _, Backbone, AppRouter) {
    var app = {
        router: new AppRouter()
    };

    return app;
});
