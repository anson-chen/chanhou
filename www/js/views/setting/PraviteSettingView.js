define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/praviteSettingTemplate.html',
  'bootstrap'
], function($, _, Backbone,praviteSettingTemplate){

  var PraviteSettingView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #setPrivacy' : 'submitSetting'
      
    },

    render: function(){
      newChihuo.setPage('praviteSetting');
      this.$el.html(_.template(praviteSettingTemplate));
      this.bindEvent();
    },

    submitSetting: function(){
      var index = $('.cur-select').index();
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('updateCustSetting.json'),
          data:{
             cont:JSON.stringify({
               privacy: index+1,
             }),
             lat: newChihuo.lat,
             lng: newChihuo.lon,
             locale: 'en',
          },
          success: function (data) {
            if (data.status == 0) { 
               newChihuo.showPopInfo(newChihuo.localize('success'));
               initData.mySettingsData.privacy = index+1;
               setTimeout(function(){
                app_router.navigate('mySettings',{
                  trigger: true
                });
                },1400);
            }
          },
          error: function () {

          }
        });

    },

    bindEvent:function(){
      $(".setting-li").on('click',function(){
         $('.setting-li p').html('');
         $(this).addClass('cur-select').siblings().removeClass('cur-select');
         $(this).find('p').html('✔️');
      })

    } 

  });
  return PraviteSettingView;
});
