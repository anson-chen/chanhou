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
      'click .last-level,.top-info-content':'showDetail',
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
      'click #regularAddOrder':'addNewToOrder',
    },

  data: [],

  currentData: null,

  topInfo: {
    newFlag: [],
    promotions: [],
  },

  addNewToOrder: function() {
    initData.addNewToOrderData = {
      type: 1,
      data: this.orderData,
    }
    if(this.orderData.length == 0){
        newChihuo.showPopInfo('please choose',1200);
        return;
      }
    newChihuo.showPopInfo('add successfully.',1200,function(){
      history.go(-1);
    });
    console.log(initData.addNewToOrderData);
  },

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
    var total = chihuo.getTotalNum(this.orderData);
    $('.all-total').find('b').text(total ? total : 0);
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
    if(initData.orderNewData.typeFrom == 'takeout' && initData.phoneIndexData.data !== null && (!initData.phoneIndexData.data.cust_mobile_no || !initData.phoneIndexData.data.verifyflg)){
      var tips = initData.phoneIndexData.data.cust_mobile_no ? 'Please verify your phone number' : 'Add mobile and verify';
      newChihuo.showPopInfo(tips,1500,function(){
         app_router.navigate('phoneList/'+restId,{
                  trigger: true
          });
      });
      return;
    }  
    if(initData.orderNewData.typeFrom){
      this.orderData.push({"dinein_flag": initData.orderNewData.typeFrom == "takeout" ? "N" : "Y"})
    }
    
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
                newChihuo.showPopInfo('Order was submitted successfully. Please click on “My Order” button to browse the details and make the payment. Thanks!',3000);
                _this.clearNewOrder();
                $('#orderNewList').trigger('click');
                $('.order-bottom .order-bottom-right').addClass('show-new');
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
    if(initData.orderNewData.restId == 69173){
      return '<h3 class="menu-title"><%=title%></h3><ul class="order-new-list fresh-style"><%_.each(data,function(d,i){%><li class="clearfix <%if(d.price=="" || d.price =="$0" || d.price == "0"){%>next-level<%}else{%>last-level<%}%>" menu="<%=d.id%>" query="<%=i%>" name="<%=d.name%>"><div class="fresh-menu-img"><%if(d.photo_url){%><img class="lazy" data-original="<%=d.photo_url%>" /><%}%></div><p <%if(d.new_flag == "Y"){%>class="show-new-icon"<%}%>><%if(d.new_flag == "Y"){%><b>new</b><%}%><%=d.name.replace("&nbsp;","<br/>")%><%if(d.price && d.price !="$0"){%><span class="order-new-price"><%=d.price%></span><%}%><%if(d.children){%>(<%=d.children.length%>)<%}%></p></li><%})%></ul>';

    }else{
      return '<h3 class="menu-title"><%=title%></h3><ul class="order-new-list"><%_.each(data,function(d,i){%><li class="<%if(d.price=="" || d.price =="$0" || d.price == "0"){%>next-level<%}else{%>last-level<%}%>" menu="<%=d.id%>" query="<%=i%>" name="<%=d.name%>"><p <%if(d.new_flag == "Y"){%>class="show-new-icon"<%}%>><%if(d.new_flag == "Y"){%><b>new</b><%}%><%=d.name%><%if(d.price && d.price !="$0"){%><span class="order-new-price"><%=d.price%></span><%}%><%if(d.children){%>(<%=d.children.length%>)<%}%></p></li><%})%></ul>';
    }
  },

  detailTpl: function(){
    return '<div class="order-new-mask"><div class="new-title-bg"><p class="pay-rest-name"><%=initData.orderNewData.info.name%></p><span class="pay-rest-addr"><%=initData.orderNewData.info.address%></span><div class="order-new-top" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>"><span><%=data.price || "$0"%></span><%=data.name.replace("&nbsp;","<br/>")%></div><div class="pay-nav clearfix"><p class="order-new-back">view menu</p></div></div>'+
    '<%if(data.children && data.children.length){%><div class="order-new-parent" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>">'+this.detailImg()+'<div class="order-new-detail"><%=data.name%> description:<br/><%=data.desc%></div>'+
    '<%_.each(data.children,function(d,i){%><div class="order-new-floor"><h3 class="order-second-title"><%=d.name%><%if(d.price !="$0"){%><%=d.price%><%}%></h3><%if(d.children && d.children.length){%><%_.each(d.children,function(info,k){%><p class="order-new-last"><%if(info.price!="$0"){%><span><%=info.price%></span><%}%><%if(!info.children){%><input name="<%=d.name%>" value="<%=info.id%>" origin="<%=info.name%>" id="<%=info.id%>" <%if(d.name=="addons"){%>addon="<%=d.name%>" price="<%=info.price%>"<%}%> max="<%=d.max_selection%>" min="<%=d.min_selection%>" type="<%if(d.min_selection == 1 && d.min_selection == d.max_selection){%>radio<%}else{%>checkbox<%}%>" <%if(k==0 && d.min_selection == 1 && (d.min_selection == d.max_selection)){%>checked<%}%>/><%}%><%=info.name%></p><%if(info.children && info.children.length){%><%}%><%})}%></div><%})%></div><%}else{%>'+this.detailImg()+'<div class="order-new-detail" name="<%=data.name%>" menu="<%=data.id%>" price="<%=data.price%>"><%=data.name%> description:<br/><%=data.desc%></div><%}%><textarea placeholder="Your name, contact number and expected pickup time; Your special request of order." class="order-comments"></textarea></div><div class="order-bottom-bg"><div class="clearfix order-new-operation"><span style="float:right;" class="order-new-add order-new-common">+</span><em class="menu-num-set">0</em><span class="order-new-minus order-new-common">—</span></div><div class="order-new-btn">Add To Order</div></div>';
  },

   detailImg: function(){
      var imgHtml = '<%if(data.photo_url){%><div class="swiper-container" id="regular-dish"><div class="swiper-wrapper"><%_.each(data.photo_url.split(","), function(d,i) {%><div class="swiper-slide"><img src="<%=d%>"></div><%})%></div></div><%}%>';
      return imgHtml;
    },

  orderData: [],

  render: function(id,tabId,type){
      newChihuo.setPage('orderNew');
      if(this.rest != id){
        this.orderData = [];
        this.data = [];
        this.topInfo = {
          newFlag: [],
          promotions: [],
        };
      }
      this.rest = id;
      this.tabId = tabId;
      this.currentData = this.data;
      if(type == 'new'){
      //通过修改订单进入下单 
        initData.orderNewData.type = 'addOrder'; 
        this.orderData = [];   
      }else{
      //正常流程下单  
        initData.orderNewData.type = 'addNew';
      }

      initData.addNewToOrderData = {
        type: null,
        data: null,
      };//每次进入清空数据
     
      if(initData.restaurantData.data[0] && initData.restaurantData.data[0].rest_id == id){
        initData.orderNewData.info = {
           id: id,
           name: initData.restaurantData.data[0].rest_name,
           address: initData.restaurantData.data[0].addr,
        }
      }
      this.$el.html(_.template(orderNewTemplate,{data:this.currentData,id:this.rest,tabId:this.tabId,topInfo:this.topInfo}));
      this.initData(id);
  },

  orderTypeSet: function(id,type){
    initData.orderNewData.typeFrom = type;
    initData.orderNewData.restId = (id && id !== 'undefined')  ? id : initData.orderNewData.restId;
    if(type == 'takeout'){
       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri3('lstCustMobile.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                        initData.phoneIndexData.data = data.data[0];
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200);
                     }
                  } 
              }); 
    }
    this.render(initData.orderNewData.restId);
  },

  initData: function(id){
    var _this = this;
    if(id != initData.orderNewData.info.id){
       chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findRestDetailById.json'),
                  data: {
                     restId: id,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                      initData.orderNewData.info = {
                         name: data.data[0].rest_name,
                         address: data.data[0].addr,
                         id: data.data[0].rest_id,
                      };
                      newChihuo.getPage('orderNew') && _this.$el.html(_.template(orderNewTemplate,{data:_this.data, id:_this.rest, tabId:_this.tabId, topInfo:_this.topInfo}));
                       if(_this.orderData.length){
                          $('#orderNewList').find('p').html(_this.orderData.length).show();
                        }else{
                          $('#orderNewList').find('p').hide();
                        }
                     }
                  } 
              });   
    };
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
                if(!_.isEqual(_this.data,_this.dealData(data.data))){
                   _this.data = _this.dealData(data.data);
                _this.currentData = _this.data;
                _this.getTopShow(_this.data);
                newChihuo.getPage('orderNew') &&  _this.$el.html(_.template(orderNewTemplate,{data:_this.currentData,id:_this.rest,tabId:_this.tabId,topInfo:_this.topInfo}));
                }
                if(_this.orderData.length){
                    $('#orderNewList').find('p').html(_this.orderData.length).show();
                  }else{
                    $('#orderNewList').find('p').hide();
                  }  
              }
          }
          });
  },

  getTopShow: function(data){
    var _this = this;
    function getLast(menu){
      if(menu.children && menu.children.length){
        menu.children.forEach(function(d,i){
          getLast(d);
        });
      }else{
        if(menu.new_flag && menu.new_flag == 'Y'){
          _this.topInfo.newFlag.push(menu);
        }
        if(menu.promotions){
          _this.topInfo.promotions.push(menu);
        }
      }
    }

    if(data && data.length){
      data.forEach(function(d,i){
        getLast(d);
      });
    }

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
      this.$el.html(_.template(orderNewTemplate,{data:this.currentData,id:this.rest,tabId:this.tabId,topInfo:this.topInfo}));
  },

  showDetail: function(e){
    var $obj = $(e.currentTarget);
    if($obj.hasClass('last-level')){
      var index = $obj.attr('query');
      var data = this.currentData[index];
    }else{
      var index = $obj.attr('query');
      var type = $obj.attr('type');
      var data = this.topInfo[type][index];
    }
    var tpl = this.detailTpl(); 
    $("#dishDetailWrap").html(_.template(tpl,{data:data,id:this.rest,tabId:this.tabId})).addClass('show-menu-dish');
    var swiper = new Swiper('#regular-dish', {
        slidesPerView: 'auto',
        paginationClickable: true
      });
  },
  nextLevelShow: function(e){
      newChihuo.windowInit();
      var index = $(e.currentTarget).attr('query');
      var tpl = this.tpl();
      var nextData = this.currentData[index];
      this.currentData = nextData.children;
      $('.menu-index').removeClass('menu-hidden');
      $('.order-new-wrap').html(_.template(tpl,{data:nextData.children,title:nextData.name}));
      chihuo.imgLazyLoad();
  },


  });
  return OrderNewView;
});
