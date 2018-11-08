define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatRequestTemplate.html'
], function($, _, Backbone, chatRequestTemplate){

  var ChatRequestView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .chat-response':'requestCallback',
      'click .go-message2':'showMessage'
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 20
    },

    render: function(type){
      newChihuo.setPage('chatRequest');
      newChihuo.windowInit();
      initData.chatRequestData.showToData = type == 1 ? true : false;
      this.$el.html(_.template(chatRequestTemplate,initData.chatRequestData));
      newChihuo.requestList = {};//清空好友请求消息列表      
      if(type == 1){
        this.initDataIncoming(0);
      }
      if(type == 2){
        this.initDataOutgoing(0);
      }
      
    },

    initDataIncoming: function(num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('listFriendReq.json'),
                  data: {
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatRequestData.toData = data.data;                      
                      // alert(JSON.stringify(initData.chatRequestData.data));
                      newChihuo.getPage('chatRequest') && _this.$el.html(_.template(chatRequestTemplate,initData.chatRequestData));
                      newChihuo.getPage('chatRequest') && !initData.chatRequestData.toData.length && chihuo.setNoDataInfo($('.toData'));
                  }
                }
              });  
},
     initDataOutgoing: function(num){
      var _this = this; 
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllFriendReq.json'),
                  data: {
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatRequestData.fromData = data.data;                      
                      newChihuo.getPage('chatRequest') && _this.$el.html(_.template(chatRequestTemplate,initData.chatRequestData));
                      newChihuo.getPage('chatRequest') && !initData.chatRequestData.fromData.length && chihuo.setNoDataInfo($('.fromData'));
                  }
                  
                }
              });  
    },

    requestCallback: function(e){
      var rid =$(e.currentTarget).attr('rid');
      var id = $(e.currentTarget).attr('cust');
      chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('respFriendReq.json'),
                  data: {
                     fid: id,
                     rid: rid,//2 accept ,3 refuse
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo(newChihuo.localize('success'));
                     }
                }
              });  

    },
    
     showMessage: function(e){
      var obj = $(e.currentTarget);
      initData.chatMessageData.data = {
        id : obj.attr('id') || '',
        name: obj.attr('name') || '',
        src: obj.attr('src') || ''
      };
       app_router.navigate('chatMessage',{
                  trigger: true
                });
    },

   
  });
  return ChatRequestView;
});
