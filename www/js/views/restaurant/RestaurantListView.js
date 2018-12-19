define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantListTemplate.html',
  'swiper'
], function($, _, Backbone, restaurantListTemplate){

  var RestaurantListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .add-wishlist':'addWishlist'
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 50
    },


    render: function(name,wish){
      newChihuo.setPage('restaurantList');
      newChihuo.windowInit();
      newChihuo.wishSearch = wish=='wish' ? true : false;
      this.$el.html(_.template(restaurantListTemplate,initData.restaurantListData));
        if(initData.restaurantListData.name != name){
          this.initData(name,wish,0);
          initData.restaurantListData.name = name;
          initData.restaurantListData.city = null;
        }

      this.bindEvents();
      this.loadMore(name,wish,10);
      
    },

    initData: function(name,wish,num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findRestDetailByName2.json'),
                  data: {
                     restname: decodeURIComponent(name),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: (num+1)*_this.status.ct,
                     filters: ''
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.restaurantListData.data = data.data;
                      newChihuo.getPage('restaurantList') && _this.$el.html(_.template(restaurantListTemplate,initData.restaurantListData));
                      if(data.data.length < (num+1)*_this.status.ct){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                      newChihuo.getPage('restaurantList') && _this.bindEvents();
                     }
                  } 
              });  
    },

    loadMore: function(name,wish,distance){
      var _this = this;
      var winheight = $(window).height();
       $(window).off('scroll').on('scroll',function(){
        var scroll = $(this).scrollTop();
          chihuo.opacityBg('.opacity-bg',scroll);
          if(_this.status.isEnd == true){
             return;
          }
          if (!_this.status.loading && ($(document).height() - scroll - winheight < distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            _this.initData(name,wish,++_this.status.st);
          }
        }); 
    },

    addWishlist: function(e){
      var id = $(e.currentTarget).attr('rest');
       chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestWishlist.json'),
                  data: {
                     restId: id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo(newChihuo.localize('add_a_wishlist'),1200);
                        setTimeout(function(){
                          app_router.navigate('restaurantWishes',{
                            trigger: true
                          });
                        },1400)
                       
                     }
                  } 
              });  

    },

    bindEvents: function(){
      var _this = this;

      $('.rank-ul li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('cur').toggleClass('toggle');
        chihuo.beginSort(index,this,initData.restaurantListData.data,'total_likes_perc','rest_avg_pricelevel_per_person','cust_distance');
        chihuo.sortAll(index,$(this).hasClass('toggle'),restaurantListTemplate,initData.restaurantListData,_this);
      });

    }

  });
  return RestaurantListView;
});
