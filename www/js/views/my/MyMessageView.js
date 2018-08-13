define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myMessageTemplate.html',
  'swiper'
], function($, _, Backbone, myMessageTemplate){

  var MyMessageView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect4 .comment-cont':'showMoreComment',
     'click #followingsTab a':'showTabWrap' 
    },
     status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myMessage');
      newChihuo.windowInit();
      this.$el.html(_.template(myMessageTemplate, initData.myMessageData));
      // if(initData.myMessageData.data.length == 0){
      //   this.initData(this.status.st);
      // }
      this.initData(0);
      this.loadMore(10);
      this.bindEvent();
    },

    initData: function(num){
      var _this = this;
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustMoment.json'),
                  data: {
                     custid: newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     type:'all',
                     momenttype:'followings',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myMessageData.data = [];
                     }
                     if(data.status == 0){
                      initData.myMessageData.data = [...initData.myMessageData.data,...data.data];
                       newChihuo.getPage('myMessage') && _this.$el.html(_.template(myMessageTemplate, initData.myMessageData));
                        if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                        newChihuo.getPage('myMessage') && !_this.bindEvent() && !initData.myMessageData.data.length && chihuo.setNoDataInfo();
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
          if (!_this.status.loading && ($(document).height() - scroll - winheight< distance)){
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
      swiperFollowings.slideTo(index);
    },

    bindEvent: function(){
      var _this = this;
      var pullRefresh = $('.container-down').pPullRefresh({
        $el: $('.container-down'),
        $loadingEl: null,
        sendData: {},
        startPX:100,
        url:chihuo.getApiUri('addCustMoment.json'),
        callbacks: {
          pullStart: function(){
            $('#reload').addClass('show-reload');
            _this.initData(0);
            setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
            
          },
          start: function(){
            
          },
          success: function(response){
            
          },
          end: function(){
            
          },
          error: function(){
            
          }
        },
        func: function(){
        }
      });
    },  

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
    },

  

  });
  return MyMessageView;
});
