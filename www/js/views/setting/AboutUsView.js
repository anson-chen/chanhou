define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/aboutUsTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, aboutUsTemplate){

  var AboutUsView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(aboutUsTemplate));
    }

  });
  return AboutUsView;
});
