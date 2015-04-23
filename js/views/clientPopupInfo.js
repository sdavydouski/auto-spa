// Filename: views/clientPopupInfo.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var ClientPopupInfoView = Backbone.View.extend({
        className: 'clientPopupInfo',

        template: _.template($('#clientPopupInfoTemplate').html()),

        events: {
            'click .removeVehicleFromClientButton': 'removeVehicleFromClient'
        },

        initialize: function(options) {
            this.model.set({
                productId: options.productId
            });
        },

        render: function(productId) {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

        removeVehicleFromClient: function(event) {
            var that = this;
            $.ajax({
                url: '/api/product',
                type: 'DELETE',
                data: JSON.stringify({
                    clientId: that.model.id,
                    productId: that.model.get('productId')
                }),
                contentType: 'application/json',
                success: function() {
                    console.log('remove success');
                    require('app').router.back();
                },
                error:function() {
                    console.log('remove error');
                }
            });
        }

    });

    return ClientPopupInfoView;
});
