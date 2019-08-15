define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderMenuTemplate.html',
  'iscroll',
], function($, _, Backbone, orderMenuTemplate,IScroll){

  var OrderMenuView = Backbone.View.extend({
    el: $("#page"),
    events: {
      
    },

    render: function(info){
      initData.orderMenuData.data = info;
      $('#gouwu').html(_.template(orderMenuTemplate,initData.orderMenuData));
      this.bindEvents();
    },

    bindEvents: function(){
      $('.clear-all-order').on('click',function(){
         $('.gw-data').html('<p class="no-order">there is no order</p>');
         $('.order-bottom-left p').text('').hide();
         $('.order-menu li span').text('').hide();
         $('.order-all-price').text('');
         $('.order-dish-num').removeClass('cur').find('b').text('');
      });

      $('.gw-add').on('click',function(){
         var index = $(this).attr('index');
         var num = parseInt($(this).next('b').text());
         if(num){
          $(this).next('b').text(++num);
         }
         $('.order-menu-detail').eq(index).find('.order-add').trigger('click');
      });

      $('.gw-minus').on('click',function(){
         var index = $(this).attr('index');
         var num = parseInt($(this).prev('b').text());
         if(num){
          $(this).prev('b').text(--num);
         }
         if(num == 0){
          $(this).parents('li').remove();
         }
         $('.order-menu-detail').eq(index).find('.order-minus').trigger('click');
      });

      $('.delete-dish').on('click',function(){
         var index = $(this).attr('index');
         var num = parseInt($(this).parent().find('.gw-dish-num').text());
         if(num){
          $(this).parents('li').remove();
          var $obj = $('.order-menu-detail').eq(index).find('.order-minus');
           for(var i=0; i<num; i++){
            $obj.trigger('click');
           }
         }
      });
    }
  });
  return OrderMenuView;
});
