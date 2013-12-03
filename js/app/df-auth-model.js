define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        /* DreamFactory Authentication module
         * uses a backbone model as a settings singleton to hold session info
         * ----------------------------------------------------------------- */

        // CONFIG: YOU should update baseurl and apikey to match your DSP.

        defaults: {
            baseurl:    'https://dsp-skylabfm-demo.cloud.dreamfactory.com/rest',
            apikey:     'skylabfm-demo',
            sessionId:  '',  // INFO: value we will get back from dreamfactory to use in future rquests
            userid:     ''   // INFO: to match site users to their searches
        },

        initialize: function () {   // fires at creation.
            this.setUserId();
            this.sync();
            var me = this;
            setInterval(function(){
                me.sync();
            },600000); // 10 minutes -- keeps the sessin alive in the browser
        },

        sync: function() {
            var me = this;
            $.ajax({
                type: "POST",
                url: this.get('baseurl') + '/user/session?app_name=' + this.get('apikey'),
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:'p4ssw0rd'}),
                /* CONFIG: put your system user info above...if you want to go this route.
                 * Here I am using a special "system user" I set up in my dreamfactory.com dsp.
                 * This System User is barely-privileged to grant dreamfactory api authentication
                 * only; which is why I'm not stressed out about having this password exposed in 
                 * code here.  YMMV.
                 * -----------------------------------------------------------------------------*/ 

                success: function (response) {
                    me.set({sessionId:response.session_id});
                    me.trigger("dreamfactory: authenticated", me);
                },

                error: function (response, textStatus, xError) {
                    console.log(response.responseText);
                    $('#spinner').hide();
                }
                
            });
        },

        setUserId: function () {
            // todo: use localstorage?  get off my lawn...
            var uid = this.readCookie('skylabfm');
            if (uid == null) {
                var date = new Date;
                uid = 'skylab' + date.getTime();
                this.writeCookie('skylabfm', uid ,365);
            }
            this.set({userid: uid});
        },

        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {c = c.substring(1, c.length);}
                if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length, c.length);}
            }
            return null;
        },
        
        writeCookie: function (name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = name + "=" + value + expires + "; path=/; ";
        }

    });

});