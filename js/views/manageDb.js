// Filename: views/manageDbView.js

define([
    'jquery',
    'underscore', 
    'backbone'
    ], function($, _, Backbone) {
    var ManageDbView = Backbone.View.extend({
        tagname: 'div',
        className: 'manageDb',

        template: _.template($('#manageDbTemplate').html()),

        events: {
            'change :file': 'validateFile',
            'click .fileUploadButton': 'uploadFile'
        },

        render: function() {
            $('.mainContent').html( this.$el.html( this.template() ) );
            return this;
        },

        validateFile: function(event) {
            var file = event.target.files[0];
            console.log(file.name);
            console.log(file.size);
            console.log(file.type);
        },

        uploadFile: function(event) {
            event.preventDefault();

            var that = this,
                formData = new FormData($('.uploadForm')[0]);
            
            $.ajax({
                url: '/api/vehicles',  //Server script to process data
                type: 'POST',
                xhr: function() {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // Check if upload property exists
                        myXhr.upload.addEventListener('progress', that.updateProgress, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                //Ajax events
                /*beforeSend: beforeSendHandler,*/
                success: function() {
                    console.log('success');
                },
                error: function() {
                    console.log('error');
                },
                // Form data
                data: formData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            });

        },

        updateProgress: function(event) {
            if( event.lengthComputable ) {
                console.log({
                    value: event.loaded,
                    max: event.total
                });
            }
        }

    });

    return ManageDbView;
});
