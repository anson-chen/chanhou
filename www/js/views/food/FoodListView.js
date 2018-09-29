define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/food/foodListTemplate.html'
], function($, _, Backbone, foodListTemplate){

  var FoodListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click .comment-cont':'showMoreComment'

     
    },

    render: function(){
      newChihuo.setPage('foodList');
      newChihuo.windowInit();
      this.$el.html(_.template(foodListTemplate));
    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
    }

  });
  return FoodListView;
});
