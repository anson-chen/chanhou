define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchInitTemplate.html'
], function($, _, Backbone, searchInitTemplate){

  var SearchInitView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
     
    },

    render: function(){
      newChihuo.setPage('searchInit');
      newChihuo.windowInit();
      this.$el.html(_.template(searchInitTemplate));
      this.initData();
    },

    initData: function(){
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findRestDetailByName2.json'),
                  data: {
                     restname: '羊',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1,
                     ct: 10,
                     filters: 'city'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                     }
                  } 
              });  
    }

    

  });
  return SearchInitView;
});
