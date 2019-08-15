define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pay/paySetTemplate.html',
], function($, _, Backbone, paySetTemplate){

  var PaySetView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(info){
      this.$el.html(_.template(paySetTemplate,initData.orderListData));
      this.bindEvents();
    },

  });
  return PaySetView;
});
