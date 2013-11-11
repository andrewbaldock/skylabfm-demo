/* github.com/andrewbaldock/skylabfm */
		
define(["jquery", "soundcloud", "player"], function($) {

      require(['soundcloud'], function (soundcloud) {
      	

		/* BUTTON CLICK
		--------------------------------------------------------------*/
      	$('#thequery button').click(function(soundcloud){

      		$('#spinner').show();
      		var usrInput = $('#thequery input').val(); 
      		
      		// get a client ID and secret to run on your own domain here:
      		// https://soundcloud.com/you/apps
      		SC.initialize({
				client_id: 	  '7558e3a7eeacacbe55b7c0c1ab9107d9',
				redirect_uri: 'http://andrewbaldock.com/skylabfm-demo/callback.html'
  			});
					
			console.log('searching on ' + usrInput);
					
			var $results = $('#results').html('');

			SC.get('/tracks', { q: usrInput }, function(result) {
				debugger;
				console.log(result + ' ' + result.length);
				// put 'em in teh dom
				var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3';
				
			}); // end SC.get	

      	}); // end click
      	
      	
      	//handle return key
      	$('window').on('keydown', function(event) { if (event.which === 13 || event.keyCode === 13) { e.preventDefault();$('#thequery button').click(); } });

      }); //end outer require

});
