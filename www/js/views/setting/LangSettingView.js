define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/langSettingTemplate.html',
  'bootstrap'
], function($, _, Backbone, langSettingTemplate){

  var LangSettingView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #setLanguage' : 'submitSetting'
    },

    render: function(){
      this.$el.html(_.template(langSettingTemplate));
      this.bindEvent();
    },

     submitSetting: function(){
      var index = $('.cur-select').index();
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('updateCustSetting.json'),
          data:{
             cont:JSON.stringify({
               language: index+1,
             }),
             lat: newChihuo.lat,
             lng: newChihuo.lon,
             locale: 'en',
          },
          success: function (data) {
            if (data.status == 0) { 
               newChihuo.showPopInfo(newChihuo.localize('success'));
               initData.mySettingsData.language = index+1;
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
  return LangSettingView;
});
