define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/setting/praviteSettingTemplate.html',
  'bootstrap'
], function($, _, Backbone, SidebarView, praviteSettingTemplate){

  var PraviteSettingView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(){
      this.$el.html(_.template(praviteSettingTemplate));
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
  return PraviteSettingView;
});
