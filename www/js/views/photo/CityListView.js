define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/cityListTemplate.html',
  'swiper'
], function($, _, Backbone, cityListTemplate){

  var CityListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },  
    render: function(city){
      newChihuo.setPage('cityList');
      newChihuo.windowInit();
      this.$el.html(_.template(cityListTemplate,initData.cityListData));
      this.initData(city,0);
      this.loadMore(city,10);
    },

    initData: function(city,num){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getOtherCities.json'),
                  data: {
                     curcity: city || 'toronto',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: 10
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.cityListData.data = [];
                      }
                      initData.cityListData.data = [...initData.cityListData.data,...data.data];
                      newChihuo.getPage('cityList') && _this.$el.html(_.template(cityListTemplate,initData.cityListData));
                       $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                        // if(data.total <= (num+1)*_this.status.ct+1){
                        //     _this.status.isEnd = true;
                        //      $('.loading-step3').show();
                        //      $('.loading-step1,.loading-step2').hide();
                        // }
                     }
                  } 
              });   

    },

    loadMore: function(city,distance){
      var _this = this;
       $(window).off('scroll').on('scroll',function(){
          if(_this.status.isEnd == true){
            $('.loading-step3').show();
            $('.loading-step1,.loading-step2').hide();
             return;
          }
          if (!_this.status.loading && ($(document).height() - $(this).scrollTop() - $(this).height()< distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            _this.initData(city,++_this.status.st);
          }
        }); 
    },

  });
  return CityListView;
});
