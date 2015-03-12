// Filename: views/vehicle.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var VehicleView = Backbone.View.extend({
        tagname: 'div',
        className: 'briefVehicle',

        template: _.template($('#vehicleBriefDesctiptionTemplate').html()),

        events: {
            'click': 'showFullVehicleDescrtiption'
        },

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

        showFullVehicleDescrtiption: function() {
            console.log(this.model.id);
        }
    });

    return VehicleView;
});
