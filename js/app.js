// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'routes/appRouter'
    ], function($, _, Backbone, AppRouter) {
    var app = {
        router: new AppRouter(),
        proxy: _.extend({}, Backbone.Events)
    };

    return app;
});
