var newChihuo = {
    address: 0 ? "http://staging.wookongcorp.com:9099" : "http://staging.wookongcorp.com",
    appname: "wkfdmk",
    textShowLength: 80,
    showMorePara: function(str, kind){
       if(str && str.length && str.length > this.textShowLength ){
        if(kind == 2){
            return str.slice(0,this.textShowLength)+'<b>'+str.slice(this.textShowLength)+'</b><span>... ...全文</span>&nbsp;&nbsp;';
        }else{
         return str.slice(0,this.textShowLength)+'<b>'+str.slice(this.textShowLength)+'</b><span>... ...更多</span>&nbsp;&nbsp;';
        }
       }else{
        return str;
       }
    },
    showPopInfo: function(info, time, cb){ 
       var pop = $('#popInfo');
       var time = time || 2000;
       pop.html(info).addClass('pop-info-show');
       setTimeout( function(){
           pop.removeClass('pop-info-show').html('');
           cb && cb();
       },time);
    },
    errorPopInfo: function(func){
       var pop = $('#popInfo');
       var info ='<p>网络错误！请刷新尝试</p><div class="error-pop"><span class="close-pop">关闭</span><span class="refresh">刷新</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           func && func();
       });
    },
    windowInit: function(distance){
      var distance = distance || 0;
      window && window.scrollTo(0,distance);
      window && $(window).off('scroll');

    },
    returnToTop: function(){
      $('.return-top-icon').off('click').on('click',function(){
         $('html,body').animate({scrollTop: 0},500);
      });
    },
    setPage: function(page){
      $('#page').attr('cur-page',page);
    },
    getPage: function(curPage){
      return curPage == $('#page').attr('cur-page');
    },
    welcome: function(customer){
      var hour = new Date().getHours();
      var tips = '';
      if(hour >=6 && hour <=11){
        tips = 'Good morning,'+ customer;
      }else if( hour >11 && hour < 18){
        tips = 'Good afternoon,'+ customer;
      }else{
        tips = 'Good evening,'+ customer;
      }
      return tips;
    },
    localize: function(id,key){
      var obj = chihuoLocal;
      var locale = newChihuo.locale;
      if(obj && obj[id]){

        if(key && obj[id][key]){
          return obj[id][key];
        }

       return obj[id][locale] ? obj[id][locale] : obj[id]['en-CA'];

      }
      return '';
    },
    setLocalStorage: function(key,info){
      localStorage && localStorage.setItem(key, info);
    },
    getLocalStorage: function(key){
      return localStorage && localStorage.getItem(key);
    },
    removeLocalStorage: function(key){
      localStorage && localStorage.removeItem(key);
    },
    checkPermission: function(){
      var customer = newChihuo.getLocalStorage('customer_id');
      if(!customer){
        var check = confirm('please login in first');
        if(check){
          app_router.navigate('login',{
                  trigger: true
                });
        }else{
          return false;
        }
      }else{
        return true;
      } 
    },
    tpLogin: function(uid){
      if(uid && uid.sub){
        var utp = uid.sub.indexOf('facebook') >= 0 ? 1 : 0;
            utp = uid.sub.indexOf('linkedin') >= 0 ? 2 : 0;
      }
       uid && uid.sub && chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('tpLogin.json'),
          data:{
            uid: uid.sub,
            utp: utp ,// 1 :fb,2：linkin
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if (data.status == 0) {
              if(data.data[0].status_code == 0){
                newChihuo.showPopInfo("第三方登录成功",1200);
                newChihuo.customerId = data.data[0].customer_id;
                newChihuo.setLocalStorage('customer_id',newChihuo.customerId);
              }else{
               newChihuo.showPopInfo("第三方登录失败",1200);
              }
            }
          },
          error: function () {

          }
        });
    },
    locale: 'en-CA',
    motionStatus: false,
    shakeTrigger: 1,
    lat: null || 43.8145412 ,//多伦多数据测试 43.8145412
    lon: null || -79.2972919,  //-79.2972919,
    debug: 1,
    city: null,
    localCity: null,
    msg: 0,
    time: null,
    longSpeed: 1000*20,
    shortSpeed: 1000*3,
    map: null,
    mapListener: null,
    positionSpeed: 1000*60,
    globalStatus: false,
    positionTime: null,
    positionChanged: false,
    customerId: null,
    customer: '' || 'friend',
    msgList:{},
    lock: null,
};
//静态资源路径
var staticSource = {
  restIcon1 : 'imgs/rest-s1.png',
  restIcon2 : 'imgs/rest-s2.png',
  restIcon3 : 'imgs/fav-rest.png',
  restIcon4 : 'imgs/fav-rest2.png'
};
//初始数据
var initData = {
  homeData: {
    cityData: [{cityname:''}],
    detailData: null
  },//首页数据
  restaurantData: {
    data: [],
    id: null,
    photoUrl: null
  },//餐馆详情数据
  foodData: {
    data: [],
    id: null
  },//菜肴详情数据
  restaurantNearData: {
    data: [],
    lat: null,
    lon: null,
    filterData: []
  },//附近数据
  restaurantListData: {
    data: [],
    city: null,
    name: null
  },//餐馆列表数据
  myMessage2Data: {
    data: []
  },//动态数据
  myMessageData: {
    data: []
  },//动态数据
  searchInit2Data: {
    restHot: [],
    restHis: [],
    miHis: [],
    miHot: []
  },
  chatAddData:{
    data:[]
  },
  chatChooseData:{
    data:[]
  },
  chatContentData:{
    hisData:[],
    name:'',
    custId:null,
    sendData:[]
  },//
  foodMenuData:{
    data: [],
    title: '美食菜单'
  },//美食菜单
  myFansData: {
    data: []
  },//我的粉丝数据
  mapData: {
    data: [],
    filterData: []
  },//附近餐馆地图数据
  searchSetData: {
    data: []
  },//
  myHistoryData: {
    data: []
  },
  myShakeData: {
    data: []
  },
  searchHotData: {
    data: []
  },
  mySignInData:{
    restData: [],
    miData: []
  },
  myWishData:{
    restData: [],
    miData: []
  },
  myCommentsData:{
    restData: [],
    miData: []
  },
  userCommentsData:{
    data:[],
    id:null
  },
  myIndexData: {
    data:[]
  },
  myProfileData: {
    data:[
     {
      profile_photo_url : '',
      display_name: ''
     }
    ]
  },
  restaurantWishesData: {
    data:[]
  },
  restaurantList2Data: {
    data:[]
  },
  cuisineListData: {
    data:[]
  },
  cityListData: {
    data:[]
  },
  myDiscountData: {
    discountData:[],
    cityData:[]
  },
   myFocusData: {
    data:[]
  },
  chatInviteData: {
    data:[]
  },
  chatRequestData: {
    data:[]
  },
  chatMessageData: {
    data:{
      id: '',
      name: '',
      src: ''
    }
  },
  myPhotosData: {
    data:[]
  },
   myLikeData: {
    data:[]
  }
};

