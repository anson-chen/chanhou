define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatChooseTemplate.html'
], function($, _, Backbone, chatChooseTemplate){

  var ChatChooseView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click #userComments .comment-cont':'showMoreComment',
     'click .go-message':'showMessage'
     
    },

    render: function(){
      newChihuo.setPage('chatChoose');
      newChihuo.windowInit();
      this.$el.html(_.template(chatChooseTemplate,initData.chatChooseData));
      this.initData();
    },

    initData: function(){
       var _this = this;
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllFriends.json'),
                  data: {
                     tid: newChihuo.customerId || 617344,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatChooseData.data = data.data;
                      newChihuo.getPage('chatChoose') &&  _this.$el.html(_.template(chatChooseTemplate,initData.chatChooseData));
                     }
                  } 
              });   


    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
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
    }

  });
  return ChatChooseView;
});
