define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myDiscountTemplate.html',
  'swiper'
], function($, _, Backbone, myDiscountTemplate){

  var MyDiscountView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .discount-city':'showCity',
     'click #discountCity p': 'changeCity', 
     'click #discountMenuTab span':'showTabWrap',
     'click .discount-bottom':'showMoreInfo',
    },

    render: function(){
      newChihuo.setPage('myDiscount');
      newChihuo.windowInit();
      initData.myDiscountData.defaultCity = newChihuo.city;
      newChihuo.setPromo = false;
      this.$el.html(_.template(myDiscountTemplate,initData.myDiscountData));
      // this.getCityList();
      // this.initData();
      this.getNearRestProms();
    },
    showMoreInfo: function(e){
       $(e.currentTarget).toggleClass('discount-show-all');
    },

    getCityList:function(){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getAllPromoCities.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     city: newChihuo.city
                  },
                  success: function(data){
                     if(data.status == 0){
                     initData.myDiscountData.cityData = data.data;
                     newChihuo.getPage('myDiscount') && _this.$el.html(_.template(myDiscountTemplate,initData.myDiscountData));
                  }
                }
              });  

    },

    initData:function(city){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getRestPromosByCt.json'),
                  data: {
                     curcity: city || newChihuo.city || 'toronto',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',                    
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myDiscountData.discountData = chihuo.dealData(data.data,'promodaytp');
                      newChihuo.getPage('myDiscount') && _this.$el.html(_.template(myDiscountTemplate,initData.myDiscountData));
                      newChihuo.getPage('myDiscount') && !initData.myDiscountData.discountData.length && chihuo.setNoDataInfo();
                  }
                }
              });  
    },

    getNearRestProms: function(){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getNearRestProms.json'),
                  data: {
                     lat: newChihuo.lat, //用户所在的经度
                     lng: newChihuo.lon, //用户所在的纬度
                     lat2: newChihuo.lat,  //指定的查询经度
                     lng2:  newChihuo.lon, //指定的查询纬度
                     st: 1,
                     ct: 20,
                     locale: 'en',                    
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.myDiscountData.discountData = chihuo.dealData(data.data,'promodaytp');
                      newChihuo.getPage('myDiscount') && _this.$el.html(_.template(myDiscountTemplate,initData.myDiscountData));
                      newChihuo.getPage('myDiscount') && !initData.myDiscountData.discountData.length && chihuo.setNoDataInfo();
                      _this.bindEvents();
                  }
                }
              });  

    },

    bindEvents: function(){
      var _this = this;
       $('.reload-top-icon').on('click',function(){
         $('#reload').addClass('show-reload');          
          setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
          _this.getNearRestProms();
      });

    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.parent().index();
      $('.food-list-nav span').removeClass('cur');
      obj.addClass('cur');
      swiperDiscountMenu.slideTo(index);
    },

     showCity: function(){
            $('.search-mask').show();
            $('.city-mask-list').show();
      },

      changeCity: function(e){
          if($(e.currentTarget).hasClass('cur')){
              $('.search-mask').hide();
              $('.city-mask-list').hide();
              return;
          }
            $('.discount-city').text($(e.currentTarget).text());
            initData.myDiscountData.defaultCity = $(e.currentTarget).text();
            $(e.currentTarget).addClass('cur').siblings().removeClass('cur');
            $('.search-mask').hide();
            $('.city-mask-list').hide();
            this.initData($(e.currentTarget).text());
            
        }

  });
  return MyDiscountView;
});
