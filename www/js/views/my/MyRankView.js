define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myRankTemplate.html',
  'swiper'
], function($, _, Backbone, myRankTemplate){

  var MyRankView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .table-cont li':'showMoreInfo',
     'click .shake-img':'hideMask'
     
    },

    render: function(){
      newChihuo.setPage('myRank');
      newChihuo.windowInit();
      this.$el.html(_.template(myRankTemplate));
    },

    showMoreInfo: function(e){
      var obj=$(e.currentTarget);
      obj.addClass('cur').siblings().removeClass('cur');
      $('.mask-shake').show();
    },

    hideMask: function(){
      $('.mask-shake').hide();
    }

  });
  return MyRankView;
});
