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
            }
          },
          error: function () {

          }
        });

    },

  });
  return MySettingsView;
});