//通用方法
var chihuo = {
  picQuality: 0.92,
  picWidth: 800,
  usrLogoWidth: 100,
  setSearch: null,
  getApiUri: function(api){
      return newChihuo.address+'/wkfdmk/v2/'+ api;
  },

  getApiUri2: function(api){
      return newChihuo.address+'/wkfdmk/'+ api;
  },

  timestampToTime: function(timestamp) {
        var now = new Date();
        var date = new Date(timestamp);
        var y = new Date(timestamp+3600*1000*24);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        if(now.valueOf() > timestamp){
           if(date.getDate() == now.getDate()){
              return 'Today';
           }
           if(y.getDate() == now.getDate()){
               return 'Yesterday';
           }
        }
        return Y+M+D;
    },

  getDate: function(time){
      var d = new Date(time);
      return (d.getHours() >=10 ? d.getHours() : '0'+d.getHours()) +':'+ (d.getMinutes()>=10 ? d.getMinutes() : '0'+d.getMinutes());
  },

  getLastTime: function(time){
      var d = new Date().getTime();
      var n;
      var s = Math.ceil((d-time)/(1000*60*60));
      if(s > 24) {
        var day = Math.ceil(s/24) > 1 ? 'days' : 'day';
         n = Math.ceil(s/24) + ' ' + (newChihuo.locale == 'en-CA' ? day : '天');
      }else{
         var h = s > 1 ? 'hours' : 'hour'
         n = s+ ' ' +(newChihuo.locale == 'en-CA' ? h : '小时');
      }
      return n;
  },

   getRightTime: function(time){
      var d = new Date().getTime();
      var n;
      var s = time ? parseInt(d-time) : 1;
      if(s > (24*1000*60*60*365)) {
         var year = Math.ceil(s/(24*1000*60*60*365)) >1 ? 'years' : 'year' ;
         n = Math.ceil(s/(24*1000*60*60*365))+ ' ' +(newChihuo.locale == 'en-CA' ? year : '年');
      }else if(s > (24*1000*60*60*30)){ 
         var month = Math.ceil(s/(24*1000*60*60*30)) > 1 ? 'months': 'month '; 
         n = Math.ceil(s/(24*1000*60*60*30))+ ' ' +(newChihuo.locale == 'en-CA' ? month : '月');
      }else if(s > (24*1000*60*60*7)){
         var week = Math.ceil(s/(24*1000*60*60*7)) > 1 ? 'weeks' : 'week';
         n = Math.ceil(s/(24*1000*60*60*7))+ ' ' +(newChihuo.locale == 'en-CA' ? week : '星期');
      }else if(s > (24*1000*60*60)){
        var day = Math.ceil(s/(24*1000*60*60))>1 ? 'days' : 'day';
         n = Math.ceil(s/(24*1000*60*60))+ ' ' +(newChihuo.locale == 'en-CA' ? day : '天');
      }else if(s > (1000*60*60)){
        var hour = Math.ceil(s/(1000*60*60)) > 1 ? 'hours' : 'hour';
         n = Math.ceil(s/(1000*60*60))+ ' ' +(newChihuo.locale == 'en-CA' ? hour : '小时');
      }else{
        var minute = Math.ceil(s/(1000*60)) > 1 ? 'minutes' : 'minute';
         n = Math.ceil(s/(1000*60))+ ' ' +(newChihuo.locale == 'en-CA' ? minute : '分钟');
      }
      return n;
  },
  
  ajaxSetup: function(){
     $.ajaxSetup({
                //发送请求前触发
                beforeSend: function (xhr) {
                    var html='<div id="maskScreen" mask="1" style="position: fixed;width: 100%; height: 100%; left: 0; top: 0; background: #000; opacity: 0.5; z-index:10000; color: #fff;"><p style="text-align: center; padding-top: 100px;">loading...</p></div>';
                    if($("#maskScreen").length){
                        var index=parseInt($("#maskScreen").attr("mask"));
                        $("#maskScreen").attr("mask",++index);
                        console.log(index);
                    }else{
                        $("body").append(html);
                    }

                },
                //完成请求后触发。即在success或error触发后触发
                complete: function (xhr, status) {
                    if($("#maskScreen").length){
                        var index=parseInt($("#maskScreen").attr("mask"));
                        $("#maskScreen").attr("mask",--index);
                        console.log(index);
                        if(index==0){
                            $("#maskScreen").remove();
                        }
                    }else{
                        $("#maskScreen").remove();
                    }
                },
                error: function(xhr){
                    newChihuo.errorPopInfo();
                }
            });

  },

  wkAjax: function(option){
      return $.ajax(option);
  },

  wkLoginPermission: function(){
      if(newChihuo.customerId || newChihuo.getLocalStorage('customer_id')){
         return true;

      }else{
       var pop = $('#popInfo');
       var info ='<p>please login in first</p><div class="error-pop"><span class="close-pop">cancel</span><span class="refresh">ok</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           app_router.navigate('login',{
                  trigger: true
                });
          //发送邮件api (todo)
       });
       return false;
      }
  },

  positionChange: function(newLat, newLon,lastLat,lastLon){
      if(newLat != lastLat || newLon != lastLon){
         newChihuo.lat = newLat;
         newChihuo.lon = newLon;
         newChihuo.positionChanged = true;
         return true;
      }else{
        newChihuo.positionChanged= false;
        return false;
      }
      
  },


  getPosition: function(template){
    document.addEventListener("deviceready", onDeviceReady, false);
    if(newChihuo.debug){
        chihuo.openStreetMap(newChihuo.lat,newChihuo.lon,template);
      }
   
    //device APIs are available
    function onDeviceReady() {  
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        clearInterval(newChihuo.positionTime);
        newChihuo.positionTime = setInterval(function(){navigator.geolocation.getCurrentPosition(onSuccess, onError)},newChihuo.positionSpeed);          
    }
    // onSuccess Geolocation
    function onSuccess(position) {
      var newLat = position.coords.latitude;
      var newLon = position.coords.longitude;
      var change = chihuo.positionChange(newLat, newLon,newChihuo.lat,newChihuo.lon);
      if(change){
        chihuo.openStreetMap(newChihuo.lat,newChihuo.lon,template);
      }
      if(!change && newChihuo.localCity && newChihuo.localCity != newChihuo.city){
        chihuo.openStreetMap(newChihuo.lat,newChihuo.lon,template);
      }
    }          
             

    // onError Callback receives a PositionError object
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
     
  },

  openStreetMap: function(lat, lon, template){
    var _this = this;
      if(lat && lon){
        $.ajax({
          type: 'GET',
          url: 'https://nominatim.openstreetmap.org/reverse?format=xml&zoom=18&addressdetails=1&format=json',
          data:{
              lat: lat,
              lon: lon
          },
          beforeSend:function(){},
          complete: function (xhr, status) {},
          success: function (data) { 
              newLocation = data.address.city || data.address.state_district || 'toronto';
              newChihuo.localCity = newLocation;
               if(newChihuo.city != newChihuo.localCity){

                if(newChihuo.city){
                 newChihuo.getPage('home') && newChihuo.showPopInfo('检测到城市变化，即将为您更新当前城市数据');
                }
                if(newChihuo.getPage('home')){
                  newChihuo.city = newLocation;
                } 
                //后期优化添加界面和数据符合才渲染模板
                newChihuo.getPage('home') && chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
                newChihuo.getPage('home') && chihuo.findHotspotDetails(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
               }
              
            },
          error: function () {
              newChihuo.errorPopInfo(function(){chihuo.openStreetMap(lat, lon, template)});
              // chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
              // chihuo.findHotspotDetails('toronto',newChihuo.lat,newChihuo.lon,template);
          }
        })
      }
  },

  findAllCities: function(city,lat,lon,template){
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findAllCities.json'),
                  data: {
                     city: city,
                     lat: lat,
                     lng: lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.homeData.cityData = data.data;
                        newChihuo.getPage('home') && $("#page").html(_.template(template,initData.homeData)); 
                     }
                  } 
              });        
  },

  findHotspotDetails: function(city,lat,lon,template){
                chihuo.wkAjax({
                            type: 'GET',
                            url: chihuo.getApiUri('findHotspotDetails.json'),
                            data: {
                               city: city,
                               lat: lat,
                               lng: lon,
                               locale: 'en'
                            },
                            success: function(data){
                               if(data.status == 0){
                                if(data.data && data.data.length){
                                  initData.homeData.detailData = chihuo.dealData(data.data,'categoryid');
                                }else{
                                  newChihuo.popInfo('查询结果为空，为您显示多伦多的数据');
                                  initData.homeData.cityData[0].cityname = 'toronto';
                                  chihuo.findHotspotDetails('toronto',lat,lon,template);
                                }
                                  initData.homeData.detailData = chihuo.dealData(data.data,'categoryid');
                                  console.log(initData.homeData.detailData);
                                  newChihuo.getPage('home') && $("#page").html(_.template(template, initData.homeData));
                               }
                            }

                        });
  },
  getMsgNum: function(){
            (newChihuo.customerId || newChihuo.getLocalStorage('customer_id')) 
            && chihuo.wkAjax({
                            type: 'GET',
                            url: chihuo.getApiUri2('msgver.json'),
                            data: {
                               custId: newChihuo.customerId || newChihuo.getLocalStorage('customer_id')
                            },
                            beforeSend: function (xhr) {},
                           //完成请求后触发。即在success或error触发后触发
                            complete: function (xhr, status) {},
                            success: function(data){
                              
                               if(data.pp){
                                 var msg = data.pp['1'];
                                 msg && msg.length && $.each( msg, function(index,value){
                                     newChihuo.msg += parseInt(value['v']);
                                     if(newChihuo.msgList.hasOwnProperty(value['s'])){
                                      newChihuo.msgList[value['s']] += parseInt(value['v']);
                                     }else{
                                      newChihuo.msgList[value['s']] = parseInt(value['v']);
                                     }
                                

                                 });
                                 if(newChihuo.msg > 0){
                                  $('#msgRemind').addClass('message-remind').click(function(){
                                         $('#msgRemind').removeClass('message-remind');
                                         newChihuo.msg = 0;
                                    });
                                  }

                                 }
                              
                            },
                            error: function(xhr){
                                // newChihuo.errorPopInfo();
                            }

                        });

  },
  setMsgRemind: function(id){
    if(newChihuo.msgList.hasOwnProperty(id)){
       return true;
    }else{
      return false;
    } 
  },

  deleteMsgRemind: function(id){
    if(newChihuo.msgList.hasOwnProperty(id) && newChihuo.getPage('chatContent')){
       delete newChihuo.msgList[id];
    }else{
       return;
    } 
  },

  dealData: function(data,status){
      var len = data.length;
      var  k  = -1;
      var  j;
      var menu = [];
      if(len){
        for(var i = 0; i < len; i++ ){
          if( j == data[i][status]){
             menu[k].push(data[i]);
          }else{
              k++;
              j = data[i][status];
              menu[k] = [];
              menu[k].push(data[i]);

          }
        }
      }
      return menu;
  },

  sortBy: function(attr){
    return function(o,p){
       var a, b;
       if (typeof o === "object" && typeof p === "object" && o && p) {
         a = o[attr];
         b = p[attr];
         if (a === b) {
           return 0;
         }
         
         if (typeof a === "string" && a.indexOf('$') >= 0 && b.indexOf('$') >= 0){
           return  a.length < b.length ? -1 : 1;
         }
         if (parseFloat(a) != null && parseFloat(b) != null){
           return  parseFloat(a) < parseFloat(b) ? -1 : 1;
         }
         
       }
       else {
         return 0;
       }
 
    }

  },

  sortData: function(data, attr, query){
      var data = data || [];
      var attr = attr || '';
      var query = query || 'asc';
      if(data && data.length){
        if(query == 'asc'){
          data.sort(this.sortBy(attr));
        }
        else{
          data.sort(this.sortBy(attr)).reverse();
        }
      }
      console.log(data);
      return data;
  },

  beginSort(index,obj,data,like,price,distance){
    var query = $(obj).hasClass('toggle') ? 'asc' : 'desc';
      if(index == 0){
          $('.rank-ul li').eq(1).removeClass('cur toggle');
          $('.rank-ul li').eq(2).removeClass('cur toggle');
          chihuo.sortData(data,like,query); 
        }else if(index == 1){
          $('.rank-ul li').eq(0).removeClass('cur toggle');
          $('.rank-ul li').eq(2).removeClass('cur toggle');
          chihuo.sortData(data,price,query); 
        }else{
          $('.rank-ul li').eq(1).removeClass('cur toggle');
          $('.rank-ul li').eq(0).removeClass('cur toggle');
          chihuo.sortData(data,distance,query); 
        }
    return data;    
  },

   sortAll: function(index,toggle,template,data,obj){
      obj.$el.html(_.template(template,data));
      obj.bindEvents();
      $('.rank-ul li').removeClass('cur toggle').eq(index).addClass('cur toggle');
      if( !toggle ){
         $('.rank-ul li').eq(index).removeClass('toggle');
      }
    },

  initMapShow: function(mapData,index){
    newChihuo.infowindow = null;
    newChihuo.markerWrap = [];
    function setMapMarker(data,index){
      var mapOpt = {
      center:new google.maps.LatLng(data[index].address_latitude,data[index].address_longitude),
      zoom:16,
      mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      newChihuo.map = new google.maps.Map(document.getElementById("googleMap"),mapOpt);
     
      function createMarker(point,query) {
             var marker = new google.maps.Marker({
              position:point,
              icon: query == index ? 'imgs/marker2.png' : 'imgs/marker.png'
             });
              marker.setMap(newChihuo.map);
              newChihuo.markerWrap.push(marker);
              if(query == index){
                newChihuo.infowindow = new google.maps.InfoWindow({
                  content:index+1+'. '+data[query].rest_name
                  });
                newChihuo.infowindow.open(newChihuo.map,marker);
              }
                return marker;
      }

      for (var i= 0; i< data.length; i++) {
      var point= new google.maps.LatLng(mapData[i].address_latitude,mapData[i].address_longitude);
        createMarker(point,i);
      }  
    }
    if(mapData && mapData.length){
      setMapMarker(mapData,index);
    }
  }, 

  WKPicCompress:  function(img, fileType,w,h,q,cv) {
    var canvas;
    //if(!cv) {
    //    canvas = cv;
    //} else {
    //    canvas = document.createElement("canvas");
    //}
    canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    var width = w;//img.width;
    var height = h;//width * img.height / img.width;

    canvas.width = width;
    canvas.height = height;


    ctx.drawImage(img, 0, 0, width, height);

    // 压缩
    var base64data = canvas.toDataURL(fileType, q);

    var initSize = img.src.length;
    //wkapp160922  console.log('压缩前：', initSize);
    //wkapp160922  console.log('压缩后：', base64data.length);
    //wkapp160922  console.log('压缩率：', 100 * (initSize - base64data.length) / initSize, "%");

    canvas = ctx = null;

    return base64data;

  },

  imgstrupload: function() { 

    return "http://staging.wookongcorp.com/wkfdmk/imagestrupload.j";
  },

  uploadusrphotostr: function() { 
    return this.getApiUri2() + "/upload_user_photostr.json";
  }

}

