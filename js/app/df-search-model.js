define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        initialize: function(auth) {    // fires at creation.
            if(auth)
                this.setup(auth) 
        },

        setup: function(auth) {
            // NOTE: github.com/jashkenas/backbone/issues/789
            var idFix = (this.has("id") ? "/" + this.get("id") : ""); 

            // CUSTOMIZE: YOU should customize this URL to match your Dreamfactory DSP needs
            this.url = auth.baseurl + "/db/searches" + idFix;  
        },

        defaults: {
            userid: '',
            query: ''
        }

    });

});