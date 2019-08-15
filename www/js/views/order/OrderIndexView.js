define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderIndexTemplate.html',
  'iscroll',
], function($, _, Backbone, orderIndexTemplate,IScroll){

  var OrderIndexView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #orderMenu li': 'showMenu',
      'click .order-bottom-left': 'showOrderDetail',
      'click #myOrder': 'goOrderList',
      'click #placeOrder': 'addOrder',
      'click .menu-return': function(){
        $("#dishDetailWrap").removeClass('show-menu-dish');
        $('.menu-operating').removeClass('menu-operating');
        newChihuo.setPage('orderIndex');
      },
    },

    status: {
      num: 0,
      price: 0, 
    },

    render: function(id,name){
      newChihuo.setPage('orderIndex');
      newChihuo.windowInit();
      initData.orderIndexData.title = name;
      this.$el.html(_.template(orderIndexTemplate,initData.orderIndexData));
      this.initData(id);
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
                initData.orderIndexData.data = chihuo.dealData(data.data,'rest_menu_name');               
                newChihuo.getPage('orderIndex') && _this.$el.html(_.template(orderIndexTemplate,initData.orderIndexData));  
                }
                _this.status.num = 0;
                _this.status.price = 0;
                _this.bindEvents();
              }
          });
    },

    showOrderDetail: function(){
       $('.order-mask').toggleClass('show-order');
       $('.order-wrap').toggleClass('order-z');
       $('#gouwu').slideToggle();
       var info = this.getOrderInfo();
       window.orderMenu.render(info);
    },

    goOrderList: function(e){
      var $obj=$(e.currentTarget);
      if(!$obj.hasClass('disable-order')){
        window.orderList.render();
      }
    },

    getDetailAll: function(){
       var info = this.getOrderInfo();
       var detail = [];
       var total = 0;
       console.log(info);
       for(var i=0; i<info.length; i++){
          var obj= {};
          obj["menu_item_id"] = info[i].menuId;
          obj["menu_desc"] = info[i].name;
          obj["unit_price"] = parseFloat(info[i].price.substring(1));
          obj["unit_cnt"] = info[i].num;
          obj["sub_total"] = obj["unit_price"] * obj["unit_cnt"];
          obj["comments"] = info[i].comments || '';
          detail.push(obj);
          total+=obj["sub_total"];
       }
       detail.push({"tip_amount":0,"tax_amount":0,"total_amount":total.toFixed(2)});
       return detail;
    },

    addOrder: function(e){
      var _this = this;
      var restId = $(".order-dish-num").eq(0).attr('rest');
      var tabId = 1;
      var detail = this.getDetailAll();
      // if($(e.currentTarget).hasClass('disable-order')){
      //   return;
      // }
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('submitOrder.json'),
          data: {
              restId: restId,
              tabId:tabId,
              detail:JSON.stringify(detail),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en'
          },
          success: function(data){
              if(data.status == 0){
                newChihuo.showPopInfo('Order was sent successfully.',1500);
                $("#myOrder").removeClass('disable-order');
                $('.clear-all-order').click();
                $('.order-bottom-left').click();
              }
            }
          });
    },

    getOrderInfo: function(){
      var $order = $('.order-menu-detail');
      var len = $order.length;
      var info = [];
      if(len){
        for(var i=0; i<len; i++){
          var $obj = $order.eq(i);
            if($obj.find('.cur').length){
              var dish = {};
              dish.menuId = $obj.attr('menuId');
              dish.menuIndex = $obj.attr('menu');
              dish.dishIndex = $obj.attr('dish');
              dish.price = $obj.find('.order-dish-price').text();
              dish.name = $obj.find('h3').text();
              dish.num = $obj.find('b').text();
              dish.index = i;
              info.push(dish);
            }
          }
        }
        return info;
    },

    showMenu: function(e){
      var $obj = $(e.currentTarget);
      var menu = $obj.attr('menu');
      var index = $obj.index();
      $obj.addClass('cur').siblings().removeClass('cur');
      var scrollTop = this.calculatePosition(index);
      $('.order-right').animate({ scrollTop: scrollTop }, 300);      
    },

    calculatePosition: function(index){
      var scrollTop = 0;
      var imgHeight = $('.order-pt').height();
      var $menu = $('.order-menu-kind');
      if(index == 0){
         return 0;
      }
      if(index > 0){
        for(var i =0; i< index; i++){
          scrollTop+= $('.order-menu-kind').eq(i).height()+10;
        }
        return scrollTop + imgHeight;
      }

      return scrollTop;
    },

    bindEvents: function(){
      var _this = this;
      $('.menu-dish-img').on('click',function(){
        var menuNum = $(this).attr('menu');
        var dishNum = $(this).attr('dish');
        var orderNum = $(this).parent().find('.order-dish-num b').text();
        if(menuNum != undefined && dishNum != undefined){
          initData.orderDishData.orderNum = parseInt(orderNum) || 0;
          window.orderDish.render(menuNum,dishNum);
          $(this).parent().addClass('menu-operating');
        }
      });

      $('.order-add,.order-minus').on('click',function(){
          var add = $(this).hasClass('order-add');
          var $obj = $(this).parent();
          var num = $(this).parent().find('b').text();
              num = num ? num : 0;
          var price = $(this).attr('price').replace('$','');
          var index = $(this).parents('.order-menu-kind').index('.order-menu-kind');
          var $menuObj = $('#orderMenu li').eq(index).find('span');
          var menuNum = $menuObj.text();
              menuNum = menuNum ? menuNum : 0;
          var allPrice = parseFloat($('.order-all-price').text().replace('$',''));
              allPrice = allPrice ? allPrice : 0; 
          var lastAllNum = $('.order-bottom-left p').text();
              lastAllNum = lastAllNum ? lastAllNum : 0;
          _this.status.num = parseInt(lastAllNum);

          if(add){
            $obj.addClass('cur').find('b').text(++num);
            $menuObj.text(++menuNum).show();
            ++_this.status.num;
          }else{
            $obj.addClass('cur').find('b').text(--num);
            $menuObj.text(--menuNum);
            if(num == 0){
              $obj.removeClass('cur').find('b').text('');
            }
            if(menuNum == 0){
              $menuObj.text('').hide();
            }
            --_this.status.num;
          }
          if(_this.status.num){
            allPrice += (parseFloat(price)*(add ? 1 : -1));
            $('.order-bottom-left p').text(_this.status.num).show();
            $('.order-all-price').text('$'+allPrice.toFixed(2));
          }else{
            $('.order-bottom-left p').text('').hide();
            $('.order-all-price').text('');
            $("#placeOrder").addClass('disable-order');
          }

      });



    }


  });
  return OrderIndexView;
});
