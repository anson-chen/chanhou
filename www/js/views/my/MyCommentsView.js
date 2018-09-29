define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myCommentsTemplate.html',
  'swiper'
], function($, _, Backbone, myCommentsTemplate){

  var MyCommentsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect1 .comment-cont':'showMoreComment',
     'click #commentTab a':'showTabWrap' 
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myComments');
      newChihuo.windowInit();
      this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
      this.initData(0);
      this.loadMore(10);
    },

    initData: function(num){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestRev.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                    if(num == 0){
                      initData.myCommentsData.restData = [];
                      _this.status.st = 0;
                     }
                     if(data.status == 0){
                       initData.myCommentsData.restData = [...initData.myCommentsData.restData,...data.data];
                       newChihuo.getPage('myComments') && _this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
                        if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                       newChihuo.getPage('myComments') && !initData.myCommentsData.restData.length && chihuo.setNoDataInfo($('.restdata-wrap'));

                        newChihuo.getPage('myComments') && !initData.myCommentsData.miData.length && chihuo.setNoDataInfo($('.midata-wrap'));
                     }
                  } 
              });  
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestMIRev.json'),
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
                       initData.myCommentsData.miData = [...initData.myCommentsData.miData,...data.data];
                      newChihuo.getPage('myComments') && _this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
                       if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                      
                      newChihuo.getPage('myComments') && !initData.myCommentsData.miData.length && chihuo.setNoDataInfo($('.midata-wrap'));
                      newChihuo.getPage('myComments') && !initData.myCommentsData.restData.length && chihuo.setNoDataInfo($('.restdata-wrap'));
                     }
                  } 
              });  
    },

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
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
      $('#commentTab a').removeClass('cur');
      obj.addClass('cur');
      swiperMyComment.slideTo(index);
    }

  });
  return MyCommentsView;
});
