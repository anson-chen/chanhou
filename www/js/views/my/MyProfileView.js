define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myProfileTemplate.html',
  'bootstrap'
], function($, _, Backbone, myProfileTemplate){

  var MyProfileView = Backbone.View.extend({
    el: $("#page"),

    events: {
      'click .profile-img' : 'addProfileImg'
    },

    render: function(){
      newChihuo.setPage('myProfile');
      newChihuo.windowInit();
      if(initData.myIndexData.data.length){
        initData.myProfileData.data[0].profile_photo_url = initData.myIndexData.data[0].profile_photo_url;
        initData.myProfileData.data[0].display_name = initData.myIndexData.data[0].display_name;
      }
      this.$el.html(_.template(myProfileTemplate,initData.myProfileData));
      var _this = this;

      $("#setProfile").on("click",function(){
        _this.profileInterface();
      });
    },

    addProfileImg: function(){
      photoUse.init(this.showProfileImg);
      
    },


    showProfileImg: function(src){
      $('.profile-img').attr('src',src);
    },

    profileInterface:function(){
      var  name=$("#profileName").val();
      var  purl= $('.profile-img').attr('src').indexOf('http')>-1 ? $('.profile-img').attr('src') : '';
      if( $.trim(name)){
       chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('updateProfile.json'),
          data:{
            name: name,
            purl: purl,
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if (data.status == 0) {
              if(data.data[0].status_code == 0){
                newChihuo.customerId = data.data[0].customer_id;
                newChihuo.customer = data.data[0].display_name;
                newChihuo.showPopInfo("update successfully",1200);
                 setTimeout(function(){
                 app_router.navigate('myIndex',{
                  trigger: true
                });
                },1400);
              }else{
               newChihuo.showPopInfo("failed to update",1200);
              }
            }else{
              newChihuo.showPopInfo(data.errorMsg,1200);
            }
          },
          error: function () {

          }
        });
      }else{
         newChihuo.showPopInfo("请填写用户名",1200);
        return false;
      }
    },

   

   
   

  });

  return MyProfileView;
  
});
