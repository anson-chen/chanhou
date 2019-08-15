define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
  'localize',
  'auth0cordova',
  'common',
  'radialIndicator',
  'jqueryMove',
  'lazyLoad'
  // 'lock',
], function($, _, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
