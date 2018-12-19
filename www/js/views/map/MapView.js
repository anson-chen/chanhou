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
      ct: 50,
      lat: null,
      lng: null,
      swiper: null,
      slideTMOuts: []
    },
     search: {
       showPop: false,
       addr : '',
       distance : 0,
       resttype : 0,
       price : 0,
       cuisine : '',
       openhours : '',
       features : [0],
         maxmaplevel: 18,
    },

    render: function(){
      newChihuo.setPage('map');
      newChihuo.windowInit();
      this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
      if(initData.restaurantNearData.data.length == 0){
        this.initData();
        this.filter();
      }else{
        this.bindEvents();
      }       
    },

    initData: function(num,lat,lng){
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
      if(distance == 'all' && resttype == 'all' && price == 'all' && cuisine == 'all' && openhours == 'all' && features == 'All'){
          filters = '';
      }
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findNearbyRestsWithRange2.json'),
                  data: {
                     distance: 20,
                     lat: lat || newChihuo.lat,
                     lng: lng || newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: (num+1)*_this.status.ct,
                     filters: filters
                  },
                  beforeSend: function (xhr) {},
                  complete: function (xhr, status) {},
                  success: function(data){
                     if(data.status == 0){
                        if(lat || lng){
                          _this.status.sendRequest = true;
                        }
                        if(data.data.length == 0){
                          newChihuo.showPopInfo(newChihuo.localize('no_restaurants_in_slot'));
                          return;
                        } 
                        if(num == 0){
                        initData.restaurantNearData.data = [];
                        }
                        initData.restaurantNearData.data = data.data || initData.restaurantNearData.data;
                        if(newChihuo.getPage('map')){
                          _this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
                          var index = num==0 ? 0 : num*_this.status.ct;
                          _this.bindEvents(index);
                          _this.statusSave();
                          _this.status.lat = lat || newChihuo.lat;
                          _this.status.lng = lng || newChihuo.lon;
                        } 
                        
                     }
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

    showNewMap: function(event){
      var _this = this;
      event.preventDefault();
      $('.map-input').val().length && chihuo.wkAjax({
                  type: 'GET',
                  //url: newChihuo.geosrvUrl + '/search?format=json&_mtk=wk2018', // 无法跨域传cookies // "https://nominatim.openstreetmap.org/search?format=json",
                  //data: {
                  //   q: $('.map-input').val()
                  //},
                  url: WKMapBoxHelper.getGeoCoderUrl($('.map-input').val().replace(/^\s+|\s+$/g,""), 1, 3, newChihuo.lat, newChihuo.lon),
                  success: function (data) {
                      var rows = WKMapBoxHelper.parseRS(data);
                      if (rows && rows.length) {
                          _this.initData(rows[0].lat,rows[0].lon,0);
                      }
                  }
                  //success: function(data){
                  //   if(data && data.length){
                  //      _this.initData(data[0].lat,data[0].lon,0);
                  //   }
                  //}
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

    checkPosition: function(lat,lng,distance){
      var latLong = Math.abs(lat-this.status.lat);
      var lngLong = Math.abs(lng-this.status.lng);
      var distance = distance || 0.005;
      if(latLong > distance || lngLong > distance){
         return true;
      }else{
         return false;
      }

    },
      clearSlideTMOuts: function() {
          if (! this.status.slideTMOuts || this.status.slideTMOuts.length <1) {
              return;
          }
          var i;
          for (i=0; i < this.status.slideTMOuts.length; i++) {
              console.log('try to clear timeout: ' + this.status.slideTMOuts[i]);
              clearTimeout(this.status.slideTMOuts[i]);
          }
          this.status.slideTMOuts = [];
      },
    bindEvents: function(index){
      var _this = this;
      var time;
      var len = initData.restaurantNearData.data.length;
      if(len){  
      this.status.swiper =  new Swiper('#map-swiper', {   
        initialSlide:index ? index : 0,
        slidesPerView: 'auto',
        onInit: function(swiper){
            chihuo.initMapOption(initData.restaurantNearData.data);
            newChihuo.map && chihuo.initMapShow(initData.restaurantNearData.data,swiper.activeIndex);
            for (var i= 0; i< initData.restaurantNearData.data.length; i++) {
              (function(i){
                newChihuo.markerWrap[i].on('click',function(){
                _this.status.swiper.slideTo(i);
              })
              }(i)); 
            }
            // newChihuo.map && newChihuo.map.on('moveend',function(ev){
            //    clearTimeout(time);
            //   time = setTimeout(function() {    
            //     _this.status.sendRequest && _this.checkPosition(newChihuo.map.getCenter().lat,newChihuo.map.getCenter().lng) && _this.initData(newChihuo.map.getCenter().lat,newChihuo.map.getCenter().lng);
            //   },800);             
            // });

        },
        onSlideChangeStart: function(swiper){
            _this.clearSlideTMOuts();
           _this.status.sendRequest = false;
          if(len > newChihuo.markerWrap.length){
            this.onInit(swiper);
          }
          //if(swiper.activeIndex < len){
            // newChihuo.map && newChihuo.map.panTo({lat:initData.restaurantNearData.data[swiper.activeIndex].address_latitude,lng:initData.restaurantNearData.data[swiper.activeIndex].address_longitude});
            // newChihuo.map && newChihuo.markerWrap[swiper.activeIndex-1 > 0 ? swiper.activeIndex-1 : 0].setIcon(newChihuo.myIcon2);
            // newChihuo.map && newChihuo.markerWrap[swiper.activeIndex+1 < newChihuo.markerWrap.length ? swiper.activeIndex+1 : swiper.activeIndex].setIcon(newChihuo.myIcon2);
            // newChihuo.map && newChihuo.markerWrap[swiper.activeIndex].setIcon(newChihuo.myIcon1).openPopup();
            //}
            if(swiper.activeIndex < len) {
                 newChihuo.map && newChihuo.map.panTo({lat:initData.restaurantNearData.data[swiper.activeIndex].address_latitude,lng:initData.restaurantNearData.data[swiper.activeIndex].address_longitude});
                var activemarker = newChihuo.markerWrap[swiper.activeIndex];
                var parent = null;
                if (newChihuo.clusterMarkers) {
                    parent = newChihuo.clusterMarkers.getVisibleParent(activemarker);
                }
                var k;
                for (k = 0; k < newChihuo.markerWrap.length; k++) {
                    var _marker = newChihuo.markerWrap[k];
                    if (k == swiper.activeIndex) {
                        _marker.setIcon(newChihuo.myIcon1);
                        if (parent && parent === activemarker) {
                            _marker.openPopup();
                        }
                    } else {
                        _marker.setIcon(newChihuo.myIcon2);
                        _marker.closePopup();
                    }
                }
                if (parent && parent !== activemarker) {
                    if (newChihuo.clusterMarkers) {
                        parent.spiderfy();
                    }
                    var tmout1 = setTimeout(function () {// moveend event doesn't work well !!!
                        if(!activemarker.isPopupOpen()) {
                            activemarker.openPopup();
                        }
                    }, 500);
                    _this.status.slideTMOuts.push(tmout1);
                }
            }
        },
        onSlideChangeEnd: function(swiper){
          if(!_this.status.sendRequest){
              clearTimeout(time);
              _this.status.sendRequest = true;
          }
          if(swiper.activeIndex >= len-1){
            var num = Math.ceil(len/_this.status.ct);
            _this.initData(num);
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
         $(".map-mask,.search-set-fix").show();
          _this.search.showPop = true;
      });

      $(".close-map-mask").on('click',function(){
         $(".map-mask,.search-set-fix").hide();
          _this.search.showPop = false;
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
         _this.initData();
      });

    }
  });
  return MapView;
});
