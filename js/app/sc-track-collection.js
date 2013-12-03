define(function (require) {

    var SoundcloudTrack = require('app/sc-track-model');
        

    return Backbone.Collection.extend({

        model: SoundcloudTrack,

        initialize: function () {   // fires at creation.
            
            /* CONFIG: YOU SHOULD CHANGE THESE VALUES to your own!!!
             * get your own client ID here:
             * https://soundcloud.com/you/apps
            --------------------------------------------*/
            SC.initialize({
                client_id:    '7558e3a7eeacacbe55b7c0c1ab9107d9',
                redirect_uri: 'http://andrewbaldock.com/skylabfm-demo/callback.html'
            });
        },

        search: function (usrInput) {
            var me = this;
            SC.get('/tracks', { q: usrInput }, function(result) {
                me.reset(result);   // backbonejs.org/#Collection-reset
            });   
        }

    });


});

