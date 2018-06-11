define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myFansTemplate.html',
  'swiper'
], function($, _, Backbone, myFansTemplate){

  var MyFansView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #wishTab a':'showTabWrap' 
    },

    render: function(){
        newChihuo.setPage('myFans');
        newChihuo.windowInit();
        this.$el.html(_.template(myFansTemplate,initData.myFansData));
        this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyFollowers.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myFansData.data = data.data;
                      newChihuo.getPage('myFans') && _this.$el.html(_.template(myFansTemplate,initData.myFansData));
                     }
                  } 
              });  
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      $(".tab-wish-wrap").hide().eq(index).show();
    }

  });
  return MyFansView;
});
