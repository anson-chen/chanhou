define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/sidebar/sidebarTemplate.html'
], function($, _, Backbone,sidebarTemplate) {

    var SidebarView = Backbone.View.extend({
        el: $("#sidebar"),

        initialize: function() {
            
        },

        events: {
           'click .close-big-modal': function(){
             this.$el.removeClass('show-big-modal');
           } 
        },

        render: function() {
           this.$el.html(_.template(sidebarTemplate,initData.photoData)).addClass('show-big-modal');
        },

    });

    return SidebarView;

});
