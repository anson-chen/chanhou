define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/userGuideTemplate.html',
  'bootstrap'
], function($, _, Backbone, userGuideTemplate){

  var UserGuideView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(userGuideTemplate));
    }

  });
  return UserGuideView;
});
