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

    render: function(){
      newChihuo.setPage('chatRequest');
      newChihuo.windowInit();
      this.$el.html(_.template(chatRequestTemplate,initData.chatRequestData));
      this.initData(0);
    },

    initData: function(num){
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
                      initData.chatRequestData.data = data.data;
                      // alert(JSON.stringify(initData.chatRequestData.data));
                      newChihuo.getPage('chatRequest') && _this.$el.html(_.template(chatRequestTemplate,initData.chatRequestData));
                  }
                  if(data.status == 0 && data.data.length ==0){
                     newChihuo.showPopInfo('暂无馋猴好友请求');
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
                        newChihuo.showPopInfo('操作成功');
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
