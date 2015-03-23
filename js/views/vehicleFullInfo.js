// Filename: views/vehicleFullInfo.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var VehicleFullInfoView = Backbone.View.extend({
        tagname: 'div',
        className: 'vehicleFullInfo',

        template: _.template($('#vehicleFullDesctiptionTemplate').html()),

        initialize: function() {
            
        },

        render: function() {
            $('.mainContent').html( this.$el.html( this.template(this.model.toJSON()) ) );
            return this;
        },
    });

    return VehicleFullInfoView;
});
