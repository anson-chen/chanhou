define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search/searchSetTemplate.html',
  'swiper',
  'mobiscroll'
], function($, _, Backbone, searchSetTemplate){

  var SearchSetView = Backbone.View.extend({
    el: $("#page"),
    events: {
    'click #searchSetTab a':'showTabWrap',
    },

    render: function(){
      newChihuo.setPage('searchSet');
      newChihuo.windowInit();
      this.$el.html(_.template(searchSetTemplate,initData.searchSetData));
      this.bindEvents();
      this.initData();
    },

     initData: function(){
      var _this = this;
      chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getCustSrchCat.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.searchSetData.data = data.data;
                      newChihuo.getPage('searchSet') && _this.$el.html(_.template(searchSetTemplate,initData.searchSetData));
                      newChihuo.getPage('searchSet') && _this.bindEvents();
                     }
                   }
            });  
       
    },

    bindEvents: function(){
      $(".select-dish-mask").on('click', function(){
         $('.search-mask').show();
         $('.dish-mask-list').show().attr('query',$(this).attr('query'));
      });

      $(".head-search-icon").on('click', function(){
         $('.search-mask').show();
         $('.city-mask-list').show();
      });

      $(".right-set-info span").on('click',function(){
        if($(this).parent().hasClass('set-feature')){
         $(this).toggleClass('cur');
         return;
        }
           $(this).addClass('cur').siblings().removeClass('cur');
      });

      $(".clear-option").on('click',function(){
        var index = $('#searchSetTab .cur').index();
        if(index == 0){
          $(".swiper-slide").eq(index).find(".right-set-info span").removeClass('cur');
        }else{
          $(".swiper-slide").eq(index).find(".right-set-info span").removeClass('cur');
        }
      });

      $(".dish-mask-list p").on('click',function(){
          var index = parseInt($(this).parent().attr('query'));
          $(this).addClass('cur').siblings().removeClass('cur');
          $(".search-mask,.dish-mask-list,.city-mask-list").hide();
          $('.select-dish-mask').eq(index-1).find(".set-floor-select").text($(this).text());
      });

      $(".city-mask-list p").on('click',function(){
          var index = parseInt($(this).parent().attr('query'));
          $(this).addClass('cur').siblings().removeClass('cur');
          $(".search-mask,.dish-mask-list,.city-mask-list").hide();
          $('.head-search-icon').text($(this).text());
      });

      $(".right-set-info").each(function(){
          $(this).find('span').eq(0).addClass('cur'); 
      });

      $(".pop-time").on('click',function(){
          $('.time-demo').trigger('click');
      });

      $('#setSure').on('click',function(){
        var addr = $.trim($('.set-address').val()) || 'null';
        var distance = $('#distance').find('.cur').text() || 'all';
        var resttype = $('#resttype').find('.cur').text() || 'all';
        var price = $('#price').find('.cur').text() || 'all';
        var cuisine = $('#cuisine').text() || 'all';
        var openhours = $('.time-demo').val() || 'all';
        var features = 'all';
        if($('#feature').find('.cur').length){
          features = '';
          $('#feature').find('.cur').each(function(){
              features += $(this).text()+';'
          });
          features = features.slice(0,features.length-1);
           var filters = 'addr:'+ addr +',distance:'+ distance +',resttype:'+ resttype +',price:'+ price +',cuisine:'+ cuisine +',openhours:'+ openhours +',features:'+features;
           chihuo.setSearch = filters;
            app_router.navigate('restaurantNear',{
                trigger:true
            });
      
        }

      })



    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.index();
      obj.addClass('cur').siblings().removeClass('cur');
      $(".search-tab-wrap").hide().eq(index).show();
      swiperSearchSet.slideTo(index)
    },

    setLink: function(){
     
    }

  });
  return SearchSetView;
});
