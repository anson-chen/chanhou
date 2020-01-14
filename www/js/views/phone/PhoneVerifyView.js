define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/phone/phoneVerifyTemplate.html',
  'swiper'
], function($, _, Backbone, phoneVerifyTemplate){

  var PhoneVerifyView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #confirmVerify': 'checkVerify',
     'click #resendVC': 'resendMobileVC', 
     'click #clearVerificationCode': function(){
        $('#verificationCode').val('');
     }
     
    },

    render: function(resId){
      newChihuo.setPage('phoneVerify');
      newChihuo.windowInit();
      this.$el.html(_.template(phoneVerifyTemplate,initData.phoneIndexData));
      this.resId = resId;
    },

    checkVerify: function(){
      var num = initData.phoneIndexData.data.cust_mobile_no || $("#custMobile").text();
      var respCode = $.trim($('#verificationCode').val());
      if(!respCode.length){
        newChihuo.showPopInfo('please enter your verification code',1200);
        return;
      }
      var _this = this;
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('chkCustMobile.json'),
          data: {
              cont:num,
              respCode: respCode,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                      var info = data.data[0];
                      if(info.verifyflg){
                        initData.phoneIndexData.data = data.data[0];
                        newChihuo.showPopInfo('verify successfully',1200,function(){
                          if(_this.resId){
                            app_router.navigate('orderType/'+_this.resId+'/takeout',{
                              trigger: true
                            });
                          }else{
                            app_router.navigate('childList/'+initData.schoolIndexData.rest,{
                            trigger: true
                          });
                          }
                          
                        }); 
                      }else{
                        newChihuo.showPopInfo('verification failed',1200);
                         app_router.navigate('orderType/'+_this.resId+'/takeout',{
                              trigger: true
                            });
                      }
                     
                     }else{
                      newChihuo.showPopInfo(data.errorMsg,1200);  
                     }
                  } 
              }); 
    },

    resendMobileVC: function(){
      var num = initData.phoneIndexData.data.cust_mobile_no || $("#custMobile").text();
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('resendMobileVC.json'),
          data: {
              cont:num,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('resend verification code successfully',1200);
                        var code = data.data[0].verifynum;
                        // code && $("#verificationCode").val(code);
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200); 
                     }
                  } 
              }); 
    },

    initData: function(id){
      
    },

  



  });
  return PhoneVerifyView;
});
