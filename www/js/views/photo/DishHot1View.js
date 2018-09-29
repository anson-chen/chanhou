define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/dishHot1Template.html',
  'swiper'
], function($, _, Backbone, dishHot1Template){

  var DishHot1View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('dishHot1');
      newChihuo.windowInit();
      this.$el.html(_.template(dishHot1Template,initData.dishHot1Data));
      this.initData();
    },

    initData: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getHotDishes.json'),
                  data: {
                     city: newChihuo.city || 'toronto',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){                  
                      initData.dishHot1Data.data = [...initData.dishHot1Data.data,...data.data];
                      newChihuo.getPage('dishHot1') &&  _this.$el.html(_.template(dishHot1Template,initData.dishHot1Data));
                     }
                  } 
              });   

    }

  });
  
  return DishHot1View;
});
