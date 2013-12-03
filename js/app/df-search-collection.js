define(function (require) {

    var $           = require('jquery'),
        _           = require('underscore'),
        Backbone    = require('backbone'),
        SearchModel = require('app/df-search-model');

    return Backbone.Collection.extend({
 
        initialize: function () {   // fires at creation.
            this.model = new SearchModel();
        },

        setup: function(auth){
            this.auth = auth;
            $.ajaxSetup({ headers: { 
                'X-DreamFactory-Session-Token': auth.sessionId, 
                'X-DreamFactory-Application-Name': auth.apikey
            }});
            this.model.setup(auth);

            // CUSTOMIZE: YOU should customize this URL to match your Dreamfactory DSP needs
            this.url = auth.baseurl + "/db/searches?filter=userid%3D'" + auth.userid + "'&fields=id,query";
        },

        parse: function(data) {
            _.each(data.record, function(search) {
                var model = new SearchModel({id:search.id, query:search.query});
                model.setup(this.auth);
                this.add(model);
            }, this);
        },

    });


});

