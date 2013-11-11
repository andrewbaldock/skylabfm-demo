define(function (require) {

    var SoundcloudTrack = require('app/sc-track-model');
        

    return Backbone.Collection.extend({

        model: SoundcloudTrack,

        url: '',

        /* sync: function (method, model, options) {
            if (method === "read") {
                if (options) {
                    return this.sendRequestWithOptions({
                        xaction: "read",
                        rootNode: "planTypes",
                        callback: function (result, data) {
                            if (result)
                                options.success(data);
                            else
                                options.error(data);
                        }
                    });
                }
            } else {
                return NUCCollection.prototype.sync.apply(this, arguments);
            }
        }, */

    });


});

