define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantTemplate.html',
  'swiper'
], function($, _, Backbone, restaurantTemplate,SidebarView){

  var RestaurantView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click .comment-effect3 .comment-cont':'showMoreComment',
     'click .add-rest-photo': 'addPhoto',
     'click .comment-edit': 'checkPermission',
     'click .week-time':'showWeekTime',
     'click .share-rest':'shareRest',
    },

    render: function(id,from){
      newChihuo.setPage('restaurant');
      newChihuo.windowInit();
      initData.restaurantData.from = from ? from : '';
      this.$el.html(_.template(restaurantTemplate,initData.restaurantData));
      this.findRestDetailById(id);
      this.bindEvents(id);
      chihuo.recCurLocation();
    },

    shareRest: function(){
       window.shareInfo.render();
    },

    checkPermission: function(){
      chihuo.wkLoginPermission();
    },

    findRestDetailById: function(id){
      var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findRestDetailById.json'),
                  data: {
                     restId: id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.restaurantData.data = data.data;
                      newChihuo.getPage('restaurant') && _this.$el.html(_.template(restaurantTemplate,initData.restaurantData));
                      newChihuo.getPage('restaurant') && _this.bindEvents(id);
                     }
                  } 
              });   
    },

    bindEvents: function(id){
      var _this = this;
      if(!$('.week-time .cur').hasClass('opening')){
         $('.detail-open').addClass('closed');
      }

      $('.radius-like').each(function(){
        var num = $(this).find('span').text();
        var radialObj = radialIndicator(this, {
              barColor: '#fb560a',
              barWidth: 10,
              radius: 30,
              initValue: 0,
              displayNumber: false,
              roundCorner : true
        }); 
        radialObj.animate(num); 
      });
      $('.rest-icon1').on('click',function(){
        if($(this).find('.rest-status').hasClass('done')){
          return;
        }
         chihuo.wkLoginPermission() && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestCheckin.json'),
                  data: {
                     restId: id,
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
          chihuo.wkLoginPermission() && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestCompliment.json'),
                  data: {
                     restId: id,
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
         chihuo.wkLoginPermission() && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestFollow.json'),
                  data: {
                     restId: id,
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
        var restId = $(this).attr('rest');
        var _this = this;
          chihuo.wkLoginPermission() && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestFavor.json'),
                  data: {
                     restId: restId,
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

       $('.photo-list-link').on('click',function(){
           var url = $("#rest-photo").attr('photo');
           if(url){
            initData.photoData.photoUrl = url;
            app_router.navigate('photoList', {
              trigger: true
            });
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

    showWeekTime: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('show-all');
    },

    photoInterface: function(){
      chihuo.wkLoginPermission() && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestPhoto.json'),
                  data: {
                     restId: $('.comment-photo-wrap').attr('rest'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     photosize: 'big',
                     type: 'jpg',
                     desc: 'good food',
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
  return RestaurantView;
});
