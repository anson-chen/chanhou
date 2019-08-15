  define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/food/foodMenuTemplate.html'
], function($, _, Backbone, foodMenuTemplate){

  var FoodMenuView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click #foodMenuTab span':'showTabWrap' ,
     'click .menu-set-wrap': 'toggleMenu'
    },

    render: function(id,name){
      newChihuo.setPage('foodMenu');
      newChihuo.windowInit();
      this.$el.html(_.template(foodMenuTemplate,initData.foodMenuData));
      if(name){
        var name = decodeURIComponent(name);
        this.initDataMenu(id,name);
      }else{
        this.initData(id);
      }
      
    },

    initData: function(id){
      var _this = this;
                chihuo.wkAjax({
                            type: 'GET',
                            url: chihuo.getApiUri('getRestMenuItems.json'),
                            data: {
                              restId: id,
                              lat: newChihuo.lat,
                              lng: newChihuo.lon,
                              locale: 'en'
                            },
                            success: function(data){
                               if(data.status == 0){
                                  initData.foodMenuData.title = initData.restaurantData.data[0].rest_name;
                                  initData.foodMenuData.data = chihuo.dealData(data.data,'rest_menu_name');                             
                                  newChihuo.getPage('foodMenu') && _this.$el.html(_.template(foodMenuTemplate,initData.foodMenuData));
                               }
                            }

                        });
    },

     initDataMenu: function(id,name){
      var _this = this;
        id && name &&  chihuo.wkAjax({
                            type: 'GET',
                            url: chihuo.getApiUri('getRestMenuMI.json'),
                            data: {
                              restId: id,
                              menuname: name,
                              lat: newChihuo.lat,
                              lng: newChihuo.lon,
                              locale: 'en'
                            },
                            success: function(data){
                               if(data.status == 0){
                                  if(name){
                                    initData.foodMenuData.title = name;
                                  }
                                  initData.foodMenuData.data = chihuo.dealData(data.data,'rest_menu_name');                             
                                  newChihuo.getPage('foodMenu') && _this.$el.html(_.template(foodMenuTemplate,initData.foodMenuData));
                               }
                            }

                        });
    },

    toggleMenu: function(e){
      $(e.currentTarget).toggleClass('menu-toggle-show');

    },

    showTabWrap: function(e){
      var obj=$(e.currentTarget);
      var index=obj.parent().index();
      $('.food-list-nav span').removeClass('cur');
      obj.addClass('cur');
      swiperFoodMenu.slideTo(index);
    }


  });
  return FoodMenuView;
});
