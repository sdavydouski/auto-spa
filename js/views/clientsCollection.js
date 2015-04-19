// Filename: views/clientsCollection.js

define([
    'jquery',
    'underscore',
    'backbone',
    'views/client'
    ], function($, _, Backbone, ClientView) {
    var ClientsCollectionView = Backbone.View.extend({

        template: _.template($('#clientsCollectionTemplate').html()),

        initialize: function() {
            
        },

        render: function() {
            var clientsCollectionHtml = this.collection.map(function(client) {
               return new ClientView( { model: client } ).render().el;
            });
            this.setElement( this.template() );
            
            this.$el.find('tbody').append( clientsCollectionHtml );
            $('.mainContent').html( this.$el );
            return this;
        }
    });

    return ClientsCollectionView;
});
