define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderPayTemplate.html',
], function($, _, Backbone, orderPayTemplate){

  var OrderListView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .go-order': 'goPay'
    },

    render: function(info){
      $("#dishDetailWrap").html(_.template(orderPayTemplate,initData.orderListData)).addClass('show-menu-dish');
      this.bindEvents();
    },

    goPay: function(){

    },

    bindEvents: function(){
      
    }
  });
  return OrderListView;
});
