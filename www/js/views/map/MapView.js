define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map/mapTemplate.html',
  'swiper'
], function($, _, Backbone, mapTemplate){

  var MapView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'submit #mapSearch':'showNewMap',
    },

    status: {
      sendRequest : true,
      st: 0,
      loading: false,
      isEnd: false,
      ct: 10
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
      newChihuo.setPage('map');
      newChihuo.windowInit();
      this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
      if(initData.restaurantNearData.data.length == 0){
        this.initData(0);
        this.filter();
      }else{
        this.bindEvents();
      }       
    },

    initData: function(lat,lng,num){
      var _this = this;
      var num = num || 0;
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
                     lat: lat || newChihuo.lat,
                     lng: lng || newChihuo.lon,
                     locale: 'en',
                     st: num*_this.status.ct+1,
                     ct: _this.status.ct,
                     filters: filters
                  },
                  beforeSend: function (xhr) {},
                  complete: function (xhr, status) {},
                  success: function(data){
                     if(data.status == 0){
                        if(lat || lng){
                          _this.status.sendRequest = true;
                        } 
                        if(num == 0){
                        initData.restaurantNearData.data = [];
                        }
                        initData.restaurantNearData.data = data.data || initData.restaurantNearData.data;
                        if(newChihuo.getPage('map')){
                          _this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
                          _this.bindEvents();
                          _this.statusSave();
                          if(data.data.length == 0){
                          newChihuo.showPopInfo('Not lucky! Restaurant not fund.');
                          }
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

    showNewMap: function(event){
      var _this = this;
      event.preventDefault();
      $('.map-input').val().length && chihuo.wkAjax({
                  type: 'GET',
                  url: "https://nominatim.openstreetmap.org/search?format=json",
                  data: {
                     q: $('.map-input').val()
                  },
                  success: function(data){
                     if(data && data.length){
                        _this.initData(data[0].lat,data[0].lon);
                     }
                  } 
              });  

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
                        newChihuo.getPage('map') && _this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
                        newChihuo.getPage('map') && _this.bindEvents();
                     }
                   }
            });  
       

    },

    bindEvents: function(){
      var _this = this;
      var time;
      if(initData.restaurantNearData.data.length){
      var swiperMap =  new Swiper('#map-swiper', {
        slidesPerView: 'auto',
        onInit: function(swiper){
            google && chihuo.initMapShow(initData.restaurantNearData.data,swiper.activeIndex);
            newChihuo.mapListener && google.maps.event.removeListener(newChihuo.mapListener);
            newChihuo.mapListener = google.maps.event.addListener(newChihuo.map,'center_changed',function(){
              clearTimeout(time);
              time = setTimeout(function() {    
                _this.status.sendRequest && _this.initData(newChihuo.map.getCenter().lat(),newChihuo.map.getCenter().lng());
              },800);
            })

        },
        onSlideChangeStart: function(swiper){
           _this.status.sendRequest = false;
          google && newChihuo.map.panTo({lat:initData.restaurantNearData.data[swiper.activeIndex].address_latitude,lng:initData.restaurantNearData.data[swiper.activeIndex].address_longitude});
          google && newChihuo.markerWrap[swiper.activeIndex-1 > 0 ? swiper.activeIndex-1 : 0].setIcon('imgs/marker.png');
          google && newChihuo.markerWrap[swiper.activeIndex+1 < newChihuo.markerWrap.length ? swiper.activeIndex+1 : swiper.activeIndex].setIcon('imgs/marker.png');
          google && newChihuo.markerWrap[swiper.activeIndex].setIcon('imgs/marker2.png');                
          google && newChihuo.infowindow.open(newChihuo.map,newChihuo.markerWrap[swiper.activeIndex]);
          google && newChihuo.infowindow.setContent(swiper.activeIndex+1+". "+ initData.restaurantNearData.data[swiper.activeIndex].rest_name);
        },
        onSlideChangeEnd: function(swiper){
          if(!_this.status.sendRequest){
              clearTimeout(time);
              _this.status.sendRequest = true;
          }
        }
      });
    }

    $(".map-input").on('focus',function(){
        _this.status.sendRequest = false;
    }).on('blur',function(){
        _this.status.sendRequest = true;
    });

      $(".map-location").on('click',function(){
        _this.initData();
      });

      $('.radius-like').each(function(){
        var num = $(this).find('span').text();
        var radialObj = radialIndicator(this, {
              barColor: '#fb560a',
              barWidth: 10,
              radius: 30,
              displayNumber: false,
              roundCorner : true
        }); 
        radialObj.animate(num); 
      });

      $(".right-set-info span").on('click',function(){
        if($(this).parent().hasClass('set-feature')){
         $(this).toggleClass('cur');
          _this.status.st = 0;
          _this.initData();
         return;
        }
        $(this).addClass('cur').siblings().removeClass('cur');
        _this.status.st = 0;
         _this.initData();

      });

      $(".clear-option").on('click',function(){
          $(".right-set-info span").removeClass('cur');
      });

      $(".hover-map").on('click',function(){
         $(".map-mask").show();
          _this.search.showPop = true;
      });

      $(".close-map-mask").on('click',function(){
         $(".map-mask").hide();
          _this.search.showPop = false;
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

    }
  });
  return MapView;
});
