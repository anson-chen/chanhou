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
     'click .comment-photo-show b': 'deletePhoto',
     'click .set-score-wrap i': 'setScore'
     
    },

    render: function(restId){
      newChihuo.setPage('submitComment');
      newChihuo.windowInit();
      this.$el.html(_.template(submitCommentTemplate,{restId : restId}));
    },

    photoInit: function(){
      photoUse.bindEvents();
    },

    setScore: function(e){
      var $obj = $(e.currentTarget);
      var index = $obj.index();
      $obj.parent().children().removeClass('cur');
      for(var i=0; i<= index; i++){
          $obj.parent().children().eq(i).addClass('cur');
      }
      $obj.parent().attr('score',index+1);
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
        var  tags = {};
        var like = parseInt($('.like-word').attr('num')) || 0;
        tags['like'] = like;
        var restId = $('.sub-comment').attr('restId');
        var urls = ''; 
        $('.comment-photo-show').each(function(){
          urls+=$(this).find('img').attr('src')+','
        });

        $('.score-star').each(function(){
          var star = $(this).attr('score');
          var index = $(this).index('.score-star');
          if(star){
            if(index == 0){
              tags['service'] = parseInt(star) || 1;
            }else if(index == 1){
              tags['food'] = parseInt(star) || 1;
            }else if(index == 2){
              tags['ambiance'] = parseInt(star) || 1;
            }else{
              tags['overall'] = parseInt(star) || 1;
            }
          }
        });

        console.log(JSON.stringify(tags));
        
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestReview.json'),
                  data: {
                     restId: restId,
                     cont: cont,
                     urls:urls.substr(0,urls.length-1),
                     tags:JSON.stringify(tags),
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
