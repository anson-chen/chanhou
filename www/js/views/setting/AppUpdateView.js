define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/appUpdateTemplate.html',
  'bootstrap'
], function($, _, Backbone, appUpdateTemplate){

  var AppUpdateView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(appUpdateTemplate));
    }

  });
  return AppUpdateView;
});
