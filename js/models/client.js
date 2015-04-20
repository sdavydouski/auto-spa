// Filename: models/client.js

define([
    'underscore', 
    'backbone'
    ], function(_, Backbone) {
    var Client = Backbone.Model.extend({
        urlRoot: '/api/client',
        idAttribute: 'client_id'
    });

    return Client;
});
