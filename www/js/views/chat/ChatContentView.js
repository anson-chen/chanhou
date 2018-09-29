define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatContentTemplate.html'
], function($, _, Backbone, chatContentTemplate){

  var ChatContentView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click #userComments .comment-cont':'showMoreComment',
     'submit #chatForm': 'sendData'
     
    },

    render: function(toId,name){
      newChihuo.setPage('chatContent');
      newChihuo.windowInit();    
      initData.chatContentData.custId = toId;
      initData.chatContentData.name = name;
      initData.chatContentData.hisData = [];
      this.$el.html(_.template(chatContentTemplate,initData.chatContentData));
      chihuo.deleteMsgRemind(toId);
      this.initData(toId);
      
    },

    initData: function(toId){
      var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustChatMsg.json'),
                  data: {
                     to:  toId,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 100
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatContentData.hisData = data.data;
                        newChihuo.getPage('chatContent') && _this.$el.html(_.template(chatContentTemplate,initData.chatContentData));
                        window.scrollTo(0,100000);   
                     }
                  } 
              });  
       return false;        
    },

    sendData: function(){
      var _this = this;
      var content = $("#chatValue").val();
      var toId = $('#chatForm').attr('to');
          content.length && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustChatMsg.json'),
                  data: {
                     to: toId ,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     msg: content
                  },
                  success: function(data){
                     if(data.status == 0){
                      _this.initData(toId);
                     }
                  } 
              });  
        return false;       
       
    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
    }

  });
  return ChatContentView;
});
