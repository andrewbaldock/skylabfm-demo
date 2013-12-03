requirejs.config({
	// Place third party dependencies in the lib folder
    'baseUrl': 'js/lib',	
    // shim = dependencies between libraries
    shim: {   				
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        }
    },
    // remove the protocol from these URLs if not running locally.  
    // TODO: autodetect 'localhost' etc
    'paths': {	
        'app': '../app',
        'tpl': '../tpl',
        'jquery' : 		'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
        'json2' :       'http://cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min',
        'underscore' :  'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min',
        'backbone' : 	'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone',
        'soundcloud' :  'http://connect.soundcloud.com/sdk',
        'player' : 	  	'https://w.soundcloud.com/player/api',
        'spin' :        'spin'
    }
});
// Start the apps
requirejs(['app/main']);  
