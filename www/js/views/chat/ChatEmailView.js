define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatEmailTemplate.html'
], function($, _, Backbone, chatEmailTemplate){

  var ChatEmailView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'submit #chihuoSearch':'showNewChihuo',
     'click .invite-contact': 'toggleContact'
    },

    render: function(){
      newChihuo.setPage('chatEmail');
      newChihuo.windowInit();
      var refKey = '';
      if(newChihuo.refKey || newChihuo.getLocalStorage('refKey')){
          refKey +='this is my refkey:'+(newChihuo.refKey || newChihuo.getLocalStorage('refKey'));
      }
      initData.contactData.emailMessage = "Hi, \n I'm chatting with my friends and reviewing dishes on Foodymonkey now! There are more than half million foodies who use Foodymonkey in North America. \n Foodymonkey is the first Canadaian dish review and chat smartphone app that allows you review restaurants, dishes and communicate via sending text! \n Download it now from Apple store at https://itunes.apple.com/ca/app/foodymonkey3/id1071192911?mt=8 or Google play store at https://play.google.com/store/apps/details?id=com.wookong.foodymonkey3 and add me via Foodymonkey ID:"+ this.setIdName() +".\n" + refKey +".";

      initData.contactData.shortMessage = "Hi, I'm chatting with my friends and reviewing dishes on Foodymonkey now! There are more than half million foodies who use Foodymonkey in North America. Foodymonkey is the first Canadaian dish review and chat smartphone app that allows you review restaurants, dishes and communicate via sending text! Download it now from Apple store at https://itunes.apple.com/ca/app/foodymonkey3/id1071192911?mt=8 or Google play store at https://play.google.com/store/apps/details?id=com.wookong.foodymonkey3 add me via Foodymonkey ID:"+ this.setIdName() +".\n"+refKey +".";

      this.$el.html(_.template(chatEmailTemplate,initData.contactData));
      this.getContact();
    },

    setIdName: function(){
      var id = newChihuo.getLocalStorage('email_address');
      if(id && id.indexOf('@')>-1){
        return id.split('@')[0];
      }else{
        return 'your friend';
      }
    },

    initData: function(){
      this.$el.html(_.template(chatEmailTemplate,initData.contactData));
    },

    toggleContact: function(e){
      var obj = $(e.currentTarget);
      obj.next('.panel-collapse').toggleClass('in');
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
                      initData.contactData.data = data.data;
                      $("#page").html(_.template(chatEmailTemplate,initData.contactData));
                    }

                    if(data.data.length == 0){
                      newChihuo.showPopInfo(newChihuo.localize('no_foodies_in_pb'));
                    }
                    
                  }
                });
      
    },

    getContact: function(){
      contact.init(this.showContact);
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
    }

  });
  return ChatEmailView;
});