var photoUse={
    bindEvents: function(cb){
      $('.photo-select-wrap').addClass('show-photo-select');
      $('.photo-action1').on('click',function(){
        photoUse.init(cb);
        $('.photo-select-wrap').toggleClass('show-photo-select');
      });

       $('.photo-action2').on('click',function(){
        photoUse.doUploadPhoto(cb);
        $('.photo-select-wrap').toggleClass('show-photo-select');
      });

    },
     doUploadPhoto: function(cb) {
        var formSelector = "#usr-formPhoto";
        if (!document.getElementById('usrFile')) {
          $(formSelector).append("<input id='usrFile' type='file' name='file' accept='image/*'/>").find("input").click();
        } else {
          $(formSelector).find("input").click();
        }
        var filechooser = document.getElementById('usrFile');
        filechooser.onchange = function () {
          var files = this.files;
          var file = files[0];

          if(!file || $.trim(file.name).length == 0) {
            $(formSelector + " input").remove();
            return;
          }

          if(!($.trim(file.name).toLowerCase().indexOf('.jpg') > -1 || $.trim(file.name).toLowerCase().indexOf('.jpeg') > -1 || $.trim(file.name).toLowerCase().indexOf('.png') > -1)) {
            alert(getWKLocaleSrc('不支持当前所选文件的类型或格式，请选择一个图片文件，最好是jpg图片文件，再试一次...'));
          }

          var reader = new FileReader();
          reader.onload = function () {
            var result = this.result;
            var img = new Image();
            // 如果图片大于 10 M，不允许上传
            if (result.length > chihuo.picMaxSize) {
              alert(getWKLocaleSrc('图片尺寸太大，请选择较小的图片上传...'));
              $(formSelector + " input").remove();
              return;
            }
            img.onload = function () {
              var q = chihuo.picQuality;
              var w = chihuo.usrLogoWidth;
              var h = w * img.height / img.width;
              var ftyp = 'image/jpeg';
              var compressedDataUrl = chihuo.WKPicCompress(img,ftyp,w,h,q);
              img = null;
              var imageURI = compressedDataUrl;
              var payload = {
                name:file.name,
                typ:'jpg',
                pic:imageURI
              };

              var onSuccess = function (data) {
                //var target="#photoUpload"+len;
                 if (data.status == 0) {
                       var html = '<div class="comment-photo-show"><img src="'+newChihuo.address+'/'+data.url+'"><b>+</b></div>';
                       $('.comment-photo-wrap').prepend(html);
                       var src = newChihuo.address+'/'+data.url;
                       cb && cb(src);
                    } else {
                      
                    }
              };

              var onError = function (data) {
                if (data.status === getWKRestClient().getTimeOutCode()) {
                  getWKRestClient().showTimeOutMsg();
                }
              };

              var callback = function (bSuccess, result) {
                $(formSelector + " input").remove();
                if (bSuccess) {
                  onSuccess(result);
                } else {
                  onError(result);
                  //var target="#photoUpload"+len;
                  //$(target).find("b").text(getWKLocaleSrc("上传失败"));
                }
              };
              // getWKRestClient().WKPost("usrinfo.pic64.upload",addBaseUrlPara(ajax_url.uploadusrphotostr(), 0),payload,callback);
              chihuo.wkAjax({
                        type: 'POST',
                        url: chihuo.imgstrupload(),
                        data: payload,
                        success: function(data){
                          if(data.status == 0 && data.url){
                            callback(true,data);
                          }else{
                            callback(false,data.errorMsg);
                          }
                        } 
                    });
            };
            img.src = result;
          };
          reader.readAsDataURL(file);
          $(formSelector + " input").remove();
        };
    },
    init:function(cb){
        var pictureSource;        //图片来源
        var destinationType;        //设置返回值的格式
        // 等待PhoneGap连接设备
        document.addEventListener("deviceready",onDeviceReadyPhoto,false);

        // PhoneGap准备就绪，可以使用！
        function onDeviceReadyPhoto() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        };

        // 当成功获得一张照片的Base64编码数据后被调用

        // 当成功得到一张照片的URI后被调用
        function onPhotoURISuccess(imageURI) {

            var source = new Image();
          
            source.onload = function() {
                var quality = chihuo.picQuality;//0.92;
                var w = chihuo.picWidth;//800;
                var h = w * source.height / source.width;
                var ftyp = 'image/jpeg';

                var smallPicStr = chihuo.WKPicCompress(source,ftyp,w,h,quality);

                source = null;

                var payload = {
                    name:'cam'+new Date().getTime(),
                    typ:'jpg',
                    pic:smallPicStr
                };

                var onSuccess = function (data) {
                    // var target="#photoUpload"+len;
                    if (data.status == 0) {
                       var html = '<div class="comment-photo-show"><img src="'+newChihuo.address+'/'+data.url+'"><b>+</b></div>';
                       $('.comment-photo-wrap').prepend(html);
                       var src = newChihuo.address+'/'+data.url;
                       cb && cb(src);
                       // $('.comment-photo-wrap').prepend(data);

                        // $('.user-textarea').val(data);
                        // $(target).find("b").text(getWKLocaleSrc("上传成功"));
                    } else {
                        // $(target).find("b").text(getWKLocaleSrc("上传失败"));
                        // reLogin(data);
                    }
                };

                var onError = function (data) {
                   newChihuo.showPopInfo('上传失败');
                };

                var callback = function (bSuccess, result) {
                    if (bSuccess) {
                        onSuccess(result);
                    } else {
                        onError(result);
                    }
                };
                
                chihuo.wkAjax({
                    type: 'POST',
                    url: chihuo.imgstrupload(),
                    data: payload,
                    success: function(data){
                     callback(true,data);
                    } 
                });
            };

            source.src = imageURI;

        };

        // “Capture Photo”按钮点击事件触发函数
        function capturePhoto() {

            // 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
            navigator.camera.getPicture(onPhotoURISuccess, onFail);
            //navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 10 });
        };

        // 当有错误发生时触发此函数
        function onFail(message) {
            ////wkapp160922  console.log('Failed because: ' + message);
        }
        capturePhoto();
    },
    pickUpLocalPic:function(e,formId) {
        e.preventDefault();
        var formSelector = "#" + formId;
        if (!document.getElementById('myfile')){
            $(e.currentTarget).next(formSelector).append("<input type='file' id='myfile' name='file' accept='image/*'/>").find("input").click();
        } else {
            $(e.currentTarget).next(formSelector).find("input").click();
        }

        var filechooser = document.getElementById('myfile');
        filechooser.onchange = function () {
            var files = this.files;
            var file = files[0];

            if(!file || $.trim(file.name).length == 0) {
                $(formSelector + " input").remove();
                return;
            }

            if(!($.trim(file.name).toLowerCase().indexOf('.jpg') > -1 || $.trim(file.name).toLowerCase().indexOf('.jpeg') > -1 || $.trim(file.name).toLowerCase().indexOf('.png') > -1)) {
                alert(getWKLocaleSrc('不支持当前所选文件的类型或格式，请选择一个图片文件，最好是jpg图片文件，再试一次...'));
            }

            var reader = new FileReader();
            reader.onload = function () {
                var result = this.result;
                var img = new Image();
                // 如果图片大于 10 M，不允许上传
                if (result.length > chihuo.picMaxSize) {
                    alert(getWKLocaleSrc('图片尺寸太大，请选择较小的图片上传...'));
                    $(formSelector + " input").remove();
                    return;
                }
                img.onload = function () {
                    var q = chihuo.picQuality;
                    var w = chihuo.picWidth;
                    var h = w * img.height / img.width;
                    var ftyp = 'image/jpeg';
                    var compressedDataUrl = chihuo.WKPicCompress(img,ftyp,w,h,q);
                    img = null;
                    var imageURI = compressedDataUrl;
                    //wkapp160922  console.log(imageURI);
                    var len=$(".img-upload .row").children().length+1;
                    var html = '<div class="col-xs-4 upload-status" id="photoUpload' + len + '"><img src="' + imageURI + '" returnUrl=" "/><b>' + "上传" + '...</b></div>';
                    $(".img-upload .row").append(html);


                    var payload = {
                        name:file.name,
                        typ:'jpg',
                        pic:imageURI
                    };

                    var onSuccess = function (data) {
                        var target="#photoUpload"+len;
                        if (data.status == 0) {
                            var imgurl = chihuo.appname + "/" + data.url;//data.data.photo_url; for user photo
                            //var imgurl = data.url;//data.data.photo_url; for user photo
                            var target="#photoUpload"+len;
                            $(target).find("img").attr("src",chihuo.address + "/" +imgurl);
                            $(target).find("img").attr("returnUrl", imgurl);
                            //alert(imgurl);
                            $(target).find("b").text(getWKLocaleSrc("上传成功"));
                        } else {
                            $(target).find("b").text(getWKLocaleSrc("上传失败"));
                            reLogin(data);
                        }
                    };

                    var onError = function (data) {
                        if (data.status === getWKRestClient().getTimeOutCode()) {
                            getWKRestClient().showTimeOutMsg();
                        }
                    };

                    var callback = function (bSuccess, result) {
                        $(formSelector + " input").remove();
                        if (bSuccess) {
                            onSuccess(result);
                        } else {
                            onError(result);
                            var target="#photoUpload"+len;
                            $(target).find("b").text(getWKLocaleSrc("上传失败"));
                        }
                    };
                    // getWKRestClient().WKPost("com.localpic64.upload",addBaseUrlPara(ajax_url.imgstrupload(), 0),payload,callback);
                    chihuo.wkAjax({
                        type: 'POST',
                        url: chihuo.imgstrupload(),
                        data: payload,
                        success: function(data){
                         callback();
                        } 
                    });
                };
                img.src = result;
            };
            reader.readAsDataURL(file);
            $(formSelector + " input").remove();
        };
    }
};
//获取通讯录
var contact = {
  init: function(cb){
    document.addEventListener("deviceready", initContact, false);
    function initContact() {

      navigator.contacts.find(
        [navigator.contacts.fieldType.displayName],
        // ["displayName", "name"],
        gotContacts,
        errorHandler);

    }

    function errorHandler(e) {
      console.log("errorHandler: "+e);
    }

    function gotContacts(c) {
      // console.log("gotContacts, number of results "+c.length);
      initData.chatInviteData.data = c;
      (initData.chatInviteData.data.length > 0) && cb && cb(c);
      
      
      // for(var i=0, len=c.length; i<len; i++) {
        // console.dir(c[i]);

        // if(c[i].emails && c[i].emails.length > 0)
        // if(c[i]) {
          //innerHTML+="<tr> <td>"+c[i].name[0].value +"</td><td>"+ c[i].emails[0].value +"</td></tr>";
          // var familyName = c[i].name.familyName=== undefined?" ":c[i].name.familyName;
          // var givenName = c[i].name.givenName=== undefined?" ":c[i].name.givenName;
          // var fullName=givenName+" "+familyName;
          // var email=c[i].emails[0].value;
                //please update this section: enable invite button only to contacts who are NOT friends
          // if (email.toUpperCase().indexOf(("gmail").toUpperCase())==-1) {     ;
          //     innerHTML+="<tr> <td>"+givenName+"&nbsp;"+  familyName+"&nbsp; </td><td><button type=\"button\" disabled>Invite</button></td> </tr>";
          // }
          // else
          // {
          //     //innerHTML+="<tr> <td>"+givenName+"&nbsp;"+  familyName+"&nbsp; </td><td><button type=\"button\" >Invite</button></td> </tr>";
          //     innerHTML+="<tr> <td>"+givenName+"&nbsp;"+  familyName+"&nbsp; </td><td><button type=\"button\" onclick=\"myFunction('invite.htm?email="+email+"&name="+fullName+"')\" >Invite</button></td> </tr>";
          //     //innerHTML+="<tr> <td>"+givenName+"&nbsp;"+  familyName+"&nbsp; </td><td><button type=\"button\" onclick=\"myFunction()\" >Invite</button></td> </tr>";
          // }
      //     count++;
      //   }

      // }
      //contactDiv.innerHTML+="<tr> <td>"+"aaa"+"</td><td>"+ "bbb" +"</td></tr>";

      // innerHTML+="</tbody></table>"; 
       // $('#ceshi').html(innerHTML);

    // }

  }
}

}






