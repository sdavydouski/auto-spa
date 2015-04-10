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
            'click .dividerTitle': 'togglePanel',
            'click .findVehicleButton': 'findVehicles',
            'keypress .priceInput': 'numbersOnly'
        },

        initialize: function() {
            var that = this,
                regexp = /vehicle\/\d/;

            require('app').proxy.on('openSearchSlidebar', function() {
                if ( regexp.test(Backbone.history.getFragment()) ) {
                    return;
                }

                that.open();
            });

            require('app').proxy.on('closeSearchSlidebar', function() {
                that.close();
            });
        },

        render: function() {
            $('body').append( this.$el.html( this.template() ) );
            $.slidebars();
        },

        togglePanel: function(event) {
            $( '.' + $(event.target).data('info') ).slideToggle(300);
        },

        findVehicles: function(event) {
            event.preventDefault();
            var form = this.$el.find('.searchVehicleForm'),
                data = form.serializeArray(),    //[ {name, value}, ... ]
                uriData = form.serialize(),
                i,
                isValid = false;

            //at least one input must be filled
            for (i = 0; i < data.length; i++) {
                if (data[i].value !== '') {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                this.$el.find('.searchValidBlock').css('display', 'none');      //if visible - hide
                require('app').router.navigate('search/vehicle?' + uriData, { trigger: true });
            }
            else {
                this.$el.find('.searchValidBlock').css('display', 'block');
            }
        },

        open: function() {
            $.slidebars.open('right');
        },

        close: function() {
            $.slidebars.close();
        },

        numbersOnly: function(event) {
            var key = event.keyCode || event.which,
                keychar = String.fromCharCode(key);

            // control keys
            if ((key==null) || (key==0) || (key==8) || 
                (key==9) || (key==13) || (key==27) ) {
               return true;
            }
            // numbers
            else if ((("0123456789./-+*()").indexOf(keychar) > -1)) {
               return true;
            }
            else {
               return false;
            }

        }

    });

    return SearchSlidebarView;
});
