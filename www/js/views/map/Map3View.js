define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map/map3Template.html',
  'swiper'
], function($, _, Backbone, map3Template){

  var Map3View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('map3');
      newChihuo.windowInit();
      this.$el.html(_.template(map3Template));
      this.showMap();
    },

   showMap: function(){
      
    }

  });
  return Map3View;
});
