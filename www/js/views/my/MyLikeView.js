define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myLikeTemplate.html',
  'swiper'
], function($, _, Backbone, myLikeTemplate){

  var MyLikeView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #likeTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myLike');
      newChihuo.windowInit();
      this.$el.html(_.template(myLikeTemplate));
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperLike.slideTo(index);
    }

  });
  return MyLikeView;
});
