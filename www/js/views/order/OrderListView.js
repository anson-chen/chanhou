define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderListTemplate.html',
], function($, _, Backbone, orderListTemplate){

  var OrderListView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .go-order': 'goPay'
    },

    render: function(info){
      initData.orderListData.data = info;
      var price = $('.order-all-price').text();     
      initData.orderListData.allPrice = price ? price : '';
      $("#dishDetailWrap").html(_.template(orderListTemplate,initData.orderListData)).addClass('show-menu-dish');
      this.bindEvents();
    },

    goPay: function(){

    },

    bindEvents: function(){
      
    }
  });
  return OrderListView;
});
