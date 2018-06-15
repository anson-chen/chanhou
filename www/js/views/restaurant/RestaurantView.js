define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantTemplate.html',
  'swiper'
], function($, _, Backbone, restaurantTemplate){

  var RestaurantView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click .comment-effect3 .comment-cont':'showMoreComment',
     'click .add-rest-photo': 'addPhoto',
     'click .comment-edit': 'checkPermission'
    },

    render: function(id,from){
      newChihuo.setPage('restaurant');
      newChihuo.windowInit();
      this.$el.html(_.template(restaurantTemplate,initData.restaurantData));
      if(id != initData.restaurantData.id){
        this.findRestDetailById(id);
        initData.restaurantData.id = id;
      }else{
        if(from){
        this.findRestDetailById(id);
        }
      }
      this.bindEvents(id);

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
                        newChihuo.showPopInfo('added checkin');
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
                      newChihuo.showPopInfo('added a like');
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
                      newChihuo.showPopInfo('added following');
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
                        newChihuo.showPopInfo('added a favourite');
                        $(_this).addClass('fav-rest-add');
                     }
                  } 
              });  

      });

      $('.photo-detail-show').on('click',function(){
           var url = $(this).attr('src');
           if(url){
            initData.restaurantData.photoUrl = url;
            app_router.navigate('photoDetail', {
              trigger: true
            });
           }

      })

    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
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
      chihuo.wkLoginPermission() && photoUse.init(this.photoInterface);
    }

  });
  return RestaurantView;
});
