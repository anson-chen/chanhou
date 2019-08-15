define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myPaymentTemplate.html',
], function($, _, Backbone, myPaymentTemplate){

  var MyPaymentView = Backbone.View.extend({
    el: $("#page"),
    events: {

    },

    render: function(info){
      newChihuo.setPage('myPayment');
      initData.myPaymentData.data = [];
      this.$el.html(_.template(myPaymentTemplate,initData.myPaymentData));
      this.initData();
    },

    initData: function(){
      var _this = this;
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('getReceiptInfo.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              ordId: null,
          },
          success: function(data){
              if(data.status == 0){
                initData.myPaymentData.data = data.data;               
                newChihuo.getPage('myPayment') && _this.$el.html(_.template(myPaymentTemplate,initData.myPaymentData));
                newChihuo.getPage('myPayment') && !initData.myPaymentData.data.length && $(".no-order").html('there is no order');  
                }
               
            }
          });

    },

  });
  return  MyPaymentView;
});
