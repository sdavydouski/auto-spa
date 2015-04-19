// Filename: views/client.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var ClientView = Backbone.View.extend({

        template: _.template($('#clientTemplate').html()),

        render: function() {
            this.setElement( this.template(this.model.toJSON()) );
            return this;
        }
    });

    return ClientView;
});
