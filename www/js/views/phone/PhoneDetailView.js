define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/phone/phoneDetailTemplate.html',
  'swiper'
], function($, _, Backbone, phoneDetailTemplate){

  var PhoneDetailView= Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #saveMobile': 'saveMobileNumber',
     'click #deleteMobile': 'deleteMobileNumber',
     'click #clearPhoneDetail': 'clearPhoneDetail',
    },

    render: function(type){
      newChihuo.setPage('phoneDetail');
      newChihuo.windowInit();
      if(type=='edit'){
        initData.phoneDetailData.type = 'edit';
      }else{
        initData.phoneDetailData.type = 'add';
      }
      this.$el.html(_.template(phoneDetailTemplate,initData.phoneDetailData));
      this.initData();
    },

    clearPhoneDetail: function(){
      $('#mobileNum').val('');
    },

    saveMobileNumber: function(){
      var num = $.trim($('#mobileNum').val());
      if(!num.length){
        newChihuo.showPopInfo('please enter your mobile number',1200);
        return;
      }
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3(initData.phoneDetailData.type =='edit' ? 'updateCustMobile.json' : 'addCustMobile.json'),
          data: {
              cont: num,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                      var str = initData.phoneDetailData.type =='edit' ? 'Update mobile number successfully!' : 'Add mobile number successfully!';
                       initData.phoneIndexData.data = data.data[0];
                       if(data.data[0].verifynum){
                        initData.phoneIndexData.verifyNum = data.data[0].verifynum;
                       }
                        newChihuo.showPopInfo(str,1200,function(){
                          app_router.navigate('phoneList',{
                            trigger: true
                          });
                        });
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200);
                     }
                  } 
              });  
    },

    deleteMobileNumber: function(){
      var num =initData.phoneIndexData.data.cust_mobile_no || $.trim($('#mobileNum').val());
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('rmCustMobile.json'),
          data: {
              cont: num,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                 initData.phoneIndexData.data = null;
                  newChihuo.showPopInfo('delete successfully',1200,function(){
                          app_router.navigate('phoneList',{
                            trigger: true
                          });
                        });
              }else{
                  newChihuo.showPopInfo(data.errorMsg,1200);
              }
              } 
      });  
    },
    initData: function(id){
      
    },

  



  });
  return PhoneDetailView;
});
