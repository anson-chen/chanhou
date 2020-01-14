// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  shim:{
    'bootstrap': ['jquery'],
    'jqueryMove': ['jquery']
  },
  paths: {
    jquery: 'libs/jquery/jquery-2.1.4.min',
    jqueryMove: 'libs/jquery/jquery.event.move',
    bootstrap: 'libs/bootstrap/bootstrap.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates',
    swiper:'swiper.min',
    mobiscroll: '../mobiscroll/js/mobiscroll',
    slotmachine: 'jquery.slotmachine',
    iscroll: 'iscroll',
    radialIndicator: 'radialIndicator',
    touche: 'touche',
    pullRefresh: 'p-pull-refresh',
    auth0cordova: 'auth0cordova',
    cordovaAuth0plugin: 'cordova-auth0-plugin',
    lazyLoad: 'jquery.lazyload.min'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
