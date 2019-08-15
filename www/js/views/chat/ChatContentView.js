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
     'submit #chatForm': 'sendData', 
     'click .bottom-add-more':'toggleInput',
     'click .share-other-wrap img':'shareFunc',
     'click #reloadContent':'reloadContent',
     'click .cont-img':'showBigImg'    
    },

    render: function(toId,name){
      newChihuo.setPage('chatContent');
      newChihuo.windowInit();    
      initData.chatContentData.custId = toId;
      initData.chatContentData.name = name;
      initData.chatContentData.hisData = [];
      initData.chatContentData.callback = this.initData;
      this.$el.html(_.template(chatContentTemplate,initData.chatContentData));
      chihuo.deleteMsgRemind(toId);
      this.initData(toId); 
    },
    toggleInput: function(){
      $('.fix-comment-bottom').toggleClass('toggle-share-wrap')
    },

    reloadContent: function(){
      var toId = $('#chatForm').attr('to');
      this.initData(toId);
    },

    showBigImg: function(e){
      var index=$(e.currentTarget).index('.cont-img');
      var url = '';
      var img = [];
      $('.cont-img').each(function(){
        var src = $(this).attr('src');
        src && img.push(src);
      }) 
      url = img.join(',');     
      if(url){
        initData.photoData.photoUrl = url;
        initData.photoData.photoIndex = index;
        window.modalPhoto.render();
      }     
    },

    sendImg: function(src){
      var _this = this;
      var msg = {"type":"image","content":{"url": src}};     
      var toId = $('#chatForm').attr('to');
          src.length && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustChatMsg.json'),
                  data: {
                     to: toId ,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     msg: JSON.stringify(msg),
                  },
                  success: function(data){
                     if(data.status == 0){
                      window.chatContent.initData(toId);
                     }
                  } 
              });   
       
    },

    
    shareFunc: function(e){
      var type = parseInt($(e.currentTarget).attr('func'));
      if(type==1){
        photoUse.shareImg(this.sendImg,1);

      }else if(type==2){
        photoUse.shareImg(this.sendImg,2);

      }else if(type==3){
        window.shareChat.render('rest');

      }else if(type==4){
        window.shareChat.render('dish');
      }else{

      }

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
                      if(!$("#chatValue").val().length){
                        newChihuo.getPage('chatContent') && $("#page").html(_.template(chatContentTemplate,initData.chatContentData));
                        $('.chat-container')[0].scrollTo(0,100000);
                      } 
                     }
                  } 
              });  
       return false;        
    },

    sendData: function(){
      var _this = this;
      var content = $("#chatValue").val();
      var msg = {"type":"text","content":{"body": content}};     
      var toId = $('#chatForm').attr('to');
          content.length && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustChatMsg.json'),
                  data: {
                     to: toId ,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     msg: JSON.stringify(msg),
                  },
                  success: function(data){
                     if(data.status == 0){
                      $("#chatValue").val('');
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
