define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myRewardsTemplate.html',
  'swiper'
], function($, _, Backbone, myRewardsTemplate){

  var MyRewardsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .panel-heading': 'toggleInfo',
     'click .referer-button': 'refererSubmit'
    },
    status: {
      yesterdayScore:0,
      todayScore:0,
    },

    render: function(){
      newChihuo.setPage('myRewards');
      newChihuo.windowInit();
      var _this = this;
      this.status.yesterdayScore = this.status.todayScore = 0;
      initData.myIndexData.data[0] && initData.myIndexData.data[0].realized_score && $.each(JSON.parse(initData.myIndexData.data[0].realized_score),function(index,value){
         if(value.total_points){
           _this.status.yesterdayScore+=value.total_points;
         }
      });

      initData.myIndexData.data[0] && initData.myIndexData.data[0].unrealized_score && $.each(JSON.parse(initData.myIndexData.data[0].unrealized_score),function(index,value){
         if(value.total_points){
           _this.status.todayScore+=value.total_points;
         }
      });

      initData.myIndexData.status = _this.status;

      this.$el.html(_.template(myRewardsTemplate,initData.myIndexData));
    },

    refererSubmit: function(){
      var key = $("#refererKey").val();
      if(key){
        chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('setRefKey.json'),
                  data: {
                     rk: key,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                       newChihuo.showPopInfo('status code '+ data.data[0].status_code);
                     }
                  } 
              });  
      }else{

      }
    },

    toggleInfo: function(e){
      var obj = $(e.currentTarget);
      obj.next().toggleClass('in');

    }

  });
  return MyRewardsView;
});
