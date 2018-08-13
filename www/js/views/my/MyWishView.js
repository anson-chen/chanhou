define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myWishTemplate.html',
  'swiper'
], function($, _, Backbone, myWishTemplate){

  var MyWishView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #wishTab a':'showTabWrap' 
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myWish');
      newChihuo.windowInit();
      this.$el.html(_.template(myWishTemplate,initData.myWishData));
      this.initData(0);
      this.loadMore(10);
    },

    initData: function(num){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestFav.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myCommentsData.miData = [];
                      _this.status.st = 0;
                     }
                     if(data.status == 0){
                       initData.myWishData.restData = [...initData.myWishData.restData,...data.data];
                      newChihuo.getPage('myWish') && _this.$el.html(_.template(myWishTemplate,initData.myWishData));
                      if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;

                      newChihuo.getPage('myWish') && !initData.myWishData.miData.length && chihuo.setNoDataInfo($('.midata-wrap'));
                      newChihuo.getPage('myWish') && !initData.myWishData.restData.length && chihuo.setNoDataInfo($('.restdata-wrap'));
                     }
                  } 
              });

            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestMIFav.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myCommentsData.miData = [];
                      _this.status.st = 0;
                     }
                     if(data.status == 0){
                      initData.myWishData.miData =[...initData.myWishData.miData,...data.data];
                      newChihuo.getPage('myWish') && _this.$el.html(_.template(myWishTemplate,initData.myWishData));
                      if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                      newChihuo.getPage('myWish') && !initData.myWishData.miData.length && chihuo.setNoDataInfo($('.midata-wrap'));
                      newChihuo.getPage('myWish') && !initData.myWishData.restData.length && chihuo.setNoDataInfo($('.restdata-wrap'));
                     }
                  } 
              });    
    },

    loadMore: function(distance){
      var _this = this;
       var winheight = $(window).height();
       $(window).off('scroll').on('scroll',function(){
        var scroll = $(this).scrollTop();
          chihuo.opacityBg('.opacity-bg',scroll);
          if(_this.status.isEnd == true){
             return;
          }
          if (!_this.status.loading && ($(document).height() - scroll- winheight < distance)){
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
      swiperWish.slideTo(index);
    }

  });
  return MyWishView;
});
