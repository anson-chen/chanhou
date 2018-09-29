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
     'click .panel-heading': 'toggleInfo'
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
    
    toggleInfo: function(e){
      var obj = $(e.currentTarget);
      obj.next().toggleClass('in');

    }

  });
  return MyRewardsView;
});
