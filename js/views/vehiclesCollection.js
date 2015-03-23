// Filename: views/vehiclesCollection.js

define([
    'jquery',
    'underscore', 
    'backbone',
    'views/vehicle'
    ], function($, _, Backbone, VehicleView) {
    var VehiclesViewCollection = Backbone.View.extend({
        tagname: 'section',
        className: 'vehiclesCollection',

        render: function(vehicles) {
            var vehiclesCollection = vehicles.map(function(vehicle) {
                return new VehicleView( { model: vehicle } ).render().el;
            });
            $('.mainContent').html( this.$el.html(vehiclesCollection) );
            return this;
        }
    });

    return VehiclesViewCollection;
});
