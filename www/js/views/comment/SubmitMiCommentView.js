define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/comment/submitMiCommentTemplate.html'
], function($, _, Backbone, submitMiCommentTemplate){

  var SubmitCommentView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-mi-select-list li':'selectTags',
     'click .like-mi-comment-icon':'selectLike',
     'click .sub-mi-comment':'submitComment',
     'click #captureMi': 'photoInit',
     'click .comment-photo-show b': 'deletePhoto'
     
    },

    render: function(restId,menuId){
      newChihuo.setPage('submitMiComment');
      newChihuo.windowInit();
      this.$el.html(_.template(submitMiCommentTemplate,{restId : restId, menuId:menuId}));
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
        var menuId = $('.sub-comment').attr('menuId');
        var urls = ''; 
        $('.comment-photo-show').each(function(){
          urls+=$(this).find('img').attr('src')+','
        });
        
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRMiReview.json'),
                  data: {
                     restId: restId,
                     restmenuId:1,
                     restmiId:menuId,
                     cont: cont,
                     urls:urls.substr(0,urls.length-1),
                     tags:tags.substr(0,tags.length-1),
                     like:'Y',
                     stars:5,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('评论成功',1000);
                        setTimeout(function(){app_router.navigate('food/'+restId+'/'+menuId, {
                            trigger: true    
                          });
                          },1200);
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
