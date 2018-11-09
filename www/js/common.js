var newChihuo = {
    address: "http://app.foodymonkey.com",//http://staging.wookongcorp.com:9099"
    appname: "wkfdmk",
    geosrvUrl: "http://geosrv.foodymonkey.com/geosrv",
    textShowLength: 80,
    showMorePara: function(str, kind){
       if(str && str.length && str.length > this.textShowLength ){
        if(kind == 2){
            return str.slice(0,this.textShowLength)+'<b>'+str.slice(this.textShowLength)+'</b><span>... ...all</span>&nbsp;&nbsp;';
        }else{
         return str.slice(0,this.textShowLength)+'<b>'+str.slice(this.textShowLength)+'</b><span>... ...more</span>&nbsp;&nbsp;';
        }
       }else{
        return str;
       }
    },
    isMobileDevice: function() {
        var u = navigator.userAgent
        var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        return iOS || Android;
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
       var info ='<p>Network error,please try again shortly.</p><div class="error-pop"><span class="close-pop">cancel</span><span class="refresh">refresh</span></div>'
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
      if(customer){
        newChihuo.setLocalStorage('welcomeName',customer);
      }
      var customer = customer || newChihuo.getLocalStorage('welcomeName') || 'friend';
      if(hour >=6 && hour <=11){
        tips = 'Good morning, '+customer+'.';
      }else if( hour >11 && hour < 18){
        tips = 'Good afternoon, '+customer+'.';
      }else{
        tips = 'Good evening, '+customer+'.';
      }
      return tips;
    },
    showDiscountInfo:function(data){
      if(data == '0' || data == '0%' || data == undefined){
        return '';
      }else{
        return data + 'off';
      }

    },
    showDistanceInfo: function(data){
      var dis = this.locale == 'en-CA' ? ' km' : ' 公里';
      var data = parseFloat(data);
      if(data == 0){
         return '';
      }else if(data<1){
         return data*1000 + ' m';

      }else if(data>=1 && data<10){
          return data.toFixed(1) + dis;

      }else if(data>=10){
          return data.toFixed(0) + dis;

      }else{
         return undefined;
      }

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
        if(uid.sub.indexOf('facebook') >= 0){
          var utp = 1;
        }
        if(uid.sub.indexOf('linkedin') >= 0){
          var utp = 2;
        }
      }
       uid && uid.sub && chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('tpLogin.json'),
          data:{
            uid: uid.sub,
            utp: utp || 0 ,// 1 :fb,2：linkin
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if (data.status == 0) {
              if(data.data[0].status_code == 0){
                newChihuo.showPopInfo(newChihuo.localize('login_success'),1200);
                newChihuo.customerId = data.data[0].customer_id;
                newChihuo.setLocalStorage('customer_id',newChihuo.customerId);
                newChihuo.setLocalStorage('loginType','3rd');
                newChihuo.setProfile(uid);
    
              }else{
               newChihuo.showPopInfo(newChihuo.localize('login_fail'),1200);
              }
            }
          },
          error: function () {

          }
        });  
    },

    setProfile: function(uid){
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri('updateProfile.json'),
          data:{
            name: uid.name || uid.nickname,
            purl: uid.picture,
            lat: newChihuo.lat,
            lng: newChihuo.lon,
            locale: 'en'
          },
          success: function (data) {
            if (data.status == 0) {
              if(data.data[0].status_code == 0){
                initData.myIndexData.data.profile_photo_url = uid.picture;
                initData.myIndexData.data.display_name = uid.name || uid.nickname;
                newChihuo.customer = data.data[0].display_name || uid.name || uid.nickname;
                app_router.navigate('myIndex',{
                  trigger: true
                });
              }
            }
          },
          error: function () {

          }
        });
    },

    showReloadInfo: function(obj,page,time){
      clearTimeout(this.reloadInfo);
      this.reloadInfo = setTimeout(function(){
          newChihuo.getPage(page) && newChihuo.showPopInfo(newChihuo.localize('scroll_down_to_refresh'),3000,function(){
               obj.tips = true;
        })},time || 1000*20); //在页面第一次停留超过60s以后会提醒用户可以下拉刷新
    },
   openMapApp: function(lat, lng, label) {
    var geocoords = lat + ',' + lng;
    var u = navigator.userAgent
    var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

    //if ((navigator.platform.indexOf('iPhone') != -1) || (navigator.platform.indexOf('iPad') != -1) || (navigator.platform.indexOf('iPod') != -1)) {
    //    iOS = true
    //}
    //var Android = false;
    //if ((navigator.platform.indexOf('Android') != -1) || (navigator.platform.indexOf('android') != -1) || (navigator.platform.indexOf('ANDROID') != -1)) {
    //    Android = true
    //}
    var mlabel = encodeURI(label);
    if (iOS) {
        window.open('maps://?q=' + geocoords, '_system');
    } else if (Android) {
        window.open('geo:0,0?q=' + geocoords + '(' + mlabel + ')', '_system');
    } else {
        window.open('http://maps.apple.com/maps?q=' + geocoords + '(' + mlabel + ')', '_system');
    }
    },
    setRestUrl: function(url){
      var url = url.toLowerCase();
      if(url.indexOf('http')>=0){
        return url;
      }else{
        return 'http://'+url;
      }
    },
    isIOS: function(){
      var u = navigator.userAgent
      var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      return iOS;
    },
    locale: 'en-CA',
    motionStatus: false,
    shakeTrigger: 1,
    lat: null || 43.8145412 ,//多伦多数据测试 43.8145412
    lon: null || -79.2972919,  //-79.2972919,
    debug: 1,
    city: null,
    setCity: false,
    localCity: null,
    msg: 0,
    friendReq: 0,
    time: null,
    longSpeed: 1000*20,
    shortSpeed: 1000*3,
    map: null,
    maplastcenter: null,
    maplastlevel: null,
    mapListener: null,
    positionSpeed: 1000*20,
    globalStatus: false,
    positionTime: null,
    positionChanged: false,
    customerId: null,
    customer: null,
    msgList:{},
    requestList:{},
    activityNum:0,
    activityObj:null,
    lock: null,
    indexTimeout: null,
    wkAppVersion: '3.1.3',
    wkAppBuild: '250',
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
    cityData: [{cityname:'Toronto'}],
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
    title: ''
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
  userMiCommentsData:{
    data:[],
    id:null
  },
  myIndexData: {
    data:[],
    id: null
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
  contactData:{
    data:[]
  },
  chatRequestData: {
    toData:[],
    fromData:[]
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
  },
  photoData:{
    photoUrl: null,
    photoIndex: null
  },
   dishHot1Data: {
    data:[]
  },
  dishHot2Data: {
    data:[],
    title: null
  },
  dishHot3Data: {
    data:[],
    title:null
  },
  dishHot4Data: {
    data:[],
    title:null
  },
  mySettingsData: {
    privacy: 1,
    language: 1,
    notification: 1
  }
};

//============enhancement for request============
//如果是单纯的网页浏览模式时是永远不会到这一步的，因为没有cordova.js支持，此flag用于判断是否可以获得cordova.js支持
//var WK_IS_DEVICE_READY_FLAG = false;
var WKShortener = {
    ALPHABET : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    encode : function(num) {
        var sb = "";
        var BASE = this.ALPHABET.length;
        while ( num > 0 ) {
            var pos = num % BASE;
            //console.log("#######[test wksortener]pos:" + pos);
            sb = this.ALPHABET.substring(pos, pos+1) + sb;
            num = parseInt(num / BASE);
            //console.log("#######[test wksortener]num:" + num);
        }
        return sb;
    },
    decode : function(str) {
        var  num = 0;
        var BASE = this.ALPHABET.length;
        for ( var i = 0; i < str.length; i++ ) {
            num = num * BASE + this.ALPHABET.indexOf(str.substring(i, i+1));
        }
        return num;
    },
    //test : function() {
    //    var n = 999923987;
    //    var xx = WKShortener.encode(n);
    //    console.log("#######[test wksortener] n: " + n + " xx:" + xx);
    //    console.log("#######[test wksortener] n: " + n + " xx:" + xx + " nn:" + WKShortener.decode(xx));
    //}
};
//WKShortener.test();

var WKSysUtils = {
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //uuidv4pro: function () {
    //    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    //    });
    //},
    getUniqueId: function (prefix) {
        var d = new Date().getTime();
        if (undefined === prefix) {
            prefix = 'uid-';
        }
        d = prefix + "-" + WKShortener.encode(parseInt(Math.random() * 100000000)) + "-" + WKShortener.encode(parseInt(d)) + "-" + WKShortener.encode(parseInt(Math.random() * 100000000));
        return d;
    },
    getDeviceId: function () {
        return this.getUniqueId("wid");// "wid-XXXXXX-XXXXXXXXX-XXXXXX"  中间XXX为15位时间的短码
    },
};
//    test : function() {
//        console.log(this.getDeviceId());
//    }
//};
//WKSysUtils.test();


