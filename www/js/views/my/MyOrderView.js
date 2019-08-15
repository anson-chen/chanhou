define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderListTemplate.html',
], function($, _, Backbone, orderListTemplate){

  var MyOrderView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .go-pay-btn':'goPayIndex',
    },

    render: function(info){
      newChihuo.setPage('myOrder');
      initData.myOrderData.data = [];
      this.$el.html(_.template(orderListTemplate,initData.myOrderData));
      this.initData();
      this.getReceiption();
    },

    goPayIndex: function(e){
      var index = $(e.currentTarget).index('.go-pay-btn');
      var ordId = $(e.currentTarget).attr("orderId");
      if(!$(e.currentTarget).hasClass('can-go-pay')){
        return;
      }
      if(initData.myOrderData.data && initData.myOrderData.data[index]){
        var data = newChihuo.dealOrderData(initData.myOrderData.data[index].order_details,1);
        initData.payData.data = initData.myOrderData.data[index];
        initData.payData.data && app_router.navigate('pay/'+ordId,{
              trigger: true
        });
      }
    },

    initData: function(id){
      var _this = this;
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('getActReqByCID.json'),
          data: {
              tcId: id || newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en'
          },
          success: function(data){
              if(data.status == 0){
                initData.myOrderData.data = data.data;               
                newChihuo.getPage('myOrder') && _this.$el.html(_.template(orderListTemplate,initData.myOrderData));
                newChihuo.getPage('myOrder') && !initData.myOrderData.data.length && $(".no-order").html('there is no order');  
                }
               
            }
          });

    },

    getReceiption: function(){
      var _this = this;
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('getReceiptInfo.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              ordId:null,
          },
          success: function(data){
              if(data.status == 0){
                // initData.myOrderData.data = data.data;               
                // newChihuo.getPage('myOrder') && _this.$el.html(_.template(orderListTemplate,initData.myOrderData));
                // newChihuo.getPage('myOrder') && !initData.myOrderData.data.length && $(".no-order").html('there is no order');  
                }
               
            }
          });

    }

  });
  return  MyOrderView;
});
