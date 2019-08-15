define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantTypeTemplate.html',
  'text!templates/home/tipsDetailTemplate.html',
  'swiper',
  'pullRefresh',
], function($, _, Backbone, restaurantTypeTemplate,tipsDetailTemplate){

  var RestaurantListView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },
    status: {
      st: 0,
      loading: false,
      isEnd: false,
      ct: 50,
      tips: null,
      lat: null,
      lng: null,
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

    render: function(type){
      var _this = this;
      newChihuo.setPage('restaurantType');
      newChihuo.windowInit();
      this.restType = type;
      if(type == 1){
        initData.restaurantTypeData.title = 'Takeout';
      }else if(type == 2){
        initData.restaurantTypeData.title = 'Dine-in';
      }else{
        initData.restaurantTypeData.title = 'School Lunch';
      }
     
      this.$el.html(_.template(restaurantTypeTemplate,initData.restaurantTypeData));
      var len = initData.restaurantTypeData.data.length;
      
      this.initData(this.status.st);
     
      
      if(initData.restaurantTypeData.filterData.length == 0){
        this.filter();
      }

      this.loadMore(10);
      
    },

    tips: function(){
      $('#arrowTips').html(_.template(tipsDetailTemplate,initData.restaurantTypeData)).addClass('show-set');
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
                      initData.restaurantTypeData.filterData = data.data;
                      newChihuo.getPage('restaurantType') && _this.$el.html(_.template(restaurantTypeTemplate,initData.restaurantTypeData));
                      newChihuo.getPage('restaurantType') && _this.bindEvents();
                     }
                   }
            });  
    },

    initData: function(num,type){
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
      // console.log(_this.search);
      var filters = 'addr:'+ addr +',distance:'+ distance +',resttype:'+ resttype +',price:'+ price +',cuisine:'+ cuisine +',openhours:'+ openhours +',features:'+features+',restservice:'+_this.restType;;
      if(chihuo.setSearch){
        filters = chihuo.setSearch;
        chihuo.setSearch = null;
      }
      if(distance == 'all' && resttype == 'all' && price == 'all' && cuisine == 'all' && openhours == 'all' && features == 'All'){
          filters = 'restservice:'+_this.restType;
      }
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findNearbyRestsWithRange2.json'),
                  data: {
                     distance: 20,
                     lat: this.status.lat || newChihuo.lat,
                     lng: this.status.lng || newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: (num+1)*_this.status.ct,
                     filters: filters,
                  },
                  beforeSend: function (xhr) {},
                  complete: function (xhr, status) {},
                  success: function(data){
                     if(data.status == 0){
                      if(num == 0){
                        initData.restaurantTypeData.data = [];
                      }
                        initData.restaurantTypeData.data = data.data ;
                        if(newChihuo.getPage('restaurantType')){                 
                          _this.$el.html(_.template(restaurantTypeTemplate,initData.restaurantTypeData));
                          initData.restaurantTypeData.lat = newChihuo.lat;
                          initData.restaurantTypeData.lon = newChihuo.lon;  
                           if(data.data.length < (num+1)*_this.status.ct){
                            _this.status.isEnd = true;
                             $('.loading-step3').show();
                             $('.loading-step1,.loading-step2').hide();
                           }
                        _this.status.loading =false;
                          _this.bindEvents();
                          _this.statusSave();
                        }
                     }
                  },
                  error: function(){
                     _this.status.isEnd = true;
                    $('.loading-step3').show();
                    $('.loading-step1,.loading-step2').hide();
                     _this.status.loading =false;

                  } 
              });  
    },

    statusSave: function(){
      this.search.showPop ? $('.map-mask,.search-set-fix').show() : $('.map-mask,.search-set-fix').hide();
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
            chihuo.sortData(initData.restaurantTypeData.data,'cust_distance');
            _this.initData(++_this.status.st);
          }
        }); 
    },

    bindEvents: function(){
      var _this = this;
     
      var pullRefresh = $('.container-down').pPullRefresh({
        $el: $('.container-down'),
        $loadingEl: null,
        sendData: {},
        url: chihuo.getApiUri('findNearbyRestsWithRange2.json'),
        callbacks: {
          pullStart: function(){
            $('#reload').addClass('show-reload');           
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
           _this.initData(0);
        }
      });

      $('.rank-ul li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('cur').toggleClass('toggle');
        chihuo.beginSort(index,this,initData.restaurantTypeData.data,'total_likes_perc','rest_avg_pricelevel_per_person','cust_distance');
        chihuo.sortAll(index,$(this).hasClass('toggle'),restaurantTypeTemplate,initData.restaurantTypeData,_this);
        if(_this.status.isEnd){
          $('.loading-step3').show();
          $('.loading-step1,.loading-step2').hide();
        }                           
      });

      $('.reload-top-icon').on('click',function(){
         $('#reload').addClass('show-reload');          
          setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
          _this.initData(0);
      });
      
      
      $(".right-set-info span").on('click',function(){
        if($(this).parent().hasClass('set-feature')){
          var index = $(this).index();
          if(index == 0){
            $(this).addClass('cur').siblings().removeClass('cur');;
          }else{
             $(this).toggleClass('cur');
             $(this).parent().children().eq(0).removeClass('cur');
            if($(this).parent().find('.cur').length == 0){
             $(this).addClass('cur');
            }
          }

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
         $(".map-mask,.search-set-fix").show();
         _this.search.showPop = true;
      });

      $(".close-map-mask").on('click',function(){
         $(".map-mask,.search-set-fix").hide();
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
         $(".search-set-fix").hide();
      });

       $(".dish-mask-list p").on('click',function(){
          $(this).addClass('cur').siblings().removeClass('cur');
          $(".search-mask,.dish-mask-list").hide();
          $('.select-dish-mask').eq(0).find(".set-floor-select").text($(this).text());
          _this.status.st = 0;
         _this.initData(0);
      });



      newChihuo.returnToTop();
      chihuo.imgLazyLoad();
    }
   

  });
  return RestaurantListView;
});
