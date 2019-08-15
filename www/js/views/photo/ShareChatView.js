define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/shareChatTemplate.html',
  'swiper'
], function($, _, Backbone, shareChatTemplate){

  var ShareChatView = Backbone.View.extend({
    el: $("#page"),
    events: {
    'click .chat-return':function(){
          $("#shareChatWrap").removeClass('show-share-detail');
      },
    'click .share-box .wrap-border': 'toggleSelect', 
    'click .submit-share': 'shareSubmit'
    },

    render: function(type){
      initData.chatWishData.type=type;
      if(type=='rest' && initData.chatWishData.restData.length){
          $("#shareChatWrap").html(_.template(shareChatTemplate,initData.chatWishData)).addClass('show-share-detail');          
      }else if(type=='dish' && initData.chatWishData.dishData.length){
          $("#shareChatWrap").html(_.template(shareChatTemplate,initData.chatWishData)).addClass('show-share-detail');          
      }else{
          $("#shareChatWrap").html('<p class="loading-share"></p>').addClass('show-share-detail');
          this.initData(type);
          $('.loading-share').on('click',function(){
            $("#shareChatWrap").removeClass('show-share-detail');
          });
      }
    },

     toggleSelect: function(e){
      var $obj = $(e.currentTarget);
      $obj.addClass('share-select').siblings().removeClass('share-select');
    },

    sendShareInfo: function(data){
      var _this = this;
      var toId = $('#chatForm').attr('to');
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
                      $('.chat-return').click();
                      $("#reloadContent").click();
                     }
                  } 
              });  
        return false;       

    },

    shareSubmit: function(){
      var share = initData.chatWishData.type;
      var data = {};
      var index = $('.share-select').index();
      console.log(index);
      if(share == 'rest'){
        if(initData.chatWishData.restData && initData.chatWishData.restData.length){
         var transData = initData.chatWishData.restData[index];
          data = {
            "type":"restaurant",
            "content": {
              "rest_id": transData.rest_id,
              "rest_name": transData.rest_name,
              "cuisine_type": transData.cuisine_type,
              "price_level": transData.price_level || '',
              "city_name": transData.city_name,
              "province_cd": transData.province_cd || '',
              "concat_prof_photo_url_keyval":transData.rest_photo_url,
              "total_likes_perc":transData.total_rest_likes_perc.replace('%',''),
            }
          }
          console.log(data);
          this.sendShareInfo(data);
        }
      }else{
        if(initData.chatWishData.dishData && initData.chatWishData.dishData.length){
         var transData = initData.chatWishData.dishData[index];
          data = {
            "type":"dish",
            "content":{
              "rest_id": transData.rest_id,
              "rest_name": transData.rest_name,
              "cuisine_type": transData.cuisine_type,
              "rest_menu_item_id": transData.rest_menu_item_id,
              "rest_mi_name": transData.mi_name,
              "concat_prof_photo_url_keyval": transData.mi_photo_url,
              "mi_unit_price": transData.mi_unit_price,
            }
          }
          console.log(data);
          this.sendShareInfo(data);
        }

      }
      
    },

    initData: function(type){
      if(type){  
        var url = type=='rest' ? chihuo.getApiUri('getMyAllRestFav.json') : chihuo.getApiUri('getMyAllRestMIFav.json');
         chihuo.wkAjax({
                  type: 'GET',
                  url: url,
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 100,
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(type=='rest'){
                          initData.chatWishData.restData = data.data;
                        }else{
                          initData.chatWishData.dishData = data.data;
                        } 
                      $("#shareChatWrap").hasClass('show-share-detail') && $("#shareChatWrap").html(_.template(shareChatTemplate,initData.chatWishData))              
                   }else{

                   } 
                }
              });

      }
    }

  });
  return ShareChatView;
});
