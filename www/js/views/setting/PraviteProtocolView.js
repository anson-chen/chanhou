define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/praviteProtocolTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, praviteProtocolTemplate){

  var PraviteProtocolView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(praviteProtocolTemplate));
    }

  });
  return PraviteProtocolView;
});
