define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/safeProtocolTemplate.html',
  'bootstrap'
], function($, _, Backbone, safeProtocolTemplate){

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
