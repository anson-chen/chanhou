define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myHistoryTemplate.html',
  'swiper'
], function($, _, Backbone, myHistoryTemplate){

  var MyHistoryView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #historyTab a':'showTabWrap' 
    },

    render: function(){
      newChihuo.setPage('myHistory');
      newChihuo.windowInit();
      this.$el.html(_.template(myHistoryTemplate,initData.myHistoryData));
      this.initData();
      this.bindEvents();
    },

    initData: function(){
      var _this = this;
          chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustBrwHist.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.myHistoryData.data = data.data;
                        newChihuo.getPage('myHistory') && _this.$el.html(_.template(myHistoryTemplate,initData.myHistoryData));
                        newChihuo.getPage('myHistory') && _this.bindEvents();
                     }
                   }
            });  
       

    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      $('.tab-swiper-wrap').hide().eq(index).show();
    },

    bindEvents: function(){
      $('.tab-swiper-wrap').each(function(){
           if($(this).children().length == 0){
            $(this).html('<p class="no-data">no data</p>');
           }
      });

      $('.wrap-border').on('swipeleft',function(){
         $(this).find('.all-history-info').addClass('delete-animation');
      });

      $('.wrap-border').on('swiperight',function(){
         $(this).find('.all-history-info').removeClass('delete-animation');
      });

      $('.delete-icon-btn').on('click',function(){
        var index = $('#historyTab .cur').index();
        var url = index == 0 ? 'rmRestBrwHis.json' : 'rmMIBrwHis.json';
        var option = index == 0 ? {
                     restId: $(this).attr('hisId'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                     } : 
                     { 
                     restmiId: $(this).attr('hisId'),
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                   };
        var _this = this;
          chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri(url),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                       newChihuo.showPopInfo('deleted success');
                       $(_this).parents('.wrap-border').remove();
                     }
                   }
            });

      });

      $('.delete-icon').on('click',function(){
        var index = $('#historyTab .cur').index();
        var url = index == 0 ? 'purgeRestBrwHis.json' : 'purgeMIBrwHis.json';
        var option = {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                     };
          chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri(url),
                  data: option,
                  success: function(data){
                     if(data.status == 0){
                       newChihuo.showPopInfo('deleted all success');
                       $('.tab-swiper-wrap').eq(index).html('<p class="no-data">no data</p>');
                     }
                   }
            });

      });

    }

  });
  return MyHistoryView;
});
