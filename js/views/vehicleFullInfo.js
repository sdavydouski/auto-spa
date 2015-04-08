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
            //this.model.on('change', this.render, this);
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
                value = that.isNumber(value) ? +value : value;
                $(this).replaceWith('<span class="editable" data-type="' + fieldType + '" data-attr="' + field + '">' + value + '</span>');

                that.model.get(fieldType)[field] = value;

                console.log(that.model.get(fieldType));
                console.log(that.backupObj);
            });


        },

        isNumber: function(string) {
            return !isNaN(parseFloat(string)) && isFinite(string);
        }

    });

    return VehicleFullInfoView;
});
