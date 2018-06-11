define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myWishTemplate.html',
  'swiper'
], function($, _, Backbone, myWishTemplate){

  var MyWishView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #wishTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myWish');
      newChihuo.windowInit();
      this.$el.html(_.template(myWishTemplate,initData.myWishData));
      this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestFav.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myWishData.restData = data.data;
                      newChihuo.getPage('myWish') && _this.$el.html(_.template(myWishTemplate,initData.myWishData));
                     }
                  } 
              });

            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestMIFav.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myWishData.miData = data.data;
                      newChihuo.getPage('myWish') && _this.$el.html(_.template(myWishTemplate,initData.myWishData));
                     }
                  } 
              });    
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperWish.slideTo(index);
    }

  });
  return MyWishView;
});
