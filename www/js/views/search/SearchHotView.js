define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchHotTemplate.html'
], function($, _, Backbone, searchHotTemplate){

  var SearchHotView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('searchHot');
      newChihuo.windowInit();
      initData.homeData.detailData != null ? initData.searchHotData.detailData = initData.homeData.detailData : initData.searchHotData.detailData = [];
      this.$el.html(_.template(searchHotTemplate,initData.searchHotData));
      this.bindEvents();
    },

     bindEvents: function(){
      
      $(".head-search-icon").on('click', function(){
         $('.search-mask').show();
         $('.city-mask-list').show();
      });


      $(".city-mask-list p").on('click',function(){
          var index = parseInt($(this).parent().attr('query'));
          $(this).addClass('cur').siblings().removeClass('cur');
          $(".search-mask,.dish-mask-list,.city-mask-list").hide();
          $('.head-search-icon').text($(this).text());
      });

    }

  });
  return SearchHotView;
});
