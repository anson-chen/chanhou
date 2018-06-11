define([
    'text!templates/sidebar/sidebarTemplate.html'
], function(sidebarTemplate) {

    var SidebarView = Backbone.View.extend({
        el: $("#sidebar"),

        initialize: function() {
            this.modal_backdrop = $('<div id="modal-backdrop" class="modal-backdrop fade in"></div>');
        },

        events: {
            'touchstart #navbar': function() {
                $('body').css('overflow-y', 'hidden');
            },

            'touchend #navbar': function() {
                setTimeout(function() {
                    $('body').css('overflow-y', 'auto');
                }, 100)
            },

            'click #modal-backdrop': function(e) {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $(e.currentTarget).remove();
            },

            'click #login': function() {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
                app_router.navigate('login', {
                    trigger: true  
                });
            },

            'click #register': function() {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
                app_router.navigate('register', {
                    trigger: true  
                });
            },

            'click .wk-icon-index': function() {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
                app_router.navigate('index', {
                    trigger: true
                });
            },


            'click .wk-icon-record,.wk-icon-evaluate,.wk-icon-prompt,.wk-icon-favorite,.wk-icon-sign': function() {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
                //app_router.navigate('fastSearch/'+"dd", {
                //    trigger: true
                //});
            },


            'click #setting': function() {
                $(this.el).find('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
                app_router.navigate('settingIndex',{
                    trigger: true
                });
            }
        },

        render: function() {

            var that = this;

            var backbone_ad = {
                site_url: "http://www.backbonejs.org",
                image_url: "./imgs/backbone_logo.png",
                title: "Backbone.js",
                description: "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface."
            };

            var require_ad = {
                site_url: "http://www.requirejs.org",
                image_url: "./imgs/require_logo.png",
                title: "Require.js",
                description: "RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node."
            };

            var data = {
                ads: [backbone_ad, require_ad]
            };

            var compiledTemplate = _.template(sidebarTemplate, data);

            $(this.el).html(compiledTemplate);
        },

        toggleStatus: function() {
            var show = $('.wk-sidebar').hasClass('in');
            if (show) {
                $('.wk-sidebar').removeClass('in');
                $('#modal-backdrop').remove();
            } else {
                $('.wk-sidebar').addClass('in');
                $('#sidebar').append(this.modal_backdrop);
            }
        }

    });

    return SidebarView;

});
