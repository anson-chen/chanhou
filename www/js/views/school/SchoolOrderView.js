define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolOrderTemplate.html',
  'text!templates/school/schoolNewMenuTemplate.html',
], function($, _, Backbone, schoolOrderTemplate,schoolNewMenuTemplate){

  var SchoolOrderView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'change #lunchTime':'menuChange',
      'click .school-last-level': 'showDetailInfo',
      'click .school-order-btn':'addToSchoolOrder',
      'click .order-new-back':function(){
        $("#dishDetailWrap").removeClass('show-menu-dish');
      },
      'click .school-order-common':'operationMenuNum',
      'click #placeSchoolOrder': 'addToNewSchoolOrder',
      'click #clearSchoolOrder': 'clearSchoolOrder',
      'click .order-new-zone .delete-dish': 'deleteDish',
      'click .order-dish-num span': 'operationDishNum',
      'click #orderSchoolList': 'showOrderDetail',
      'click #schoolAddOrder':'addNewToOrder',
      
    },

    orderData: {
      "General Information": {},
      "Orders": [],
    },

    addNewToOrder: function() {
      initData.addNewToOrderData = {
        type: 2,
        data: this.orderData,
      };
      if(this.orderData['Orders'].length == 0){
        newChihuo.showPopInfo('please choose',1200);
        return;
      }
      newChihuo.showPopInfo('add successfully.',1200,function(){
        history.go(-1);
      });
      console.log(initData.addNewToOrderData);
    },

    showOrderDetail: function(){
        $('.order-mask').toggleClass('show-order');
       $('.order-wrap').toggleClass('order-z');
       $('#gouwu').slideToggle();
       console.log(this.orderData);
       $('#gouwu').html(_.template(schoolNewMenuTemplate,{data:this.orderData}));
    },

    render: function(id,child){
      newChihuo.setPage('schoolOrder');
      newChihuo.windowInit();
      if(child == 'new'){
      //通过修改订单进入下单
        initData.schoolOrderData.child = {};
        initData.schoolOrderData.type = 'addOrder';
        this.orderData = {
          "General Information": {},
          "Orders": [],
        };
        console.log(initData.schoolOrderData.addOrderInfo);
      }else{
      //正常流程下单  
        initData.schoolOrderData.child = initData.schoolIndexData.data[child];
        initData.schoolOrderData.type = 'addNew';
        initData.schoolOrderData.addOrderInfo = null;
      }

      initData.addNewToOrderData = {
        type: null,
        data: null,
      };

      initData.schoolOrderData.rest = id;
      if(child != 'new' && JSON.parse(initData.schoolOrderData.child.child_info)){
        var info = JSON.parse(initData.schoolOrderData.child.child_info);
        this.orderData["General Information"] = {
        "child name":info.first_name+' '+info.last_name, 
        "School_id":info.school_id, 
        "School": info.school_name,
        "rest_id": id,
        "teacher_name": info.teacher_name,
        "school_addr": info.school_addr,
        "grade_name": info.grade_name,
        "Restaurant": id == initData.restaurantData.data[0].rest_id ? initData.restaurantData.data[0].rest_name : null,
      }; 

      }    
      console.log(this.orderData["General Information"]);
      this.$el.html(_.template(schoolOrderTemplate,initData.schoolOrderData));
      this.initData(id);
    },

    addToNewSchoolOrder: function(){
      var _this = this;
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri4('submitKidsOrder.json'),
          data: {
              restId: this.orderData["General Information"]['rest_id'],
              cont: JSON.stringify(this.orderData),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                newChihuo.showPopInfo('Order was submitted successfully. Please click on “My Order” button to browse the details and make the payment. Thanks!',3000);
                _this.clearSchoolOrder();
                $('#orderSchoolList').trigger('click');
                $('.order-bottom .order-bottom-right').addClass('show-new');
              }else{
                 newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });  

    },

    clearSchoolOrder: function(){
      this.orderData["Orders"] = [];
      $('#gouwu').html(_.template(schoolNewMenuTemplate,{data:this.orderData}));
      $('#orderSchoolList').find('p').html('').hide();
    },

    commonDelete: function(index){
      this.orderData["Orders"].splice(index,1);
      $('#gouwu').html(_.template(schoolNewMenuTemplate,{data:this.orderData}));
      if(this.orderData.length){
        $('#orderSchoolList').find('p').html(this.orderData.length).show();
      }else{
        $('#orderSchoolList').find('p').html('').hide();
      }  
    },

    deleteDish: function(e){
        var $obj = $(e.currentTarget);
        var index = parseInt($obj.attr('index'));
        this.commonDelete(index);
    },

    operationDishNum: function(e){
      

    },

    showDetailInfo: function(e){
      var $obj = $(e.currentTarget);
      var index = $(e.currentTarget).attr('query');
      var num = $(e.currentTarget).attr('num');
      var data = initData.schoolOrderData.data[index];
      var tpl = this.detailTpl(); 
      var rest_info = {};
      if(initData.restaurantData.data[0] && initData.restaurantData.data[0].rest_id == initData.schoolIndexData.rest){
         rest_info = initData.restaurantData.data[0];
      }
      if(initData.schoolOrderData.addOrderInfo && initData.schoolOrderData.addOrderInfo[0] && initData.schoolOrderData.addOrderInfo[0].rest_info){
         rest_info = JSON.parse(initData.schoolOrderData.addOrderInfo[0].rest_info);
      }
      
      $("#dishDetailWrap").html(_.template(tpl,{data:data,id:initData.schoolIndexData.rest,num: num,rest:rest_info})).addClass('show-menu-dish');
      var swiper = new Swiper('#school-dish', {
        slidesPerView: 'auto',
        paginationClickable: true
      });
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
          $('.school-order-btn').removeClass('order-new-effect');
        }else{
          $('.school-order-btn').addClass('order-new-effect');
        }
    },

    addToSchoolOrder: function(){
      if(!$('.school-order-btn').hasClass('order-new-effect')){
      return;
    }
    var num = $('.menu-num-set').text();
    var $obj = $('.order-new-detail');
    var price = $obj.attr('price');
        price = price.indexOf('$')>=0 ? price.substring(1) : price;
    var menuId = $obj.attr('menuId');
    var desc = $obj.attr('desc');
    var name = $obj.attr('name');
    var date = $('.school-order-btn').attr('date');
    var data = {
        "date": date,
        "menu_items":[],
      };
    var _this = this;
    var orderInfo = {
      "menuId" : menuId, 
      "menu_desc" : desc,
      "menu_name" : name,
      "price" : price, 
      "num" : num, 
      "sub_total" : price * num
    };

    data["menu_items"].push(orderInfo);    
    this.orderDataFix(data);
    $("#dishDetailWrap").removeClass('show-menu-dish');
    if(this.orderData["Orders"].length){
      $('#orderSchoolList').find('p').html(this.orderData["Orders"].length).show();
    }else{
      $('#orderSchoolList').find('p').hide();
    }

    },

    orderDataFix: function(data){
      if(data){
        var order = this.orderData["Orders"];
        var hasDate = false;
        for(var i=0; i<order.length; i++){
          if(order[i].date == data.date){
            order[i].menu_items.push(data.menu_items[0]);
            hasDate = true;
          }
        }
        if(!hasDate){
          this.orderData["Orders"].push(data);
        }
        console.log(this.orderData);   
      }
    },

    detailTpl: function(){
     return '<div class="order-new-mask"><div class="new-title-bg"><p class="pay-rest-name"><%=rest.rest_name%></p><span class="pay-rest-addr"><%=rest.addr%></span><%if(JSON.parse(data.menu_item_details)){%><div class="order-new-top"><span><%=JSON.parse(data.menu_item_details)[num].mi_unit_price || "$0"%></span><%=JSON.parse(data.menu_item_details)[num].rest_mi_name%></div><%}%><div class="pay-nav clearfix"><p class="order-new-back">view menu</p></div></div>'+
    '<div class="order-new-parent">'+ this.detailImg()+'<div class="order-new-detail" menuId="<%=JSON.parse(data.menu_item_details)[num].kids_rest_menu_item_id%>" price="<%=JSON.parse(data.menu_item_details)[num].mi_unit_price%>" name="<%=JSON.parse(data.menu_item_details)[num].rest_mi_name%>" desc="<%=JSON.parse(data.menu_item_details)[num].rest_mi_desc%>"><%=JSON.parse(data.menu_item_details)[num].rest_mi_name%> description:<br/><%=JSON.parse(data.menu_item_details)[num].rest_mi_desc%></div></div>'+
    '<div class="order-new-floor"><textarea placeholder="Your name, contact number and expected pickup time; Your special request of order." class="order-comments"></textarea></div>'+
      '<div class="order-bottom-bg"><div class="clearfix order-new-operation"><span style="float:right;" class="order-new-add school-order-common">+</span><em class="menu-num-set">0</em><span class="order-new-minus school-order-common">—</span></div><div class="school-order-btn" date="<%=data.available_date%>">Add To Order</div></div>';
    },

    detailImg: function(){
      var imgHtml = '<%if(JSON.parse(data.menu_item_details)[num].mi_photo_url){%><div class="swiper-container" id="school-dish"><div class="swiper-wrapper"><%_.each(JSON.parse(data.menu_item_details)[num].mi_photo_url.split(","), function(d,i) {%><div class="swiper-slide"><img src="<%=d%>"></div><%})%></div></div><%}%>';
      return imgHtml;
    },

    initData: function(id){
       var _this = this;
       var id = id;
       chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri4('getKidsMenu.json'),
          data: {
              restId: id,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                initData.schoolOrderData.data = data.data;
                newChihuo.getPage('schoolOrder') && _this.$el.html(_.template(schoolOrderTemplate,initData.schoolOrderData));
              }else{
                 newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
       });  
      
    },

    menuChange: function(e){
      var time = $(e.currentTarget).val();
      $('.order-new-list').hide().eq(time).show();
    }

  });
  return SchoolOrderView;
});
