define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myReceiptTemplate.html',
], function($, _, Backbone, myReceiptTemplate){

  var MyReceiptView = Backbone.View.extend({
    el: $("#page"),
    events: {

    },

    render: function(id){
      newChihuo.setPage('myReceipt');
      this.$el.html(_.template(myReceiptTemplate,initData.myReceiptData));
      this.initData(id);
    },

    dealOrderData: function(data){
      try{
          var detail = JSON.parse(data);
        }catch(error){
          var detail = [];
        }
      var len = detail.length;  
      if(!detail['Orders'] && detail[len-1]['dinein_flag']){
        detail.pop();
      }  
      return detail;
    },


    initData: function(id){
      var _this = this;
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('getReceiptInfo.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              ordId: id,
          },
          success: function(data){
              if(data.status == 0){
                if( data.data[0].status_code == 0 && id == data.data[0].cust_order_id){
                  initData.myReceiptData.order_details = _this.dealOrderData(data.data[0].order_details);
                  initData.myReceiptData.payment_details = JSON.parse(data.data[0].payment_details);
                  initData.myReceiptData.rest_details = JSON.parse(data.data[0].rest_details);
                  initData.myReceiptData.cust_order_id = id || data.data[0].cust_order_id;
                  console.log(initData.myReceiptData);
                }               
                newChihuo.getPage('myReceipt') && _this.$el.html(_.template(myReceiptTemplate,initData.myReceiptData));
                }
               
            }
          });

    }
  });
  return  MyReceiptView;
});
