define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/photo/dishHot2Template.html',
  'swiper'
], function($, _, Backbone, dishHot2Template){

  var DishHot2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
    },  
    render: function(name,from){
      newChihuo.setPage('dishHot2');
      newChihuo.windowInit();
      initData.dishHot2Data.title = name;
      if(from){
        initData.dishHot2Data.from =true;
      }else{
        initData.dishHot2Data.from =false;
      }
      this.$el.html(_.template(dishHot2Template,initData.dishHot2Data));
      this.initData(name,0,from);
      this.loadMore(name,10,from);
    },

    initData: function(name,num,from){
      var _this = this;
      var url = from ? chihuo.getApiUri('getRestByRestMIName.json') : chihuo.getApiUri('getHotRests.json');
      var options = from ? {
        restminame: decodeURIComponent(name),
        lat: newChihuo.lat,
        lng: newChihuo.lon,
        locale: 'en',
        st: num*_this.status.ct+1,
        ct: _this.status.ct,
        filters: ''

      } : {
        city: newChihuo.city || 'toronto',
        restminame: decodeURIComponent(name),
        lat: newChihuo.lat,
        lng: newChihuo.lon,
        locale: 'en',
        st: num*_this.status.ct+1,
        ct: _this.status.ct
        };
      chihuo.wkAjax({
                  type: 'GET',
                  url:  url,
                  data: options,
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.dishHot2Data.data = [];
                      }
                      initData.dishHot2Data.data = [...initData.dishHot2Data.data,...data.data];
                      newChihuo.getPage('dishHot2') && _this.$el.html(_.template(dishHot2Template,initData.dishHot2Data));
                       $('.loading-step1').show();
                        $('.loading-step2,.loading-step3').hide();
                      newChihuo.getPage('dishHot2') && _this.bindEvent();
                        // if(data.total <= (num+1)*_this.status.ct+1){
                            _this.status.isEnd = false;
                            _this.status.loading = false;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                        // }
                     }
                  } 
              });   

    },

    loadMore: function(name,distance,from){
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
            _this.initData(name,++_this.status.st,from);
          }
        }); 
    },

    bindEvent: function(){
      
    }

  });

  return DishHot2View;
});
