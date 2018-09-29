define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/photoListTemplate.html',
  'swiper'
], function($, _, Backbone, photoListTemplate){

  var PhotoListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .head-photo-icon':'showPhotoMask',
     'click #cancelMask,.close-set':'hidePhotoMask',
     'click .detail-img-show':'goDetail'
    },

    render: function(){
      newChihuo.setPage('photoList');
      newChihuo.windowInit();
      this.$el.html(_.template(photoListTemplate,initData.photoData));
    },

    showPhotoMask: function(){
      $(".photo-mask").show();
    },

    hidePhotoMask: function(e){
     $(".photo-mask").hide();
    },
    goDetail: function(e){
      var index = $(e.currentTarget).index();
       initData.photoData.photoIndex = index;
            app_router.navigate('photoDetail', {
              trigger: true
            });
    }


  });
  return PhotoListView;
});
