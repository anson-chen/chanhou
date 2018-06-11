define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myCommentsTemplate.html',
  'swiper'
], function($, _, Backbone, myCommentsTemplate){

  var MyCommentsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .comment-effect1 .comment-cont':'showMoreComment',
     'click #commentTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myComments');
      newChihuo.windowInit();
      this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
      this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestRev.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myCommentsData.restData = data.data;
                       newChihuo.getPage('myComments') && _this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
                     }
                  } 
              });  
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestMIRev.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myCommentsData.miData = data.data;
                      newChihuo.getPage('myComments') && _this.$el.html(_.template(myCommentsTemplate,initData.myCommentsData));
                     }
                  } 
              });  
    },

    showMoreComment: function(e){
          var obj=$(e.currentTarget);
          obj.toggleClass('comment-cont-more');
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      $('#commentTab a').removeClass('cur');
      obj.addClass('cur');
      swiperMyComment.slideTo(index);
    }

  });
  return MyCommentsView;
});
