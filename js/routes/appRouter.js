// Filename: routes/appRouter.js

define([
    'jquery',
    'underscore', 
    'backbone',
    'models/vehicle',
    'collections/vehicles',
    'views/vehiclesCollection',
    'views/vehicleFullInfo',
    'views/manageDb'
    ], function($, _, Backbone, Vehicle, Vehicles, VehiclesCollectionView, VehicleFullInfoView, ManageDbView) {
    var AppRouter = Backbone.Router.extend({        

        routes: {
            '': 'index',
            'page=:pageNumber': 'getVehicles',
            'db': 'manageDb',
            'vehicle/:id': 'getVehicleById',
            'search/vehicle?*query' : 'findVehicles'
        },

        initialize: function() {
            this.on('route', function() {
                $(window).unbind('scroll');
            })
        },

        index: function() {
            var vehicles = new Vehicles();

            vehicles.fetch({                // this makes a call to the server and populates the collection based on the response.
                success: function() {
                    var vehiclesViewCollection = new VehiclesCollectionView({
                        collection: vehicles
                    });
                    vehiclesViewCollection.render();
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },

        getVehicles: function(pageNumber) {
            var vehicles = new Vehicles();

            vehicles.fetch({
                data: { 
                    startPage: 1,
                    endPage: pageNumber
                },
                success: function() {
                    var vehiclesViewCollection = new VehiclesCollectionView({
                        collection: vehicles
                    });
                    vehiclesViewCollection.render(pageNumber);
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },

        manageDb: function() {
            var manageDbView = new ManageDbView();
            manageDbView.render();
        },

        getVehicleById: function(id) {
            var vehicle = new Vehicle({
                id: id
            });
            vehicle.fetch({
                success: function() {
                    $('html, body').scrollTop(0);

                    var vehicleFullInfoView = new VehicleFullInfoView( { model: vehicle } );
                    vehicleFullInfoView.render();
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },

        //TODO: add pagination
        findVehicles: function(query) {
            var params = this.parseQueryString(query),
                vehicles = new Vehicles();

            vehicles.url = '/api/search/vehicle';

            vehicles.fetch({
                data: params,
                success: function() {
                    var vehiclesViewCollection = new VehiclesCollectionView({
                        collection: vehicles
                    });
                    vehiclesViewCollection.render();
                },
                error: function() {
                    console.log('fetch error');
                }
            });
        },

        back: function() {
            window.history.back();
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
