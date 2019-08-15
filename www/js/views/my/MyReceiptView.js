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
                  initData.myReceiptData.order_details = JSON.parse(data.data[0].order_details);
                  initData.myReceiptData.payment_details = JSON.parse(data.data[0].payment_details);
                  initData.myReceiptData.rest_details = JSON.parse(data.data[0].rest_details);
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
