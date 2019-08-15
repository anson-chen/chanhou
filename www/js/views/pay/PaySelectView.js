define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pay/paySelectTemplate.html',
], function($, _, Backbone, paySelectTemplate){

  var PaySelectView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(info){
      this.$el.html(_.template(paySelectTemplate,initData.orderListData));
      this.bindEvents();
    },

  });
  return PaySelectView;
});
