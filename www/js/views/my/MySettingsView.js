define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/mySettingsTemplate.html',
  'swiper'
], function($, _, Backbone, mySettingsTemplate){

  var MySettingsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #logout':'logout'
    },

    render: function(){
      newChihuo.setPage('mySettings');
      newChihuo.windowInit();
      this.$el.html(_.template(mySettingsTemplate,initData.mySettingsData));
      this.initData();
    },

    initData: function(){
      var _this = this;
       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri('getCustSetting.json'),
          data:{
             lat: newChihuo.lat,
             lng: newChihuo.lon,
             locale: 'en',
          },
          success: function (data) {
            if (data.status == 0) { 
                initData.mySettingsData = JSON.parse(data.data[0].setting_text);
                newChihuo.getPage('mySettings') && _this.$el.html(_.template(mySettingsTemplate,initData.mySettingsData));
            }
          },
          error: function () {

          }
        });

    },

    logout: function(){
       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri('logout.json'),
          success: function (data) {
            if (data.status == 0) { 
               newChihuo.showPopInfo("退出成功",1200);
                newChihuo.customerId = null;
                newChihuo.removeLocalStorage('customer_id');
                newChihuo.removeLocalStorage('password');
                newChihuo.removeLocalStorage('email_address');
            }
          },
          error: function () {

          }
        });

    },

  });
  return MySettingsView;
});