var WKObf = {
    map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", //Base64从0到63的对应编码字符集
    _unicodeToByte: function(str) //将Unicode字符串转换为UCS-16编码的字节数组
    {
        var result=[];
        for(var i=0;i<str.length;i++)
            result.push(str.charCodeAt(i)>>8,str.charCodeAt(i)&0xff);
        return result;
    },
    //_byteToUnicode: function(arr) //将UCS-16编码的字节数组转换为Unicode字符串
    //{
    //    var result="";
    //    for(var i=0;i<arr.length;i+=2)
    //        result+=String.fromCharCode((arr[i]<<8)+arr[i+1]);
    //    return result;
    //},
    encode: function(str)
    {
        if(str===null || typeof str === 'undefined') {
            return "";
        }
        var buffer,result="",flag; //flag表示在字节数组剩余的个数
        var arr=this._unicodeToByte(str);
        flag=arr.length%3;
        if(flag==1)
            arr.push(0,0);
        else if(flag==2)
            arr.push(0);
        for(var i=0;i<arr.length;i+=3) //此时arr.length一定能被3整除
        {
            buffer=(arr[i]<<16)+(arr[i+1]<<8)+arr[i+2];
            result+=this.map.charAt(buffer>>18)+this.map.charAt(buffer>>12&0x3f)+this.map.charAt(buffer>>6&0x3f)+this.map.charAt(buffer&0x3f);
        }
        if(flag==1)
            result=result.replace(/AA$/g,"==");
        else if(flag==2)
            result=result.replace(/A$/g,"=");
        return result;
    },
};

var WKStorageUtils = {
    saveval : function(lkey, val) {
        this.clear(lkey);
        localStorage.setItem(lkey, val);
    },
    saveJson : function(lkey, j) {
        this.clear(lkey);
        localStorage.setItem(lkey, jsonUtils.toStr(j));
    },
    getval : function(lkey) {
        return localStorage.getItem(lkey);
    },
    getJson : function(lkey) {
        return jsonUtils.toJson(localStorage.getItem(lkey));
    },
    clear : function(lkey) {
        return localStorage.removeItem(lkey);
    }
};


var WKStorageManager = {
    curlogtypkey: "loginType", // "wk.storage.clogtyp", newChihuo.setLocalStorage('loginType','3rd')
    sysdidkey: "wk.storage.sysdid",
    tpusrkey: "wk.storage.tpcinfo",
    custinfokey : "wk.storage.uinfo",
    custdetailkey : "wk.storage.cdetail",

    clear : function() {
        this.clearLogTyp();
        this.clearTpUsrInfo();
        this.clearCustInfo();
    },
    setCustDetail : function() {
        WKStorageUtils.saveJson(this.custdetailkey);
    },
    getCustDetail : function() {
        return WKStorageUtils.getJson(this.custdetailkey);
    },
    clearCustDetail : function() {
        WKStorageUtils.clear(this.custdetailkey);
    },
    setLogTyp : function() {
        WKStorageUtils.saveval(this.curlogtypkey);
    },
    getLogTyp : function() {
        return WKStorageUtils.getval(this.curlogtypkey);
    },
    clearLogTyp : function() {
        WKStorageUtils.clear(this.curlogtypkey);
    },
    setSysDeviceId : function(d) {
        WKStorageUtils.saveval(this.sysdidkey, d);
    },
    getSysDeviceId : function() {
        var did = WKStorageUtils.getval(this.sysdidkey);
        if(did) {
            return did;
        } else {
            var ndid = WKSysUtils.getDeviceId();
            WKStorageUtils.saveval(this.sysdidkey, ndid);
            return ndid;
        }
    }, // 不允许clear这个ID
    setTpUsrInfo : function() {
        WKStorageUtils.saveJson(this.tpusrkey);
    },
    getTpUsrInfo : function() {
        return WKStorageUtils.getJson(this.tpusrkey);
    },
    clearTpUsrInfo : function() {
        WKStorageUtils.clear(this.tpusrkey);
    },
    setCustInfo : function() {
        WKStorageUtils.saveJson(this.custinfokey);
    },
    getCustInfo : function() {
        //WKStorageUtils.getJson(this.custinfokey);
        var acct = WKStorageUtils.getval('email_address');
        var pass = WKStorageUtils.getval('password');
        if ((typeof acct == 'undefined' || acct == null )) {
        //if ((typeof acct == 'undefined' || acct == null ) && (typeof pass ==  'undefined' || pass == null)) {
            return null;
        }
        var acctkey = wkUMS.reglog.params.acct;
        var passkey = wkUMS.reglog.params.pass;
        var data = {};
        data[acctkey] = acct;
        data[passkey] = pass;
        return data;
    },
    clearCustInfo : function() {
        WKStorageUtils.clear(this.custinfokey);
    },
};

//-----------action 间隔控制辅助工具----------
var wkActionHelper = {
    WK_SYS_TIMESTAMP_MAP : {},
    ACTION_INTERVAL_MS : 1000,
    setTimeStamp : function(actionId,ts){
        this.WK_SYS_TIMESTAMP_MAP[actionId] = ts;
    },
    clearTimeStamp : function(actionId) {
        if(!actionId) {
            this.WK_SYS_TIMESTAMP_MAP = {};
        } else if(this.WK_SYS_TIMESTAMP_MAP.hasOwnProperty(actionId)){
            delete this.WK_SYS_TIMESTAMP_MAP[actionId];
        }
    },
    shouldSkip: function(actionId,curTS,interval){
        var _ts = this.WK_SYS_TIMESTAMP_MAP[actionId];
        var _interval = this.ACTION_INTERVAL_MS;
        if(!!interval && typeof interval === 'number' && interval > 5 ) {
            _interval=interval;
        }
        if(!_ts) {
            console.log("_ts is null!!!");
            return false;
        } else {
            //var curTS = new Date().getTime();
            //this.setTimeStamp(actionId, curTS);
            console.log("(curTS - _ts) = " + (curTS - _ts) + " interval:" + _interval);
            console.log("actionId: " + actionId + " >>> shouldSkip: " + (curTS - _ts < _interval));
            return (curTS - _ts < _interval);
        }
    },
    // 一段时间内只执行第一个action以避免短时间内多次执行action
    doFirst : function(actionId, callback, interval) {
        if(!!actionId && !!callback) {
            var curTimeStamp = (new Date()).valueOf();
            if(!this.shouldSkip(actionId,curTimeStamp, interval)) {
                //console.log("do call back -> " +callback);
                callback();
                this.setTimeStamp(actionId, curTimeStamp);// 以上次真正调用callback的时间记，而不是每次尝试就记，否则效果是如果连续尝试将永远无法callback
            } else {
                console.log("[id="+actionId+"]"+"action has been discarded!!! [" +"curTimStamp="+curTimeStamp+ "]");
            }
            //this.setTimeStamp(actionId, curTimeStamp);
        }
    },
    WK_SYS_ACTIONID_TIMEOUT_MAP : {},
    POST_ACTION_INTERVAL_MS : 200,
    setTimeoutID : function(actionId, tid){
        this.WK_SYS_ACTIONID_TIMEOUT_MAP[actionId] = tid;
    },
    getTimeoutID : function(actionId){
        if(this.WK_SYS_ACTIONID_TIMEOUT_MAP.hasOwnProperty(actionId)) {
            return this.WK_SYS_ACTIONID_TIMEOUT_MAP[actionId];
        }
        return 0;
    },
    clearTimeoutID : function(actionId) {
        if(!actionId) {
            this.WK_SYS_ACTIONID_TIMEOUT_MAP = {};
        } else if(this.WK_SYS_ACTIONID_TIMEOUT_MAP.hasOwnProperty(actionId)){
            delete this.WK_SYS_ACTIONID_TIMEOUT_MAP[actionId];
        }
    },
    // 一段时间内只执行最后一个action以避免短时间内多次执行action，注意如果之前的action已经完成则无法取消，且取消本身是有代价的，由于异步性及延迟问题，最好是dofirst+重试并做好提示+允许重刷。
    doLast : function(actionId, callback,interval) {
        if(!!actionId && !!callback) {
            var _interval = this.POST_ACTION_INTERVAL_MS;
            if(!!interval && typeof interval === 'number' && interval > 5) {
                _interval=interval;
            }
            var curTimeStamp = (new Date()).valueOf();
            var tid = this.getTimeoutID(actionId);
            if (tid) {
                clearTimeout(tid);
                console.log("[id=" + actionId + "]" + "tried to discard the last action!!! [" + "curTimStamp=" + curTimeStamp + "]" + "tid="+tid);
            }
            tid = setTimeout(callback,_interval);
            this.setTimeoutID(actionId,tid);
            return tid;
        }
        return null;
    }
};


