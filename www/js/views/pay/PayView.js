define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pay/payTemplate.html',
], function($, _, Backbone, payTemplate){

  var PayView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .pay-button':'goPayMethod',
      'click .tip-select': 'setTip'
    },

    render: function(id){
      newChihuo.setPage('pay');
      newChihuo.windowInit();
      this.$el.html(_.template(payTemplate,initData.payData));
    },
    setTip: function(e){
      var original = newChihuo.orderTotalData(newChihuo.dealOrderData(initData.payData.data.order_details,3)).toFixed(2);
      var tip = 0;
      var index = $(e.currentTarget).index('.tip-select');
      $('.tip-select').removeClass('get-tip');
      $(e.currentTarget).addClass('get-tip');
      if(index == 0){
        original = original * 1;
        tip = 0;
      }else if(index == 1){
        tip = original * 0.1;
        original = original * (1+0.1);
        
      }else if(index == 2){
        tip = original * 0.15;
        original = original * (1+0.15);
        
      }else if(index == 3){
        tip = original * 0.2;
        original = original * (1+0.2);
      }else{

      }

      $('.tip-get').text(tip.toFixed(2));
      $('.total-get').text(original.toFixed(2));

    },

    goPayMethod: function(e){
      if(!$('.get-tip').length){
        newChihuo.showPopInfo('please select tip',1200);
        return;
      }
      var restId = $(e.currentTarget).attr('rest');
      var tabId = $(e.currentTarget).attr('table') || 1;
      var ordId = initData.payData.data.order_id;
      var tax = $('.tax-get').text();
      var tip = $('.tip-get').text();
      var pre = $('.pre-get').text();
      var total = $('.total-get').eq(-1).text();
      if(initData.payData.data){
        var data = newChihuo.dealOrderData(initData.payData.data.order_details,1);
        var detail=[];
        for(var i=0; i<data.length; i++){
          var obj = {
            "menuId":data[i].rest_menu_item_id,
            "name":data[i].rest_menu_desc,
            "price":data[i].unit_price.toFixed(2),
            "num":data[i].unit_cnt,
            "sub_total":data[i].sub_total.toFixed(2),
            "comments":data[i].comments,
            "menu_desc":data[i].rest_menu_desc,
            "components":data[i].components
          }
          detail.push(obj);
        }
        var tax_amount = newChihuo.dealOrderData(initData.payData.data.order_details,3).tax_amount || {"PST" : 0, "TOTAL TAX" : 0, "GST" : 0};
        detail.push({"pre_tax" : pre, "tip_amount" : tip, "tax_amount" : tax_amount, "Total" : total});
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
                initData.payMethodData = {
                  orderid:ordId,
                  tableid:tabId,
                  restid:restId,
                  total:total,
                  detail:detail,
                }
                 app_router.navigate('payMethod',{
                      trigger: true
                  }); 
              }else{
                newChihuo.showPopInfo(data.errorMsg,1200);
              }
            }
          });
      }
    },

  });
  return PayView;
});
