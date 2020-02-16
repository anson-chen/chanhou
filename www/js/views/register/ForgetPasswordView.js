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

    isEmail:function (str){
      var reg = /^[A-Za-z0-9]+([_\-\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      return reg.test(str);
    }, 
  
    resendInterface:function(){
      var _this = this;
      var email = $("#email").val();
     if($.trim(email) && _this.isEmail(email)){
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
              var time = data.data[0].ret_expired_datetime - data.data[0].ret_created_datetime;
              var minutes;
              if(time && time > 0){
                minutes = Math.ceil(time/(1000*60));
              }
              var pop = $('#popInfo');
              var info ='<p>The verification code for resetting the password has been sent to your email <b>'+email+'</b>. Please check your email in the inbox or spam. The reset code is valid for <b>'+ (minutes ? minutes : 5) +'</b> minutes.</p><div class="error-pop"><span class="close-pop">close</span></div>';
               pop.html(info).addClass('pop-info-show');
               $(".error-pop .close-pop").on('click',function(){
                   pop.removeClass('pop-info-show').html('');
               }); 
              
            }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_send_mail_code')+data.data[0].ret_code);
            }
    
          }else{
              newChihuo.showPopInfo('Error! Please enter your register email',2000);
          }
        },
        error: function () {

        }
      });
     }else{
       newChihuo.showPopInfo('Please enter your register email',1200);
       return false;
     }
   },

  });

  return ForgetPasswordView;
  
});
