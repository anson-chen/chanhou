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
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myLike');
      newChihuo.windowInit();
      this.$el.html(_.template(myLikeTemplate,initData.myLikeData));
      this.initData(0);
      this.loadMore(10);
    },
     initData: function(num){
      var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyRestLike.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myLikeData.data = [];
                     }
                     if(data.status == 0){
                        initData.myLikeData.data = [...initData.myLikeData.data,...data.data];
                        newChihuo.getPage('myLike') && _this.$el.html(_.template(myLikeTemplate,initData.myLikeData));
                         _this.status.loading = false;
                         $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                      
                     }
                  } 
            });  

            // chihuo.wkAjax({
            //       type: 'GET',
            //       url: chihuo.getApiUri('getMyRestLike.json'),
            //       data: {
            //          lat: newChihuo.lat,
            //          lng: newChihuo.lon,
            //          locale: 'en',
            //          st: num*_this.status.ct+1,
            //          ct: _this.status.ct,
            //       },
            //       success: function(data){
            //          if(num == 0){
            //           initData.myLikeData.data = [];
            //          }
            //          if(data.status == 0){
            //             initData.myLikeData.data = [...initData.myLikeData.data,...data.data];
            //             newChihuo.getPage('myLike') && _this.$el.html(_.template(myLikeTemplate,initData.myLikeData));
            //              _this.status.loading = false;
            //              $('.loading-step1').show();
            //             $('.loading-step2,.loading-step3').hide();
                      
            //          }
            //       } 
            // });  
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


    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperLike.slideTo(index);
    }

  });
  return MyLikeView;
});