var wkUMS = {
    logtypekey : "log_type",
    reglog : {
        logpoint : 'rcLogin.json',
        logtype : 3,
        params : {
            acct : 'acct',
            pass : 'pass'
        }
    },
    tplog : {
        logpoint : 'tpLogin.json',
        logtype : 2,
        params : {
            uid : 'uid',
            utp : 'utp'
        }
    },
    nrlog : {
        logpoint : 'nrLogin.json',
        logtype : 1,
        params : {
            did : 'd'
        }
    },
    unknowncode : "wkunknown",
    cur_loginrequest_retry : 0,
    max_loginrequest_retry : 1,
    getreglogparams : function(acct, pass) {
        var _acct = acct;
        var _pass = pass;
        if ((typeof acct == 'undefined' || acct == null ) && (typeof pass ==  'undefined' || pass == null)) {
            var cinfo = WKStorageManager.getCustInfo();
            if(!cinfo || !jsonUtils.isJson(cinfo)) {
                console.log("[wkUMS.getreglogparams] cinfo is wrong!");
                return null;
            }
            if(!jsonUtils.hasField(cinfo, this.reglog.params.acct) || !jsonUtils.hasField(cinfo, this.reglog.params.pass)) {
                console.log("[wkUMS.getreglogparams] cannot find key attribute in cinfo!");
                return null;
            }
            _acct = cinfo[this.reglog.params.acct];
            _pass = cinfo[this.reglog.params.pass];
        }

        var type = this.reglog.logtype;
        var url = chihuo.getApiUri(this.reglog.logpoint);
        var d = WKStorageManager.getSysDeviceId();
        return {
            logtyp : type,
            url : url,
            data : {
                did : d,
                acct : _acct,
                pass : _pass
            }
        };
    },
    gettplogparams: function(uid, utp) {
        var _uid = uid;
        var _utp = utp;
        if ((typeof uid == 'undefined' || uid == null ) && (typeof utp ==  'undefined' || utp == null)) {
            var tuinfo = WKStorageManager.getTpUsrInfo();
            if(!tuinfo || !jsonUtils.isJson(tuinfo)) {
                console.log("[wkUMS.gettplogparams] tuinfo is wrong!");
                return null;
            }
            if(!jsonUtils.hasField(tuinfo, this.tplog.params.uid) || !jsonUtils.hasField(tuinfo, this.tplog.params.utp)) {
                console.log("[wkUMS.gettplogparams] cannot find key attribute in tuinfo!");
                return null;
            }
            _uid = tuinfo[this.tplog.params.uid];
            _utp = tuinfo[this.tplog.params.utp];
        }

        var type = this.tplog.logtype;
        var url = chihuo.getApiUri(this.tplog.logpoint);
        var d = WKStorageManager.getSysDeviceId();
        return {
            logtyp : type,
            url : url,
            data : {
                did : d,
                uid : _uid,
                utp : _utp
            }
        };
    },
    getdlogparams: function() {
        var d = WKStorageManager.getSysDeviceId();
        if(!d) {
            console.log("[wkUMS.gettplogparams] d is wrong!");
            return null;
        }
        var type = this.nrlog.logtype;
        var url = chihuo.getApiUri(this.nrlog.logpoint);
        return {
            logtyp : type,
            url : url,
            data : {
                did : d
            }
        };
    },
    getRefreshTokenParams : function() {
        var logtype = WKStorageManager.getLogTyp();
        if (!logtype) {
            return this.getdlogparams();
        }

        if (logtype === 'chanhou') {
            var cinfo = WKStorageManager.getCustInfo();
            if(cinfo && jsonUtils.isJson(cinfo)) {
                var p = this.getreglogparams();
                if(p) {
                    return p;
                }
            }
        }

        if (logtype === '3rd') {
            var tuinfo = WKStorageManager.getTpUsrInfo();
            if(tuinfo && jsonUtils.isJson(tuinfo)) {
                var p = this.gettplogparams();
                if(p) {
                    return p;
                }
            }
        }

        return this.getdlogparams();
    },
    getStatusCode : function(data) {
        var rows = ajaxHelper.extractData(data);
        if(rows && rows.hasOwnProperty("length") && rows.length > 0) {
            return this.extractStatusCode(rows[0]);
        }
        return this.unknowncode;
    },
    extractStatusCode : function(resprow) {
        var statusCode = this.unknowncode;
        var statusKey = "status_code";
        if(jsonUtils.hasField(resprow, statusKey)) {
            statusCode = resprow[statusKey]; // maybe -100, -1, 0, 1, null, etc.
        }
        return statusCode
    },
    dorequest: function(option, t){
        if(!ajaxHelper.isTooFrequentCall(option, t)) {
            $.ajax(option);
        } else {
            console.log('[dorequest] too frequent and skipped this time.')
        }
        //return $.ajax(ajaxHelper.enhance(option));
    },
    //cur_loginrequest_retry : 0,
    cur_loginrequest_retry_key : 'cur_loginrequest_retry',
    getRefreshTokenAjaxOp : function(parentop, onlogin, onerror) {
        var params = this.getRefreshTokenParams();
        if (!params) {
            console.log("[refreshtoken.getRefreshTokenParams] cannot get params!");
            return;
        }
        var logtype = params['logtyp'];
        var URL = params['url'];
        var data =params['data'];
        var dataType = "json";
        if (logtype == this.tplog.logtype) {
            console.log("[refreshtoken.getRefreshTokenParams] doing silent tplogin!");
            var auth0getUserInfo = function (cb) { // 检查accessToken是否存在，如存在直接获取userinfo（若accessToken过期或失效会返回错误以后要加错误处理），如不存在调用auth0cordova 做login
                if (!Auth0 || !Auth0.Authentication) {
                    console.error('!Auth0 || !Auth0.Authentication');
                    return;
                }
                var auth0 = new Auth0.Authentication({
                    domain: "foodymonkey.auth0.com",
                    clientID: "fGIEyQ2eW5hEj1CvdRnfeXQUOTuUjDPK",
                });
                var accessToken = localStorage.getItem('access_token');
                if (accessToken) {
                    try {
                        auth0.userInfo(accessToken, cb);
                    } catch (err) {
                       alert('getuserinfo exception: ' + err);
                    }
                } else {
                    alert('please login via auth0.');
                    //this.auth0login();
                }
            };
            auth0getUserInfo(function (err, profile) {
                if (err) {
                    alert('get user info Error ' + err.message);
                }
                var info = JSON.stringify(profile, null, 4);
                newChihuo.profile = JSON.parse(info);
                newChihuo.tpLogin(newChihuo.profile);
            });
            return
        }

        var ajaxop = {
            type: 'POST',
            url: URL,
            data: data,
            dataType: dataType,
            beforeSend: function(){},
            success: function(data,status,xhr){
                if(data && data.hasOwnProperty('data')) {
                    //console.log('got resp');
                    var resp = data['data'];
                    //console.log( resp);
                    var statusCode = this.unknowncode;
                    if(resp.hasOwnProperty("length")) {
                        statusCode = wkUMS.extractStatusCode(resp[0]);
                    }
                    //console.log("status code: " + statusCode);

                    if(statusCode == 0) {
                        var cdetail = resp[0];
                        cdetail[this.logtypekey] = logtype;
                        WKStorageManager.setCustDetail(cdetail);
                        var cur_loginrequest_retry = localStorage.getItem(wkUMS.cur_loginrequest_retry_key);
                        console.log('succeed and reset cur_loginrequest_retry:' + cur_loginrequest_retry);

                        if(onlogin) {
                            if(cur_loginrequest_retry < wkUMS.max_loginrequest_retry) {
                                cur_loginrequest_retry = cur_loginrequest_retry + 1;
                                localStorage.setItem(wkUMS.cur_loginrequest_retry_key, cur_loginrequest_retry);
                                console.log(' cur_loginrequest_retry:' + wkUMS.cur_loginrequest_retry);
                                onlogin(statusCode, parentop );
                            } else {
                                cur_loginrequest_retry = 0;
                                localStorage.setItem(wkUMS.cur_loginrequest_retry_key, cur_loginrequest_retry); //保存，以免重新页面后被重置而无法记录实际次数
                                console.log(' reset cur_loginrequest_retry:' + cur_loginrequest_retry);
                            }
                        } else {
                            if(cur_loginrequest_retry < wkUMS.max_loginrequest_retry) {
                                cur_loginrequest_retry = cur_loginrequest_retry + 1;
                                localStorage.setItem(wkUMS.cur_loginrequest_retry_key, cur_loginrequest_retry);
                                location.reload(); //此处似有bug，需要在合适地方设this.cur_loginrequest_retry = 0，否则只执行一次，等待修正
                                //chihuo.wkAjax(parentop);//重做父请求，因为之前因登陆问题没做成被跳了，现在补做，但由于有请求过滤机制有可能有的请求的子登陆请求被过滤了根本到不了这儿！！这需要所有请求都应当有很好的出错提示和刷新按钮界面！！！
                                //否则就应当刷新页面！！！
                            } else {
                                cur_loginrequest_retry = 0;
                                localStorage.setItem(wkUMS.cur_loginrequest_retry_key, cur_loginrequest_retry); //保存，以免重新页面后被重置而无法记录实际次数
                                // 必须在跳过后重置并保存，否则如果写cookie不成功则只能刷一次，以后重试时不能重刷
                                console.log(' reset cur_loginrequest_retry:' + cur_loginrequest_retry);
                            }
                        }
                        return;
                    } else {
                        console.log('failed to fetch token status code:' + statusCode);
                    }
                    if(statusCode === this.unknowncode) {
                        console.log('[refreshtoken] cannot get the status code in resp[' + resp + ']');
                    }
                    if(onerror) {
                        onerror(0, statusCode, parentope);
                    }
                    return;
                }
            },
            error: function(xhr, p2, p3) {
                //console.log(xhr);
                ////console.log(p2);
                ////console.log(p3);
                //var info = null;
                //if(xhr && xhr.hasOwnProperty('responseJSON')) {
                //    info = xhr.responseJSON;
                //}
                //info = xhr.responseJSON;
                //if(xhr && xhr.status == 403) {
                //    if(info && info.hasOwnProperty('status') && info['status'] < 0) {
                //        showBigModalDialog(info['msg'] + ' [Click close to refresh page]', 'Error', null, function(){
                //            //window.location.href='/'; //window.location.href
                //            location.reload();
                //        });
                //        console.log(info['msg']);
                //        //window.location.href=window.location.href
                //        return;
                //    }
                //}
                ////showBigModalDialog('unknown error', 'Error');
                //console.log('unknown error');
                var statusCode = this.unknowncode;
                if(xhr) {
                    statusCode = xhr.status;
                }
                if(onerror) {
                    onerror(1, statusCode, parentope);
                }
            }
        };
        return ajaxop;
    },
    refreshtoken : function(parentop, onlogin, onerror) { //[need cookie, otherwise get 403]
        //https://stackoverflow.com/questions/2870371/why-is-jquerys-ajax-method-not-sending-my-session-cookie
        //Note: AJAX calls only send Cookies if the url you're calling is on the same domain as your calling script.
        var minterval = 2000;//用户登陆或刷新token的间隔周期必须大于等于1s. 1秒内只执行第1个请求
        var ajaxop = this.getRefreshTokenAjaxOp(parentop, onlogin, onerror);
        ajaxop && this.dorequest(ajaxop, minterval);
        //$.post(URL,data,function(data,status,xhr){
        //        if(data && data.hasOwnProperty('data')) {
        //            console.log('got resp');
        //            var resp = data['data'];
        //            console.log( resp);
        //            var statusCode = this.unknowncode;
        //            if(resp.hasOwnProperty("length")) {
        //                statusCode = wkUMS.extractStatusCode(resp[0]);
        //            }
        //            console.log("status code: " + statusCode);
        //            if(statusCode === this.unknowncode) {
        //                console.log('[refreshtoken] cannot get the status code in resp[' + resp + ']');
        //            }
        //
        //            if(statusCode == 0) {
        //                var cdetail = resp[0];
        //                cdetail[this.logtypekey] = type;
        //                WKStorageManager.setCustDetail(cdetail);
        //                this.cur_loginrequest_retry = 0;
        //                console.log('succeed and reset cur_loginrequest_retry:' + this.cur_loginrequest_retry);
        //            } else {
        //                console.log('failed to fetch token status code:' + statusCode);
        //            }
        //
        //            // ???????????????????
        //            if(onlogin) {
        //                if(this.cur_loginrequest_retry < this.max_loginrequest_retry) {
        //                    this.cur_loginrequest_retry = this.cur_loginrequest_retry + 1;
        //                    console.log(' cur_loginrequest_retry:' + this.cur_loginrequest_retry);
        //                    onlogin();
        //                } else {
        //                    this.cur_loginrequest_retry = 0;
        //                    console.log(' reset cur_loginrequest_retry:' + this.cur_loginrequest_retry);
        //                }
        //            }
        //            return;
        //        }
        //    },dataType)
        //    .fail(function(xhr, p2, p3) {
        //        console.log(xhr);
        //        //console.log(p2);
        //        //console.log(p3);
        //        var info = null;
        //        if(xhr && xhr.hasOwnProperty('responseJSON')) {
        //            info = xhr.responseJSON;
        //        }
        //        info = xhr.responseJSON;
        //        if(xhr && xhr.status == 403) {
        //            if(info && info.hasOwnProperty('status') && info['status'] < 0) {
        //                showBigModalDialog(info['msg'] + ' [Click close to refresh page]', 'Error', null, function(){
        //                    window.location.href='/'; //window.location.href
        //                });
        //                console.log(info['msg']);
        //                //window.location.href=window.location.href
        //                return;
        //            }
        //        }
        //        //showBigModalDialog('unknown error', 'Error');
        //        console.log('unknown error');
        //    })
    },
    login : function(typ, a, b, onsuccess, onerror) {
        var minterval = 2000;
        var ajaxop = null;
        if (typ == this.reglog.logtype) {
            ajaxop = {
                url : chihuo.getApiUri(this.reglog.logpoint),
                data : {
                    did : WKStorageManager.getSysDeviceId(),
                    acct : a,
                    pass : b
                },
                success : onsuccess || function (data,status,xhr) {},
                error : onerror || function(xhr, p2, p3) {}
            };
        } else if (typ == this.tplog.logtype) {
            ajaxop = {
                url : chihuo.getApiUri(this.tplog.logpoint),
                data : {
                    did : WKStorageManager.getSysDeviceId(),
                    uid: a,
                    utp: b
                },
                success : onsuccess || function (data,status,xhr) {},
                error : onerror || function(xhr, p2, p3) {}
            };
        }
        if(!!ajaxop) {
            this.dorequest(ajaxop, minterval);
        } else {
            console.log("[login] ERROR: log type is wrong! do error!")
            if(onerror) {
                onerror();
            }
        }
    }
};

