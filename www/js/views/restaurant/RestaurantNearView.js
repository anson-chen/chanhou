define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantNearTemplate.html',
  'swiper',
  'pullRefresh',
], function($, _, Backbone, restaurantNearTemplate){

  var RestaurantListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 20
    },

    search: {
       showPop: false,
       addr : '',
       distance : 0,
       resttype : 0,
       price : 0,
       cuisine : '',
       openhours : '',
       features : [0]
    },

    render: function(){
      newChihuo.setPage('restaurantNear');
      newChihuo.windowInit();
      if(initData.restaurantNearData.lat != newChihuo.lat || initData.restaurantNearData.lon != newChihuo.lon){
         initData.restaurantNearData.data = [];
      }
      this.$el.html(_.template(restaurantNearTemplate,initData.restaurantNearData));
      var len = initData.restaurantNearData.data.length;
      if(len == 0){
        this.initData(this.status.st);
      }else{
        this.status.st = parseInt(len/this.status.ct)-1;
        this.bindEvents();
      }
      
      if(initData.restaurantNearData.filterData.length == 0){
        this.filter();
      }
//位置改变了每次进入请求最新的数据
      if(newChihuo.positionChanged){
        this.initData(this.status.st);
      }

      this.loadMore(10);
      
    },

    filter: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustSrchCat.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.restaurantNearData.filterData = data.data;
                      newChihuo.getPage('restaurantNear') && _this.$el.html(_.template(restaurantNearTemplate,initData.restaurantNearData));
                      newChihuo.getPage('restaurantNear') && _this.bindEvents();
                     }
                   }
            });  
    },

    initData: function(num){
      var _this = this;
      var addr = $.trim($('.address-filter').val()) || 'null';
      var distance = $('#distance').find('.cur').text() || 'all';
      var resttype = $('#resttype').find('.cur').text() || 'all';
      var price = $('#price').find('.cur').text() || 'all';
      var cuisine = $('#cuisine').text() || 'all';
      var openhours = $('.time-demo2').val() || 'all';
      var features = 'all';
      if($('#feature').find('.cur').length){
        _this.search.features = [];
        features = '';
        $('#feature').find('.cur').each(function(){
            features += $(this).text()+';'
            _this.search.features.push($(this).index());
        });
        features = features.slice(0,features.length-1);
      }
      this.search.addr = addr;
      this.search.distance = $('#distance').find('.cur').index()>=0 ? $('#distance').find('.cur').index() : 0;
      this.search.resttype = $('#resttype').find('.cur').index()>=0 ? $('#resttype').find('.cur').index() : 0;
      this.search.price = $('#price').find('.cur').index()>=0 ? $('#price').find('.cur').index() : 0;
      this.search.cuisine = $('#cuisine').text();
      this.search.openhours = $('.time-demo2').val();
      console.log(_this.search);
      var filters = 'addr:'+ addr +',distance:'+ distance +',resttype:'+ resttype +',price:'+ price +',cuisine:'+ cuisine +',openhours:'+ openhours +',features:'+features;
      if(chihuo.setSearch){
        filters = chihuo.setSearch;
        chihuo.setSearch = null;
      }
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findNearbyRestsWithRange2.json'),
                  data: {
                     distance: 20,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                     filters: filters
                  },
                  beforeSend: function (xhr) {},
                  complete: function (xhr, status) {},
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.restaurantNearData.data = [];
                      }
                        initData.restaurantNearData.data =[...initData.restaurantNearData.data,...data.data] ;
                        if(newChihuo.getPage('restaurantNear')){                 
                          _this.$el.html(_.template(restaurantNearTemplate,initData.restaurantNearData));
                          _this.status.loading = false;
                          initData.restaurantNearData.lat = newChihuo.lat;
                          initData.restaurantNearData.lon = newChihuo.lon;  
                          $('.loading-step1').show();
                          $('.loading-step2,.loading-step3').hide();
                          _this.bindEvents();
                          _this.statusSave();
                        }
                     }
                  } 
              });  
    },

    statusSave: function(){
      this.search.showPop ? $('.map-mask').show() : $('.map-mask').hide();
      $('.address-filter').val(this.search.addr=='null' ? '' : this.search.addr);
      $('#distance').children().removeClass('cur').eq(this.search.distance).addClass('cur');
      $('#resttype').children().removeClass('cur').eq(this.search.resttype).addClass('cur');
      $('#price').children().removeClass('cur').eq(this.search.price).addClass('cur');
      $('#cuisine').text(this.search.cuisine);
      $('.time-demo2').val(this.search.openhours);
      $('#feature').children().removeClass('cur');
      for( var i = 0; i < this.search.features.length; i++ ){
        $('#feature').children().eq(this.search.features[i]).addClass('cur');
      }
    },

    loadMore: function(distance){
      var _this = this;
      var winheight = $(window).height();
       $(window).off('scroll').on('scroll',function(){
        var scroll = $(this).scrollTop();
          chihuo.opacityBg('.opacity-bg',scroll);
          if(_this.status.isEnd == true){
             return;
          }
          if (!_this.status.loading && ($(document).height() - scroll - winheight < distance)){
            _this.status.loading = true;
            $('.loading-step2').show();
            $('.loading-step1,.loading-step3').hide();
            chihuo.sortData(initData.restaurantNearData.data,'cust_distance');
            _this.initData(++_this.status.st);
          }
        }); 
    },

    bindEvents: function(){
      var _this = this;
      $('.radius-like').each(function(){
        var num = $(this).find('span').text();
        var radialObj = radialIndicator(this, {
              barColor: '#fb560a',
              barWidth: 10,
              radius: 30,
              initValue: num,
              displayNumber: false,
              roundCorner : true
        }); 
        // radialObj.animate(num); 
      });

      var pullRefresh = $('.container-down').pPullRefresh({
        $el: $('.container-down'),
        $loadingEl: null,
        sendData: {},
        url: chihuo.getApiUri('findNearbyRestsWithRange2.json'),
        callbacks: {
          pullStart: function(){
            $('#reload').addClass('show-reload');
            _this.initData(0);
            setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
            
          },
          start: function(){
            
          },
          success: function(response){
            
          },
          end: function(){
            
          },
          error: function(){
            
          }
        },
        func: function(){
          
        }
      });

      $('.rank-ul li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('cur').toggleClass('toggle');
        chihuo.beginSort(index,this,initData.restaurantNearData.data,'total_likes_perc','rest_avg_pricelevel_per_person','cust_distance');
        chihuo.sortAll(index,$(this).hasClass('toggle'),restaurantNearTemplate,initData.restaurantNearData,_this);
      });
      
      
      $(".right-set-info span").on('click',function(){
        if($(this).parent().hasClass('set-feature')){
         $(this).toggleClass('cur');
          _this.status.st = 0;
          _this.initData(0);
         return;
        }
        $(this).addClass('cur').siblings().removeClass('cur');
        _this.status.st = 0;
         _this.initData(0);

      });

      $(".clear-option").on('click',function(){
          $(".right-set-info span").removeClass('cur');
      });

      $("#setSure").on('click',function(){
        _this.status.st = 0;
          _this.initData(0);
      });

      $(".rest-fix-right").on('click',function(){
         $(".map-mask").show();
         _this.search.showPop = true;
      });

      $(".close-map-mask").on('click',function(){
         $(".map-mask").hide();
         _this.search.showPop = false;
      });

      $(".clear-option").on('click',function(){
        var index = $('#searchSetTab .cur').index();
        if(index == 0){
          $(".swiper-slide").eq(index).find(".right-set-info span").removeClass('cur');
        }else{
          $(".swiper-slide").eq(index).find(".right-set-info span").removeClass('cur');
        }
      });

      $(".right-set-info").each(function(){
          $(this).find('span').eq(0).addClass('cur'); 
      });

       $(".select-dish-mask").on('click',function(){
         $(".dish-mask-list,.search-mask").show();
      });

       $(".dish-mask-list p").on('click',function(){
          $(this).addClass('cur').siblings().removeClass('cur');
          $(".search-mask,.dish-mask-list").hide();
          $('.select-dish-mask').eq(0).find(".set-floor-select").text($(this).text());
      });



      newChihuo.returnToTop();
    }
   

  });
  return RestaurantListView;
});
