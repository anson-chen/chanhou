define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatInviteTemplate.html'
], function($, _, Backbone, chatInviteTemplate){

  var ChatInviteView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'submit #chihuoSearch':'searchFilter',
      'click .go-message':'showMessage',
      'click .invite-clear':'clearInput',
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
      this.initData(0);
    },

    initData: function(num){
      var _this = this;
       (newChihuo.customerId || newChihuo.getLocalStorage('customer_id')) &&
            chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllFriends.json'),
                  data: {
                     tid: newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 100
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatInviteData.data = data.data;
                      newChihuo.getPage('chatInvite') &&  _this.$el.html(_.template(chatInviteTemplate,initData.chatInviteData));
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

     searchFilter: function(){
       var _this = this;
       var word = $('.invite-input').val().toLowerCase();
       var len = $('.rest-comment-head').length;
      event.preventDefault();
      if(word.length && len ){
          for(var i=0; i<len; i++){
            var name = $('.rest-comment-head').eq(i).removeClass('no-show').find('h3').text().toLowerCase();
            if(name.indexOf(word)==-1){
               $('.rest-comment-head').eq(i).addClass('no-show');
            }
            
            }

          }

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

    clearInput: function(e){
      $(e.currentTarget).parent().find('input').val('');
      $('.rest-comment-head').removeClass('no-show');
    }

  });
  return ChatInviteView;
});
