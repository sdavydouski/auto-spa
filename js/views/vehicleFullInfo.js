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

        events: {
            'click .editButton': 'switchToEditMode',
            'click .cancelButton': 'cancel',
            'click .saveButton': 'updateModel',
            'click .deleteButton': 'deleteModel',
            'click li': 'editField'
        },

        initialize: function() {
            this.editMode = false;
            this.fieldValues = [];
            this.backupObj = $.extend(true, {}, this.model.attributes);
        },

        render: function() {
            $('.mainContent').html( this.$el.html( this.template(this.model.toJSON()) ) );
            return this;
        },

        switchToEditMode: function(event) {
            this.editMode = true;

            $('.editButtonRow').css('display', 'none');
            $('.saveCancelButtonsRow').css('display', 'block');
            $('.topLine').css('display', 'block');

            this.saveFieldValues();
        },

        saveFieldValues: function() {
            var that = this;
            this.fieldValues = [];
            $('.editable').each(function(index) {
                that.fieldValues.push( $(this).html() );
            });
            this.backupObj = $.extend(true, {}, this.model.attributes);
        },

        cancel: function(event) {
            this.switchToNormalMode(true);
        },

        updateModel: function(event) {
            this.saveFieldValues();
            this.switchToNormalMode(false);

            this.model.save();
        },

        switchToNormalMode: function(isCanceled) {
            this.editMode = false;

            $('.editButtonRow').css('display', 'block');
            $('.saveCancelButtonsRow').css('display', 'none');
            $('.topLine').css('display', 'none');
            
            if (isCanceled) {
                var that = this;
                $('.editable').each(function(index) {
                    $(this).html( that.fieldValues[index] );
                });
                this.model.set(this.backupObj);
            }
        },

        editField: function(event) {
            if (!this.editMode) {
                return;
            }

            var eventTarget = $(event.target),
                fieldValue,
                replaceableElement;

            if (eventTarget.attr('class') === 'editable') {
                replaceableElement = eventTarget;
                fieldValue = eventTarget.html();
            }
            else if (eventTarget.attr('class') === 'editInput') {
                return;
            }
            else {
                replaceableElement = eventTarget.find('.editable');
                fieldValue = replaceableElement.html();
            }

            var fieldType = $(replaceableElement).data('type'),
                field = $(replaceableElement).data('attr'),
                prevValue,
                that = this;

            $(replaceableElement).replaceWith('<input type="text" class="editInput" value="' + fieldValue + '"></input>');
            $('.editInput').focus();
            $('.editInput').blur(function(e) {
                var value = $(this).val();
                $(this).replaceWith('<span class="editable" data-type="' + fieldType + '" data-attr="' + field + '">' + value + '</span>');

                if ( typeof that.model.get(fieldType)[field] === 'number' ) {
                    value = +value;
                }

                that.model.get(fieldType)[field] = value;
            });


        },

        deleteModel: function(event) {
            if ( confirm('Are you sure?') ) {
                this.model.destroy({
                    dataType : 'text',  // <-- and we don't return json from the server
                    success: function() {
                        console.log('delete');
                        require('app').router.back();
                    },
                    error: function() {
                        console.log('delete error');
                    }
                });
            }
        }

    });

    return VehicleFullInfoView;
});
