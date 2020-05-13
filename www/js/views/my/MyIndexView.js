define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myIndexTemplate.html',
  'swiper'
], function($, _, Backbone, myIndexTemplate){

  var MyIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
        'click .resend-email': 'resendEmailVerify', 
        'click #myindex-return': 'gotoBack', 
    },
    gotoBack: function() {
      chihuo.gotoLastLocation();
    },
    resendEmailVerify: function(e){
      var $obj = $(e.currentTarget);
      var now = new Date();
      var d = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
      if(d == newChihuo.getLocalStorage('verifyEmail')){
        newChihuo.showPopInfo('You can try it tomorrow!',1200);
        return;
      }
      chihuo.wkAjax({
        type: 'GET',
        url: chihuo.getApiUri('reactivate.json'),//注册接口
        data:{
          acct: '543927940@qq.com' || email,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en',
        },
        success: function (data) {
          if(data.status == 0){
            newChihuo.showPopInfo('Resend successfully!',1200);
            newChihuo.setLocalStorage('verifyEmail',d);
          }
        },
      });
    },

    render: function(id){
      newChihuo.setPage('myIndex');
      newChihuo.windowInit();
      if(!(newChihuo.customerId || newChihuo.getLocalStorage('customer_id'))){
           initData.myIndexData.data = [];
      }
      if(id){
        initData.myIndexData.id = id;
      }else{
        initData.myIndexData.id = newChihuo.customerId || newChihuo.getLocalStorage('customer_id');
      }
      initData.myIndexData.addFriend = true;
      this.$el.html(_.template(myIndexTemplate,initData.myIndexData));
      this.initData(id);
      this.bindEvents();
      setTimeout( function(){
        if (!newChihuo.hasCordova()) {
          $("#myscan-div").hide();
        }
       }, 500);

    },

    initData: function(id){
      var _this = this;
      if(id || newChihuo.customerId || newChihuo.getLocalStorage('customer_id')){
        chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustInfoById.json'),
                  data: {
                     targetId: id || newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.myIndexData.data = data.data;
                        newChihuo.getPage('myIndex') && _this.$el.html(_.template(myIndexTemplate,initData.myIndexData));
                        newChihuo.getPage('myIndex') && _this.bindEvents();
                        if(initData.myIndexData.id == (newChihuo.customerId || newChihuo.getLocalStorage('customer_id'))){
                          newChihuo.customer = data.data[0].display_name;
                          newChihuo.refKey = data.data[0].ref_key;
                          newChihuo.setLocalStorage('refKey',newChihuo.refKey ? newChihuo.refKey : '');
                          newChihuo.setLocalStorage('welcomeName',newChihuo.customer ? newChihuo.customer : '');
                          newChihuo.setLocalStorage('fullName',data.data[0].first_name + data.data[0].last_name);
                        }
                     }
                  } 
              });  
      }
    },

    bindEvents: function(){
      $(".index-focus").on('click',function(){
        var _this = this;
        chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustCustFollow.json'),
                  data: {
                     followingid:newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                     }
                  } 
              });  

      });

    }



  });
  return MyIndexView;
});
