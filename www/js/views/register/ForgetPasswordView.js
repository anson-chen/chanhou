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
              newChihuo.showPopInfo("邮件发送成功");
              // app_router.navigate('Index',{
              //     trigger: true
              // });
            }else{
               newChihuo.showPopInfo("邮件发送失败，错误码"+data.data[0].ret_code);
            }
    
          }
        },
        error: function () {

        }
      });
     }else{
       newChihuo.showPopInfo("请填写邮箱");
       return false;
     }
   },

  });

  return ForgetPasswordView;
  
});
