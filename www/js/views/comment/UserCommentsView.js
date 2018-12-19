define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/comment/userCommentsTemplate.html',
  'swiper'
], function($, _, Backbone, userCommentsTemplate){

  var UserCommentsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect5 .comment-cont':'showMoreComment',
     'submit .userComments-form':'submitComment',
     'click .user-page' : 'showToggleInput'
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },

    render: function(id){
      newChihuo.setPage('userComments');
      newChihuo.windowInit();
      initData.userCommentsData.id = id;
      initData.userCommentsData.data = [];
      this.$el.html(_.template(userCommentsTemplate,initData.userCommentsData));
      this.initData(id,0);
      this.loadMore(id,10);
    },

    initData: function(id,num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getRestCustRev.json'),
                  data: {
                     restId: id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(num==0){
                        initData.userCommentsData.data = [];
                      }
                        initData.userCommentsData.data =[...initData.userCommentsData.data,...data.data];
                        newChihuo.getPage('userComments') && _this.$el.html(_.template(userCommentsTemplate,initData.userCommentsData));
                         if(data.data.length < _this.status.ct){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                           }
                        _this.status.loading =false;
                        _this.bindEvents();
                        
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
                  url: chihuo.getApiUri('addCustRestReviewComment.json'),
                  data: {
                     restreviewid: $(event.currentTarget).find('.chat-input').attr('review'),
                     restId: initData.userCommentsData.id,
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
                        _this.initData(initData.userCommentsData.id,0);
                       
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
                        newChihuo.showPopInfo(newChihuo.localize('add_a_compliment'),1000);
                        var num = parseInt($(_this).text()) || 0;
                        $(_this).addClass('good-done').text(++num);
                     }
                  } 
              });  
         
      });

      $('.review-photo-urls img').on('click',function(){
           var url = $(this).parent(".review-photo-urls").attr('photo');
           var index = $(this).index();
           if(url){
            initData.photoData.photoUrl = url;
            initData.photoData.photoIndex = index;
            window.modalPhoto.render();
           }
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
  return UserCommentsView;
});
