define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/chat/chatEmailTemplate.html'
], function($, _, Backbone, chatEmailTemplate){

  var ChatEmailView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('chatEmail');
      newChihuo.windowInit();
      initData.contactData.emailMessage = "Hi, \n I'm chatting with my friends and reviewing dishes on Foodymonkey now! There are more than half million foodies who use Foodymonkey in North America. \n Foodymonkey is the first Canadaian dish review and chat smartphone app that allows you review restaurants, dishes and communicate via sending text! \n Download it now at https://itunes.apple.com/ca/app/foodymonkey3/id1071192911?mt=8 and add me via Foodymonkey ID:"+(newChihuo.customer || newChihuo.getLocalStorage('welcomeName'))+".\n sent from my iphone";

      initData.contactData.shortMessage = "Hi, I'm chatting with my friends and reviewing dishes on Foodymonkey now! There are more than half million foodies who use Foodymonkey in North America. Foodymonkey is the first Canadaian dish review and chat smartphone app that allows you review restaurants, dishes and communicate via sending text! Download it now at https://itunes.apple.com/ca/app/foodymonkey3/id1071192911?mt=8 and add me via Foodymonkey ID:"+(newChihuo.customer || newChihuo.getLocalStorage('welcomeName'))+". \n sent from my iphone";

      

     
      !initData.contactData.data.length && contact.init(this.initData);
      // this.$el.html(JSON.stringify(initData.contactData.data));
      
      this.$el.html(_.template(chatEmailTemplate,initData.contactData));
    },

    initData: function(){
      this.$el.html(_.template(chatEmailTemplate,initData.contactData));
    }

  });
  return ChatEmailView;
});
