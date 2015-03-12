// Filename: app.js

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/vehicles',
    'views/vehiclesCollection'
    ], function($, _, Backbone, Vehicles, VehiclesViewCollection) {
    var initialize = function() {
        var vehicles = new Vehicles();
        vehicles.fetch({                // this makes a call to the server and populates the collection based on the response.
            success: function() {
                var vehiclesViewCollection = new VehiclesViewCollection();
                vehiclesViewCollection.render(vehicles);
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
