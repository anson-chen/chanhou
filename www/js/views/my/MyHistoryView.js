define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myHistoryTemplate.html',
  'swiper'
], function($, _, Backbone, myHistoryTemplate){

  var MyHistoryView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #historyTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myHistory');
      newChihuo.windowInit();
      this.$el.html(_.template(myHistoryTemplate,initData.myHistoryData));
      this.initData();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustBrwHist.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.myHistoryData.data = data.data;
                        newChihuo.getPage('myHistory') && _this.$el.html(_.template(myHistoryTemplate,initData.myHistoryData));
                     }
                   }
            });  
       

    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperHistory.slideTo(index)
    }

  });
  return MyHistoryView;
});
