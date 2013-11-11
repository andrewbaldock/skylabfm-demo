define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                artwork_url:    '',
                id:             '',
                title:          '',
                waveform_url:   '',
                user: {
                    avatar_url:'',
                    username:  ''
                }
            };
        }

    });

});