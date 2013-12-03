define(function (require) {

    var $             = require('jquery'),
        _             = require('underscore'),
        Backbone      = require('backbone'),
        tpl           = require('text!tpl/Track.html'),
        template      = _.template(tpl);

    return Backbone.View.extend({

        tagName: "div",

        render: function () {
            this.$el.html(template(this));
            return this;
        }

    });

});