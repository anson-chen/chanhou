define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolInfoTemplate.html',
  'swiper'
], function($, _, Backbone, schoolInfoTemplate){

  var SchoolInfoView = Backbone.View.extend({
    el: $("#page"),
    events: {
        
     
    },

    render: function(){
      newChihuo.setPage('schoolInfo');
      newChihuo.windowInit();
      this.$el.html(_.template(schoolInfoTemplate,initData.schoolIndexData));
      this.initData();
    },

    initData: function(){

    },

  });
  return SchoolInfoView;
});
