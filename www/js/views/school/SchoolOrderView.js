define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolOrderTemplate.html',
  'swiper'
], function($, _, Backbone, schoolOrderTemplate){

  var SchoolOrderView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'change #lunchTime':'menuChange'
    },

    render: function(id){
      newChihuo.setPage('schoolInfo');
      newChihuo.windowInit();
      this.$el.html(_.template(schoolOrderTemplate,initData.schoolIndexData));
      this.initData(id);
    },

    initData: function(id){
      
    },

    menuChange: function(e){
      var time = $(e.currentTarget).val();
      $('.order-new-list').find('li').hide().eq(time-1).show();
    }

  



  });
  return SchoolOrderView;
});
