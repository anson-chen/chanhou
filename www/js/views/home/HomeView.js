define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryMove',
    'text!templates/home/homeTemplate.html',
    'auth0cordova',
    'auth0-js',
    'text!templates/photo/appLaunchTemplate.html',
    'text!templates/home/bannerDetailTemplate.html',
    'cordovaAuth0plugin',
    'swiper',
], function ($, _, Backbone, jqueryMove, homeTemplate, auth0cordova,Auth0,appLaunchTemplate,bannerDetailTemplate) {

    var HomeView = Backbone.View.extend({
        el: $("#page"),
        events: {
           'focus .index-search input':'searchLink',
           'click .comment-operation':'showInput',
           'click .home-top-location': 'showCity',
           'click #homeCity p': 'changeCity',
           'click .hot-follow': 'addFollow',
           'click .auth0 img':'auth0LockShow',
           'click .set-city-bg':'setCityBg',
           'click .close-index-city':'closeCity',
           'click .go-direction': 'goMap',
           'click .clear-input-value':'clearValue',
           'click #msgFeeds':'clearRedPoint',
           'click .banner-detail':'showBannerDetail',
           'click .banner-return': function(){
            $("#bannerDetailWrap").removeClass('show-banner-detail');
           }
       },

       status: {
        tips: null,
        start: false
       },

      render: function(){ 
            newChihuo.setPage('home');
            newChihuo.windowInit();
            initData.homeData.template = homeTemplate;
            this.$el.html(_.template(homeTemplate, initData.homeData));
            this.appStart(this.status.start);
            this.status.start && chihuo.getPosition(homeTemplate);
            !this.status.tips && newChihuo.showReloadInfo(this.status,'home');
      },
      showBannerDetail: function(e){
        var index = $(e.currentTarget).attr('banner');
        var bannerDetailData =  initData.homeData.bannerData[index] || null;
        $("#bannerDetailWrap").html(_.template(bannerDetailTemplate,bannerDetailData)).addClass('show-banner-detail');
      },


      appStart: function(start){
          if(!start){
            chihuo.appLaunch(appLaunchTemplate);
            chihuo.ajaxSetup();
            setInterval(chihuo.getMsgNum, newChihuo.longSpeed);
            chihuo.initApp(homeTemplate);                      
            if(newChihuo.isMobileDevice()) {
                this.auth0init();
            }
            this.status.start = true;
          }
      },
      
       auth0init: function () {
            function handlerUrl(url) {
                auth0cordova.onRedirectUri(url);
            }
            if(cordova){
              window.open = cordova.InAppBrowser.open;
            }
            window.handleOpenURL = handlerUrl;
        },
        setCityBg: function (e) {
            var obj = $(e.currentTarget);
            var src = obj.find('img').attr('src');
            initData.restaurantList2Data.bg = src;
        },
        auth0LockShow: function () {
            //this.showUserInfo();  // 如果已经login则直接取userinfo，以后用userinfo做foodymonkeyr tpLogin操作，如果没有login则调用auth0cordova做login操作。ii
            this.auth0login();
        },
        showUserInfo: function () { // 以后换成foodymonkey的tpLoging登陆操作
            this.auth0getUserInfo(function (err, profile) {
                if (err) {
                    alert('get user info Error ' + err.message);
                }
                alert(JSON.stringify(profile, null, 4));
                //avatar.src = profile.picture;
            });
        },
        auth0login: function () { // 跳转页面做第3方登陆获取accessToken长期存入本地
            const Auth0Cordova = new auth0cordova({
                domain: "foodymonkey.auth0.com",
                clientId: "fGIEyQ2eW5hEj1CvdRnfeXQUOTuUjDPK",
                packageIdentifier: "com.wookong.foodymonkey"
            });

            const options = {
                scope: 'openid profile',
            };
            try {
                var _this = this
                Auth0Cordova.authorize(options, function (err, result) {
                    if (err) {
                        // console.log('Auth0 failure:' + err); // failure
                    } else {
                        localStorage.setItem('access_token', result.accessToken);
                        _this.auth0getUserInfo(function (err, profile) {
                            if (err) {
                                alert('get user info Error ' + err.message);
                            }
                            var info = JSON.stringify(profile, null, 4);
                            newChihuo.profile = JSON.parse(info);
                            newChihuo.tpLogin(newChihuo.profile);
                        });
                    }
                });
            } catch (err) {
                
            }
        },

        auth0getUserInfo: function (cb) { // 检查accessToken是否存在，如存在直接获取userinfo（若accessToken过期或失效会返回错误以后要加错误处理），如不存在调用auth0cordova 做login
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
        },
        addFollow: function(e){
            var obj=$(e.currentTarget);
            var rest = obj.attr('rest');
            rest &&  chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestFollow.json'),
                  data: {
                     restId: rest,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo(newChihuo.localize('add_a_following'));
                        obj.attr('src',staticSource.restIcon3).removeClass('hot-follow');
                     }
                  } 
              });  
        },



        searchLink: function(){
            app_router.navigate('searchInit2', {
                trigger: true    
            });
        },

        showInput: function(e){
          var obj=$(e.currentTarget);
          if($(obj.children()[0]).hasClass('wechat-icon')){
            $(obj).toggleClass('reply');
            if(obj.parent().parent().find('.user-recall') && obj.parent().parent().find('.user-recall').length > 0){
              return false;
            }
            $('.fix-comment-bottom').toggle();
            $('.chat-input').attr('review',$(obj.children()[0]).attr('review')).val('');
            }
        },

        showCity: function(){
          if($('.city-mask-list').children().length){
             $('.search-mask').show();
             $('.city-mask-list').show();
          }else{
            newChihuo.showPopInfo(newChihuo.localize('scroll_down_to_refresh_no_result'));
          }     
        },

        changeCity: function(e){
            $('.home-top-location').text($(e.currentTarget).text());
            $(e.currentTarget).addClass('cur').siblings().removeClass('cur');
            $('.search-mask').hide();
            $('.city-mask-list').hide();
            chihuo.findHotspotDetails($(e.currentTarget).text(),newChihuo.lat,newChihuo.lon,homeTemplate);
            initData.homeData.cityData[0].cityname = $(e.currentTarget).text();
            newChihuo.city = $(e.currentTarget).text();
            newChihuo.setLocalStorage('city',newChihuo.city);
            newChihuo.setCity = true;
           
        },

        closeCity: function(){
           $('.search-mask').hide();
           $('.city-mask-list').hide();
        },

        goMap: function(e){
           var obj = $(e.currentTarget);
           var lat = obj.attr('lat');
           var lng =  obj.attr('lng');
           var name =  obj.attr('name');
          newChihuo.openMapApp(lat,lng,name);
        },

        clearValue: function(e){
           var obj = $(e.currentTarget);
           $(obj).parent().find('input').val('');
           $('.search-value-show').hide().find('ul').html('');
        },

        clearRedPoint: function(){
          newChihuo.activityNum=0;
        }
    

           
              
    });

    return HomeView;

});
