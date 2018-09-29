define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatIndexTemplate.html'
], function($, _, Backbone, chatIndexTemplate){

  var ChatIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click #userComments .comment-cont':'showMoreComment'

     
    },

    render: function(){
      newChihuo.setPage('chatIndex');
      newChihuo.windowInit();
      this.$el.html(_.template(chatIndexTemplate));
    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
    }

  });
  return ChatIndexView;
});
