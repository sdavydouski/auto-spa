// Filename: views/client.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var ClientView = Backbone.View.extend({

        events: {
            'click .editClientButton': 'editClient',
            'click .cancelClientButton': 'cancelEdit',
            'click .saveClientButton': 'updateModel',
            'click .deleteClientButton': 'deleteModel',
            'click td': 'editField',
            'click .assignToClient': 'assignVehicleToClient',
            'click': 'showClientVehicles'
        },

        template: _.template($('#clientTemplate').html()),

        initialize: function() {
            this.editMode = false;
            this.fieldValues = [];
            this.backupObj = $.extend(true, {}, this.model.attributes);
        },

        render: function(productId) {
            this.model.set({
                productId: productId
            });
            this.setElement( this.template(this.model.toJSON()) );
            return this;
        },

        editClient: function(event) {
            this.editMode = true;
            this.toggleButtons();

            this.saveFieldValues();

            event.stopPropagation();
        },

        saveFieldValues: function() {
            var that = this;
            this.fieldValues = [];
            this.$el.find('td').each(function(index) {
                that.fieldValues.push( $(this).html() );
            });
        },

        cancelEdit: function(event) {
            this.editMode = false;
            this.toggleButtons();

            this.model.set(this.backupObj);
            var that = this;
            this.$el.find('td').each(function(index) {
                $(this).html( that.fieldValues[index] );
            });

            event.stopPropagation();
        },

        updateModel: function(event) {
            this.editMode = false;
            this.toggleButtons();

            this.backupObj = $.extend(true, {}, this.model.attributes);

            this.saveFieldValues();
            
            this.model.save();

            event.stopPropagation();
        },

        editField: function(event) {
            if (!this.editMode) {
                return;
            }

            var eventTarget = $(event.target);

            if (eventTarget.attr('class') === 'editInput') {
                return;
            }

            var fieldValue = eventTarget.html(),
                field = eventTarget.data('attr'),
                that = this;

            $(eventTarget).html('<input type="text" class="editInput" value="' + fieldValue + '"></input>');
            $('.editInput').focus();
            $('.editInput').blur(function(e) {
                var value = $(this).val();
                $(this).replaceWith(value);

                if ( typeof that.model.get(field) === 'number' ) {
                    value = +value;
                }

                var map = {};
                map[field] = value;

                that.model.set(map);
            });


            event.stopPropagation();
        },

        toggleButtons: function() {
            if (this.editMode) {
                this.$el.find('.editClientButton').css('display', 'none');
                this.$el.find('.cancelClientButton').css('display', 'inline-block');

                this.$el.find('.deleteClientButton').css('display', 'none');
                this.$el.find('.saveClientButton').css('display', 'inline-block');
            }
            else {
                this.$el.find('.editClientButton').css('display', 'inline-block');
                this.$el.find('.cancelClientButton').css('display', 'none');

                this.$el.find('.deleteClientButton').css('display', 'inline-block');
                this.$el.find('.saveClientButton').css('display', 'none');
            }
        },

        deleteModel: function(event) {
            if ( confirm('Are you sure?') ) {
                var that = this;
                this.model.destroy({
                    dataType : 'text',  // <-- and we don't return json from the server
                    success: function() {
                        console.log('delete success');
                        that.$el.remove();
                    },
                    error: function() {
                        console.log('delete error');
                    }
                });
            }

            event.stopPropagation();
        },

        assignVehicleToClient: function() {
            var that = this;
            $.ajax({
                url: '/api/product',
                type: 'POST',
                data: JSON.stringify({
                    clientId: that.model.id,
                    productId: +that.model.get('productId')
                }),
                contentType: 'application/json',
                success: function() {
                    console.log('assign success');
                },
                error:function() {
                    console.log('assign error');
                }
            });

            event.stopPropagation();

            this.showClientVehicles();
        },

        showClientVehicles: function() {
            if (this.editMode) {
                return;
            }

            require('app').router.navigate('/vehicles?clientId=' + this.model.id, { trigger: true });
        }

    });

    return ClientView;
});
