define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myPhotosTemplate.html',
  'swiper'
], function($, _, Backbone, myPhotosTemplate){

  var MyPhotosView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #wishTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myPhotos');
      newChihuo.windowInit();
      this.$el.html(_.template(myPhotosTemplate));
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      $(".tab-wish-wrap").hide().eq(index).show();
    }

  });
  return MyPhotosView;
});
