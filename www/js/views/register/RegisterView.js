define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register/registerTemplate.html',
  'bootstrap'
], function($, _, Backbone, registerTemplate){

  var RegisterView = Backbone.View.extend({
    el: ("#page"),

    events: {
    },

    render: function(){
      newChihuo.setPage('register');
      newChihuo.windowInit();
      console.log(this.$el);
      this.$el.html(_.template(registerTemplate));
      var _this=this;
      $("#register").on("click",function(){
        _this.registerInterface();
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
    registerInterface:function(){
      var _this = this;
      var email=$("#email").val();
      var password=$("#password").val();
      var repassword=$("#repassword").val();
     
     if($.trim(email)&& password && repassword){
        if(password!=repassword){
           newChihuo.showPopInfo("密码输入不一致",1200);
          return false;
        }

        if( password.length < 6){
         newChihuo.showPopInfo("密码不能少于6位",1200);
          return false;
        } 
      chihuo.wkAjax({
        type: 'POST',
        url: chihuo.getApiUri('custReg.json'),//注册接口
        data:{
          acct: email,
          pass: password,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en'
        },
        success: function (data) {
          if (data.status == 0) {
            if(data.data[0].status_code == 0 || data.data[0].status_code){
              newChihuo.showPopInfo("注册成功,请注意查收验证邮件",1200);
              // newChihuo.customerId = data.data[0].customer_id;
              // _this.confirmCust();
              setTimeout(function(){
                  app_router.navigate('Index',{
                  trigger: true
                });
                },2000);
            }else{
               newChihuo.showPopInfo("注册失败");
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
    chihuo.wkAjax({
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

  return RegisterView;
  
});
