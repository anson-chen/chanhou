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
                        newChihuo.getPage('myHistory') && !_this.bindEvents() && !initData.myHistoryData.data.length && chihuo.setNoDataInfo();
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
      var _this = this;

      $(window).off('scroll').on('scroll',function(){
        var scroll = $(this).scrollTop();
          chihuo.opacityBg('.opacity-bg',scroll);
        });
         
      $('.tab-swiper-wrap').each(function(){
           if($(this).children().length == 0){
            $(this).html("<div class='whoops' style='display:block'><p>It looks like you don't have any data yet.</p><span>Let's change that. Start exploring dishes and place now and will save it here for later.</span><a href='#index'>Begin Exploring</a></div>");
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
                       newChihuo.showPopInfo(newChihuo.localize('delete_a_record'));
                       $(_this).parents('.wrap-border').remove();
                     }
                   }
            });

      });

      $('.delete-icon').on('click',function(){
        var index = $('#historyTab .cur').index();
        var url = index == 0 ? 'purgeRestBrwHis.json' : 'purgeMIBrwHis.json';
        _this.showDeleteInfo(url,index);
      });

    },

    showDeleteInfo: function(url,index){
      var _this = this;
       var pop = $('#popInfo');
       var info ='<p>are you sure to delete all history?</p><div class="error-pop"><span class="close-pop">cancel</span><span class="refresh">ok</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
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
                       newChihuo.showPopInfo(newChihuo.localize('delete_all_records'));
                       _this.initData();
                       
                     }
                   }
            });
       });

    }
  });
  return MyHistoryView;
});
