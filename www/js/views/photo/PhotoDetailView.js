define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/photoDetailTemplate.html',
  'swiper'
], function($, _, Backbone, photoDetailTemplate){

  var PhotoDetailView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      newChihuo.setPage('photoDetail');
      newChihuo.windowInit();
      this.$el.html(_.template(photoDetailTemplate,initData.restaurantData));
      this.bindEvents();
    },

    bindEvents: function(){
      $('.right-photo-info img').on('click',function(){
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestPhotoCompliment.json'),
                  data: {
                     photoId: 20,
                     restId: 1,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0 && newChihuo.getPage('photoDetail')){
                        var num= parseInt($('.right-photo-info span').text());
                        $('.right-photo-info span').text(++num);

                     }
                  } 
              });  

      })

    }

  });
  return PhotoDetailView;
});
