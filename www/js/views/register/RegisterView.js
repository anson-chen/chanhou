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
      this.$el.html(_.template(registerTemplate));
      var _this=this;
      $("#register").on("click",function(){
        _this.registerInterface();
      });

      $("#email").on("blur",function(){
        if($.trim($("#email").val())){
          if(!_this.isEmail($(this).val())){
            newChihuo.showPopInfo(newChihuo.localize('please_enter_email_in_correct_format'),1200);
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
               $(".error-message-show").html("This email address is already registered");
               return false;
             }
          }
        },
        error: function () {

        }
      });
    },
    isEmail:function (str){
    var reg = /^[A-Za-z0-9]+([_\-\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
    return reg.test(str);
    },
    registerInterface:function(){
      var _this = this;
      var email=$("#email").val();
      var password=$("#password").val();
      var repassword=$("#repassword").val();
      var firstName=$("#firstName").val();
      var lastName=$("#lastName").val();
      var nickName=$("#nickName").val();
      var refererKey=$("#refererKey").val();
      if(!$('.agree-check')[0].checked){
         newChihuo.showPopInfo(newChihuo.localize("click_to_confirm"),1200);
         return false;
      }
      if($.trim(firstName).length < 3 ){
          newChihuo.showPopInfo('firstName should be more than three characters',1200);
          return false;
      }
     
     if($.trim(email)&& password && repassword){
        if(password!=repassword){
           newChihuo.showPopInfo(newChihuo.localize("password_doesn't match"),1200);
          return false;
        }

        if( password.length < 6){
         newChihuo.showPopInfo(newChihuo.localize('minimum_password_length'),1200);
          return false;
        } 
      chihuo.wkAjax({
        type: 'POST',
        url: chihuo.getApiUri('custReg.json'),//注册接口
        data:{
          acct: email,
          pass: password,
          usrnickname: nickName,
          usrfirstname: firstName,
          usrlastname: lastName,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en',
          rk: refererKey,
        },
        success: function (data) {
          if (data.status == 0) {
            if(data.data[0].status_code == 0 || data.data[0].status_code){
              if(data.data[0].status_code==1001){
                newChihuo.showPopInfo('Account has been registered ',1200);
              }else{
                 chihuo.wkAjax({
                    type: 'POST',
                    url: chihuo.getApiUri('rcLogin.json'),
                    data:{
                      acct: email,
                      pass: password,
                      lat: newChihuo.lat,
                      lng: newChihuo.lon,
                      locale: 'en'
                    },
                    success: function (data) {
                      if (data.status == 0) {
                        if(data.data[0].status_code == 0){
                          newChihuo.customerId = data.data[0].customer_id;
                          newChihuo.customer = data.data[0].display_name;
                          newChihuo.setLocalStorage('customer_id',newChihuo.customerId);
                          newChihuo.setLocalStorage('email_address',email);
                          newChihuo.setLocalStorage('password',password);
                          newChihuo.setLocalStorage('loginType','chanhou');
                          newChihuo.showPopInfo(newChihuo.localize('welcome_to_fm'),1200);
                          setTimeout(function(){
                          app_router.navigate('emailVerify',{
                          trigger: true
                            });
                          },1400);
                          
                        }
                    }
                  }
                  });   
              }  
            }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_register'));
            }
    
          }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_register'));
            }
        },
        error: function () {

        }
      });
     }else{
       newChihuo.showPopInfo(newChihuo.localize('need_to_enter_all'));
       return false;
     }
   },

  });

  return RegisterView;
  
});
