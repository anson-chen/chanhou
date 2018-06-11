define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/messageRemindTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, messageRemindTemplate){

  var MessageRemindView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .switch-remind':'changeStatus'
    },

    render: function(){
      this.$el.html(_.template(messageRemindTemplate));
    },

    changeStatus: function(e){
      $(e.currentTarget).toggleClass('check');
    }

  });
  return MessageRemindView;
});
