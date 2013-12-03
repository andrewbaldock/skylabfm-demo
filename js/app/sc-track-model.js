define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        /* soundcloud track model
         * For defaults I put a misc handful of the track fields returned by
         * the soundcloud api, as well as a custom 'art' field made to handle
         * art fallback.
         ------------------------------------------------------------------ */

        defaults:  {
            artwork_url:    '',
            id:             '',
            title:          '',
            waveform_url:   '',
            user: {
                avatar_url:'',
                username:  ''
            },
            art: ''
        },

        setArtwork: function () {
            var art = this.get('artwork_url');;
            var user = ''
            if (!art) {  
                user = this.get('user');
                art = user.avatar_url;
            }
            this.set({art: art});
            return art;
        }

    });

});