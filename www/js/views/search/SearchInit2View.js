define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchInit2Template.html'
], function($, _, Backbone, searchInit2Template){

  var SearchInit2View = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #searchInit2Tab a':'showTabWrap',
      'submit #searchInit2':'showInfo',
    },

    render: function(status){
      newChihuo.setPage('searchInit2');
      newChihuo.windowInit();
      this.$el.html(_.template(searchInit2Template,initData.searchInit2Data));
     
      this.findCustRestSearchHis(status);
      
      this.findCustMiSearchHis(status);
     
      this.findCustRestSearchHotKW(status);
      
      this.findCustMiSearchHotKW(status);      
    },

    showInfo: function(event){
      var value = $.trim($("#searchInit").val());
      var index = $('#searchInit2Tab .cur').index();
          if(value){
            var url = index == 0 ? 'getRestByName.json' : 'getRestMIByName.json';
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
                  type: 'GET',
                  url: chihuo.getApiUri(url),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                      var list = data.data;
                        if(list.length){
                          var html='';
                          var last='';
                          if(status == 'wish'){
                            last='/wish';
                          }
                          for(var i=0; i<list.length; i++){
                            if(index == 0){
                              var result = list[i].total_rests_byname > 1 ? ' results' : ' result';

                              html+='<li><a href="#restaurantList/'+encodeURIComponent(list[i].rest_name)+last+'">'+list[i].rest_name+'<span>'+list[i].total_rests_byname+result+'results</span></a></li>';
                            }else{
                              var result = list[i].total_restmi_byname > 1 ? ' results' : ' result';
                              
                              html+='<li><a href="#dishHot2/'+encodeURIComponent(list[i].rest_mi_name)+'/search">'+list[i].rest_mi_name+'<span>'+list[i].total_restmi_byname+result+'results</span></a></li>';
                            }
                            
                        }
                        $('.search-value-show').show().find('ul').html(html);
                       
                     }else{
                        $('.search-value-show').show().find('ul').html('<li><p style="text-align:center;">no result</p></li>');
                     }
                    
                                       
                   }
                  } 
            });  
            event.preventDefault();
          }

    },

    findCustRestSearchHis: function(status){
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
                      newChihuo.getPage('searchInit2') && _this.bindEvents(status);
                     }
                  } 
            });  

    },

    findCustMiSearchHis: function(status){
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
                      newChihuo.getPage('searchInit2') && _this.bindEvents(status);
                     }
                  } 
            });  

    },

    findCustRestSearchHotKW: function(status){
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
                      newChihuo.getPage('searchInit2') && _this.bindEvents(status);
                     }
                   }
  
            });  

    },

    findCustMiSearchHotKW: function(status){
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
                        newChihuo.getPage('searchInit2') && _this.bindEvents(status);
                     }
                   }
  
            });  

    },

    bindEvents: function(status){
       $('.trend-search span').on('click',function(){
          var index = $(this).parent().index('.trend-search');
          var value = $(this).text();
          if(value){
            $("#searchInit").val(value);
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
                          var last='';
                          if(status == 'wish'){
                            last='/wish';
                          }
                          for(var i=0; i<list.length; i++){
                            if(index == 0){

                              var result = list[i].total_rests_byname > 1 ? ' results' : ' result';
                          
                              html+='<li><a href="#restaurantList/'+encodeURIComponent(list[i].rest_name)+last+'"><em>'+list[i].rest_name+'</em><span>'+list[i].total_rests_byname+result+'</span></a></li>';
                            }else{

                               var result = list[i].total_restmi_byname > 1 ? ' results' : ' result';
                              
                              html+='<li><a href="#dishHot2/'+encodeURIComponent(list[i].rest_mi_name)+'/search"><em>'+list[i].rest_mi_name+'</em><span>'+list[i].total_restmi_byname+result+'</span></a></li>';
                            }
                            
                        }
                        $('.search-value-show').show().find('ul').html(html);
                         $('.search-value-show li a').on('click',function(){
                        var option = index == 0 ? {
                                 restname: $(this).find('em').html(),
                                 lat: newChihuo.lat,
                                 lng: newChihuo.lon,
                                 locale: 'en',
                                 st: 1 ,
                                 ct: 20
                            } : {
                                 restminame: $(this).find('em').html(),
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
                                    
                              }
                            });
                        });
                     }else{
                        $('.search-value-show').show().find('ul').html('<li><p style="text-align:center;">no result</p></li>');
                     }
                   }
                  } 
            }); 

            }

       });  
       $("#searchInit").on('keyup',function(e){
          var value = $.trim($(this).val());
          var index = $('#searchInit2Tab .cur').index();
          if(value && e.keyCode!=13){
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
            clearTimeout(this.request);    
            this.request = setTimeout(function(){chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri(url),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                        var list = data.data;
                        if(list.length){
                          var html='';
                          var last='';
                          if(status == 'wish'){
                            last='/wish';
                          }
                          for(var i=0; i<list.length; i++){
                            if(index == 0){

                              var result = list[i].total_rests_byname > 1 ? ' results' : ' result';
                          
                              html+='<li><a href="#restaurantList/'+encodeURIComponent(list[i].rest_name)+last+'"><em>'+list[i].rest_name+'</em><span>'+list[i].total_rests_byname+result+'</span></a></li>';
                            }else{

                               var result = list[i].total_restmi_byname > 1 ? ' results' : ' result';
                              
                              html+='<li><a href="#dishHot2/'+encodeURIComponent(list[i].rest_mi_name)+'/search"><em>'+list[i].rest_mi_name+'</em><span>'+list[i].total_restmi_byname+result+'</span></a></li>';
                            }
                            
                        }
                        $('.search-value-show').show().find('ul').html(html);
                         $('.search-value-show li a').on('click',function(){
                        var option = index == 0 ? {
                                 restname: $(this).find('em').html(),
                                 lat: newChihuo.lat,
                                 lng: newChihuo.lon,
                                 locale: 'en',
                                 st: 1 ,
                                 ct: 20
                            } : {
                                 restminame: $(this).find('em').html(),
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
                                    
                              }
                            });
                        });
                     }else{
                        $('.search-value-show').show().find('ul').html('<li><p style="text-align:center;">no result</p></li>');
                     }
                   }
                  } 
            })},200);  
          }
       });

       $('.value-close').on('click',function(){
           $('.search-value-show').hide();
       });

       $('.rest-delete').on('click',function(){
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

       $('.mi-delete').on('click',function(){
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

       $('.clear-all').on('click',function(){
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
