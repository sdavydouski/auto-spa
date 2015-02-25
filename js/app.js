// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'models/vehicle'
    ], function($, _, Backbone, Vehicle) {
    var initialize = function() {
        var vehicle = new Vehicle();
        console.log(vehicle.get('name'));
    }

    return {
        initialize: initialize
    };
});