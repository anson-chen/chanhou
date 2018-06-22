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
     
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myPhotos');
      newChihuo.windowInit();
      this.$el.html(_.template(myPhotosTemplate,initData.myPhotosData));
      this.initData(0);
      this.loadMore(10);
    },

     initData: function(num){
      var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllPhotos.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myPhotosData.data = [];
                     }
                     if(data.status == 0){
                        initData.myPhotosData.data = [...initData.myPhotosData.data,...data.data];
                        newChihuo.getPage('myPhotos') && _this.$el.html(_.template(myPhotosTemplate,initData.myPhotosData));
                         _this.status.loading = false;
                         $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                      
                     }
                  } 
            });  
    },

    loadMore: function(distance){
      var _this = this;
       $(window).off('scroll').on('scroll',function(){
          if(_this.status.isEnd == true){
             return;
          }
          if (!_this.status.loading && ($(document).height() - $(this).scrollTop() - $(this).height()< distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            _this.initData(++_this.status.st);
          }
        }); 
    },



  });
  return MyPhotosView;
});
