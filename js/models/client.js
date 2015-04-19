// Filename: models/client.js

define([
    'underscore', 
    'backbone'
    ], function(_, Backbone) {
    var Client = Backbone.Model.extend({
        urlRoot: '/api/client'
    });

    return Client;
});
