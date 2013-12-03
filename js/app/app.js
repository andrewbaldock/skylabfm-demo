define(function (require) {

    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('backbone'),
        Player          = require('player'),
        DfAuth          = require('app/df-auth-model'),
        JSON2           = require('json2'),
        Spinner         = require('app/spinner-view'),
        Soundcloud      = require('soundcloud'),
        Track           = require('app/sc-track-model'),
        TrackCollection = require('app/sc-track-collection'),
        TrackView       = require('app/sc-track-view'),
        SavedSearches   = require('app/df-search-collection'),
        SavedSearchView = require('app/df-search-view');

    return Backbone.View.extend({

        /* App.js 
         * Primary clockwork for the skylab-fm demo app
         * This is a Backbone View, see backbonejs.org for deeper understanding
         ---------------------------------------------------------------------- */

        trackList: [],
        // CONFIG: soundcloud player customizable options here
        sc_options: '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3',

        el: '#main',

        events: {
            'submit form': 'doSearch',
            'click .track': 'clickTrack',
            'click #searchclear': 'clearQuery'
        },

        initialize: function () {    // fires at creation.
            $('#offline').remove();
            this.spinner = new Spinner();

            this.dfAuth = new DfAuth();
           /* INFO: we are using Backbone eventing to catch asynchronous responses.  Creating a new DfAuth() 
            * above instantiates the DfAuth class ;asynchronously.  When DfDtuh has finished getting a token 
            * from dreamfactory it fires an event.  The next statement listens for that event to continue the 
            * logic. */
            this.listenTo(this.dfAuth, 'dreamfactory: authenticated', this.initSearch); 

            this.collection = new TrackCollection();
            this.listenTo(this.collection, 'reset', this.showTracks);
        }, 

        initSearch: function (authmodel) {
            console.log("dreamfactory: authenticated");
            $('#spinner').hide();
            $('#thequery').fadeIn();
            if(!this.savedsearchview)
                this.savedsearchview = new SavedSearchView(authmodel.attributes);
            else
                this.savedsearchview.initialize(authmodel.attributes);
            this.savedsearchview.render();
        },

        doSearch: function (event) {
            $('#spinner').show();
            this.clearTracks();
            this.collection.search(event.target[0].value);
            this.savedsearchview.saveSearch(event.target[0].value);
            var me = this;
            setTimeout(function(){
                me.savedsearchview.render();
            }, 500);
        },

        showTracks: function(event) {
            var $listEl = $('#results', this.el);
            var me = this;
            this.i = 0;
            // INFO: we can keep the scope of this view inside the below closure... -> (continues..)
            _.each(this.collection.models, function (track) {
                track.setArtwork();
                this.i++;
                track.counter = this.i;
                var trackView = new TrackView({model: track}).render();
                this.trackList.push(trackView); 
                $listEl.append(trackView.el);
            }, this);  //  <-- .... by passing in 'this' here, thanks to Underscore '_.each()' function!

            // INFO: would usually just show() here, but we are using inline-block centering, so do that instead.
            $listEl.css('display','inline-block'); 
            $('#spinner').hide();

            //play first track
            setTimeout(function(){
                me.playTrack(1);
            },500);
        },

        playTrack: function(id) {
            var countClass = '.' + id;
            this.playing = id;
            $(countClass).removeClass('unplayed').click();
        },

        playNext: function() {
            this.playTrack(this.playing + 1);
        },

        clearTracks: function() {
            _.each(this.trackList, function(item){
                item.remove();  // INFO: this properly releases the event bindinds onthe subviews.
            });
            this.trackList = [];
        },

        setBackground: function() {
            $('html').css('background-image', "url('" + this.trackmodel.get('art') + "')").css('background-size','34%');
        },

        clickTrack: function (event) {
            if(this.player)
                this.player.unbind(SC.Widget.Events.FINISH, function(eventData) {});
            $('.track').removeClass('isPlaying');

            var trackid = event.currentTarget.dataset.trackid;
            var url     = 'http://api.soundcloud.com/tracks/' + trackid;
            var iframe  = document.querySelector('#widget');
            iframe.src  = 'https://w.soundcloud.com/player/?url=' + url + this.sc_options;  

            this.trackmodel = this.collection.get({id:trackid});
            this.player = SC.Widget(iframe);  // with SC.Widget we can listen to when the iframe says the song is done
            
            var me = this;
            setTimeout(function(){
                me.player.bind(SC.Widget.Events.FINISH, function(eventData) {
                    me.playNext();
                });
            },1500); 
            
            this.setBackground();
            this.$('#player-wrapper').fadeIn();

            this.track = this.$('.track.'+trackid);
            this.track.addClass('isPlaying');
            this.playing = this.track.data('trackcounter');
        },

        clearQuery: function(){
            $('#query').val('');
        }

    }); 

});
