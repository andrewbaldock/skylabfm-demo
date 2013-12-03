define(function (require) {

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        SearchModel         = require('app/df-search-model'),
        SearchCollection    = require('app/df-search-collection'),
        tpl                 = require('text!tpl/SavedSearch.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        template: $('#searches-template').html(),

        el: '#savedsearches',

        events: {
            'click .asearch': 'doSearch',
            'click .delete':  'deleteSearch'
        },
        
        initialize: function(auth){ // fires at creation.
            this.auth = auth;
            this.collection = new SearchCollection();
            this.listenTo(this.collection, 'reset', this.renderList);
        },

        render: function(){
            if(!this.collection.auth) 
                this.collection.setup(this.auth);
            this.collection.fetch({reset:true});
        },

        renderList: function(){
            $('#savedsearches').html('');
            _.each(this.collection.models, function(model) {
                this.$el.append(template({model:model}));
            }, this);
        },
        
        doSearch: function(event){
            event.preventDefault();
            var query = this.$(event.target).text();
            $('input#query').val( query);
            $('#thequery button').click();
        },

        saveSearch: function (query) {
            var dupeCheck = this.collection.findWhere({query:query});
            if(!dupeCheck) {
                console.log('save ' + query + ' into dreamfactory backend now');
                var model = new SearchModel();
                model.setup(this.auth);
                model.set({query:query, userid:this.auth.userid});
                model.save();
                this.collection.add(model);
                this.collection.fetch({reset:true});
            }
        },

        deleteSearch: function(event) {
            event.preventDefault();
            $(event.target).parent('div').fadeOut('slowest');
            var id = event.currentTarget.parentElement.dataset.id;
            var query = $(event.currentTarget.parentElement).find('.asearch').text();
            var deadmodel = this.collection.get(id);
            if(deadmodel) {
            	deadmodel.destroy();
            	this.collection.remove(deadmodel);
            }
        },

    }); 

});
