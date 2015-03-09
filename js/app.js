// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/vehicles',
    'views/vehicle'
    ], function($, _, Backbone, Vehicles, VehicleView) {
    var initialize = function() {
        var vehicles = new Vehicles();
        vehicles.fetch({                // this makes a call to the server and populates the collection based on the response.
            success: function() {
                vehicles.each(function(vehicle) {
                    var vehicleView = new VehicleView( { model: vehicle } );
                    $('.vehiclesCollection').append( vehicleView.render().el );
                });
            },
            error: function() {
                console.log('fetch error');
            }
        });                   
    }

    return {
        initialize: initialize
    };
});
