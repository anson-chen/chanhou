define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/comment/submitCommentTemplate.html'
], function($, _, Backbone, submitCommentTemplate){

  var SubmitCommentView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-select-list li':'selectTags',
     'click .like-comment-icon':'selectLike',
     'click .sub-comment':'submitComment',
     'click #capture': 'photoInit',
     'click .comment-photo-show b': 'deletePhoto'
     
    },

    render: function(restId){
      newChihuo.setPage('submitComment');
      newChihuo.windowInit();
      this.$el.html(_.template(submitCommentTemplate,{restId : restId}));
    },

    photoInit: function(){
      photoUse.bindEvents();
    },

    selectLike: function(e){
      var obj = $(e.currentTarget);
      $('.like-comment-icon').removeClass('like-up');
      obj.addClass('like-up');
      $('.like-comment-word').removeClass('like-word');
      obj.next().addClass('like-word');
    },

    selectTags: function(e){
      var obj = $(e.currentTarget).find('p');
      var tag = obj.attr('attr');
      if(obj.hasClass('comment-'+tag)){
        $(".comment-"+tag).removeClass('cur');
        obj.addClass('cur');
      }
    },

    submitComment: function(){
        var  _this = this;
        var  cont = $('.user-textarea').val();
        var  tags = '';
        $('.comment-select-list .cur').each(function(){
          tags+=$(this).text()+';'
        });
        var restId = $('.sub-comment').attr('restId');
        var urls = ''; 
        $('.comment-photo-show').each(function(){
          urls+=$(this).find('img').attr('src')+','
        });
        
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestReview.json'),
                  data: {
                     restId: restId,
                     cont: cont,
                     urls:urls.substr(0,urls.length-1),
                     tags:tags.substr(0,tags.length-1),
                     flg1:'Y',
                     flg2:'Y',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('评论成功',1000);
                        setTimeout(function(){app_router.navigate('restaurant/'+restId+'/comment', {
                            trigger: true    
                          });
                          },1000);
                     }
                  },
                  error: function(){
                    newChihuo.errorPopInfo(_this.submitComment);
                  } 
              });  
      
    },

    deletePhoto: function(e){
      var obj = $(e.currentTarget).parent('.comment-photo-show');
      obj.remove();
    }

  });
  return SubmitCommentView;
});