//-----------------------------------------------
var commonUtils = {
    isInteger : function(obj) {
        return typeof obj === 'number' && obj%1 === 0
    },
    isFunc : function(fn) {
        return Object.prototype.toString.call(fn)=== '[object Function]';
    }
};

var jsonUtils = {
    isJson : function(obj) {
        return typeof(obj) == "object" &&
            Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
    },
    isJsonString : function(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch(e) {
        }
        return false;
    },
    toJson : function(jstr) {
        if(this.isJsonString(jstr)) {
            return JSON.parse(jstr);
        }
        return null;
    },
    toStr : function(j) {
        if(this.isJson(j)) {
            return JSON.stringify(j);
        }
        return null;
    },
    hasField : function(obj, fdname) {
        if (!obj || ! fdname) {
            return false;
        }
        return fdname in obj; //obj.hasOwnProperty(fdname);
    },
    clone : function(jsonObj) {
        var buf;
        if (jsonObj instanceof Array) {
            buf = [];
            var i = jsonObj.length;
            while (i--) {
                buf[i] = this.clone(jsonObj[i]);
            }
            return buf;
        }else if (jsonObj instanceof Object){
            buf = {};
            for (var k in jsonObj) {
                buf[k] = this.clone(jsonObj[k]);
            }
            return buf;
        }else{
            return jsonObj;
        }
    },
    merge : function(o1, o2) {
        var resultJsonObject={};
        for(var attr in o1){
            resultJsonObject[attr]=o1[attr];
        }
        for(var attr in o2){
            resultJsonObject[attr]=o2[attr];
        }
        return resultJsonObject;
    }
};
var historyAjaxRequest = {}; // RqID -> timestamp
var ajaxHelper = {
    minInterval : 200, // unit is ms.
    extractData : function(data) {
        if(data && data.hasOwnProperty('data')) {
            var resp = data['data'];
            //console.log('got resp:');
            //console.log(resp);
            return resp;
        }
        return null;
    },
    overrideBefore : function(ofunc, nfunc, key) {
        return function(p) {
            if(!nfunc(p)) { // if nfunc(p) return false or return nothing then do ofunc(p). if return true then skip ofunc() !!! we can make a decision according to the nfunc(p) dynamically.
                ofunc(p);
            }
        };
        //if (key == 'success') { // Anything data, String textStatus, jqXHR jqXHR
        //    return function(data) {
        //        nfunc(data);
        //        ofunc(data);
        //    };
        //}
        //if (key == 'error') { // jqXHR jqXHR, String textStatus, String errorThrown
        //    return function(jqXHR) { // jqXHR.status  jqXHR.status can be 200, 403 ...
        //        nfunc(jqXHR);
        //        ofunc(jqXHR);
        //    };
        //}
        //if (key == 'beforeSend') { // jqXHR jqXHR, PlainObject settings
        //    return function(xhr) {
        //        nfunc(xhr);
        //        ofunc(xhr);
        //    };
        //}
        //if (key == 'complete') { //  jqXHR jqXHR, String textStatus
        //    return function(jqXHR) { // jqXHR.status  jqXHR.status can be 200, 403 ...
        //        nfunc(jqXHR);
        //        ofunc(jqXHR);
        //    };
        //}
        //return null;
    },
    overrideAfter : function(ofunc, nfunc, key) {
        return function(p) {
            ofunc(p);
            nfunc(p);
        };
    },
    decorateOpt : function(o, n, t) {
        if (!o || !jsonUtils.isJson(o)) {
            console.log('[ajaxHelper.decorateOpt] ERROR: original ajax option is null or error! return null.');
            return null;
        }
        if (!n || !jsonUtils.isJson(n)) {
            console.log('[ajaxHelper.decorateOpt] WARNING: new ajax option is null or error! do nothing.');
            return o;
        }
        if (typeof t == 'undefined' || t == null || !commonUtils.isInteger(t) || t < 0 || t > 2) {
            console.log('[ajaxHelper.decorateOpt] ERROR: the decorate type[' + t + '] is not correct! do nothing.');
            return o;
        }
        var rjson = o;// jsonUtils.clone(o);
        for(var k in n){
            if (!n[k]) {
                continue;
            }
            if (jsonUtils.hasField(rjson, k)) {
                if (jsonUtils.isJson(rjson[k]) && jsonUtils.isJson(n[k])) {
                    rjson[k] = jsonUtils.merge(rjson[k], n[k]);
                    continue;
                }
                if(commonUtils.isFunc(rjson[k]) && commonUtils.isFunc(n[k])) {
                    //console.log('==============');
                    //console.log('func:');
                    //console.log(rjson[k]);
                    //console.log('----------------------------');
                    if (t == 0) { // just replace
                        rjson[k] = n[k];
                    } else if(t==1) {
                        rjson[k] = this.overrideBefore(rjson[k], n[k], k);
                    } else if(t==2) {
                        rjson[k] = this.overrideAfter(rjson[k], n[k], k);
                    }
                    //console.log('t=' + t);
                    //console.log('func:');
                    //console.log(rjson[k]);
                    //console.log('==============');
                    continue;
                }
            } else {
                rjson[k] = n[k];
            }
        }
        return rjson;
    },
    extractRqID : function(o) {
        if (!jsonUtils.isJson(o)) {
            console.error('[ajaxHelper.extractRqID] failed to extract rq id due to the wrong json.');
            return '';
        }
        if(!jsonUtils.hasField(o, 'url')) {
            console.error('[ajaxHelper.extractRqID] failed to extract rq id due to no url in json.');
            return '';
        }
        if(!jsonUtils.hasField(o, 'type')) {
            console.error('[ajaxHelper.extractRqID] failed to extract rq id due to no type in json.');
            return '';
        }
        var params = '';
        if (jsonUtils.hasField(o, 'data')) {
            params = JSON.stringify(o['data']);
        }
        //return '1';
        return o['type'] + '|' + o['url'] + '|' + params;
    },
    isTooFrequentCall : function(option, minterval) {
        var rqid = this.extractRqID(option);
        //console.log(historyAjaxRequest);
        var ret = false;
        var curts = new Date().getTime();
        //console.log('curts: ' + (curts));
        var minInterval = this.minInterval;
        if(!!minterval && typeof minterval == 'number'&& minterval > 5) {
            minInterval = minterval;
        }
        if (jsonUtils.hasField(historyAjaxRequest, rqid)) {
            var ots = historyAjaxRequest[rqid];
            ret =  (curts - ots) < minInterval;
            //console.log('curts - ots=' + (curts - ots));
            //console.log('ret=' + (ret));
        }
        //historyAjaxRequest[rqid] = curts;//这种方法如果某种请求连续在指定时间内发出则这些所有的请求都将被过滤！！！
        if (!ret) {//[对用户较宽容]只记不应跳过的请求的时间戳，这样不应跳过的请求，也就是实际执行的请求最坏将以最小间隔为周期不断执行，但不会出每次都在小于最小间隔时连续无限请求时所有请求全被过滤的情况
            historyAjaxRequest[rqid] = curts;
        }
        return ret;
    },
    show_reg_confirm: function() {
        var r=confirm("Please Sign Up/In and Enjoy All of Features of FoodyMonkey...");
        if (r==true)
        {
            location = '#login';
        }
        else
        {
        }
    },
    enhance : function(o) {
        //console.log('RQID: ' + this.extractRqID(o));
        var extra = {
            data: {did : WKStorageManager.getSysDeviceId(), app: newChihuo.wkAppBuild + '-' + newChihuo.wkAppVersion},
            withCredentials: true,
            beforeSend : function() {
                return true; // if true then wont run the original function, but if false will do
            },
            success: function(data) {
                //console.log('well done! added extra function in success!!');
                //console.log(data);
                //var scode = wkUMS.getStatusCode(data);
                //if(!data || (data && !data.hasOwnProperty("data")) || wkUMS.getStatusCode(data) == wkUMS.unknowncode) {
                //    return false;// if true then wont run the original function, but if false will do
                //}
                if (data && data.hasOwnProperty("errorCode")) {
                    if(data["errorCode"] < 1) {
                        wkUMS.refreshtoken(o);
                        return true; // if true then wont run the original function, but if false will do
                    }
                }

                var pdata = null;

                if(data && data.hasOwnProperty("data")) {
                    pdata = data["data"];
                }

                if(pdata && Array.isArray(pdata) && pdata.length > 0) {
                    //console.log(pdata);
                    var row = pdata[0];
                    //console.log(row);
                    if(row && row.hasOwnProperty('rsp_msg') && row['rsp_msg'] === "10060") {
                        //alert("10060");
                        ajaxHelper.show_reg_confirm();
                        return true;
                    }
                    if(row && row.hasOwnProperty('status_code') && (row['status_code'] === "10060" || row['status_code'] === 10060)) {
                        //alert("10060");
                        ajaxHelper.show_reg_confirm();
                        return true;
                    }
                }
               return false; // if true then wont run the original function, but if false will do
            }
        }
        return this.decorateOpt(o, extra, 1); //o;//
    }
};
//============enhancement for request============

