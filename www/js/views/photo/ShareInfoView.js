define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/shareInfoTemplate.html',
  'swiper'
], function($, _, Backbone, shareInfoTemplate){

  var ShareInfoView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .close-share-wrap':function(){
        $("#shareWrap").hide();
        $("#page").toggleClass('page-overflow');
      },
      'click .share-submit':'shareSubmit',
      'click #shareWrap .rest-comment-head':'toggleSelect'
    },

    render: function(){
      $("#page").toggleClass('page-overflow');
      if(initData.chatChooseData.data.length){
          $("#shareWrap").html(_.template(shareInfoTemplate,initData.chatChooseData)).show();          
      }else{
          $("#shareWrap").html('<p class="loading-share"></p>').show();
          this.initData();
      }
    },

    sendShareInfo: function(data){
      var _this = this;
      var toId = $('.share-select').attr('to');
      var name = $('.share-select').attr('name');
          data && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustChatMsg.json'),
                  data: {
                     to: toId ,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     msg: JSON.stringify(data)
                  },
                  success: function(data){
                     if(data.status == 0){
                      $("#page").removeClass('page-overflow');
                      app_router.navigate('chatContent/'+toId+'/'+name,{
                        trigger: true
                      });
                     }
                  } 
              });  
        return false;       

    },

    shareSubmit: function(){
      var share = $('#shareWrap').attr('share');
      if(share == 'rest'){
        if(initData.restaurantData.data && initData.restaurantData.data.length){
         var transData = initData.restaurantData.data[0];
          initData.shareData.data = {
            "type":"restaurant",
            "content": {
              "rest_id": transData.rest_id,
              "rest_name": transData.rest_name,
              "cuisine_type": transData.cuisine_type,
              "price_level": transData.price_level,
              "city_name": transData.city_name,
              "province_cd": transData.province_cd,
              "concat_prof_photo_url_keyval":transData.concat_prof_photo_url_keyval,
              "total_likes_perc":transData.total_rest_compliments_perc,
            }
          }
          this.sendShareInfo(initData.shareData.data);
        }
      }else{
        if(initData.foodData.data && initData.foodData.data.length){
         var transData = initData.foodData.data[0];
          initData.shareData.data = {
            "type":"dish",
            "content":{
              "rest_id": transData.rest_id,
              "rest_name": transData.rest_name,
              "cuisine_type": transData.cuisine_type,
              "rest_menu_item_id": transData.rest_menu_item_id,
              "rest_mi_name": transData.rest_mi_name,
              "concat_prof_photo_url_keyval": transData.concat_prof_photo_url_keyval,
              "mi_unit_price": transData.mi_unit_price,
            }
          }
          this.sendShareInfo(initData.shareData.data);
        }

      }
      
    },

    toggleSelect: function(e){
      var $obj = $(e.currentTarget);
      $('.rest-comment-head').removeClass('share-select');
      $obj.addClass('share-select');


    },

    initData: function(){
      chihuo.wkLoginPermission() && 
      (newChihuo.customerId || newChihuo.getLocalStorage('customer_id')) &&
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllFriends.json'),
                  data: {
                     tid: newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 200
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatChooseData.data = data.data;
                      (newChihuo.getPage('restaurant') || newChihuo.getPage('food')) &&  $("#shareWrap").html(_.template(shareInfoTemplate,initData.chatChooseData)).show();
                     }
                  } 
              });   
    }


  });
  return ShareInfoView;
});
