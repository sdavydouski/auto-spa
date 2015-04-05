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
            'click li': 'editField'
        },

        initialize: function() {
            this.editMode = false;
            this.fieldValues = [];
        },

        render: function() {
            $('.mainContent').html( this.$el.html( this.template(this.model.toJSON()) ) );
            return this;
        },

        switchToEditMode: function(event) {
            this.editMode = true;

            $('.editButtonRow').css('display', 'none');
            $('.saveCancelButtonsRow').css('display', 'block');

            this.saveFieldValues();
        },

        saveFieldValues: function() {
            var that = this;
            this.fieldValues = [];
            $('.editable').each(function(index) {
                that.fieldValues.push( $(this).html() );
            });
        },

        cancel: function(event) {
            this.switchToNormalMode(true);
        },

        updateModel: function(event) {
            this.saveFieldValues();
            this.switchToNormalMode(false);

            //update model
        },

        switchToNormalMode: function(isCanceled) {
            this.editMode = false;

            $('.editButtonRow').css('display', 'block');
            $('.saveCancelButtonsRow').css('display', 'none');
            console.log(isCanceled);
            if (isCanceled) {
                var that = this;
                $('.editable').each(function(index) {
                    $(this).html( that.fieldValues[index] );
                });
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
            else {
                replaceableElement = eventTarget.find('.editable');
                fieldValue = replaceableElement.html();
            }

            $(replaceableElement).replaceWith('<input type="text" class="editInput" value="' + fieldValue + '"></input>');
            $('.editInput').focus();
            $('.editInput').blur(function(e) {
                var value = $(this).val();
                $(this).replaceWith('<span class="editable">' + value + '</span>');
            });
        }

    });

    return VehicleFullInfoView;
});
