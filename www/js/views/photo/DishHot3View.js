define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/dishHot3Template.html',
  'swiper'
], function($, _, Backbone, dishHot3Template){

  var DishHot3View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(level){
      newChihuo.setPage('dishHot3');
      newChihuo.windowInit();
      var pl = '$';
      if(level == 3){
        pl='$';
      }else if(level == 4){
        pl='$$';
      }else{
        pl='$$$';
      }
      initData.dishHot3Data.title = 'Hot '+ pl +' Dish';
      this.$el.html(_.template(dishHot3Template,initData.dishHot3Data));
      this.initData(level);
    },

    initData: function(level){
      var _this = this;
      var pl;
      if(level == 3){
        pl='l';
      }else if(level == 4){
        pl='m';
      }else{
        pl='h';
      }
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getDishesByPrice.json'),
                  data: {
                     pl: pl,
                     city: newChihuo.city || 'toronto',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.dishHot3Data.data = [...data.data];
                      newChihuo.getPage('dishHot3') && _this.$el.html(_.template(dishHot3Template,initData.dishHot3Data));
                       
                      newChihuo.getPage('dishHot3') && _this.bindEvent();
                     }
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
  
  return DishHot3View;
});
