define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myIndexTemplate.html',
  'swiper'
], function($, _, Backbone, myIndexTemplate){

  var MyIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
     
    },

    render: function(id){
      newChihuo.setPage('myIndex');
      newChihuo.windowInit();
      if(!(newChihuo.customerId || newChihuo.getLocalStorage('customer_id'))){
           initData.myIndexData.data = [];
      }
      if(id){
        initData.myIndexData.id = id;
      }else{
        initData.myIndexData.id = newChihuo.customerId || newChihuo.getLocalStorage('customer_id');
      }
      
      this.$el.html(_.template(myIndexTemplate,initData.myIndexData));
      this.initData(id);
      this.bindEvents();
    },

    initData: function(id){
      var _this = this;
      if(id || newChihuo.customerId || newChihuo.getLocalStorage('customer_id')){
        chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustInfoById.json'),
                  data: {
                     targetId: id || newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.myIndexData.data = data.data;
                        newChihuo.getPage('myIndex') && _this.$el.html(_.template(myIndexTemplate,initData.myIndexData));
                        newChihuo.getPage('myIndex') && _this.bindEvents();
                        if(initData.myIndexData.id == newChihuo.customerId || newChihuo.getLocalStorage('customer_id')){
                          newChihuo.customer = data.data[0].display_name;
                        }
                     }
                  } 
              });  
      }
    },

    bindEvents: function(){
      $(".index-focus").on('click',function(){
        var _this = this;
        chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustCustFollow.json'),
                  data: {
                     followingid:newChihuo.customerId || newChihuo.getLocalStorage('customer_id'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        
                     }
                  } 
              });  

      });
    }



  });
  return MyIndexView;
});
