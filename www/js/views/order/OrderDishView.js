define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderDishTemplate.html',
], function($, _, Backbone, orderDishTemplate){

  var OrderDishView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .go-order': 'goOrder'
    },

    status: {
      num: 0,
      price: 0, 
    },
   
    render: function(menuNum,dishNum){
      initData.orderDishData.data = initData.orderIndexData.data[menuNum][dishNum];
      this.status.num = 0;
      $("#dishDetailWrap").html(_.template(orderDishTemplate,initData.orderDishData)).addClass('show-menu-dish');
      this.bindEvents();
    },

    goOrder: function(){
      var $lastPrice = $('.order-all-price');
      var lastPrice = parseFloat($lastPrice.text().replace('$',''));
          lastPrice = lastPrice ? lastPrice : 0;
      var $bottomNum = $('.order-bottom-left p');
      var lastNum = $bottomNum.text();
          lastNum = lastNum ? lastNum : 0;
          lastNum = parseInt(lastNum)+this.status.num;
      var $curDish = $('.menu-operating');
      var price = parseFloat($('.order-add-mask').attr('price').replace('$',''));
      var index = $curDish.parents('.order-menu-kind').index('.order-menu-kind');
      var $menuObj = $('#orderMenu li').eq(index).find('span');
      var menuDetailNum = $('.menu-detail-num').text();
          menuDetailNum = menuDetailNum ? menuDetailNum : 0;
      var menuNum = $menuObj.text();
          menuNum = menuNum ? menuNum : 0; 
      var lastMenuNum =  parseInt(menuNum)+this.status.num;

          lastPrice += price * this.status.num;
          
          $menuObj.text(lastMenuNum ? lastMenuNum : '').show();
          $bottomNum.text(lastNum ? lastNum : '').show();

          if(lastNum){
            $lastPrice.text('$'+lastPrice.toFixed(2));
          }else{
            $lastPrice.text('');
          }

          if(!lastNum){
            $bottomNum.hide();
          }
              
          if(!lastMenuNum){
            $menuObj.hide();
          }

          if(menuDetailNum){
            $curDish.find('.order-dish-num').addClass('cur').find('b').text(menuDetailNum);
          }else{
            $curDish.find('.order-dish-num').removeClass('cur').find('b').text('');
          }

          $("#dishDetailWrap").removeClass('show-menu-dish');
      },

    bindEvents: function(){
      var _this = this;
     $('.order-add-mask,.order-minus-mask').on('click',function(){
          var add = $(this).hasClass('order-add');
          var $obj = $(this).parent();
          var num = $(this).parent().find('b').text();
              num = num ? num : 0;
          var price = parseFloat($(this).attr('price').replace('$',''));
          if(add){
            $obj.addClass('cur').find('b').text(++num);
            ++_this.status.num;
          }else{
            $obj.addClass('cur').find('b').text(--num);
            if(num == 0){
              $obj.removeClass('cur').find('b').text('');
              $('.get-price').text('');
            }
            --_this.status.num;
          }
          if(price){
            $('.get-price').text(num ? '$'+(price*num).toFixed(2) : '');
          }
          
      });

    }

  });
  return OrderDishView;
});
