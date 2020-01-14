define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolIndexTemplate.html',
  'swiper'
], function($, _, Backbone, schoolIndexTemplate){

  var SchoolIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
        
     
    },

    render: function(id){
      newChihuo.setPage('schoolIndex');
      newChihuo.windowInit();
      initData.schoolIndexData.rest = id;
      this.$el.html(_.template(schoolIndexTemplate,initData.schoolIndexData));
      this.initData();
    },

    initData: function(){
      var _this = this;

       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('lstCustMobile.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
          success: function(data){
                if(data.status == 0){
                    initData.phoneIndexData.data = data.data[0];
                    newChihuo.getPage('schoolIndex') && _this.$el.html(_.template(schoolIndexTemplate,initData.schoolIndexData));
                }else{
                    newChihuo.showPopInfo(data.errorMsg,1200);
                }
            } 
        }); 
    
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri4('lstChildren.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                initData.schoolIndexData.data = data.data;
                newChihuo.getPage('schoolIndex') && _this.$el.html(_.template(schoolIndexTemplate,initData.schoolIndexData));
              }else{
                 newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });  
    },

  



  });
  return SchoolIndexView;
});
