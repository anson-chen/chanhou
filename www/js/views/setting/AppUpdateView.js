define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/appUpdateTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, appUpdateTemplate){

  var AppUpdateView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(appUpdateTemplate));
    }

  });
  return AppUpdateView;
});
