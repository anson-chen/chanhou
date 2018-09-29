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
     'click .go-message':'showMessage',
     'click .search-set-input i':'clearInput',
     'submit #chatChooseForm': 'chatChoose'
    },

    render: function(){
      newChihuo.setPage('chatChoose');
      newChihuo.windowInit();
      this.$el.html(_.template(chatChooseTemplate,initData.chatChooseData));
      this.initData();
    },

    initData: function(){
       var _this = this;
       if(!(newChihuo.customerId || newChihuo.getLocalStorage('customer_id'))){
          newChihuo.getPage('chatChoose') && !initData.chatChooseData.data.length && chihuo.setNoDataInfo();
       }
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
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.chatChooseData.data = data.data;
                      newChihuo.getPage('chatChoose') &&  _this.$el.html(_.template(chatChooseTemplate,initData.chatChooseData));
                      newChihuo.getPage('chatChoose') && !initData.chatChooseData.data.length && chihuo.setNoDataInfo();
                     }
                  } 
              });   
    },

    chatChoose: function(event){
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
                                      +'<div class="comment-right-info" style="margin-right:45px;">'
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
    },

    clearInput: function(e){
      $(e.currentTarget).parent().find('input').val('');
    }

  });
  return ChatChooseView;
});
