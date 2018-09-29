define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/comment/userMiCommentsTemplate.html',
  'swiper'
], function($, _, Backbone, userMiCommentsTemplate){

  var UserMiCommentsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect8 .comment-cont':'showMoreComment',
     'submit .userMiComments-form':'submitComment',
     'click .user-mi-page' : 'showToggleInput'
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(id){
      newChihuo.setPage('userMiComments');
      newChihuo.windowInit();
      initData.userMiCommentsData.id = id;
      initData.userMiCommentsData.data = [];
      this.$el.html(_.template(userMiCommentsTemplate,initData.userMiCommentsData));
      this.initData(id,0);
      this.loadMore(id,10);
    },

    initData: function(id,num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllRestMIRv.json'),
                  data: {
                     restmiId: id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(num==0){
                        initData.userMiCommentsData.data = [];
                      }
                        initData.userMiCommentsData.data =[...initData.userMiCommentsData.data,...data.data];
                        newChihuo.getPage('userMiComments') && _this.$el.html(_.template(userMiCommentsTemplate,initData.userMiCommentsData));
                         _this.bindEvents();
                        if(data.data.length == 0 || data.data.length < _this.status.ct){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                            }
                          _this.status.loading =false;
                       
                        
                     }
                  } 
              });  

    },

    loadMore: function(id,distance){
      var _this = this;
       $(window).off('scroll').on('scroll',function(){
          if(_this.status.isEnd == true){
             return;
          }
          if (!_this.status.loading && ($(document).height() - $(this).scrollTop() - $(this).height()< distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            _this.initData(id,++_this.status.st);
          }
        }); 
    },

    submitComment: function(event){
      var _this = this;
      event.preventDefault();
      $(event.currentTarget).find('.chat-input').blur();
      $(event.currentTarget).find('.chat-input').val().length && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRMiRevComment.json'),
                  data: {
                     mireviewId: $(event.currentTarget).find('.chat-input').attr('review'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     comment: $(event.currentTarget).find('.chat-input').val()
                  },
                  success: function(data){
                     if(data.status == 0){
                       
                       data.data && data.data.length && $('.reply').parent().next().show().append('<p><span>' + data.data[0].rsp_msg +'：</span>'+ data.data[0].comment_details+'</p>');
                       $('.reply').parent().parent().find('.user-recall').hide();
                       $('.reply').removeClass('reply');
                        _this.initData(initData.userMiCommentsData.id,0);
                       
                     }
                  } 
              });  
      },

    bindEvents: function(){
      $('.good-icon').on('click',function(){
        if($(this).hasClass('good-done')){
          return;
        }
        var _this = this;
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestReviewCompliment.json'),
                  data: {
                     restreviewid: $(_this).attr('review') || 0,
                     restId: initData.userCommentsData.id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('点赞成功',1000);
                        var num = parseInt($(_this).text()) || 0;
                        $(_this).addClass('good-done').text(++num);
                     }
                  } 
              });  
         
      });
    },

     showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
    },

    showToggleInput: function(e){
       var obj=$(e.currentTarget);
       obj.parent().parent().find('.user-recall').toggle().find('.chat-input').val('').focus().attr('review',$(obj.children()[0]).attr('review'));
    }

  });
  return UserMiCommentsView;
});
