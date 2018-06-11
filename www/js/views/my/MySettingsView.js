define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/mySettingsTemplate.html',
  'swiper'
], function($, _, Backbone, mySettingsTemplate){

  var MySettingsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('mySettings');
      newChihuo.windowInit();
      this.$el.html(_.template(mySettingsTemplate,initData.mySettingsData));
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      $(".tab-wish-wrap").hide().eq(index).show();
    }

  });
  return MySettingsView;
});
