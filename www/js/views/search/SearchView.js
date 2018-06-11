define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchTemplate.html',
  'swiper'
], function($, _, Backbone, searchTemplate){

  var SearchView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #addressMore':'showMoreAddress',
     'click .comment-cont':'showMoreComment'

     
    },

    render: function(){
      newChihuo.setPage('search');
      newChihuo.windowInit();
      this.$el.html(_.template(searchTemplate));
    },

    showMoreAddress: function(){
      $(".address-detail").toggleClass('address-more');
    },

    showMoreComment: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('comment-cont-more');
    }

  });
  return SearchView;
});
