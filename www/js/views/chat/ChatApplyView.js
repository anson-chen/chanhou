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

    render: function(id,name,from){
      newChihuo.setPage('chatApply');
      newChihuo.windowInit();
      this.$el.html(_.template(chatApplyTemplate,{id:id,name:name}));
      newChihuo.chatFrom = from;
    },

    sendchatInvite: function(e){
      var id = $(e.currentTarget).attr('cust') || '';
      if($(e.currentTarget).hasClass('done-effect')){
        return;
      }else{
         $(e.currentTarget).addClass('done-effect');
      }
      id && chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('sendFriendReq.json'),
          data:{
            fid: id || 617344,
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if(data.status == 0){
              newChihuo.showPopInfo(newChihuo.localize('request_success'),1200,function(){
                 app_router.navigate(!newChihuo.chatFrom ? 'chatInvite' : 'myIndex/'+newChihuo.chatFrom,{
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
