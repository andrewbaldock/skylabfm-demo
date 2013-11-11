define(['jquery', 'underscore', 'app/df-auth', 'json2', 'player', 'backbone', 'spin'/*, 'app/searches'*/,  'app/soundcloud'  ], function($) {

    $(function() {

    	// SET UP THE SPINNER
        var Spinner = require('spin');
        var opts = {
		  lines: 20, // The number of lines to draw
		  length: 5, // The length of each line
		  width: 16, // The line thickness
		  radius: 25, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#16A5CE', // #rgb or #rrggbb or array of colors
		  speed: 0.8, // Rounds per second
		  trail: 30, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};
		var target = document.getElementById('spinner');
		var spinner = new Spinner(opts).spin(target);
		$('#spinner').hide();

		// DREAMFACTORY AUTHENTICATION
        var DfAuth = require('app/df-auth');
		var dfAuth = new DfAuth();
        dfAuth.getDreamFactoryToken();



    });
});
