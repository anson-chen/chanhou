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
      'click .toggle-show-order':function(e){
        $(e.currentTarget).toggleClass('show-next').parent().find('.order-list-show').toggle();
      },
    },

    render: function(info){
      newChihuo.setPage('myOrder');
      initData.myOrderData.data = [];
      // if(this.fresh){
      //   clearInterval(this.fresh);
      // }
      this.$el.html(_.template(orderListTemplate,initData.myOrderData));
      this.initData();
      this.bindEvents();
      // if(initData.myOrderData.payRefresh && info == 'pay'){   
      //     this.fresh = setInterval(this.initData.bind(this),3000);        
      // }
    },

    goPayIndex: function(e){
      var index = $(e.currentTarget).attr('index');
      var ordId = $(e.currentTarget).attr("orderId");
      if(!$(e.currentTarget).hasClass('can-go-pay')){
        return;
      }
      if(initData.myOrderData.data && initData.myOrderData.data[index]){
        initData.payData.data = initData.myOrderData.data[index];
        initData.payData.data && app_router.navigate('pay/'+ordId,{
              trigger: true
        });
      }
    },


    initData: function(id){
      var _this = this;
      if(this.fresh && (!initData.myOrderData.payRefresh || !newChihuo.getPage('myOrder'))){
          initData.myOrderData.payRefresh = null;
          clearInterval(this.fresh);  
      }
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
                newChihuo.getPage('myOrder') && _this.bindEvents(); 
                }
               
            }
          });
    },
    bindEvents: function(){
      var _this = this;
       $('.reload-top-icon').on('click',function(){
         $('#reload').addClass('show-reload');          
          setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
          _this.initData();
      });
      
    }

  });
  return  MyOrderView;
});
