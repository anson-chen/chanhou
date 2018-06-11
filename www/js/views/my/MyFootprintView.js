define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myFootprintTemplate.html',
  'swiper'
], function($, _, Backbone, myFootprintTemplate){

  var MyFootprintView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .table-cont li':'showMoreInfo',
     'click .shake-img':'hideMask',
     'click .comment-effect4 .comment-cont':'showMoreComment'
     
    },

    render: function(){
      newChihuo.setPage('myFootprint');
      newChihuo.windowInit();
      this.$el.html(_.template(myFootprintTemplate));
      this.initData();
    },

    showMoreInfo: function(e){
      var obj=$(e.currentTarget);
      obj.addClass('cur').siblings().removeClass('cur');
      $('.mask-shake').show();
    },

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
        },

    hideMask: function(){
      $('.mask-shake').hide();
    }

  });
  return MyFootprintView;
});
