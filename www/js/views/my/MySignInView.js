define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/mySignInTemplate.html',
  'swiper'
], function($, _, Backbone, mySignInTemplate){

  var MySignInView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #signInTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('mySignIn');
      newChihuo.windowInit();
      this.$el.html(_.template(mySignInTemplate,initData.mySignInData));
      this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestChkin.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.mySignInData.restData = data.data;
                      newChihuo.getPage('mySignIn') && _this.$el.html(_.template(mySignInTemplate,initData.mySignInData));
                     }
                  } 
              });  
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getMyAllRestMIChkin.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.mySignInData.miData = data.data;
                       newChihuo.getPage('mySignIn') && _this.$el.html(_.template(mySignInTemplate,initData.mySignInData));
                     }
                  } 
              });  
    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperSignIn.slideTo(index);
    }

  });
  return MySignInView;
});
