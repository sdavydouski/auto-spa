// Filename: views/vehicle.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var VehicleView = Backbone.View.extend({
        tagname: 'div',
        className: 'briefVehicle',

        template: _.template($('#briefVehicleDesctiption').html()),

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }
    });

    return VehicleView;
});
