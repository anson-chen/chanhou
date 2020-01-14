define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderListTemplate.html',
], function($, _, Backbone, orderListTemplate){

  var OrderListView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(info){
      newChihuo.setPage('orderList');
      initData.orderListData.data = [];
      $("#dishDetailWrap").html(_.template(orderListTemplate,initData.orderListData)).addClass('show-menu-dish');
      this.bindEvents();
      this.initData();
    },


    goPayIndex: function(e){
      var index = $(e.currentTarget).index('.go-pay-btn');
      var restId = 23612;
      var tabId = 1;
      var ordId = $(e.currentTarget).attr("orderId");
      // if(!$(e.currentTarget).hasClass('can-go-pay')){
      //   return;
      // }
      if(initData.orderListData.data && initData.orderListData.data[index]){
        var data = newChihuo.dealOrderData(initData.orderListData.data[index].order_details,1);
        initData.payData.data = initData.orderListData.data[index];
        initData.payData.data && app_router.navigate('pay/'+ordId,{
              trigger: true
        });
        return;
        var detail=[];
        for(var i=0; i<data.length; i++){
          var obj = {
            "menu_item_id":data[i].rest_menu_item_id,
            "menu_desc":data[i].rest_menu_desc,
            "unit_price":data[i].unit_price.toFixed(2),
            "unit_cnt":data[i].unit_cnt,
            "sub_total":data[i].sub_total.toFixed(2),
            "comments":""
          }
          detail.push(obj);
        }
        detail.push({"total_amount":newChihuo.dealOrderData(initData.orderListData.data[index].order_details,2).toFixed(2),"tip_amount":0,"tax_amount":0});
      }
      console.log(detail);
      if(detail){      
       chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('reqCheckout.json'),
          data: {
              restId: restId,
              tabId:tabId,
              ordId:ordId,
              detail:JSON.stringify(detail),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en'
          },
          success: function(data){
              if(data.status == 0){
                if(data.data[0] && data.data[0].order_details){
                  initData.payData.data = data.data[0].order_details;
                }
               
              }else{
                newChihuo.showPopInfo(data.errorMsg,1200);
              }
            }
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
                initData.orderListData.data = data.data;               
                newChihuo.getPage('orderList') && $("#dishDetailWrap").html(_.template(orderListTemplate,initData.orderListData));
                newChihuo.getPage('orderList') && !initData.orderListData.data.length && $(".no-order").html('there is no order');  
                 _this.bindEvents();
                newChihuo.getPage('orderList') && setTimeout(function(){_this.initData()},10*1000);
                }
               
            }
          });

    },
  });
  return OrderListView;
});
