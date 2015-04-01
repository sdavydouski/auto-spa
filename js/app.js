// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'routes/appRouter',
    'views/seachSlidebar'
    ], function($, _, Backbone, AppRouter, SearchSlidebarView) {
    var app = {
        router: new AppRouter()
    };

    /*
        Instantiate all non-dynamic views
    */
    $(document).ready(function() {
        var searchSlidebarView = new SearchSlidebarView();
        searchSlidebarView.render();
    });

    return app;
});
