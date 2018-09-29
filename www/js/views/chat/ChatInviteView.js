define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatInviteTemplate.html'
], function($, _, Backbone, chatInviteTemplate){

  var ChatInviteView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'submit #chihuoSearch':'showNewChihuo',
      'click .added-this':'showMessage'
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 20
    },

    render: function(){
      newChihuo.setPage('chatInvite');
      newChihuo.windowInit();
      this.$el.html(_.template(chatInviteTemplate,initData.chatInviteData));
      // this.initData(0);
      this.getContact();
    },

    initData: function(num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri("lstCustByPB.json"),
                  data: {
                     pb:JSON.stringify([{ id: 'name', email: 'ray@chanhou.com',social_media:'test'}]),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en-CA'
                  },
                  success: function(data){
                      initData.chatInviteData.data = data.data;
                      $("#page").html(_.template(chatInviteTemplate,initData.chatInviteData));
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

    showNewChihuo: function(event){
      var _this = this;
      event.preventDefault();
      $('.invite-input').val().length && chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustDetail.json'),
                  data: {
                     kw:$('.invite-input').val(),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0 ){
                        if(data.data && data.data.length){
                          var html = "";
                          for( var i = 0; i < data.data.length; i++){
                          html += '<div class="chat-people-list" style="margin:5px 12px;">'
                                  +'<div class="rest-comment-head clearfix">'
                                      +'<a href="#chatApply/'+data.data[i].customer_id+'/'+encodeURIComponent($('.invite-input').val())+'">'+ (data.data[i].following_flg == 'N' ? '<button class="chat-add-button" customer="'+ data.data[i].customer_id +'">add</button>' : '<span class="chat-add-word">added</span>') +'</a>'
                                    +'<img src='+(data.data[i].profile_photo_url ? data.data[i].profile_photo_url : "imgs/photo.png") +' class="comment-left-img">' 
                                      +'<div class="comment-right-info">'
                                        +'<h3 style="background:none;" class="search-name-show">'+(data.data[i].display_name ? data.data[i].display_name : $('.invite-input').val())+'</h3>'        
                                      +'</div>'
                                  +'</div>'
                              +'</div>'
                          }

                          $('.search-chihuo-list').html(html);

                        }else{
                          newChihuo.showPopInfo(newChihuo.localize('no_results'));
                          $('.search-chihuo-list').html('');
                        }
                        
                     }
                  } 
              });  
    },

    showContact: function(data){
      var t = [];
      for(var i=0; i< data.length; i++){
        if(data[i].emails && data[i].emails.length > 0){
         t.push({
          "id":(data[i].name.givenName === undefined ? " ":data[i].name.givenName) + " " + (data[i].name.familyName=== undefined ? " ": data[i].name.familyName),
          "email":data[i].emails[0].value,
          "social_media":""
         });
        }
      }

      t.length && chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('lstCustByPB.json'),
                  data: {
                     pb: JSON.stringify(t),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en-CA'
                  },
                  success: function(data){
                    if(data.status == 0 && data.data && data.data.length > 0){
                      initData.chatInviteData.data = data.data;
                      $("#page").html(_.template(chatInviteTemplate,initData.chatInviteData));
                    }

                    if(data.data.length == 0){
                      newChihuo.showPopInfo(newChihuo.localize('no_foodies_in_pb'));
                    }
                    
                  }
                });
      
    },

    getContact: function(){
      contact.init(this.showContact);
    }

  });
  return ChatInviteView;
});
