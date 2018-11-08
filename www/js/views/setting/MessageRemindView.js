define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/messageRemindTemplate.html',
  'bootstrap'
], function($, _, Backbone, messageRemindTemplate){

  var MessageRemindView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .switch-remind':'changeStatus',
      'click #setNotification' : 'submitSetting'
    },

    render: function(){
      this.$el.html(_.template(messageRemindTemplate));
    },

     submitSetting: function(){
      var check = $('.switch-remind').hasClass('check');
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('updateCustSetting.json'),
          data:{
             cont:JSON.stringify({
               notification: check ? 1 : 2
             }),
             lat: newChihuo.lat,
             lng: newChihuo.lon,
             locale: 'en',
          },
          success: function (data) {
            if (data.status == 0) { 
              newChihuo.showPopInfo(newChihuo.localize('success'));
              initData.mySettingsData.notification = (check ? 1 : 2);
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

    changeStatus: function(e){
      $(e.currentTarget).toggleClass('check');
    }

  });
  return MessageRemindView;
});
