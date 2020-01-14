define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register/emailVerifyTemplate.html',
  'bootstrap'
], function($, _, Backbone, emailVerifyTemplate){

  var EmailVerifyView = Backbone.View.extend({
    el: ("#page"),

    events: {
    },

    render: function(){
      newChihuo.setPage('emailVerify');
      newChihuo.windowInit();
      this.$el.html(_.template(emailVerifyTemplate));
    }
    
  });

  return EmailVerifyView;
  
});
