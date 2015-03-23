// Filename: models/vehicle.js

define([
    'underscore', 
    'backbone'
    ], function(_, Backbone) {
    var Vehicle = Backbone.Model.extend({
        urlRoot: '/api/vehicle'
    });

    return Vehicle;
});
