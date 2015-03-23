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

        initialize: function() {
            
        },

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

        showFullVehicleDescrtiption: function() {
            //not sure about this require
            //TODO: find out how to organize access to router from the views
            require('app').router.navigate('vehicle/' + this.model.id, { trigger: true });
        }
    });

    return VehicleView;
});