//通用方法
var chihuo = {
    mapMinQueryDistance: 500,
  picQuality: 0.90,
  picMaxSize: 10 * 1024 * 1024,
  picWidth: 1080,
  usrLogoWidth: 1080,
  setSearch: null,
  appLaunch: function(template){
    if(newChihuo.getLocalStorage('appLaunch')){
      return;
    }else{
      $("#appLaunch").show().html(template);
      newChihuo.removeLocalStorage('customer_id');
      newChihuo.removeLocalStorage('appLaunch');
      newChihuo.removeLocalStorage('loginType');
      newChihuo.removeLocalStorage('password');
      newChihuo.removeLocalStorage('email_address');
      $('#beginExploring').on('click',function(){
          $("#appLaunch").html('').hide();
          newChihuo.setLocalStorage('appLaunch',true);
      });
    }
    
  },
  getApiUri: function(api){
      return newChihuo.address+'/wkfdmk/v2/'+ api;
  },

  getApiUri2: function(api){
      return newChihuo.address+'/wkfdmk/'+ api;
  },

  getWeekTime:function(day){
      var now = new Date();
      return now.getDay()==day;
  },

  setNoDataInfo: function(obj){
    var $obj = obj || $('.whoops');
    $obj.length && $obj.html("<p>It looks like you don't have any data yet.</p><span>Let's change that. Start exploring dishes and place now and will save it here for later.</span><a href='#index'>Begin Exploring</a>").show();
  },

  getOpenStatus: function(hours){
    var begin,end;
    if(hours.indexOf('24小时')>=0 || hours.indexOf('24 hours')>=0){
        return true;
    }
    if(hours && hours.indexOf('–')>=0){
      begin = parseInt(hours.split('–')[0].split(':')[0]);     
      end = parseInt(hours.split('–')[1].split(':')[0]);
      var now = new Date().getHours();
      if(begin || end){
        if(begin >= end){
          if(now >=begin || now <= end){
            return true;
          }else{
            return false;
          }
        }else{
          if(now >= begin && now<=end){
            return true;
          }else{
            return false;
          }
        }
      }
    }
  },

  commentTime:function(time){
    if(time){
      var t = new Date(time.substring(0,19)).getTime();
    return t ? this.timestampToTime(t) : time.substring(0,10);
    }
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
           if(date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()){
               return 'Today';
           }
           if(y.getDate() == now.getDate() && y.getMonth() == now.getMonth() && y.getFullYear() == now.getFullYear()){
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
                    var html='<div id="maskScreen" mask="1" style="position: fixed;width: 100%; height: 100%; left: 0; top: 0; background: rgba(255,255,255,.98); z-index:1000;"><div class="logo-animation"></div><p style="text-align: center; padding-top: 190px; font-size:24px; color:#ff4200;">......</p></div>';
                    var $mask = $("#maskScreen");
                    if($mask.length){
                        var index=parseInt($mask.attr("mask"));
                        $mask.attr("mask",++index);  
                    }else{
                        $("body").append(html);
                    }

                },
                //完成请求后触发。即在success或error触发后触发
                complete: function (xhr, status) {
                    var $mask = $("#maskScreen");
                    chihuo.imgLazyLoad();
                    if($mask.length){
                        var index=parseInt($mask.attr("mask"));
                        $mask.attr("mask",--index);
                        if(index==0){
                            $mask.fadeOut(800,function(){$mask.remove()});
                        }
                    }else{
                        $mask.remove();
                    }
                },
                error: function(xhr){
                    newChihuo.errorPopInfo();
                }
            });

  },

  wkAjax: function(option, t){
      if(!ajaxHelper.isTooFrequentCall(option, t)) {
          $.ajax(ajaxHelper.enhance(option));
      } else {
          console.log('[wkAjax] too frequent and skipped this time.')
      }
      //return $.ajax(ajaxHelper.enhance(option));
  },

  wkLoginPermission: function(){
      if(newChihuo.customerId || newChihuo.getLocalStorage('customer_id')){
         return true;
      }else{
       var pop = $('#popInfo');
       var info ='<p>'+newChihuo.localize('please_login_first')+'</p><div class="error-pop"><span class="close-pop">'+newChihuo.localize('cancel') +'</span><span class="refresh">'+newChihuo.localize('refresh')+'</span></div>'
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
      var locChanged = WKMapShouldQuery([lastLat, lastLon], [newLat, newLon], 10);
      if (locChanged) {
          console.log('onchanged')
         newChihuo.lat = newLat;
         newChihuo.lon = newLon;
         newChihuo.setLocalStorage('lat',newChihuo.lat);
         newChihuo.setLocalStorage('lon',newChihuo.lon);
         newChihuo.positionChanged = true;
         return true;
      }else{
        newChihuo.positionChanged= false;
        return false;
      }
      
  },

  initApp: function(template){
      //$('#page').ready(function () {
      //        var $splash = $('#splash');
      //        if ($splash) {
      //            $splash.html('').hide();
      //        }
      //    }
      //);
      //$(document).ready(function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //});
      //document.attachEvent('onreadystatechange', function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //    //if (document.readyState=='complete') {
      //    //    var $splash = $('#splash');
      //    //    if ($splash) {
      //    //        $splash.html('').hide();
      //    //    }
      //    //}
      //});
      //window.onReady(function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //});
      //$('#page').ready(function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //});
      //document.addEventListener('DOMContentLoaded', function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //});
      //window.onload=function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //}
      //document.getElementById("page").onready=function(){
      //    var $splash = $('#splash');
      //    if ($splash) {
      //        $splash.html('').hide();
      //    }
      //}
     document.addEventListener("deviceready", onDeviceReady, false);
     //document.addEventListener("resume", resumeReady, false);//app从后台运行时重新获取监听的事件
    //device APIs are available
    function onDeviceReady() {
        StatusBar && StatusBar.backgroundColorByHexString("#fe812d"); 
        StatusBar && StatusBar.overlaysWebView(false);

        chihuo.getPosition(template);
        newChihuo.isMobileDevice() && cordova.plugins.notification.badge.requestPermission(function(granted){});
        
    }

    function resumeReady() {
      if(!newChihuo.resumeOff){
         setTimeout(function(){
          chihuo.splashShow(function(){chihuo.getPosition(template)});        
        },0);
      }    
    }

  },

  imgLazyLoad: function(){
   $("img.lazy").lazyload({
      placeholder : "imgs/grey.gif", //用图片提前占位 
      effect: "fadeIn", // 载入使用何种效果
      threshold: 100, 
    });
  },

  splashShow: function(func,time){
    var $splash = $('#splash');
    if($splash.length){
      if(!(newChihuo.getPage('map') || newChihuo.getPage('map2') || newChihuo.getPage('restaurantMaps'))){
         app_router.navigate('Index',{
         trigger: true
          });
        }
     
      newChihuo.splash = true;
      $splash.html('<p><img src="imgs/logo.png"><img src="imgs/foodymonkey.jpg"></p>').show();
      // func && func();
      setTimeout(function(){
        $splash.hide().html('');
        newChihuo.splash = false;
      },time || 2500);
    } 
  },

  matchCityInfo: function(city,template){
    var pop = $('#popInfo');
    var info ='<p>'+newChihuo.localize('change_your_city')+'</p><div class="error-pop"><span class="close-pop">'+newChihuo.localize('cancel')+'</span><span class="refresh">'+newChihuo.localize('global_okbutton')+'</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           newChihuo.setCity = false;
           newChihuo.splash = false;
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           newChihuo.city = city;
           newChihuo.setLocalStorage('city',newChihuo.city);
           newChihuo.setCity = false;
           newChihuo.splash = false;
           newChihuo.getPage('home') && chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
           newChihuo.getPage('home') && chihuo.findHotspotDetails(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
          
       });
  },

  opacityBg: function(obj,scroll){
    var height = $(obj).height();
    if(scroll > height){
      if($('.rank-ul').length){
         $(obj).css('opacity',1).addClass('rank-ul-fixed');
      }
      return;
    }else{
      if($('.rank-ul').length &&  $(obj).hasClass('rank-ul-fixed')){
         $(obj).removeClass('rank-ul-fixed');
      }
      var opacity = (1-scroll/height);
      $(obj).css({'opacity':opacity});
    }
  },

  getPosition: function(template,refresh){
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
     clearInterval(newChihuo.positionTime);
     newChihuo.positionTime = setInterval(function(){console.log('timer');navigator.geolocation.getCurrentPosition(onSuccess, onError)},newChihuo.positionSpeed);
    // onSuccess Geolocation
    function onSuccess(position){
      var newLat = position.coords.latitude;
      var newLon = position.coords.longitude;
      var change = chihuo.positionChange(newLat, newLon,newChihuo.lat,newChihuo.lon);
      (change || newChihuo.setCity) && newChihuo.getPage('home') && chihuo.openStreetMap(newChihuo.lat,newChihuo.lon,template,refresh);     
    }  

    function setTimeoutIndex(){
      newChihuo.city = newChihuo.getLocalStorage('city');
      newChihuo.city = newChihuo.city == null ? 'Toronto' : newChihuo.city;
      newChihuo.setLocalStorage('city',newChihuo.city);
      newChihuo.lat = newChihuo.getLocalStorage('lat') || newChihuo.lat;
      newChihuo.lon = newChihuo.getLocalStorage('lon') || newChihuo.lon;
      newChihuo.getPage('home') && chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
      newChihuo.getPage('home') && chihuo.findHotspotDetails(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
    }

    setTimeoutIndex();
           
    // onError Callback receives a PositionError object
    function onError(error) {
      console.log(error);
    }
     
  },

  openStreetMap: function(lat, lon, template,refresh){
    var _this = this;
    var showCityInfo = newChihuo.splash ? true : false;
      if(lat && lon){
        $.ajax({
          type: 'GET',
          url: newChihuo.geosrvUrl + '/reverse?format=json&_mtk=wk2018',  // 无法跨域传cookies
          // 'https://nominatim.openstreetmap.org/reverse?format=xml&zoom=18&addressdetails=1&format=json',
          data:{
              lat: lat,
              lon: lon
          },
          beforeSend:function(){},
          complete: function (xhr, status) {},
          success: function (data) { 
              newLocation = data.address.city || data.address.state_district || 'Toronto';
              newChihuo.localCity = newLocation;
               if(refresh || newChihuo.localCity){
                if((newChihuo.city != newChihuo.localCity) && newChihuo.setCity && showCityInfo){
                  newChihuo.getPage('home') && chihuo.matchCityInfo(newChihuo.localCity,template);
                }
                if(newChihuo.city != newChihuo.localCity){
                   //后期优化添加界面和数据符合才渲染模板
                  newChihuo.city = newChihuo.city == null ?  newChihuo.localCity :  newChihuo.city;
                  newChihuo.getPage('home') && chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
                  newChihuo.getPage('home') && chihuo.findHotspotDetails(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
                }
               }       
            },
          error: function () {
              newChihuo.city = newChihuo.city == null ? 'Toronto' : newChihuo.city;
              newChihuo.getPage('home') && chihuo.findAllCities(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
              newChihuo.getPage('home') && chihuo.findHotspotDetails(newChihuo.city,newChihuo.lat,newChihuo.lon,template);
          }
        })
      }
  },

  findAllCities: function(city,lat,lon,template){
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findAllCities.json'),
                  data: {
                     city: city || 'toronto',
                     lat: lat,
                     lng: lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.homeData.cityData = data.data;
                        newChihuo.getPage('home') && $("#page").html(_.template(template,initData.homeData)); 
                     }
                  },
                 error: function(){
                    newChihuo.showPopInfo(newChihuo.localize('scroll_down_to_refresh_network'));
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
                                  newChihuo.showPopInfo(newChihuo.localize('switch_to_toronto'));
                                  initData.homeData.cityData[0].cityname = 'toronto';
                                  chihuo.findHotspotDetails('toronto',lat,lon,template);
                                }
                                  newChihuo.getPage('home') && $("#page").html(_.template(template, initData.homeData));
                               }
                            },
                            error: function(){
                              newChihuo.showPopInfo(newChihuo.localize('scroll_down_to_refresh_network'));
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
                                    $('#msgRemind').addClass('message-remind');
                                 }
                                 //好友请求消息提醒
                                 var friendReq = data.pp['29'];
                                 friendReq && friendReq.length && $.each( friendReq, function(index,value){
                                     newChihuo.friendReq += parseInt(value['v']);
                                     if(newChihuo.requestList.hasOwnProperty(value['s'])){
                                      newChihuo.requestList[value['s']] += parseInt(value['v']);
                                     }else{
                                      newChihuo.requestList[value['s']] = parseInt(value['v']);
                                     }

                                 });
                                 if(newChihuo.friendReq > 0){
                                    $('#msgIndex').addClass('message-remind');
                                    $('#msgPoint').addClass('floor-point');
                                    $('#msgPoint2').addClass('request-point');
                                 }

                              }
                              if(data.bc && !$.isEmptyObject(data.bc)){
                               if(!_.isEqual(newChihuo.activityObj,data.bc)){
                                newChihuo.activityObj = data.bc;
                                newChihuo.activityNum++;
                                $('#msgFeeds').addClass('message-remind');
                               }                            
                              }

                              if(!$.isEmptyObject(newChihuo.requestList) || !$.isEmptyObject(newChihuo.msgList) || newChihuo.activityNum){
                                var allNum = newChihuo.activityNum + Object.keys(newChihuo.requestList).length + Object.keys(newChihuo.msgList).length;
                                  newChihuo.isMobileDevice() && cordova.plugins.notification.badge.hasPermission(function (granted) {
                                    cordova.plugins.notification.badge.set(allNum);
                                });
                              }else{
                                  newChihuo.isMobileDevice() && cordova.plugins.notification.badge.hasPermission(function(granted) {
                                    cordova.plugins.notification.badge.clear();
                                });
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
      var map = {};
      var menu = [];
      if(len){
        for(var i = 0; i < len; i++ ){
          if(map[data[i][status]] !== undefined){
             menu[map[data[i][status]]].push(data[i]);
          }else{
              k++;
              map[data[i][status]] = k;
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
      return data;
  },

  beginSort: function(index,obj,data,like,price,distance){
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
    _getOSMLayer: function() {
        return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            detectRetina: true
        });
    },
    _getGoogleLayer: function() {
        return L.tileLayer('http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 18,
            attribution: 'Google Maps',
            // retina: '@2x',
            detectRetina: true
        })
    },
    _getMapBoxLayer: function() {
        return L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoid29va29uZ2NvcnAiLCJhIjoiY2puZmxxcnRyMWdyMjNxcDhxd2wzbHluYiJ9.TabL0cfDyl9TrcCEwHzgEg', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets',
            // retina: '@2x',
            detectRetina: true
        })
    },
    getTileLayer: function() {
        //return chihuo._getOSMLayer();
        return chihuo._getMapBoxLayer();
        //return chihuo._getGoogleLayer();
    },
    initMapOption:function(mapData,clatlon){
        newChihuo.allMarkerWrap = [];
        var _clatlon = clatlon || [mapData[0].address_latitude,mapData[0].address_longitude];
        var _level = newChihuo.maplastlevel || 14;
        console.log(_level);
        newChihuo.map = L.map('leafletMap').setView(_clatlon, _level);
        newChihuo.baselayer = chihuo.getTileLayer();
        newChihuo.baselayer && !newChihuo.map.hasLayer(newChihuo.baselayer) && newChihuo.baselayer.addTo(newChihuo.map);
        //newChihuo.myIcon0 = newChihuo.myIcon0 || L.icon({
        //        iconUrl: 'imgs/pin50.png',
        //        iconSize: [50, 45],  // [45, 50],
        //        iconAnchor: [26, 45], // [22, 94],
        //        popupAnchor:  [0, -45], // [0, -90],
        //        className: 'dot'
        //    });
        //var myLocationMarker = L.marker(_clatlon,{icon: newChihuo.myIcon0 });
        ////myLocationMarker.on('click', function() {
        ////    $(myLocationMarker._icon).addClass('dot');
        ////});
        //myLocationMarker.addTo(newChihuo.map);
        newChihuo.curQueryCenterPoint = _clatlon;
        var myLocationMarker0 = new L.Marker(_clatlon, {
            icon: L.divIcon({
                className: 'dot',
                iconAnchor: [20, 20],
                iconSize: [40, 40],
            }),
                opacity: 1,
                zIndexOffset: -100  // -16 at least
        });
        //myLocationMarker0.on('click', onMarkerClick);
        newChihuo.map.addLayer(myLocationMarker0);
        newChihuo.allMarkerWrap.push(myLocationMarker0);
    },
    rmAMarker: function(marker) {
        if (newChihuo.map && marker) {
            newChihuo.map.removeLayer(marker); // remove
        }
    },
    rmNewCenterMarker: function() {
        chihuo.rmAMarker(newChihuo.newCenterMarkerLayer);
    },
    setQueryCenterMarker: function(markerOnClick, newlatlng, popinfo) {
        if (!newChihuo.map) {
            return;
        }
        newChihuo.newCenterIcon =  newChihuo.newCenterIcon || L.icon({
                iconUrl: 'imgs/arrow-dong.gif',
                iconSize: [40, 34], // [24, 40],
                iconAnchor: [20, 34], // [22, 94],
                popupAnchor:  [0, -34], //  [-10, -90],
            });
        chihuo.rmAMarker(newChihuo.newCenterMarkerLayer);
        var _newpoint = newlatlng || newChihuo.map.getCenter();
        newChihuo.newCenterMarkerLayer = L.marker(_newpoint, {icon: newChihuo.newCenterIcon}).on('click', function() {
            markerOnClick && markerOnClick(_newpoint);
        }).addTo(newChihuo.map);
        var popup = popinfo || 'Click & Get new search';
        newChihuo.newCenterMarkerLayer.bindPopup(popup, {autoPan:false, autoClose: false}).openPopup();
        setTimeout(function() {
            newChihuo.newCenterMarkerLayer && newChihuo.newCenterMarkerLayer.closePopup();
        }, 3000);
    },
  mapFitBounds: function(markers) {
      if(newChihuo.map && markers && markers.length > 0) {
          var markersFeatureGroup = L.featureGroup(markers);  //.addTo(newChihuo.map);
          newChihuo.map && newChihuo.map.fitBounds(markersFeatureGroup.getBounds());
      }
  },
  initMapShow: function(mapData,index){
    newChihuo.markerWrap = [];
    if(mapData && mapData.length){
     newChihuo.myIcon1 = newChihuo.myIcon1 || L.icon({
          iconUrl: 'imgs/marker2.png',
          iconSize: [40, 40],  // [45, 50],
          iconAnchor: [20, 40], // [22, 94],
          popupAnchor:  [0, -40], // [0, -90],
          className: 'set-index'
      });

      newChihuo.myIcon2 =  newChihuo.myIcon2 || L.icon({
          iconUrl: 'imgs/marker.png',
          iconSize: [20, 34], // [24, 40],
          iconAnchor: [10, 34], // [22, 94],
          popupAnchor:  [0, -34], //  [-10, -90],
      });

        newChihuo.clusterMarkers = L.markerClusterGroup();
        var marker0 = null;
        for (var i = 0; i < mapData.length; i++) {
            var lat = mapData[i].address_latitude;
            var lon = mapData[i].address_longitude;
            var title = mapData[i].rest_name;
            var popup = '<span class="get-direction go-direction" lat ="' + mapData[i].address_latitude + '" lng="' + mapData[i].address_longitude + '"  name = "' + mapData[i].rest_name + '">' + mapData[i].rest_name + '<br>Get Directions</span>';
            var marker = L.marker(new L.LatLng(lat, lon), { title: title, icon: i==index ? newChihuo.myIcon1 : newChihuo.myIcon2});
            if (i == index) {
                marker0 = marker;
            }
            marker.bindPopup(popup, {autoPan:false});
            newChihuo.markerWrap.push(marker);
            newChihuo.clusterMarkers.addLayer(marker);
        }

        newChihuo.map.addLayer(newChihuo.clusterMarkers);
        newChihuo.allMarkerWrap.push.apply(newChihuo.allMarkerWrap, newChihuo.markerWrap);
        chihuo.mapFitBounds(newChihuo.allMarkerWrap);

        //if (newChihuo.clusterMarkers && marker0) {
        //    setTimeout(function() {
        //        var parent = newChihuo.clusterMarkers.getVisibleParent(marker0);
        //        if (parent && parent !== marker0) {
        //            parent.spiderfy();
        //        }
        //        setTimeout(function () {
        //            marker0 && marker0.openPopup();
        //        }, 1500);
        //    },1500);
        //}
    }
  },
    initMapShow2: function(mapData,index){
        newChihuo.markerWrap2 = [];
        if(mapData && mapData.length){
            newChihuo.myIcon1 = newChihuo.myIcon1 || L.icon({
                    iconUrl: 'imgs/marker2.png',
                    iconSize: [40, 40],  // [45, 50],
                    iconAnchor: [20, 40], // [22, 94],
                    popupAnchor:  [0, -40], // [0, -90],
                    className: 'set-index'
                });

            newChihuo.myIcon2 =  newChihuo.myIcon2 || L.icon({
                    iconUrl: 'imgs/marker.png',
                    iconSize: [20, 34], // [24, 40],
                    iconAnchor: [10, 34], // [22, 94],
                    popupAnchor:  [0, -34], //  [-10, -90],
                });

            newChihuo.clusterMarkers = L.markerClusterGroup();
            var marker0 = null;
            for (var i = 0; i < mapData.length; i++) {
                var lat = mapData[i].address_latitude;
                var lon = mapData[i].address_longitude;
                var title = mapData[i].rest_name;
                var popup = '<span class="get-direction go-direction" lat ="' + mapData[i].address_latitude + '" lng="' + mapData[i].address_longitude + '"  name = "' + mapData[i].rest_name + '">' + mapData[i].rest_name + '<br>Get Directions</span>';
                var marker = L.marker(new L.LatLng(lat, lon), { title: title, icon: i==index ? newChihuo.myIcon1 : newChihuo.myIcon2});
                if (i == index) {
                    marker0 = marker;
                }
                marker.bindPopup(popup, {autoPan:false});
                newChihuo.markerWrap2.push(marker);
                newChihuo.clusterMarkers.addLayer(marker);
            }

            newChihuo.map.addLayer(newChihuo.clusterMarkers);

            newChihuo.allMarkerWrap.push.apply(newChihuo.allMarkerWrap, newChihuo.markerWrap2);
            newChihuo.markerWrap2 = newChihuo.allMarkerWrap;
            //chihuo.mapFitBounds(newChihuo.allMarkerWrap);
            //if (newChihuo.clusterMarkers && marker0) {
            //    setTimeout(function() {
            //        var parent = newChihuo.clusterMarkers.getVisibleParent(marker0);
            //        if (parent && parent !== marker0) {
            //            parent.spiderfy();
            //        }
            //        setTimeout(function () {
            //            marker0 && marker0.openPopup();
            //        }, 1500);
            //    },1500);
            //}
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
    // console.log('压缩前：', initSize);
    // console.log('压缩后：', base64data.length);
    // console.log('压缩率：', 100 * (initSize - base64data.length) / initSize, "%");

    canvas = ctx = null;

    return base64data;

  },

  imgstrupload: function() { 

    return newChihuo.address + "/wkfdmk/imagestrupload.j";
  },

  uploadusrphotostr: function() { 
    return this.getApiUri2() + "/upload_user_photostr.json";
  }

}

