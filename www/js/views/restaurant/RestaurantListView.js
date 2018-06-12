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
      ct: 10
    },


    render: function(name,wish){
      newChihuo.setPage('restaurantList');
      newChihuo.windowInit();
      newChihuo.wishSearch = wish=='wish' ? true : false;
      this.$el.html(_.template(restaurantListTemplate,initData.restaurantListData));
        if(initData.restaurantListData.name != name){
          this.initData(name,wish);
          initData.restaurantListData.name = name;
          initData.restaurantListData.city = null;
        }

      this.bindEvents();
      
    },

    initData: function(name,wish){
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
                     ct: 10,
                     filters: ''
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.restaurantListData.data = data.data;
                      newChihuo.getPage('restaurantList') && _this.$el.html(_.template(restaurantListTemplate,initData.restaurantListData));
                      newChihuo.getPage('restaurantList') && _this.bindEvents();
                     }
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
                        newChihuo.showPopInfo("添加心愿单成功",1200);
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
      $('.radius-like').each(function(){
        var num = $(this).find('span').text();
        var radialObj = radialIndicator(this, {
              barColor: '#fb560a',
              barWidth: 10,
              radius: 30,
              initValue: num,
              displayNumber: false,
              roundCorner : true
        }); 
        // radialObj.animate(num); 
      });

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
