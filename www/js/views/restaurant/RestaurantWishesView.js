define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantWishesTemplate.html',
], function($, _, Backbone, restaurantWishesTemplate){

  var RestaurantWishesView = Backbone.View.extend({
    el: $("#page"),
    events: {
    

    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('restaurantWishes');
      newChihuo.windowInit();
      initData.restaurantWishesData.data = [];
      this.$el.html(_.template(restaurantWishesTemplate,initData.restaurantWishesData));
      this.initData(0);
      this.loadMore(10);
      this.bindEvents();
    },

    bindEvents: function(){
      var _this = this;
      $('.rank-ul li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('cur').toggleClass('toggle');
        chihuo.beginSort(index,this,initData.restaurantWishesData.data,'total_likes_perc','price_level','cust_distance');
        chihuo.sortAll(index,$(this).hasClass('toggle'),restaurantWishesTemplate,initData.restaurantWishesData,_this);
      });

      $('.wrap-border').on('swipeleft',function(){
         $(this).find('.all-history-info').addClass('delete-animation');
      });

      $('.wrap-border').on('swiperight',function(){
         $(this).find('.all-history-info').removeClass('delete-animation');
      });

      $('.delete-icon-btn').on('click',function(){
        var _this = this;
          chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('rmWLRests.json'),
                  data:  {
                     restId: $(this).attr('hisId'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                   },
                  success: function(data){
                     if(data.status == 0){
                       newChihuo.showPopInfo(newChihuo.localize('delete_a_record'));
                       $(_this).parents('.wrap-border').remove();
                     }
                   }
            });

      });

      
    },

    initData: function(num){
      var _this = this;
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllWRests.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(num==0){
                      initData.restaurantWishesData.data = [];
                      }
                      initData.restaurantWishesData.data = [...initData.restaurantWishesData.data,...data.data];
                      newChihuo.getPage('restaurantWishes') && _this.$el.html(_.template(restaurantWishesTemplate,initData.restaurantWishesData));
                        if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                      newChihuo.getPage('restaurantWishes') && _this.bindEvents();
                      newChihuo.getPage('restaurantWishes') && !initData.restaurantWishesData.data.length && chihuo.setNoDataInfo(); 
                     }
                  } 
              });  
    },

    addWish: function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestWishlist.json'),
                  data: {
                     restId: 1,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                     }
                  } 
              });  
    },

    loadMore: function(distance){
      var _this = this;
       $(window).off('scroll').on('scroll',function(){
          if(_this.status.isEnd == true){
            $('.loading-step3').show();
            $('.loading-step1,.loading-step2').hide();
             return;
          }
          if (!_this.status.loading && ($(document).height() - $(this).scrollTop() - $(this).height()< distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            _this.initData(++_this.status.st);
          }
        }); 
    },

  });
  return RestaurantWishesView;
});
