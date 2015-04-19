// Filename: collections/clients.js

define([
    'underscore', 
    'backbone',
    'models/client'
    ], function(_, Backbone, Client) {
    var Clients = Backbone.Collection.extend({
        model: Client,
        url: '/api/clients/'
    });

    return Clients;
});
