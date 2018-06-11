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
     'click .comment-effect2 .comment-cont':'showMoreComment'
     
    },

    render: function(id){
      newChihuo.setPage('food');
      newChihuo.windowInit();
      this.$el.html(_.template(foodTemplate,initData.foodData)); 
      if(id != initData.foodData.id){
        this.initData(id);
        initData.foodData.id = id;
        this.bindEvents();
      }
      
    },

    initData: function(id){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getRestMIDetail.json'),
                  data: {
                     restmiId: id, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.foodData.data = data.data;
                      newChihuo.getPage('food') && _this.$el.html(_.template(foodTemplate,initData.foodData));
                      newChihuo.getPage('food') && _this.bindEvents();
                     }
                  } 
              });   
    },

    bindEvents: function(){
      var _this = this;
      $('.rest-icon1').on('click',function(){
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiCheckin.json'),
                  data: {
                     restId: 1,
                     restmenuId: 1111,
                     restmiId: 1, 
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

      $('.rest-icon2').on('click',function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiCompliment.json'),
                  data: {
                     restId: 1,
                     restmenuId: 1111,
                     restmiId: 1, 
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

      $('.rest-icon3').on('click',function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiFollow.json'),
                  data: {
                     restId: 1,
                     restmenuId: 1111,
                     restmiId: 1, 
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

      $('#addFav').on('click',function(){
        var _this = this;
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestMiFavor.json'),
                  data: {
                     restId: 1,
                     restmenuId: 1111,
                     restmiId: 1, 
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
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
                     restId: 1,
                     restmenuId: 1111,
                     restmiId: 1, 
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

    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },
    
    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
        }

  });
  return FoodView;
});
