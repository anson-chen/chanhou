// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/restaurant/RestaurantView',
  'views/restaurant/RestaurantListView',
  'views/restaurant/RestaurantList2View',
  'views/restaurant/RestaurantMapsView',
  'views/comment/UserCommentsView',
  'views/comment/SubmitCommentView',
  'views/search/SearchView',
  'views/search/SearchSetView',
  'views/food/FoodMenuView',
  'views/my/MyHistoryView',
  'views/my/MyShakeView',
  'views/search/SearchInitView',
  'views/map/MapView',
  'views/map/Map2View',
  'views/map/Map3View',
  'views/search/SearchHotView',
  'views/restaurant/RestaurantWishesView',
  'views/search/SearchInit2View',
  'views/food/FoodListView',
  'views/food/FoodMapsView',
  'views/food/FoodView',
  'views/photo/PhotoListView',
  'views/photo/PhotoDetailView',
  'views/photo/CuisineListView',
  'views/photo/CityListView',
  'views/my/MyWishView',
  'views/my/MySettingsView',
  'views/my/MyLikeView',
  'views/my/MySignInView',
  'views/my/MyFocusView',
  'views/my/MyFansView',
  'views/my/MyPhotosView',
  'views/my/MyCommentsView',
  'views/my/MyIndexView',
  'views/my/MyRankView',
  'views/my/MyMessageView',
  'views/login/LoginView',
  'views/register/RegisterView',
  'views/my/MyMessage2View',
  'views/my/MyFootprintView',
  'views/my/MyDiscountView',
  'views/chat/ChatIndexView',
  'views/chat/ChatInviteView',
  'views/chat/ChatChooseView',
  'views/chat/ChatContentView',
  'views/chat/ChatAddView',
  'views/chat/ChatApplyView',
  'views/chat/ChatRequestView',
  'views/restaurant/RestaurantNearView',
  'views/register/PasswordView',
  'views/my/MyProfileView',
  'views/setting/PraviteSettingView',
  'views/setting/AboutUsView',
  'views/setting/AppUpdateView',
  'views/setting/LangSettingView',
  'views/setting/MessageRemindView',
  'views/setting/PraviteProtocolView',
  'views/setting/SafeProtocolView',
  'views/setting/UserGuideView',
  'views/chat/ChatMessageView',
  'views/register/ForgetPasswordView',
  'views/comment/SubmitMiCommentView',
  'views/photo/DishHot1View',
  'views/photo/DishHot2View',
  'views/photo/DishHot3View',
  'views/photo/DishHot4View',
  'views/comment/UserMiCommentsView',
], function($, _, Backbone, HomeView,RestaurantView,RestaurantListView,RestaurantList2View,RestaurantMapsView,UserCommentsView,SubmitCommentView,SearchView,SearchSetView,FoodMenuView,MyHistoryView,MyShakeView,SearchInitView,MapView,Map2View,Map3View,SearchHotView,RestaurantWishesView,SearchInit2View,FoodListView,FoodMapsView,FoodView,PhotoListView,PhotoDetailView,CuisineListView,CityListView,MyWishView,MySettingsView,MyLikeView,MySignInView,MyFocusView,MyFansView,MyPhotosView,MyCommentsView,MyIndexView,MyRankView,MyMessageView,LoginView,RegisterView,MyMessage2View,MyFootprintView,MyDiscountView,ChatIndexView,ChatInviteView,ChatChooseView,ChatContentView,ChatAddView,ChatApplyView,ChatRequestView,RestaurantNearView,PasswordView,MyProfileView,PraviteSettingView,AboutUsView,AppUpdateView,LangSettingView,MessageRemindView,PraviteProtocolView,SafeProtocolView,UserGuideView,ChatMessageView,ForgetPasswordView,SubmitMiCommentView,DishHot1View,DishHot2View,DishHot3View,DishHot4View,UserMiCommentsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',// 
      'register':'showRegister',
      'password':'showPassword',
      'restaurant/:id':'showRestaurant',
      'restaurant/:id/:from':'showRestaurant',
      'restaurantList/:name':'showRestaurantList',
      'restaurantList/:name/:wish':'showRestaurantList',
      'restaurantList2/:city/:ctype':'showRestaurantList2',
      // 'restaurantList':'showRestaurantList',
      'restaurantMaps':'showRestaurantMaps', 
      'userComments/:id':'showUserComments', 
      'userMiComments/:id':'showUserMiComments', 
      'submitComment/:id':'showSubmitComment',
      'submitMiComment/:id/:name':'showSubmitMiComment',  
      'search':'showSearch', 
      'searchSet':'showSearchSet',
      'foodList':'showFoodList',
      'foodMenu/:id':'showFoodMenu',
      'foodMenu/:id/:name':'showFoodMenu',
      'foodMenu':'showFoodMenu',
      'foodMaps':'showFoodMaps',
      'food':'showFood',
      'food/:id':'showFood',
      'food/:restId/:menuId':'showFood',
      'myShake':'showMyShake', 
      'searchInit':'showSearchInit',
      'map':'showMap',
      'map2':'showMap2',
      'map3':'showMap3',
      'searchHot':'showSearchHot',
      'restaurantWishes':'showRestaurantWishes',
      'restaurantNear':'showRestaurantNear',
      'mySettings':'showMySettings', 
      'myFocus':'showMyFocus', 
      'myLike':'showMyLike',  
      'myFans':'showMyFans', 
      'myHistory':'showMyHistory', 
      'myPhotos':'showMyPhotos', 
      'mySignIn':'showMySignIn', 
      'myWish':'showMyWish',
      'myComments':'showMyComments',
      'myIndex':'showMyIndex',
      'myIndex/:id':'showMyIndex',
      'myRank':'showMyRank',
      'myProfile':'showMyProfile',
      'myMessage':'showMyMessage',
      'searchInit2':'showSearchInit2',
      'searchInit2/:wish':'showSearchInit2',
      'photoList':'showPhotoList',  
      'photoDetail':'showPhotoDetail',
      'myMessage2':'showMyMessage2',
      'myFootprint':'showMyFootprint',
      'myDiscount':'showMyDiscount',
      'chatIndex':'showChatIndex',
      'chatInvite':'showChatInvite',
      'chatChoose':'showChatChoose',
      'chatContent/:id/:name':'showChatContent',
      'chatAdd':'showChatAdd',
      'chatRequest':'showChatRequest',
      'chatMessage':'showChatMessage',
      'chatApply/:id/:name':'showChatApply', 
      'cuisineList/:city':'showCuisineList', 
      'cityList/:city':'showCityList', 
      'praviteSetting':'showPraviteSetting',
      'aboutUs':'showAboutUs',
      'appUpdate':'showAppUpdate',
      'langSetting':'showLangSetting',
      'messageRemind':'showMessageRemind',
      'praviteProtocol':'showPraviteProtocol',
      'safeProtocol':'showSafeProtocol',
      'userGuide':'showUserGuide',
      'forgetPassword':'showForgetPassword', 
      'dishHot1':'showDishHot1',
      'dishHot2/:name':'showDishHot2',
      'dishHot3/:level':'showDishHot3',
      'dishHot4/:level/:name':'showDishHot4',
      // Default
      '*actions': 'defaultAction'//'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    var homeView, restaurantView,  restaurantListView, restaurantList2View,  restaurantMapsView, userCommentsView, submitCommentView,searchView, foodListView, myShakeView, mySettingsView, myFocusView, myLikeView, myFansView, myHistoryView, myPhotosView, mySignInView, myWishView, searchView, searchSetView, foodListView, foodMenuView, searchInitView, mapView, map2View, map3View, searchHotView, restaurantWishesView,restaurantNearView, searchInit2View ,foodView ,foodMapsView,photoDetailView,photoListView,myFocusView,myFansView,myPhotosView, loginView, registerView, myCommentsView,myIndexView, myRankView, myMessageView, myMessage2View,myFootprintView, myDiscountView, chatIndexView, chatInviteView, chatChooseView, chatContentView,chatAddView, chatApplyView,cuisineListView,cityListView,passwordView,myProfileView,praviteSettingView,chatRequestView,aboutUsView,appUpdateView,langSettingView,messageRemindView,praviteProtocolView,safeProtocolView,userGuideView,chatMessageView,forgetPasswordView,submitMiCommentView,dishHot1View,dishHot2View,dishHot3View,dishHot4View,userMiCommentsView;

    app_router.on('route:showLogin', function (actions) {
        loginView = loginView || new LoginView();
        loginView.render();
    });

    app_router.on('route:showRegister', function (actions) {
        registerView = registerView || new RegisterView();
        registerView.render();
    });

     app_router.on('route:showPassword', function (actions) { 
        passwordView = passwordView || new PasswordView();
        passwordView.render();
    });

    app_router.on('route:showRestaurant', function (actions,from) {
       // We have no matching route, lets display the home page 
        restaurantView = restaurantView || new RestaurantView();
        if(from){
          restaurantView.render(actions,from);
        }else{
          restaurantView.render(actions);
        }
        
    });

    app_router.on('route:showRestaurantList', function (actions,wish) {
       // We have no matching route, lets display the home page 
        restaurantListView = restaurantListView || new RestaurantListView();    
        if(wish){
          restaurantListView.render(actions,wish);
        }else{
          restaurantListView.render(actions);
        }
        
    });

     app_router.on('route:showRestaurantList2', function (actions,city) {
       // We have no matching route, lets display the home page 
        restaurantList2View = restaurantList2View || new RestaurantList2View();
        restaurantList2View.render(actions,city);
        
    });

    app_router.on('route:showRestaurantMaps', function (actions) {
       // We have no matching route, lets display the home page 
        restaurantMapsView = restaurantMapsView || new RestaurantMapsView();
        restaurantMapsView.render();
    });

    app_router.on('route:showRestaurantNear', function (actions) {
       // We have no matching route, lets display the home page 
        restaurantNearView = restaurantNearView || new RestaurantNearView();
       
        restaurantNearView.render();
        
    });

    app_router.on('route:showSubmitComment', function (actions) {
       // We have no matching route, lets display the home page 
        submitCommentView = submitCommentView || new SubmitCommentView();
        submitCommentView.render(actions);
    });

     app_router.on('route:showSubmitMiComment', function (actions,name) {
       // We have no matching route, lets display the home page 
        submitMiCommentView = submitMiCommentView || new SubmitMiCommentView();
        submitMiCommentView.render(actions,name);
    });

    app_router.on('route:showUserComments', function (actions) {
       // We have no matching route, lets display the home page 
        userCommentsView = userCommentsView || new UserCommentsView();
        userCommentsView.render(actions);
    });

    app_router.on('route:showUserMiComments', function (actions) {
       // We have no matching route, lets display the home page 
        userMiCommentsView = userMiCommentsView || new UserMiCommentsView();
        userMiCommentsView.render(actions);
    });

    app_router.on('route:showSearch', function (actions) {
       // We have no matching route, lets display the home page 
        searchView = searchView || new SearchView();
        searchView.render();
    });

    app_router.on('route:showSearchSet', function (actions) {
       // We have no matching route, lets display the home page 
        searchSetView = searchSetView || new SearchSetView();
        searchSetView.render();
    });

    app_router.on('route:showSearchInit', function (actions) {
       // We have no matching route, lets display the home page 
        searchInitView = searchInitView || new SearchInitView();
        searchInitView.render();
    });

     app_router.on('route:showSearchInit2', function (actions) {
       // We have no matching route, lets display the home page 
        searchInit2View = searchInit2View || new SearchInit2View();
        searchInit2View.render(actions);
    });

    app_router.on('route:showSearchHot', function (actions) {
       // We have no matching route, lets display the home page 
        searchHotView = searchHotView || new SearchHotView();
        searchHotView.render();
    });

     app_router.on('route:showRestaurantWishes', function (actions) {
       // We have no matching route, lets display the home page 
        restaurantWishesView = restaurantWishesView || new RestaurantWishesView();
        restaurantWishesView.render();
    });


    app_router.on('route:showMap', function (actions) {
       // We have no matching route, lets display the home page 
        mapView = mapView || new MapView ();
        mapView.render();
    });

    app_router.on('route:showMap2', function (actions) {
       // We have no matching route, lets display the home page 
        map2View = map2View || new Map2View ();
        map2View.render();
    });

     app_router.on('route:showMap3', function (actions) {
       // We have no matching route, lets display the home page 
        map3View = map3View || new Map3View ();
        map3View.render();
    });


    app_router.on('route:showFoodList', function (actions) {
       // We have no matching route, lets display the home page 
        foodListView = foodListView|| new FoodListView();
        foodListView.render();
    });

    app_router.on('route:showFoodMenu', function (actions,name) {
       // We have no matching route, lets display the home page 
        foodMenuView = foodMenuView|| new FoodMenuView();
        if(name){
          foodMenuView.render(actions,name);
        }else{
          foodMenuView.render(actions);
        }
    });

    app_router.on('route:showFood', function (actions,name) {
       // We have no matching route, lets display the home page 
        foodView = foodView|| new FoodView();
         if(name){
          foodView.render(actions,name);
         }else{
          foodView.render(actions);
         }
        
    });

    app_router.on('route:showFoodMaps', function (actions) {
       // We have no matching route, lets display the home page 
        foodMapsView = foodMapsView|| new FoodMapsView();
        foodMapsView.render();
    });

    app_router.on('route:showMyShake', function (actions) {
       // We have no matching route, lets display the home page 
        myShakeView = myShakeView || new MyShakeView();
        myShakeView.render();
    });

    app_router.on('route:showMySettings', function (actions) {
       // We have no matching route, lets display the home page 
        mySettingsView = mySettingsView || new MySettingsView();
        mySettingsView.render();
    });

    app_router.on('route:showMyFocus', function (actions) {
       // We have no matching route, lets display the home page 
        myFocusView = myFocusView || new MyFocusView();
        myFocusView.render();
    });

    app_router.on('route:showMyLike', function (actions) {
       // We have no matching route, lets display the home page 
        myLikeView = myLikeView || new MyLikeView();
        myLikeView.render();
    });

    app_router.on('route:showMyFans', function (actions) {
       // We have no matching route, lets display the home page 
        myFansView = myFansView || new MyFansView();
        myFansView.render();
    });

    app_router.on('route:showMyHistory', function (actions) {
       // We have no matching route, lets display the home page 
        myHistoryView = myHistoryView || new MyHistoryView();
        myHistoryView.render();
    });

    app_router.on('route:showMySignIn', function (actions) {
       // We have no matching route, lets display the home page 
        mySignInView = mySignInView || new MySignInView();
        mySignInView.render();
    });

    app_router.on('route:showMyPhotos', function (actions) {
       // We have no matching route, lets display the home page 
        myPhotosView = myPhotosView || new MyPhotosView();
        myPhotosView.render();
    });

    app_router.on('route:showMyWish', function (actions) {
       // We have no matching route, lets display the home page 
        myWishView = myWishView || new MyWishView();
        myWishView.render();
    });

    app_router.on('route:showMyIndex', function (actions) {
       // We have no matching route, lets display the home page 
        myIndexView = myIndexView || new MyIndexView();
        if(actions){
          myIndexView.render(actions);
        }else{
          myIndexView.render();
        }
        
    });

    app_router.on('route:showMyMessage', function (actions) {
       // We have no matching route, lets display the home page 
        myMessageView = myMessageView || new MyMessageView();
        myMessageView.render();
    });

    app_router.on('route:showMyComments', function (actions) {
       // We have no matching route, lets display the home page 
        myCommentsView = myCommentsView || new MyCommentsView();
        myCommentsView.render();
    });

     app_router.on('route:showMyRank', function (actions) {
       // We have no matching route, lets display the home page 
        myRankView = myRankView || new MyRankView();
        myRankView.render();
    });

    app_router.on('route:showPhotoDetail', function (actions) {
       // We have no matching route, lets display the home page 
        photoDetailView = photoDetailView || new PhotoDetailView();
        photoDetailView.render();
    });

    app_router.on('route:showMyDiscount', function (actions) {
       // We have no matching route, lets display the home page 
        myDiscountView = myDiscountView || new MyDiscountView();
        myDiscountView.render();
    });

    app_router.on('route:showMyMessage2', function (actions) {
       // We have no matching route, lets display the home page 
        myMessage2View = myMessage2View || new MyMessage2View();
        myMessage2View.render();
    });

    app_router.on('route:showMyFootprint', function (actions) {
       // We have no matching route, lets display the home page 
        myFootprintView = myFootprintView || new MyFootprintView();
        myFootprintView.render();
    });

    app_router.on('route:showPhotoList', function (actions) {
       // We have no matching route, lets display the home page 
        photoListView = photoListView || new PhotoListView();
        photoListView.render();
    });

    app_router.on('route:showChatApply', function (actions,name) {
       // We have no matching route, lets display the home page 
        chatApplyView = chatApplyView || new ChatApplyView();
        chatApplyView.render(actions,name);
    });

    app_router.on('route:showChatAdd', function (actions) {
       // We have no matching route, lets display the home page 
        chatAddView = chatAddView || new ChatAddView();
        chatAddView.render();
    });

    app_router.on('route:showChatContent', function (actions,name) {
       // We have no matching route, lets display the home page 
        chatContentView = chatContentView || new ChatContentView();
        chatContentView.render(actions,name);
    });

    app_router.on('route:showChatChoose', function (actions) {
       // We have no matching route, lets display the home page 
        chatChooseView = chatChooseView || new ChatChooseView();
        chatChooseView.render();
    });

    app_router.on('route:showChatInvite', function (actions) {
       // We have no matching route, lets display the home page 
        chatInviteView = chatInviteView || new ChatInviteView();
        chatInviteView.render();
    });

    app_router.on('route:showChatRequest', function (actions) {
       // We have no matching route, lets display the home page 
        chatRequestView = chatRequestView || new ChatRequestView();
        chatRequestView.render();
    });

     app_router.on('route:showChatMessage', function (actions) {
       // We have no matching route, lets display the home page 
        chatMessageView = chatMessageView || new ChatMessageView();
        chatMessageView.render();
    });

    app_router.on('route:showChatIndex', function (actions) {
       // We have no matching route, lets display the home page 
        chatIndexView = chatIndexView || new ChatIndexView();
        chatIndexView.render();
    });

    app_router.on('route:showPhotoList', function (actions) {
       // We have no matching route, lets display the home page 
        photoListView = photoListView || new PhotoListView();
        photoListView.render();
    });

    app_router.on('route:showCuisineList', function (actions) {
       // We have no matching route, lets display the home page 
        cuisineListView = cuisineListView || new CuisineListView();
        cuisineListView.render(actions);
    });

    app_router.on('route:showCityList', function (actions) {
       // We have no matching route, lets display the home page 
        cityListView = cityListView || new CityListView();
        cityListView.render(actions);
    });

     app_router.on('route:showMyProfile', function (actions) {
       // We have no matching route, lets display the home page 
        myProfileView = myProfileView || new MyProfileView();
        myProfileView.render();
    });

    app_router.on('route:showPraviteSetting', function (actions) {
       // We have no matching route, lets display the home page 
       praviteSettingView = praviteSettingView || new PraviteSettingView();
       praviteSettingView.render();
    });

    app_router.on('route:showAboutUs', function (actions) {
       // We have no matching route, lets display the home page 
       aboutUsView = aboutUsView || new AboutUsView();
       aboutUsView.render();
    });

    app_router.on('route:showAppUpdate', function (actions) {
       // We have no matching route, lets display the home page 
       appUpdateView = appUpdateView || new AppUpdateView();
       appUpdateView.render();
    });

    app_router.on('route:showLangSetting', function (actions) {
       // We have no matching route, lets display the home page 
       langSettingView = langSettingView || new LangSettingView();
       langSettingView.render();
    });

    app_router.on('route:showMessageRemind', function (actions) {
       // We have no matching route, lets display the home page 
       messageRemindView = messageRemindView || new MessageRemindView();
       messageRemindView.render();
    });

    app_router.on('route:showPraviteProtocol', function (actions) {
       // We have no matching route, lets display the home page 
       praviteProtocolView = praviteProtocolView || new PraviteProtocolView();
       praviteProtocolView.render();
    });

    app_router.on('route:showSafeProtocol', function (actions) {
       // We have no matching route, lets display the home page 
       safeProtocolView = safeProtocolView || new SafeProtocolView();
       safeProtocolView.render();
    });

    app_router.on('route:showUserGuide', function (actions) {
       // We have no matching route, lets display the home page 
       userGuideView = userGuideView || new UserGuideView();
       userGuideView.render();
    });

     app_router.on('route:showForgetPassword', function (actions) {
       // We have no matching route, lets display the home page 
       forgetPasswordView = forgetPasswordView || new ForgetPasswordView();
       forgetPasswordView.render();
    });

    app_router.on('route:showDishHot1', function (actions) {
       // We have no matching route, lets display the home page 
       dishHot1View = dishHot1View || new DishHot1View();
       dishHot1View.render();
    });

     app_router.on('route:showDishHot2', function (actions) {
       // We have no matching route, lets display the home page 
       dishHot2View = dishHot2View || new DishHot2View();
       dishHot2View.render(actions);
    });

      app_router.on('route:showDishHot3', function (actions) {
       // We have no matching route, lets display the home page 
       dishHot3View = dishHot3View || new DishHot3View();
       dishHot3View.render(actions);
    });

       app_router.on('route:showDishHot4', function (actions,name) {
       // We have no matching route, lets display the home page 
       dishHot4View = dishHot4View || new DishHot4View();
       dishHot4View.render(actions,name);
    });



    app_router.on('route:defaultAction', function (actions) {
       // We have no matching route, lets display the home page 
        homeView = homeView || new HomeView();
        homeView.render();
    });
   


    window.app_router = app_router;
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
