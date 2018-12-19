define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/food/foodTemplate.html',
  'swiper'
], function($, _, Backbone, foodTemplate){

  var FoodView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore2':'showMoreAddress',
     'click .comment-effect2 .comment-cont':'showMoreComment',
     'click .add-food-photo': 'addPhoto',
    },

    render: function(restId,miId){
      newChihuo.setPage('food');
      newChihuo.windowInit();
      this.$el.html(_.template(foodTemplate,initData.foodData)); 
      this.initData(restId,miId);
      this.bindEvents(restId,miId);   
    },

    initData: function(restId,miId){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getRestMIDetail.json'),
                  data: {
                     restmiId: miId, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.foodData.data = data.data;
                      newChihuo.getPage('food') && _this.$el.html(_.template(foodTemplate,initData.foodData));
                      newChihuo.getPage('food') && _this.bindEvents(restId,miId);  ;
                     }
                  } 
              });   
    },

    bindEvents: function(restId,miId){
      var _this = this;
      $('.rest-icon1').on('click',function(){
        if($(this).find('.rest-status').hasClass('done')){
          return;
        }
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiCheckin.json'),
                  data: {
                     restId: restId,
                     restmenuId: 1,
                     restmiId: miId, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo(newChihuo.localize('add_a_checkin'));
                        $('.rest-icon1').find('.rest-status').addClass('done');
                        var num = parseInt($('.rest-icon1').find('span').text());
                         $('.rest-icon1').find('span').text(++num);
                     }
                  } 
              });   

      });

      $('.rest-icon2').on('click',function(){
        if($(this).find('.rest-status').hasClass('done')){
          return;
        }
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiCompliment.json'),
                  data: {
                     restId: restId,
                     restmenuId: '',
                     restmiId: miId, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                         newChihuo.showPopInfo(newChihuo.localize('add_a_like'));
                        $('.rest-icon2').find('.rest-status').addClass('done');
                        var num = parseInt($('.rest-icon2').find('span').text());
                         $('.rest-icon2').find('span').text(++num);
                        
                     }
                  } 
              });  

      });

      $('.rest-icon3').on('click',function(){
         if($(this).find('img').hasClass('done')){
          return;
        }
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiFollow.json'),
                  data: {
                     restId: restId,
                     restmenuId: '',
                     restmiId: miId, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                       newChihuo.showPopInfo(newChihuo.localize('add_a_following'));
                        $('.rest-icon3').find('img').attr('src',staticSource.restIcon3);
                        var num = parseInt($('.rest-icon3').find('span').text());
                         $('.rest-icon3').find('span').text(++num);
                        
                     }
                  } 
              });  

      });

      $('#addFav').on('click',function(){
         if($(this).hasClass('fav-rest-add')){
          return;
        }
        var _this = this;
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiFavor.json'),
                  data: {
                     restId: restId,
                     restmenuId: '',
                     restmiId: miId, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                        newChihuo.showPopInfo(newChihuo.localize('add_a_favorite'));
                        $(_this).addClass('fav-rest-add');
                     }
                  } 
              });  

      });

      $('#addWishes').on('click',function(){
        var _this = this;
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiWishlist.json'),
                  data: {
                     restId: restId,
                     restmenuId: '',
                     restmiId: miId, 
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

      $('.good-icon').on('click',function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRMiRevCompliment.json'),
                  data: {
                     mireviewId: 1,
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

      $('.wechat-icon').on('click',function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRMiRevComment.json'),
                  data: {
                     mireviewId: 605103,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     comment: 'useful review'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                     }
                  } 
              });  
         
      });

      $('.photo-detail-show').on('click',function(){
           var url = $("#rest-photo").attr('photo');
           var index = $(this).parent().index();
           if(url){
            initData.photoData.photoUrl = url;
            initData.photoData.photoIndex = index;
            window.modalPhoto.render();
           }
      });

      $('.review-photo-urls img').on('click',function(){
           var url = $(this).parent(".review-photo-urls").attr('photo');
           var index = $(this).index();
           if(url){
            initData.photoData.photoUrl = url;
            initData.photoData.photoIndex = index;
            window.modalPhoto.render();
           }
      });

    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },
    
    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
        },

      photoInterface: function(){
       chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addRestMIPhoto.json'),
                  data: {
                     restId: $('.add-food-photo').attr('rest'),
                     restmiId: $('.add-food-photo').attr('item'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     photosize: 'small',
                     type: 'jpeg',
                     desc: 'pic',
                     url: $('.comment-photo-wrap').find('.comment-photo-show').eq(0).find('img').attr('src')
                  },
                  success: function(data){
                     if(data.status == 0){
                       
                     }
                  } 
              });  
        },    
     addPhoto: function(){
      chihuo.wkLoginPermission() && photoUse.bindEvents(this.photoInterface);
    }    

  });
  return FoodView;
});
