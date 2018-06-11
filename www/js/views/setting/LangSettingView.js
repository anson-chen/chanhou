define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/langSettingTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, langSettingTemplate){

  var LangSettingView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(langSettingTemplate));
      this.bindEvent();
    },

    bindEvent:function(){
      $(".setting-li").on('click',function(){
         $('.setting-li p').html('');
         $(this).addClass('cur-select').siblings().removeClass('cur-select');
         $(this).find('p').html('✔️');
      })

    } 

  });
  return LangSettingView;
});
