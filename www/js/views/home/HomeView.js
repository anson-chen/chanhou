define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarView',
    'jqueryMove',
    'text!templates/home/homeTemplate.html',
    '../../../swiperplugin/js/roundabout',
    'swiper'
], function ($, _, Backbone, SidebarView, jqueryMove, homeTemplate) {

    var HomeView = Backbone.View.extend({
        el: $("#page"),
        events: {
           'focus .index-search input':'searchLink',
           'click .comment-operation':'showInput',
           'click .home-top-location': 'showCity',
           'click #homeCity p': 'changeCity',
           'click .hot-follow': 'addFollow',
       },

        render: function(){
            newChihuo.setPage('home');
            newChihuo.windowInit();
            !newChihuo.globalStatus && chihuo.ajaxSetup();
            this.$el.html(_.template(homeTemplate, initData.homeData));
            chihuo.getPosition(homeTemplate);
            !newChihuo.globalStatus && setInterval(chihuo.getMsgNum, newChihuo.longSpeed);
            newChihuo.globalStatus = true;
        },

        addFollow: function(e){
            var obj=$(e.currentTarget);
            var rest = obj.attr('rest');
            rest &&  chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestFollow.json'),
                  data: {
                     restId: rest,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('关注成功');
                        obj.attr('src',staticSource.restIcon3).removeClass('hot-follow');
                     }
                  } 
              });  
        },

        searchLink: function(){
            app_router.navigate('searchInit2', {
                trigger: true    
            });
        },

        showInput: function(e){
          var obj=$(e.currentTarget);
          if($(obj.children()[0]).hasClass('wechat-icon')){
            $(obj).toggleClass('reply');
            if(obj.parent().parent().find('.user-recall') && obj.parent().parent().find('.user-recall').length > 0){
              return false;
            }
            $('.fix-comment-bottom').toggle();
            $('.chat-input').attr('review',$(obj.children()[0]).attr('review')).val('');
            }
        },

        showCity: function(){
            $('.search-mask').show();
            $('.city-mask-list').show();
        },

        changeCity: function(e){
            $('.home-top-location').text($(e.currentTarget).text());
            $(e.currentTarget).addClass('cur').siblings().removeClass('cur');
            $('.search-mask').hide();
            $('.city-mask-list').hide();
            chihuo.findHotspotDetails($(e.currentTarget).text(),newChihuo.lat,newChihuo.lon,homeTemplate);
            initData.homeData.cityData[0].cityname = $(e.currentTarget).text();
            newChihuo.city = $(e.currentTarget).text();
           
        }
    

           
              
    });

    return HomeView;

});
