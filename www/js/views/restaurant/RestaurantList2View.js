define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantList2Template.html',
  'swiper'
], function($, _, Backbone, restaurantList2Template){

  var RestaurantList2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },


    render: function(city,name){
      newChihuo.setPage('restaurantList2');
      newChihuo.windowInit();
      this.$el.html(_.template(restaurantList2Template,initData.restaurantList2Data));
      this.initData(city,name,0);
      this.loadMore(city,name,10);
      
    },

    initData: function(city,name,num){
      var _this = this;
      var option; 
      if(name == 'null'){
        option = {
          city: city || 'toronto',
          range: 10,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en',
          st: num*_this.status.ct+1,
          ct: 20
        }
      }else{
        option = {
          city: city || 'toronto',
          ctype: name,
          range: 10,
          lat: newChihuo.lat,
          lng: newChihuo.lon,
          locale: 'en',
          st: num*_this.status.ct+1,
          ct: 20
        }
      }
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getNRestByCityCuis.json'),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.restaurantList2Data.data = [];
                      }
                        initData.restaurantList2Data.data = [...initData.restaurantList2Data.data,...data.data];
                        if(newChihuo.getPage('restaurantList2')){
                            _this.$el.html(_.template(restaurantList2Template,initData.restaurantList2Data));
                            $('.loading-step1').show();
                            $('.loading-step2,.loading-step3').hide();
                             _this.bindEvents();
                            if(data.total < _this.status.ct){
                                _this.status.isEnd = true;
                                 $('.loading-step3').show();
                                 $('.loading-step1,.loading-step2').hide();
                            }
                        } 
                     }
                  } 
              }); 

    },

    loadMore: function(city,name,distance){
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
            _this.initData(city,name,++_this.status.st);
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
        chihuo.beginSort(index,this,initData.restaurantList2Data.data,'total_likes_perc','price_level','cust_distance');
        chihuo.sortAll(index,$(this).hasClass('toggle'),restaurantList2Template,initData.restaurantList2Data,_this);
      });

    }


  });
  return RestaurantList2View;
});
