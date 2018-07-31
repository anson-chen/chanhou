define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/dishHot2Template.html',
  'swiper'
], function($, _, Backbone, dishHot2Template){

  var DishHot2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },  
    render: function(name){
      newChihuo.setPage('dishHot2');
      newChihuo.windowInit();
      initData.dishHot2Data.title = name;
      this.$el.html(_.template(dishHot2Template,initData.dishHot2Data));
      this.initData(name,0);
      this.loadMore(name,10);
    },

    initData: function(name,num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getHotRests.json'),
                  data: {
                     city: newChihuo.city || 'toronto',
                     restminame: decodeURIComponent(name),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: 10
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.dishHot2Data.data = [];
                      }
                      initData.dishHot2Data.data = [...initData.dishHot2Data.data,...data.data];
                      newChihuo.getPage('dishHot2') && _this.$el.html(_.template(dishHot2Template,initData.dishHot2Data));
                       $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                      newChihuo.getPage('dishHot2') && _this.bindEvent();
                        // if(data.total <= (num+1)*_this.status.ct+1){
                            _this.status.isEnd = false;
                            _this.status.loading = false;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        // }
                     }
                  } 
              });   

    },

    loadMore: function(name,distance){
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
            _this.initData(name,++_this.status.st);
          }
        }); 
    },

    bindEvent: function(){
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
    }

  });

  return DishHot2View;
});
