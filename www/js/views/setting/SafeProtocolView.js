define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/safeProtocolTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, safeProtocolTemplate){

  var SafeProtocolView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(safeProtocolTemplate));
    }

  });
  return SafeProtocolView;
});
