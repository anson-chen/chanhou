define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register/passwordTemplate.html',
  'bootstrap'
], function($, _, Backbone, passwordTemplate){

  var PasswordView = Backbone.View.extend({
    el: ("#page"),

    events: {
    },

    render: function(){
      newChihuo.setPage('password');
      newChihuo.windowInit();
      this.$el.html(_.template(passwordTemplate));
      var _this=this;
      $("#rewrite").on("click",function(){
        _this.rewriteInterface();
      });

      $("#email").on("blur",function(){
        if($.trim($("#email").val())){
          if(!_this.isEmail($(this).val())){
            newChihuo.showPopInfo("请填写正确格式邮箱",1200);
            return false;
          }
          // _this.validateEmail();
        }
      })
    },
    validateEmail:function(){
      var  email=$("#email").val();
      $.ajax({
        type: 'GET',
        url: chihuo.address + "/chihuo/validate_email.json",//验证邮箱接口
        data:{
          email:email
        },
        success: function (data) {
          if (data.status == 0) {
             if(data.exist){
               $("#findMask,.find-pop-info").show();
               $(".error-message-show").html("此邮箱已注册");
               return false;
             }
          }
        },
        error: function () {

        }
      });
    },
    isEmail:function (str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
  },
    rewriteInterface:function(){
      var _this = this;
      var email = $("#email").val();
      var password = $("#old-password").val();
      var repassword = $("#new-password").val();
      var renewpassword = $("#renew-password").val();
     if($.trim(email)&& password && repassword && renewpassword){
        if(renewpassword!=repassword){
           newChihuo.showPopInfo("新密码两次输入不一致",1200);
          return false;
        }
      chihuo.wkAjax({
        type: 'POST',
        url: chihuo.getApiUri('chgCustPwd.json'),//修改密码接口
        data:{
          acct: email,
          pass: password,
          npwd: repassword,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en'
        },
        success: function (data) {
          if (data.status == 0) {
            if(data.data.status_code == 0){
              newChihuo.showPopInfo("修改密码成功");
              newChihuo.customerId = data.data.customer_id;
              // app_router.navigate('Index',{
              //     trigger: true
              // });
            }else{
               newChihuo.showPopInfo("修改密码失败");
            }
    
          }
        },
        error: function () {

        }
      });
     }else{
       newChihuo.showPopInfo("请填写信息完整");
       return false;
     }
   },

   confirmCust: function(){
     $.ajax({
        type: 'GET',
        url: chihuo.getApiUri('confirmCust.json'),//注册接口
        data:{
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en'
        },
        success: function (data) {
          if (data.status == 0) {
            if(data.data.status_code == 0){
              
              // app_router.navigate('Index',{
              //     trigger: true
              // });
            }else{
               newChihuo.showPopInfo("注册失败");
            }
    
          }
        },
        error: function () {

        }
      });
   }

  });

  return PasswordView;
  
});
