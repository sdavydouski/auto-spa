// Filename: views/mainWrapper.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var MainContentView = Backbone.View.extend({
        events: {
            'keydown': 'toggleSlidebar'
        },

        initialize: function() {

        },

        toggleSlidebar: function(event) {
            var code = event.keyCode || event.which;

            //f key
            if ( code === 70 ) {
                require('app').proxy.trigger('openSearchSlidebar');
            }
            //esk key
            else if ( code === 27 ) {
                require('app').proxy.trigger('closeSearchSlidebar');
            }

            event.stopPropagation();
        }

    });

    return MainContentView;
});
