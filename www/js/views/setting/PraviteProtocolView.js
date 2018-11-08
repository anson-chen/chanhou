define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/praviteProtocolTemplate.html',
  'bootstrap'
], function($, _, Backbone, praviteProtocolTemplate){

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
