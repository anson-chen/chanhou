define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map/mapSearchTemplate.html',
  'swiper'
], function($, _, Backbone, mapTemplate){

  var MapSearchView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'submit #mapSearch2':'showNewMap',
     'click #getNearby': 'showNearby'
    },

    status: {
      sendRequest : true,
      st: 0,
      loading: false,
      isEnd: false,
      ct: 100,
      lat: null,
      lng: null,
      swiper: null,
      lasttime: 0,
      longpressTMOut: 0,
      slideTMOuts:[],
        dragsearchtmout: [], // 允许试图取消拖动引发的新检索，例如在滑动下面列表时应当立即显示列表上的餐馆并取消拖动引发的检索，否则地图会有一次大幅跳动
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
         maxmaplevel: 15,  // the level when we see a restaurant marker.
         mindragdist: 300 // 触发拖动后检索的最小距离
    },
    getFullRSData: function(lat, lng) {
        var slideRestData = [{address_latitude:lat || newChihuo.lat, address_longitude: lng || newChihuo.lon, rest_name: 'Swipe to the left', cuisine_type: 'Show restaurant information'}];
        slideRestData.push.apply(slideRestData, initData.restaurantNearData.data);
        return {data: slideRestData, filterData:initData.restaurantNearData.filterData };
    },
    render: function(){
      newChihuo.setPage('mapSearch');
      newChihuo.windowInit();
        this.$el.html(_.template(mapTemplate, this.getFullRSData()));
      //this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
      if(initData.restaurantNearData.data.length == 0){
          console.log('render init');
        this.initData(0);
        this.filter();
      }else{
        this.bindEvents();
      }       
    },
    showNearby: function(){
      if(newChihuo.maplastcenter){
        var lat = newChihuo.maplastcenter.lat || newChihuo.lat;
        var lng = newChihuo.maplastcenter.lng || newChihuo.lon;
        //console.log(lat,lng);
          app_router.navigate('restaurantNear/'+lat+'/'+lng,{
                  trigger: true
                });
      }else{
          app_router.navigate('restaurantNear',{
                  trigger: true
                });
      }
    },
    initData: function(number,lat,lng){
      var _this = this;
      var num = number || 0;
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
      //console.log(_this.search);
      var filters = 'addr:'+ addr +',distance:'+ distance +',resttype:'+ resttype +',price:'+ price +',cuisine:'+ cuisine +',openhours:'+ openhours +',features:'+features;
      if(chihuo.setSearch){
        filters = chihuo.setSearch;
        chihuo.setSearch = null;
      }
      if(distance == 'all' && resttype == 'all' && price == 'all' && cuisine == 'all' && openhours == 'all' && features == 'All'){
          filters = '';
      }
        //console.log('>>>>[' + (lat || newChihuo.lat) + ',' + (lng || newChihuo.lon) + ']');
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
                        if(data.data.length == 0){
                          newChihuo.showPopInfo(newChihuo.localize('no_restaurants_in_slot'));
                          return;
                        } 
                        if(num == 0){
                        initData.restaurantNearData.data = [];
                        }
                        initData.restaurantNearData.data = data.data || initData.restaurantNearData.data;
                        if(newChihuo.getPage('mapSearch')){
                          _this.$el.html(_.template(mapTemplate,_this.getFullRSData(lat, lng)));
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
      gotoLoction: function(lat, lon) {
          this.rmDragSearchAction();
          //console.log('goto [' + lat + ', ' + lon + ']');
          newChihuo.map && newChihuo.map.panTo(new L.LatLng(lat, lon));
      },
    showNewMap: function(event){
      var _this = this;
      event.preventDefault();
        var keywords = $('.map-input').val();
        if (keywords && keywords.replace(/^\s+|\s+$/g,"").length > 1) {
            wkActionHelper.doLast('map-search-input.geosearch', function () {
                chihuo.wkAjax({
                    type: 'GET',
                    //url: newChihuo.geosrvUrl + '/search?format=json&_mtk=wk2018', // 无法跨域传cookies // "https://nominatim.openstreetmap.org/search?format=json",
                    //data: {
                    //    q: $('.map-input').val().replace(/^\s+|\s+$/g,"")
                    //},
                    url: WKMapBoxHelper.getGeoCoderUrl($('.map-input').val().replace(/^\s+|\s+$/g,""), 1, 3, newChihuo.lat, newChihuo.lon),
                    success: function (data) {
                        var rows = WKMapBoxHelper.parseRS(data);
                        if (rows && rows.length) {
                        //if (data && data.length) {
                            var html = '';
                            var count = 0;
                            //for (var i = 0; i < data.length; i++) {
                            for (var i = 0; i < rows.length; i++) {
                                var row = rows[i];
                                if (! row || !row.hasOwnProperty('display_name') || !row.hasOwnProperty('lat') || !row.hasOwnProperty('lon')) {
                                    console.error('content error in geo search result.');
                                    //console.log(row);
                                    continue;
                                }
                                count = count + 1;
                                html += '<li class="map-search-geors" lat="' + row.lat + '" lon="' + row.lon + '"><a><em>' + row.display_name + '</em><span>' + '</span></a></li>';
                            }
                            if (count > 0) {
                                html = '<div style="padding-left: 10px;">Found  ' + count + ' place(s)</div>' + html;
                                $('.map-search-show').show().find('ul.map-geo-result').html(html);
                                $('.map-location').hide();
                                $('.map-search-show').find('ul.map-geo-result').ready(function() {
                                    //console.log('ul.map-geo-result ready');
                                    $('li.map-search-geors').click(function(e) {
                                        //console.log(e);
                                        //console.log(e.target);
                                        //console.log(this);
                                        var lat = $(this).attr('lat');
                                        var lon = $(this).attr('lon');
                                        lat && lon && _this.gotoLoction(lat, lon);
                                        _this.doSearchAction(200);
                                        $('.map-search-show').hide();
                                        $('.map-location').show();
                                    });
                                });
                            } else {
                                $('.map-search-show').show().find('ul.map-geo-result').html('<li><p style="text-align:center;">no result</p></li>');
                                $('.map-location').hide();
                            }
                            //_this.initData(data[0].lat,data[0].lon,0);
                        } else {
                            $('.map-search-show').show().find('ul.map-geo-result').html('<li><p style="text-align:center;">no result</p></li>');
                            $('.map-location').hide();
                        }
                    }
                });
            }, 100);
            wkActionHelper.doLast('map-search-input.nearbyrest', function () {
                chihuo.wkAjax({
                    type: 'GET',
                    url: chihuo.getApiUri('findRestDetailByName2.json'),  //'getRestByName.json'),
                    data: {
                        restname: $('.map-input').val().replace(/^\s+|\s+$/g,""),
                        lat: newChihuo.lat,
                        lng: newChihuo.lon,
                        locale: 'en',
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data && data.hasOwnProperty('data') && data['data'] && data['data'].length) {
                            //console.log(data['data']);
                            var html = ''; //;
                            var count = 0;
                            for (var i = 0; i < data['data'].length; i++) {
                                var row = data['data'][i];
                                if (! row || !row.hasOwnProperty('rest_name') || !row.hasOwnProperty('address') || !row.hasOwnProperty('address_latitude') || !row.hasOwnProperty('address_longitude')) {
                                    console.error('content error in geo search result.');
                                    //console.log(row);
                                    continue;
                                }
                                count = count + 1;
                                html += '<li class="map-search-restrs" lat="' + row.address_latitude + '" lon="' + row.address_longitude + '"><a><em>' + row.rest_name + ': ' + '</em><em style="padding-left: 4px;">'  + row.address + '</em></a></li>';
                                //html += '<li><a href="#restaurantList/' + encodeURIComponent(row.rest_name) + '"><em>' + row.rest_name + ': ' + '</em><em style="padding-left: 4px;">'  + row.address + '</em></a></li>';
                            }
                            if (count > 0) {
                                html = '<div style="padding-left: 10px;">Found  ' + count + ' restaurant(s) with address(es)</div>' + html;
                                $('.map-search-show').show().find('ul.map-rest-result').html(html);
                                $('.map-location').hide();
                                $('.map-search-show').find('ul.map-rest-result').ready(function() {
                                    //console.log('map-rest-result ready');
                                    $('li.map-search-restrs').click(function(e) {
                                        //console.log(e);
                                        //console.log(e.target);
                                        //console.log(this);
                                        var lat = $(this).attr('lat');
                                        var lon = $(this).attr('lon');
                                        lat && lon && _this.gotoLoction(lat, lon);
                                        _this.doSearchAction(200);
                                        $('.map-search-show').hide();
                                        $('.map-location').show();
                                    });
                                });
                            } else {
                                $('.map-search-show').show().find('ul.map-rest-result').html('<li><p style="text-align:center;"></p></li>');
                                $('.map-location').hide();
                            }
                            //_this.initData(data[0].lat,data[0].lon,0);
                        } else {
                            $('.map-search-show').show().find('ul.map-rest-result').html('<li><p style="text-align:center;"></p></li>');
                            $('.map-location').hide();
                        }
                    }
                });
            }, 100);
        } else {
            $('.map-search-show').hide();
            $('.map-location').show();
        }
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
                         newChihuo.getPage('mapSearch') && _this.$el.html(_.template(mapTemplate,_this.getFullRSData()));
                        //newChihuo.getPage('mapSearch') && _this.$el.html(_.template(mapTemplate,initData.restaurantNearData));
                        newChihuo.getPage('mapSearch') && _this.bindEvents();
                     }
                   }
            });  
    },

    checkPosition: function(lat,lng,distance){
        var _dis = distance || 100;
        return WKMapShouldQuery([this.status.lat, this.status.lng], [lat, lng], _dis);
    },
      doSearchAction: function(tmout) {
          var _this = this;
          //var time;
          _this.status.sendRequest = true;
          return wkActionHelper.doLast('mapsearch.dragend.event', function(ev){
              if (newChihuo.map) {
                  newChihuo.maplastcenter = newChihuo.map.getCenter();
                  newChihuo.maplastlevel = newChihuo.map.getZoom();
                  //console.log('set last map center >>>');
                  //console.log(newChihuo.maplastcenter);
              }
              clearTimeout(_this.status.lasttime);
              _this.status.lasttime = setTimeout(function() {
                  //var queryCenter = newChihuo.curQueryCenterPoint;
                  //_this.status.sendRequest && _this.checkPosition(queryCenter.lat || newChihuo.map.getCenter().lat, queryCenter.lng || newChihuo.map.getCenter().lng) && _this.initData(0, queryCenter.lat || newChihuo.map.getCenter().lat, queryCenter.lng || newChihuo.map.getCenter().lng);
                  _this.status.sendRequest && _this.checkPosition(newChihuo.map.getCenter().lat, newChihuo.map.getCenter().lng) && _this.initData(0, newChihuo.map.getCenter().lat, newChihuo.map.getCenter().lng);
              },100);
          }, tmout || 500);
      },
      showTargetIcon: function(popinfo) {
          var _this = this;
          chihuo.setQueryCenterMarker(function(querypoint) {
              //console.log(querypoint);
              querypoint && _this.gotoLoction(querypoint.lat, querypoint.lng);
              querypoint && _this.doSearchAction(10);
              // 因这里没有传入地点参数，一般情况下将会以中心点为检索点，
              // 但因为何时点这个marker是不确定，也许当点它的时候，它已经不在中心位，这时会有不一致情况，所以上面要加gotolocation
          }, null, popinfo);  // 这里设null意味着将在当前的地图点上放新检索标记
      },
      rmDragSearchAction: function() {
          if (! this.status.dragsearchtmout || this.status.dragsearchtmout.length <1) {
              return;
          }
          var i;
          for (i=0; i < this.status.dragsearchtmout.length; i++) {
              console.log('try to clear timeout: ' + this.status.dragsearchtmout[i]);
              this.status.dragsearchtmout[i] && this.status.dragsearchtmout[i] > 0 && clearTimeout(this.status.dragsearchtmout[i]);
          }
          this.status.dragsearchtmout = [];
          chihuo.rmNewCenterMarker();
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
        var len = initData.restaurantNearData.data.length;
        // 实际len是wrap数据的维度，因wrap数组只有map初始化后才有，将在具体事件一开始时重写为wrap的维度
        if(len){
            this.status.swiper =  new Swiper('#map-swiper', {
        initialSlide:index ? index : 0,
        slidesPerView: 'auto',
        onInit: function(swiper){
            var center = newChihuo.maplastcenter || [newChihuo.lat, newChihuo.lon];
            //console.log('last map center >>>');
            //console.log(center);
            chihuo.initMapOption(initData.restaurantNearData.data, center);
            //console.log(swiper.activeIndex)
            newChihuo.map && chihuo.initMapShow2(initData.restaurantNearData.data,swiper.activeIndex);
            //for (var i= 0; i< initData.restaurantNearData.data.length; i++) {
            for (var i= 0; i< newChihuo.markerWrap2.length; i++) {
                (function(i){
                    newChihuo.markerWrap2[i].on('click',function(){
                        _this.status.swiper.slideTo(i);
                        if (i === 0) {
                            chihuo.mapFitBounds(newChihuo.markerWrap2);
                        }
                    })
                }(i));
            }
            newChihuo.map && newChihuo.map.on('zoomend',function(ev) {
                newChihuo.maplastlevel = newChihuo.map.getZoom();
            });
            newChihuo.map && newChihuo.map.on('dragstart',function(ev) {
                _this.rmDragSearchAction();
            });
            newChihuo.map && newChihuo.map.on('movestart',function(ev) {
                //chihuo.rmNewCenterMarker();
                _this.rmDragSearchAction();
            });
            newChihuo.map && newChihuo.map.on('dragend',function(ev) {
                //_this.doSearchAction(300);
                _this.rmDragSearchAction();
                if (newChihuo.map && _this.checkPosition(newChihuo.map.getCenter().lat,newChihuo.map.getCenter().lng,_this.search.mindragdist)) {
                    var tmout1 =wkActionHelper.doLast('dragend.putnewcentermarker',function() {
                        _this.showTargetIcon('Hold 3 seconds & start new search...');
                        setTimeout(function(){ // 不管怎样1秒后清理searching图标
                            chihuo.rmNewCenterMarker();
                        }, 1000);
                        var tmout2 = wkActionHelper.doLast('dragend.dosearch',function() {
                            _this.showTargetIcon('Searching...');
                            _this.doSearchAction(10);
                        }, 3000);
                        _this.status.dragsearchtmout.push(tmout2);
                    }, 1500);
                    _this.status.dragsearchtmout.push(tmout1);
                }
            });
            var doPressStart = function (ev) {
                var newsearchpoint = ev.latlng;
                if (newsearchpoint) {
                    _this.status.longpressTMOut = setTimeout(function(){
                        chihuo.setQueryCenterMarker(null, newsearchpoint, 'Searching here...');
                        newChihuo.maplastcenter = newsearchpoint;
                        _this.initData(0, newsearchpoint.lat,newsearchpoint.lng)
                    }, 3000);
                }
            }
            newChihuo.map && newChihuo.map.on('mousedown',function(ev) {
                wkActionHelper.doFirst('map.press.start', function() {
                    doPressStart(ev);
                }, 200);
            });
            // leaflet 1.3.3 已经包含了need https://github.com/lee101/Leaflet/blob/add-mobile-touch-events/src/map/handler/Map.Tap.js
            newChihuo.map && newChihuo.map.on('touchstart',function(ev) {
                wkActionHelper.doFirst('map.press.start', function() {
                    doPressStart(ev);
                }, 200);
            });

            var doPressEnd = function(ev) {
                clearTimeout(_this.status.longpressTMOut);
            }
            newChihuo.map && newChihuo.map.on('mouseup',function(ev) {
                wkActionHelper.doFirst('map.press.end', function() {
                    doPressEnd(ev);
                }, 200);
            });
            newChihuo.map && newChihuo.map.on('touchend',function(ev) {
                wkActionHelper.doFirst('map.press.end', function() {
                    doPressEnd(ev);
                }, 200);
            });
        },
        onSlideChangeStart: function(swiper){
            _this.rmDragSearchAction();
            // 必须清除拖动引起的延迟检索，否则因地图中间有过移动中心会混乱
            _this.clearSlideTMOuts();
            len = newChihuo.markerWrap2.length;
            chihuo.rmNewCenterMarker();
            //console.log(newChihuo.map.getZoom());
            if (!newChihuo.map) {
                return;
            }
            console.log(swiper.activeIndex);
           _this.status.sendRequest = false;
            if(len > newChihuo.markerWrap2.length){
                this.onInit(swiper);
            }
            if(swiper.activeIndex < len) {
                var activemarker = newChihuo.markerWrap2[swiper.activeIndex];
                var activelnglon = activemarker.getLatLng();
                if(swiper.activeIndex === 0) {
                    chihuo.mapFitBounds(newChihuo.markerWrap2);
                    return;
                }
                var k;
                for (k = 0; k < newChihuo.markerWrap2.length; k++) {
                    if (k === 0) {
                        continue;
                    }
                    var _marker = newChihuo.markerWrap2[k];
                    if (k == swiper.activeIndex) {
                        _marker.setIcon(newChihuo.myIcon1);
                        if (newChihuo.map && newChihuo.map.getZoom() !== _this.search.maxmaplevel) {
                            setTimeout(function(){
                                _marker.closePopup();
                                console.log('close popup............ getZoom: ' + newChihuo.map.getZoom());
                            }, 0);
                        } else {
                            _marker.openPopup();
                        }
                    } else {
                        _marker.setIcon(newChihuo.myIcon2);
                        _marker.closePopup();
                    }
                }
                var tmout1, tmout2, tmout3, tmout4;
                tmout1 = setTimeout(function () {
                    //if (newChihuo.map && newChihuo.map.getZoom() !== _this.search.maxmaplevel) {
                    //    newChihuo.map && newChihuo.map.setZoom(_this.search.maxmaplevel); // so far this is the best way!
                    //    newChihuo.map && newChihuo.map.panTo(activelnglon);
                    //}
                    newChihuo.map && newChihuo.map.panTo(activelnglon);
                    tmout2 = setTimeout(function () {
                        //newChihuo.map && newChihuo.map.panTo(activelnglon);
                        //console.log('Panto >>>>>');
                        //console.log(activelnglon);
                        var parent = newChihuo.clusterMarkers.getVisibleParent(activemarker);
                        if (parent && parent === activemarker) {
                            if(!activemarker.isPopupOpen()) {
                                activemarker.openPopup();
                            }
                            return;
                        }
                        tmout3 = setTimeout(function () {// moveend event doesn't work well !!!
                            if (newChihuo.clusterMarkers) {
                                var parent = newChihuo.clusterMarkers.getVisibleParent(activemarker);
                                if (parent && parent !== activemarker) {
                                    parent.spiderfy();
                                }
                            }
                            tmout4 = setTimeout(function () {
                                if(!activemarker.isPopupOpen()) {
                                    activemarker.openPopup();
                                }
                            }, 800);
                            _this.status.slideTMOuts.push(tmout4);
                        }, 200);
                        _this.status.slideTMOuts.push(tmout3);
                    }, 1000);  // 如果为500有可能出现在小图时展开聚类再点小marker时，放大变中心后丢icon的情况
                    _this.status.slideTMOuts.push(tmout2);
                }, 800);
                _this.status.slideTMOuts.push(tmout1);
            }
        },
        onSlideChangeEnd: function(swiper){
        }
      });
    }

    $(".map-input").on('focus',function(){
        console.log('map-input >>> onfocus');
        _this.status.sendRequest = false;
    }).on('blur',function(){
        _this.status.sendRequest = true;
    });
        $(".map-input").on('keyup',function(e){
            console.log('keyup >>>  ' + $('.map-input').val());
            wkActionHelper.doLast('map-search-input.onkeyup', function(){
                _this.showNewMap(e);
                console.log('searching ' + $('.map-input').val());
            }, 1200);
        });

      $(".map-location").on('click',function(){
        //_this.initData();
          _this.gotoLoction(newChihuo.lat, newChihuo.lon);
          _this.doSearchAction(200);
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
          //_this.initData();
            console.log('right-set-info');
            //var queryCenter = newChihuo.curQueryCenterPoint;
            //_this.initData(0, queryCenter.lat || newChihuo.map.getCenter().lat, queryCenter.lng || newChihuo.map.getCenter().lng);
            // console.log([_this.status.lat, _this.status.lng]);
            _this.initData(0, _this.status.lat, _this.status.lng);
         return;
        }
        $(this).addClass('cur').siblings().removeClass('cur');
        _this.status.st = 0;
         //_this.initData();
          console.log('cur..');
          //var queryCenter = newChihuo.curQueryCenterPoint;
          //console.log(queryCenter);
          //_this.initData(0, queryCenter.lat || newChihuo.map.getCenter().lat, queryCenter.lng || newChihuo.map.getCenter().lng);
          //console.log([_this.status.lat, _this.status.lng]);
          _this.initData(0, _this.status.lat, _this.status.lng);
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
         //_this.initData();
           console.log('select-dish-mask..');
           //var queryCenter = newChihuo.curQueryCenterPoint;
           //_this.initData(0, queryCenter.lat || newChihuo.map.getCenter().lat, queryCenter.lng || newChihuo.map.getCenter().lng);
           //console.log([_this.status.lat, _this.status.lng]);
           _this.initData(0, _this.status.lat, _this.status.lng);
      });
        $('.value-close').on('click',function(){
            $('.map-search-show').hide();
            $('.map-location').show();
        });

    }
  });
  return MapSearchView;
});
