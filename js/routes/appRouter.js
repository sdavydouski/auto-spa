// Filename: routes/appRouter.js

define([
    'jquery',
    'underscore', 
    'backbone',
    'models/vehicle',
    'collections/vehicles',
    'views/vehiclesCollection',
    'views/vehicleFullInfo'
    ], function($, _, Backbone, Vehicle, Vehicles, VehiclesCollectionView, VehicleFullInfoView) {
    var AppRouter = Backbone.Router.extend({        

        routes: {
            '': 'index',
            'vehicle/:id': 'getVehicleById'
        },

        index: function() {
            vehicles = new Vehicles();
            vehicles.fetch({                // this makes a call to the server and populates the collection based on the response.
                success: function() {
                    var vehiclesViewCollection = new VehiclesCollectionView();
                    vehiclesViewCollection.render(vehicles);
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },

        getVehicleById: function(id) {
            var vehicle = new Vehicle({
                id: id
            });
            vehicle.fetch({
                success: function() {
                    var vehicleFullInfoView = new VehicleFullInfoView( { model: vehicle } );
                    vehicleFullInfoView.render();
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        }

    });

    return AppRouter;
});
