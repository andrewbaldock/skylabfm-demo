define(function (require) {

    var $          		  = require('jquery'),
        Backbone   		  = require('backbone'),
        Soundcloud 		  = require('soundcloud'),
        Player     		  = require('player'),
        Track 			    = require('app/sc-track-model'),
        TrackCollection = require('app/sc-track-collection');


    return Backbone.View.extend({

        events: {
            'click #thequery button': 'startSearch'
        },

        initialize: function () {

        },

        startSearch: function () {

            $('#spinner').show();
            var usrInput = $('#thequery input').val(); 
          	
          	/* YOU SHOULD CHANGE THESE VALUES to your own!!!
          	 * get your own client ID here:
          	 * https://soundcloud.com/you/apps
          	--------------------------------------------*/
          	SC.initialize({
                client_id: 	  '7558e3a7eeacacbe55b7c0c1ab9107d9',
                redirect_uri: 'http://andrewbaldock.com/skylabfm-demo/callback.html'
            });

            SC.get('/tracks', { q: usrInput }, function(result) {
                console.log(result + ' ' + result.length);

                _.each(result, function(track) {

                });
                // put 'em in teh dom
                var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3';

            }); // end SC.get	

        },

        handleReturnKey: function () {
            //handle return key
            $('window').on('keydown', function(event) { if (event.which === 13 || event.keyCode === 13) { e.preventDefault();$('#thequery button').click(); } });
        }

    }); 

});
