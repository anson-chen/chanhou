define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map/map2Template.html',
  'swiper'
], function($, _, Backbone, map2Template){

  var Map2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('map2');
      newChihuo.windowInit();
      this.$el.html(_.template(map2Template,initData.restaurantListData));
    }
   

  });
  return Map2View;
});