var photoUse={
    bindEvents: function(cb){
      newChihuo.resumeOff = true;
      $('.photo-select-wrap').addClass('show-photo-select');
      $('.photo-action1').off('click').on('click',function(){
        photoUse.init(cb);
        $('.photo-select-wrap').toggleClass('show-photo-select');
      });

       $('.photo-action2').off('click').on('click',function(){
        photoUse.doUploadPhoto(cb);
        $('.photo-select-wrap').toggleClass('show-photo-select');
      });

    },
     doUploadPhoto: function(cb) {
        var formSelector = "#usr-formPhoto";
        if (!document.getElementById('usrFile')) {
          $(formSelector).append("<input id='usrFile' type='file' name='file[]' accept='image/*' multiple/>").find("input").click();
        } else {
          $(formSelector).find("input").click();
        }
        var filechooser = document.getElementById('usrFile');
        filechooser.onchange = function () {
          var files = this.files;
          for(var i=0; i< files.length; i++){ //尝试多图上传
          var file = files[i];

          if(!file || $.trim(file.name).length == 0) {
            $(formSelector + " input").remove();
            return;
          }

          if(!($.trim(file.name).toLowerCase().indexOf('.jpg') > -1 || $.trim(file.name).toLowerCase().indexOf('.jpeg') > -1 || $.trim(file.name).toLowerCase().indexOf('.png') > -1)) {
            alert('Please chose a jpg, jpeg, or png image file. '); // getWKLocaleSrc('不支持当前所选文件的类型或格式，请选择一个图片文件，最好是jpg图片文件，再试一次...'));
          }

          var reader = new FileReader();
          reader.onload = function () {
            var result = this.result;
            var img = new Image();
            // 如果图片大于 10 M，不允许上传
            if (result.length > chihuo.picMaxSize) {
              alert('Image is too large, please chose a smaller one and try again.'); // getWKLocaleSrc('图片尺寸太大，请选择较小的图片上传...'));
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
                       newChihuo.resumeOff = false;
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
        }
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
                       newChihuo.resumeOff = false;
                       // $('.comment-photo-wrap').prepend(data);

                        // $('.user-textarea').val(data);
                        // $(target).find("b").text(getWKLocaleSrc("上传成功"));
                    } else {
                        // $(target).find("b").text(getWKLocaleSrc("上传失败"));
                        // reLogin(data);
                    }
                };

                var onError = function (data) {
                   newChihuo.showPopInfo(newChihuo.localize('fail_to_upload_photo'));
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
                alert('Please chose a jpg, jpeg, or png image file. '); // getWKLocaleSrc('不支持当前所选文件的类型或格式，请选择一个图片文件，最好是jpg图片文件，再试一次...'));
            }

            var reader = new FileReader();
            reader.onload = function () {
                var result = this.result;
                var img = new Image();
                // 如果图片大于 10 M，不允许上传
                if (result.length > chihuo.picMaxSize) {
                    alert('Image is too large, please chose a smaller one and try again.'); // getWKLocaleSrc('图片尺寸太大，请选择较小的图片上传...'));
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
      initData.contactData.data = c;
      (c.length > 0) && cb && cb(c);
      
      
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


var WK_OPEN_MAP_APP = function (lat, lng, label) {
    var geocoords = lat + ',' + lng;
    var u = navigator.userAgent
    var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

    //if ((navigator.platform.indexOf('iPhone') != -1) || (navigator.platform.indexOf('iPad') != -1) || (navigator.platform.indexOf('iPod') != -1)) {
    //    iOS = true
    //}
    //var Android = false;
    //if ((navigator.platform.indexOf('Android') != -1) || (navigator.platform.indexOf('android') != -1) || (navigator.platform.indexOf('ANDROID') != -1)) {
    //    Android = true
    //}
    var mlabel = encodeURI(label);
    if (iOS) {
        window.open('maps://?q=' + geocoords, '_system');
    } else if (Android) {
        window.open('geo:0,0?q=' + geocoords + '(' + mlabel + ')', '_system');
    } else {
        window.open('http://maps.apple.com/maps?q=' + geocoords + '(' + mlabel + ')', '_system');
    }
}



//-----------calculate distance between 2 points-----------
//http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
var WKMathRad = function(x) {
    return x * Math.PI / 180;
};
var WKMathGetDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = WKMathRad(p2[0] - p1[0]);
    var dLong = WKMathRad(p2[1] - p1[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(WKMathRad(p1[0])) * Math.cos(WKMathRad(p2[0])) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};
//-----------calculate distance between 2 points-----------
// 现在WKMapShouldQuery只是一个基本工具型函数了，只是判断2点距离是否大于阈值，
// 如果想要避免每次总是一点一点的变化而导致永远不被通知的情况请像WKGpsInfoNotifier里一样，
// 另做一个函数并用一个变量保存上次一通知时的位置即可而不用像下面的注释里那样麻烦
var WKMapShouldQuery = function(preCenter,curCenter,minDistance) {
    //var d1 = WKMathGetDistance(usrCenter,curCenter);
    //var d2 = WKMathGetDistance(usrCenter,preCenter);
    var d3 = WKMathGetDistance(preCenter,curCenter);
    var threshold = chihuo.mapMinQueryDistance;
    if(!!minDistance && typeof minDistance === 'number' && minDistance >= 5) {
        threshold = minDistance;
    }
    // 只考虑一定要更新情况：一切从简只考虑这次和上次的变动问题，用以过滤一些太频繁的更新请求，
    // 放弃C2判断，如果用户非要一点一点的只有靠加点击事件人为触发查询请求
    // 只要上一次中心点和当前中心距离超过阈值就必须更新
    var c1 = d3 > threshold;
    // 尽管上一次中心点和当前中心距离没有超过阈值，但是如果用户位置点与当前中心点距离超过阈值，
    // 且用户位置与上一次中心点距离没用超过阈值，则必须更新。
    // 另一种情况：上一次中心与用户位置距离大于阈值则说明上一次已经做过查询而不必再因为这次很小的位置变动再查询了。
    // 还有如果3个距离都小于阈值一定不必更新，而d1和d3小于阈值而d2大于阈值则说明上次要更新这次也不用更新
    //var c2 = d1 > threshold && d2 < threshold;//此条件防止一点一点移中心点的情况，只要当前点与用户位置距离超过阈值，且d2小于阈值
    //console.log("distance=" + d3 + " threshold="+threshold);
    if (c1 ) {
        console.log("should query." + d3 + " " + threshold);
        return true;
    } else {
        console.log("skip query." + d3 + " " + threshold);
        return false;
    }
};