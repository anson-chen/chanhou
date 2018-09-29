define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatAddTemplate.html'
], function($, _, Backbone, chatAddTemplate){

  var ChatAddView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .chat-top-button':'showChatZone'
    },

    render: function(){
      newChihuo.setPage('chatAdd');
      newChihuo.windowInit();
      this.$el.html(_.template(chatAddTemplate,initData.chatAddData));
      this.initData();
    },

    initData: function(){
       var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getFriendLastMsgs.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatAddData.data = data.data;
                        newChihuo.getPage('chatAdd') && _this.$el.html(_.template(chatAddTemplate,initData.chatAddData));
                        newChihuo.getPage('chatAdd') && !initData.chatAddData.data.length && chihuo.setNoDataInfo();
                     }
                  } 
              });   

    },

    showChatZone:function(e){
      $(".chat-zone").toggle();
    }

  });
  return ChatAddView;
});
