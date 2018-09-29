define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myMessage2Template.html',
  'swiper'
], function($, _, Backbone, myMessage2Template){

  var MyMessage2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect6 .comment-cont':'showMoreComment',
     'click #feedsTab a':'showTabWrap' 
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10,
      tips: null
    },

    render: function(){
      newChihuo.setPage('myMessage2');
      newChihuo.windowInit();
      !this.status.tips && newChihuo.showReloadInfo(this.status,'myMessage2');
      this.$el.html(_.template(myMessage2Template,initData.myMessage2Data));
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
                     momenttype:'all',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(num == 0){
                      initData.myMessage2Data.data = [];
                     }
                     if(data.status == 0){
                        initData.myMessage2Data.data = [...initData.myMessage2Data.data,...data.data];
                        newChihuo.getPage('myMessage2') && _this.$el.html(_.template(myMessage2Template,initData.myMessage2Data));
                        if(data.data.length == 0){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        }
                        _this.status.loading =false;
                        newChihuo.getPage('myMessage2') && !_this.bindEvent() && !initData.myMessage2Data.data.length && chihuo.setNoDataInfo();
                     }
                  } 
            });  
    },

     showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperFeeds.slideTo(index);
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

    bindEvent: function(){
      var _this = this;
      var pullRefresh = $('.container-down').pPullRefresh({
        $el: $('.container-down'),
        $loadingEl: null,
        sendData: {},
        url:chihuo.getApiUri('addCustMoment.json'),
        callbacks: {
          pullStart: function(){
            $('#reload').addClass('show-reload');          
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
           _this.initData(0);
        }
      });

      $('.reload-top-icon').on('click',function(){
         $('#reload').addClass('show-reload');          
          setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
          _this.initData(0);
      })
    },  

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
    }

  });
  return MyMessage2View;
});
