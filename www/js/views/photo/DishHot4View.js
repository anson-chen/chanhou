define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/dishHot4Template.html',
  'swiper'
], function($, _, Backbone, dishHot4Template){

  var DishHot4View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },  
    render: function(level,name){
      newChihuo.setPage('dishHot4');
      newChihuo.windowInit();
       var pl = '$';
      if(level == 3){
        pl='$';
      }else if(level == 4){
        pl='$$';
      }else{
        pl='$$$';
      }
      initData.dishHot4Data.title = pl +' '+decodeURIComponent(name);
      this.$el.html(_.template(dishHot4Template,initData.dishHot4Data));
      this.initData(level,name,0);
      this.loadMore(level,name,10);
    },

    initData: function(level,name,num){
      var pl;
      if(level == 3){
        pl='l';
      }else if(level == 4){
        pl='m';
      }else{
        pl='h';
      }
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getDishesByOffer.json'),
                  data: {
                     pl:pl,
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
                        initData.dishHot4Data.data = [];
                      }
                      initData.dishHot4Data.data = [...initData.dishHot4Data.data,...data.data];
                      newChihuo.getPage('dishHot4') && _this.$el.html(_.template(dishHot4Template,initData.dishHot4Data));
                      newChihuo.getPage('dishHot4') && _this.bindEvent();
                        if(data.data && data.data.length == 0){
                            _this.status.isEnd = true;
                            _this.status.loading = false;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        if(data.data && data.data.length){
                            _this.status.isEnd = false;
                            _this.status.loading = false;
                            $('.loading-step1').show();
                            $('.loading-step2,.loading-step3').hide();
                        }
                     }
                  } 
              });   

    },

    loadMore: function(level,name,distance){
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
            _this.initData(level,name,++_this.status.st);
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
  
  return DishHot4View;
});
