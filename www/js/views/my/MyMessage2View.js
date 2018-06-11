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
     
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(){
      newChihuo.setPage('myMessage2');
      newChihuo.windowInit();
      this.$el.html(_.template(myMessage2Template,initData.myMessage2Data));
      // if(initData.myMessage2Data.data.length == 0){
      //   this.initData(this.status.st);
      // }
      this.initData(this.status.st);
      this.loadMore(10);
      this.bindEvent();
    },

    initData: function(num){
      var _this = this;
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustMoment.json'),
                  data: {
                     custid:1057,
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
                         _this.status.loading = false;
                         $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                        _this.bindEvent();
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

    bindEvent: function(){
      var _this = this;
      var pullRefresh = $('.container-down').pPullRefresh({
        $el: $('.container-down'),
        $loadingEl: $('.loading-wrap'),
        sendData: {

        },
        url:chihuo.getApiUri('addCustMoment.json'),
        callbacks: {
          pullStart: function(){
            
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
    },  

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
    }

  });
  return MyMessage2View;
});
