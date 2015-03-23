// Filename: collections/vehicles.js

define([
    'underscore', 
    'backbone',
    'models/vehicle'
    ], function(_, Backbone, Vehicle) {
    var Vehicles = Backbone.Collection.extend({
        model: Vehicle,
        url: '/api/vehicles/'
    });

    return Vehicles;
});
