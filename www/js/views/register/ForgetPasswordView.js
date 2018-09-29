define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register/forgetPasswordTemplate.html',
  'bootstrap'
], function($, _, Backbone, forgetPasswordTemplate){

  var ForgetPasswordView = Backbone.View.extend({
    el: ("#page"),

    events: {
    },

    render: function(){
      newChihuo.setPage('password');
      newChihuo.windowInit();
      this.$el.html(_.template(forgetPasswordTemplate));
      var _this=this;
      $("#resend").on("click",function(){
        _this.resendInterface();
      });
    },
    
    
  
    resendInterface:function(){
      var _this = this;
      var email = $("#email").val();
     if($.trim(email)){
      chihuo.wkAjax({
        type: 'POST',
        url: chihuo.getApiUri('reqResetPwd.json'),//修改密码接口
        data:{
          kw: email,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en'
        },
        success: function (data) {
          if (data.status == 0) {
            if(data.data[0].ret_code == 0){
              newChihuo.showPopInfo(newChihuo.localize('mail_sent_successfully'));
              // app_router.navigate('Index',{
              //     trigger: true
              // });
            }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_send_mail_code')+data.data[0].ret_code);
            }
    
          }
        },
        error: function () {

        }
      });
     }else{
       newChihuo.showPopInfo(newChihuo.localize('please_enter_email'));
       return false;
     }
   },

  });

  return ForgetPasswordView;
  
});
