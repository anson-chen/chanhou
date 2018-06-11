define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatApplyTemplate.html'
], function($, _, Backbone, chatApplyTemplate){

  var ChatApplyView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .chatApply':'sendchatInvite'
    },

    render: function(id,name){
      newChihuo.setPage('chatApply');
      newChihuo.windowInit();
      this.$el.html(_.template(chatApplyTemplate,{id:id,name:name}));
    },

    sendchatInvite: function(e){
      var id = $(e.currentTarget).attr('cust') || '';
      id && chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('sendFriendReq.json'),
          data:{
            fid: id,
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if(data.status == 0){
              newChihuo.showPopInfo('请求发送成功',1200,function(){
                 app_router.navigate('chatInvite',{
                  trigger: true
                });
              });
            }

          }
        });


    }

    

  });
  return ChatApplyView;
});
