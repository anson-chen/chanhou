define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/setting/aboutUsTemplate.html',
  'bootstrap'
], function($, _, Backbone, aboutUsTemplate){

  var AboutUsView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(aboutUsTemplate));
    }

  });
  return AboutUsView;
});
