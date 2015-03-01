// Filename: models/vehicle.js

define([
    'underscore', 
    'backbone'
    ], function(_, Backbone) {
    var Vehicle = Backbone.Model.extend({
        defaults: {
            name: 'Harry Potter'
        }
    });

    return Vehicle;
});
