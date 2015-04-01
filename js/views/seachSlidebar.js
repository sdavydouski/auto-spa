// Filename: views/searchSlidebar.js

define([
    'jquery',
    'underscore', 
    'backbone',
    'Slidebars'
    ], function($, _, Backbone) {
    var SearchSlidebarView = Backbone.View.extend({
        tagname: 'div',
        className: 'sb-slidebar sb-right sb-style-overlay',


        template: _.template($('#searchSlidebarTemplate').html()),

        events: {
            'click .dividerTitle': 'togglePanel'
        },

        initialize: function() {
            
        },

        render: function() {
            $('body').append( this.$el.html( this.template() ) );
            $.slidebars();
        },

        togglePanel: function(event) {
            $( '.' + $(event.target).data('info') ).slideToggle(300);
        }

    });

    return SearchSlidebarView;
});
