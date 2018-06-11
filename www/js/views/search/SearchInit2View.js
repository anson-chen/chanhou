define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchInit2Template.html'
], function($, _, Backbone, searchInit2Template){

  var SearchInit2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #searchInit2Tab a':'showTabWrap'
    },

    render: function(status){
      newChihuo.setPage('searchInit2');
      newChihuo.windowInit();
      this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
     
        this.findCustRestSearchHis();
      
        this.findCustMiSearchHis();
     
        this.findCustRestSearchHotKW();
      
        this.findCustMiSearchHotKW();
            
      this.bindEvents(status);

    },

    findCustRestSearchHis: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findCustRestSearchHis.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                  },
                  success: function(data){ 
                    if(data.status == 0){
                      initData.searchInit2Data.restHis = data.data;
                      newChihuo.getPage('searchInit2') && _this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
                     }
                  } 
            });  

    },

    findCustMiSearchHis: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findCustMiSearchHis.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                  },
                  success: function(data){ 
                    if(data.status == 0){
                      initData.searchInit2Data.miHis = data.data;
                      newChihuo.getPage('searchInit2') && _this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
                     }
                  } 
            });  

    },

    findCustRestSearchHotKW: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findCustRestSearchHotKW.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.searchInit2Data.restHot = data.data;
                      newChihuo.getPage('searchInit2') && _this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
                     }
                   }
  
            });  

    },

    findCustMiSearchHotKW: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findCustMiSearchHotKW.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.searchInit2Data.miHot = data.data;
                        newChihuo.getPage('searchInit2') && _this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
                     }
                   }
  
            });  

    },

    bindEvents: function(status){
       $("#page").on('keyup','#searchInit',function(){
          var value = $.trim($(this).val());
          var index = $('#searchInit2Tab .cur').index();
          if(value){
            var url = index == 0 ? 'addCustRestByName.json' : 'addCustRestMIByName.json';
            var option = index == 0 ? {
                     restname: value,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                } : {
                     restminame: value,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     st: 1 ,
                     ct: 20
                };
            chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri(url),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                        var list = data.data;
                        if(list.length){
                          var html='';
                          for(var i=0; i<list.length; i++){
                            if(status == 'wish'){
                          
                              html+='<li><a href="#restaurantList/'+encodeURIComponent(list[i].rest_name)+'/wish">'+list[i].rest_name+'<span>'+list[i].total_rests_byname+'个结果</span></a></li>';
                            }else{
                              
                              html+='<li><a href="#restaurantList/'+encodeURIComponent(list[i].rest_name)+'">'+list[i].rest_name+'<span>'+list[i].total_rests_byname+'个结果</span></a></li>';
                            }
                            
                        }
                        $('.search-value-show').show().find('ul').html(html);
                     }
                   }
                  } 
            });  
          }
       });

       $('#page').on('click','.value-close',function(){
           $('.search-value-show').hide();
       });

       $('#page').on('click','.rest-delete',function(){
        var name = $(this).next('span').text();
        var obj = $(this).parent();
                chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('rmCustRestSearchHis.json'),
                  data: {
                     restname: name,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        obj.remove();
                     }
                   }
            });  
       });

       $('#page').on('click','.mi-delete',function(){
           var name = $(this).next('span').text();
           var obj = $(this).parent();
                chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('rmCustMiSearchHis.json'),
                  data: {
                     restminame: name,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        obj.remove();
                     }
                   }
            });  
       });

       $('#page').on('click','.clear-all',function(){
        var index = $(this).index('.clear-all');
        var url = index==0 ? 'rmCustAllRestSearchHis.json' : 'rmCustAllMiSearchHis.json';
                chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri(url),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        $('.search-history').eq(index).html('');
                     }
                   }
            });  
       });

    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      swiperSearchInit2.slideTo(index);
    }

    

  });
  return SearchInit2View;
});
