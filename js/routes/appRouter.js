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
            'vehicle/:id': 'getVehicleById',
            'search/vehicle?*query' : 'findVehicles'
        },

        index: function() {
            var vehicles = new Vehicles();

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
        },

        findVehicles: function(query) {
            var params = this.parseQueryString(query),
                vehicles = new Vehicles();

            vehicles.url = '/api/search/vehicle';

            vehicles.fetch({
                data: params,
                success: function() {
                    var vehiclesViewCollection = new VehiclesCollectionView();
                    vehiclesViewCollection.render(vehicles);
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },


        parseQueryString: function(queryString) {
            var params = { };

            if (queryString) {
                _.each(
                    _.map(decodeURI(queryString).split(/&/g), function(el, i) {
                        var aux = el.split('='),
                            o = { };

                        if( aux.length >= 1 ) {
                            var val;

                            if(aux.length == 2) {
                                val = aux[1];
                            }
                            o[ aux[0] ] = val;
                        }

                        return o;
                    }),
                    function(o) {
                        _.extend(params, o);
                    }
                );
            }

            return params;
        }

    });

    return AppRouter;
});
