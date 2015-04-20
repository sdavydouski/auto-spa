// Filename: views/clientsCollection.js

define([
    'jquery',
    'underscore',
    'backbone',
    'views/client',
    'models/client'
    ], function($, _, Backbone, ClientView, Client) {
    var ClientsCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'clientsInfo',

        template: _.template($('#clientsCollectionTemplate').html()),

        events: {
            'click .cancelClientButton': 'returnToClientsTable',
            'click .createClientButton': 'saveClient'
        },

        initialize: function() {
            
        },

        render: function() {
            var clientsCollectionHtml = this.collection.map(function(client) {
               return new ClientView( { model: client } ).render().el;
            });

            this.$el.append( this.template() );
            
            this.$el.find('tbody').append( clientsCollectionHtml );
            $('.mainContent').html( this.$el );
            return this;
        },

        returnToClientsTable: function(event) {
            require('app').router.navigate('clients');
        },

        saveClient: function(event) {
            event.preventDefault();
            var form = this.$el.find('.createClientForm'),
                data = form.serializeArray(),    //[ {name, value}, ... ]
                //first three inputs must be filled (firstName, lastName and phone)
                isValid = data[0].value != '' && data[1].value != '' && data[2].value != '',
                modelData = {};

            if (!isValid) {
                this.$el.find('.clientsValidBlock').css('display', 'block');
                return;
            }

            this.$el.find('.clientsValidBlock').css('display', 'none');

            var checkBoxesValues = {
                delivery: 0,
                cash: 0,
                credit: 0
            };

            data.forEach(function(item) {
                if (item.name === 'delivery') {
                    checkBoxesValues.delivery = +item.value;
                }
                else if (item.name === 'cash') {
                    checkBoxesValues.cash = +item.value;
                }
                else if (item.name === 'credit') {
                    checkBoxesValues.credit = +item.value;
                }

                modelData[item.name] = item.value;
            });
            
            modelData.delivery = checkBoxesValues.delivery;
            modelData.cash = checkBoxesValues.cash;
            modelData.credit = checkBoxesValues.credit;

            var newClient = new Client(modelData);
            newClient.save(null, {
                dataType : 'text',  // <-- and we don't return json from the server
                success: function() {
                    console.log('success');
                    require('app').router.navigate('clients', { trigger: true });
                },
                error: function() {
                    console.log('error');
                }
            })

        }
    });

    return ClientsCollectionView;
});
