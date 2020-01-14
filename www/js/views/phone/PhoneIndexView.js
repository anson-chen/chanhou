define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/phone/phoneIndexTemplate.html',
  'swiper'
], function($, _, Backbone, phoneIndexTemplate){

  var PhoneIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
        
     
    },

    render: function(resId){
      newChihuo.setPage('phoneIndex');
      newChihuo.windowInit();
      initData.route = resId ? resId : null;
      this.$el.html(_.template(phoneIndexTemplate,initData.phoneIndexData));
      this.initData();
    },

    initData: function(){
      var _this = this;
       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('lstCustMobile.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.phoneIndexData.data = data.data[0];
                        newChihuo.getPage('phoneIndex') && _this.$el.html(_.template(phoneIndexTemplate,initData.phoneIndexData));
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200);
                     }
                  } 
              }); 
    },

  



  });
  return PhoneIndexView;
});
