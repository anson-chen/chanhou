define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/userGuideTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, userGuideTemplate){

  var UserGuideView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(userGuideTemplate));
    }

  });
  return UserGuideView;
});
