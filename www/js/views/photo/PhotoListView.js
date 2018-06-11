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
     'click #cancelMask,.close-set':'hidePhotoMask'

     
    },

    render: function(){
      newChihuo.setPage('photoList');
      newChihuo.windowInit();
      this.$el.html(_.template(photoListTemplate));
    },

    showPhotoMask: function(){
      $(".photo-mask").show();
    },

    hidePhotoMask: function(e){
     $(".photo-mask").hide();
    }

  });
  return PhotoListView;
});
