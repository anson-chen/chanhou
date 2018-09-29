define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login/loginTemplate.html',
  'bootstrap'
], function($, _, Backbone, loginTemplate){

  var LoginView = Backbone.View.extend({
    el: $("#page"),

    events: {
    
    },

    render: function(){
      newChihuo.setPage('login');
      newChihuo.windowInit();
      this.$el.html(_.template(loginTemplate));
      var _this = this;
      $("#login").on("click",function(){
        _this.loginInterface();
      });

    },

    loginPopInfo: function(func){
       var pop = $('#popInfo');
       var info ='<p>In order to gain additional 100 points and help your friends identify you better, would you like to add your profile photo or change your display name now?</p><div class="error-pop"><span class="close-pop">skip</span><span class="refresh">ok</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           newChihuo.showPopInfo(newChihuo.localize('okay_to_change_later'),1200);
                setTimeout(function(){
                 app_router.navigate('Index',{
                  trigger: true
                });
                },1400);
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           app_router.navigate('myProfile',{
                  trigger: true
                });
       });
    },

    emailPopInfo: function(func){
       var pop = $('#popInfo');
       var info ='<p>你的账号需激活,发送激活邮件？</p><div class="error-pop"><span class="close-pop">cancel</span><span class="refresh">ok</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
          //发送邮件api (todo)
       });
    },

    loginInterface:function(){
      var  email=$("#inputEmail").val();
      var password=$("#inputPassword").val();
      var _this = this;
      if( $.trim(email)&& password ){
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
                newChihuo.setLocalStorage('email_address',data.data[0].email_address);
                newChihuo.setLocalStorage('password',password);
                newChihuo.setLocalStorage('loginType','chanhou');
                 newChihuo.showPopInfo(newChihuo.localize('welcome_to_fm'),1200);
                setTimeout(function(){
                   if(data.data[0].display_name){
                    app_router.navigate('Index',{
                      trigger: true
                    });
                  }else{
                    _this.loginPopInfo();
                  }
                 
                },1400);
                
              }else if(data.data[0].status_code == 10061){ 
                newChihuo.customerId = null;
                newChihuo.setLocalStorage('customer_id','');
                newChihuo.setLocalStorage('email_address','');
                newChihuo.setLocalStorage('password','');
               _this.emailPopInfo();               
              }else if(data.data[0].status_code == 1003){ 
                newChihuo.showPopInfo(newChihuo.localize('username_password_not_match'),1200);             
              }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_login'),1200); 
              }
            }else{
              newChihuo.showPopInfo(newChihuo.localize('fail_to_login'),1200);
            }
          },
          error: function () {

          }
        });
      }else{
         newChihuo.showPopInfo(newChihuo.localize('need_to_enter_all'),1200);
        return false;
      }
    },

    nrLogin: function(){
       chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('nrLogin.json'),
          data:{
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if (data.status == 0) {
              if(data.data[0].status_code == 0){
                newChihuo.customerId = data.data[0].customer_id;
              }else{
               newChihuo.showPopInfo(newChihuo.localize('fail_to_login'),1200);             
              }
            }
          },
          error: function () {

          }
        });
    }
   

  });

  return LoginView;
  
});
