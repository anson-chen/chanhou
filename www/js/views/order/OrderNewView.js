define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderNewTemplate.html',
  'text!templates/order/orderNewMenuTemplate.html',
], function($, _, Backbone, orderNewTemplate,orderNewMenuTemplate){

  var OrderNewView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .next-level':'nextLevelShow',
      'click .menu-index':'resetMenu',
      'click .last-level':'showDetail',
      'click #orderNewList': 'showOrderDetail',
      'click .order-new-back':function(){
        $("#dishDetailWrap").removeClass('show-menu-dish');
      },
      'click .order-new-common':'operationMenuNum',
      'click .order-new-btn':'addToOrder',
      'click #placeNewOrder': 'addToNewOrder',
      'click #clearNewOrder': 'clearNewOrder',
      'click .order-new-zone .delete-dish': 'deleteDish',
      'click .order-dish-num span': 'operationDishNum',
    },

    data: [],

  currentData: null,

  operationDishNum: function(e){
    var $obj = $(e.currentTarget);
    var index = $obj.attr('index');
    var $num = $obj.parent().find('.gw-dish-num');
    var num = parseInt($num.text()) || 1;
    if($obj.hasClass('order-new-add')){
      $num.text(++num);
      this.orderData[index]['num'] = num;
    }else{
      $num.text(--num);
      this.orderData[index]['num'] = num;
      if(num == 0){
       this.commonDelete(index);
      }
    }
  }, 

  commonDelete: function(index){
    this.orderData.splice(index,1);
    $('#gouwu').html(_.template(orderNewMenuTemplate,{data:this.orderData}));
    if(this.orderData.length){
      $('#orderNewList').find('p').html(this.orderData.length).show();
    }else{
      $('#orderNewList').find('p').html('').hide();
    }  
  },


  deleteDish: function(e){
    var $obj = $(e.currentTarget);
    var index = parseInt($obj.attr('index'));
    this.commonDelete(index);
  },

  addToNewOrder: function(){
    var restId = this.rest;
    var tabId = $('#table').attr('num') || 1;
    var _this = this;
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri3('submitOrder.json'),
          data: {
              restId: restId,
              tabId: parseInt(tabId),
              detail:JSON.stringify(this.orderData),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en'
          },
          success: function(data){
              if(data.status == 0){
                newChihuo.showPopInfo('Order was sent successfully.',1500);
                _this.clearNewOrder();
                $('#orderNewList').trigger('click');
              }
            }
          });
  },

  clearNewOrder: function(){
    this.orderData=[];
    $('#gouwu').html(_.template(orderNewMenuTemplate,{data:this.orderData}));
    $('#orderNewList').find('p').html('').hide();
  },

  operationMenuNum: function(e){
    var $obj = $(e.currentTarget);
    var num = $('.menu-num-set').text();
        num = num ? num : 0;
        if($obj.hasClass('order-new-add')){
          $('.menu-num-set').text(++num);
        }else{
          if(num > 0){
            $('.menu-num-set').text(--num);
          }
        }
        if(num == 0){
          $('.order-new-btn').removeClass('order-new-effect');
        }else{
          $('.order-new-btn').addClass('order-new-effect');
        }
  },

  showOrderDetail: function(){
       $('.order-mask').toggleClass('show-order');
       $('.order-wrap').toggleClass('order-z');
       $('#gouwu').slideToggle();
       console.log(this.orderData);
       $('#gouwu').html(_.template(orderNewMenuTemplate,{data:this.orderData}));
  },

  addToOrder: function(){
    if(!$('.order-new-btn').hasClass('order-new-effect')){
      return;
    }
    var num = $('.menu-num-set').text();
    var $obj = $('.order-new-detail');
    var _this = this;
    if(!$('.order-new-floor').length){
      var data = {
        menuId :$obj.attr('menu'),
        price : $obj.attr('price'),
        menu_desc : $obj.attr('name'),
        name: $obj.attr('name'),
        num : num || 1,
        comments: $('.order-comments').val(),
      }
    }else{
      var $order = $('.order-new-parent');
      var data = {
        menuId :$order.attr('menu'),
        price : $order.attr('price'),
        menu_desc : $order.attr('name'),
        name: $order.attr('name'),
        num : num || 1,
        components: '',
        comments: $('.order-comments').val(),
      };
      var floor = $('.order-new-floor');
      for(let i=0; i< floor.length; i++){
        var input = floor.eq(i).find('input:checked');
        if(input.length && input[0].type == 'radio'){
          data.components+=input.attr('origin')+';';
        }
        if(input.length && input[0].type == 'checkbox' && input[0].name!='addons'){
          var checkbox = [];
          input.each(function(){
            checkbox.push($(this).attr('origin'));
          });
          data.components+=checkbox.join(',')+';';
        }
        if(input.length && input.eq(0).attr('addon') == 'addons'){
          input.each(function(){
            _this.orderData.push({
              menuId :$(this).val(),
              price : $(this).attr('price'),
              name : $(this).attr('origin'),
              menu_desc : $(this).attr('origin'),
              num : num || 1,
            })
          });
        }
      }
      if(data.components.length){
        data.components = data.components.slice(0,data.components.length-1);
      } 
    }

     
     this.orderData.push(data);
    $("#dishDetailWrap").removeClass('show-menu-dish');
    if(this.orderData.length){
      $('#orderNewList').find('p').html(this.orderData.length).show();
    }else{
      $('#orderNewList').find('p').hide();
    }
  },

  tpl: function(){
    return '<h3 class="menu-title"><%=title%></h3><ul class="order-new-list"><%_.each(data,function(d,i){%><li class="<%if(d.price=="'+'" || d.price =="$0" ){%>next-level<%}else{%>last-level<%}%>" menu="<%=d.id%>" query="<%=i%>" name="<%=d.name%>"><%=d.name%><%if(d.price && d.price !="$0"){%><span class="order-new-price"><%=d.price%></span><%}%><%if(d.children){%>(<%=d.children.length%>)<%}%></li><%})%></ul>';
  },

  detailTpl: function(){
    return '<div class="order-new-mask"><div class="new-title-bg"><p class="pay-rest-name"><%if(initData.restaurantData.data[0].rest_id == id){%><%=initData.restaurantData.data[0].rest_name%><%}%></p><span class="pay-rest-addr"><%if(initData.restaurantData.data[0].rest_id == id){%><%=initData.restaurantData.data[0].addr%><%}%></span><div class="order-new-top" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>"><span><%=data.price || "$0"%></span><%=data.name%></div><div class="pay-nav clearfix"><span>ready in 10-15 min</span><p class="order-new-back">view menu</p></div></div>'+
    '<%if(data.children && data.children.length){%><div class="order-new-parent" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>"><div class="order-new-detail"><%=data.name%> description</div>'+
    '<%_.each(data.children,function(d,i){%><div class="order-new-floor"><h3 class="order-second-title"><%=d.name%><%if(d.price !="$0"){%><%=d.price%><%}%></h3><%if(d.children && d.children.length){%><%_.each(d.children,function(info,k){%><p class="order-new-last"><%if(info.price!="$0"){%><span><%=info.price%></span><%}%><%if(!info.children){%><input name="<%=d.name%>" value="<%=info.id%>" origin="<%=info.name%>" id="<%=info.id%>" <%if(d.name=="addons"){%>addon="<%=d.name%>" price="<%=info.price%>"<%}%> max="<%=d.max_selection%>" min="<%=d.min_selection%>" type="<%if(d.min_selection == 1 && d.min_selection == d.max_selection){%>radio<%}else{%>checkbox<%}%>" <%if(k==0 && d.min_selection == 1 && (d.min_selection == d.max_selection)){%>checked<%}%>/><%}%><%=info.name%></p><%if(info.children && info.children.length){%><%}%><%})}%></div><%})%></div><%}else{%><div class="order-new-detail" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>"><%=data.name%> description</div><%}%><textarea placeholder="please fill in your special request" class="order-comments"></textarea></div><div class="clearfix order-new-operation"><span style="float:right;" class="order-new-add order-new-common">+</span><em class="menu-num-set">0</em><span class="order-new-minus order-new-common">—</span></div><div class="order-new-btn">Add To Order</div>';
  },

  orderData: [],

  render: function(id,tabId){
      newChihuo.setPage('orderNew');
      if(this.rest != id){
        this.orderData = [];
      }
      this.rest = id;
      this.tabId = tabId;
      this.currentData = this.data;
     
      if(initData.restaurantData.data[0] && initData.restaurantData.data[0].rest_id == id){
        initData.orderNewData.info = {
           name: initData.restaurantData.data[0].rest_name,
           address: initData.restaurantData.data[0].addr,
        }
      }
      this.$el.html(_.template(orderNewTemplate,{data:this.currentData,id:this.rest,tabId:this.tabId}));
      this.initData(id);
  },

  initData: function(id){
    var _this = this;
      chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('getRestMenuDtl.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              restId: id,
          },
          success: function(data){
              if(data.status == 0){
                _this.data = _this.dealData(data.data);
                _this.currentData = _this.data;
                newChihuo.getPage('orderNew') && _this.$el.html(_.template(orderNewTemplate,{data:_this.currentData,id:_this.rest,tabId:_this.tabId}));
                if(_this.orderData.length){
                    $('#orderNewList').find('p').html(_this.orderData.length).show();
                  }else{
                    $('#orderNewList').find('p').hide();
                  }
              }
          }
          });

  },

  dealData: function(data){
    var dealData = [];
    if(data && data.length){
      data.forEach(function(d,i){
        if(d['menu_details'] && typeof(d['menu_details']) == 'string'){
          dealData.push(JSON.parse(d['menu_details']));
        }
      });
    }
     return dealData;
  },

  resetMenu: function(){
      this.currentData = this.data;
      this.$el.html(_.template(orderNewTemplate,{data:this.currentData,id:this.rest,tabId:this.tabId}));
  },
  showDetail: function(e){
    var $obj = $(e.currentTarget);
    var index = $(e.currentTarget).attr('query');
    console.log(this.currentData);
    var data = this.currentData[index];
    var tpl = this.detailTpl(); 
    $("#dishDetailWrap").html(_.template(tpl,{data:data,id:this.rest,tabId:this.tabId})).addClass('show-menu-dish');

  },
  nextLevelShow: function(e){
      var index = $(e.currentTarget).attr('query');
      var tpl = this.tpl();
      var nextData = this.currentData[index];
      this.currentData = nextData.children;
      $('.order-new-wrap').html(_.template(tpl,{data:nextData.children,title:nextData.name}));
  },


  });
  return OrderNewView;
});
