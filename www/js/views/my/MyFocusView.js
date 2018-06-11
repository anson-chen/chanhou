define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myFocusTemplate.html',
  'swiper'
], function($, _, Backbone, myFocusTemplate){

  var MyFocusView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #wishTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myFocus');
      newChihuo.windowInit();
      this.$el.html(_.template(myFocusTemplate,initData.myFocusData));
      this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyFollowings.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){ 
                        initData.myFocusData.data = data.data;
                        newChihuo.getPage('myFocus') && _this.$el.html(_.template(myFocusTemplate,initData.myFocusData));
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
  return MyFocusView;
});
