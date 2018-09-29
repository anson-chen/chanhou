define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatMessageTemplate.html'
], function($, _, Backbone, chatMessageTemplate){

  var ChatMessageView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },
    
    render: function(){
      newChihuo.setPage('chatMessage');
      newChihuo.windowInit();
      this.$el.html(_.template(chatMessageTemplate,initData.chatMessageData));
     
    }

  });
  return ChatMessageView;
});
