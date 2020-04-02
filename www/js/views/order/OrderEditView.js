define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderEditTemplate.html',
], function($, _, Backbone, orderEditTemplate){

  var OrderEditView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #cancelOrder': 'showCancelInfo',
      'click .order-operate':'operationDishNum',
      'click .order-delete': 'deleteDish',
      'click #updateOrder': 'updateOrder',
      'click #cancelAddNew': 'orderDataSet'
    },

    render: function(ordId,restId,index){
      newChihuo.setPage('orderEdit');
      initData.orderEditData.ordId = ordId;
      initData.orderEditData.restId = restId;
      initData.orderEditData.data = [initData.myOrderData.data[index]];
      initData.schoolOrderData.addOrderInfo = initData.orderEditData.data;
      if(this.orderDetail && initData.addNewToOrderData.type == null && initData.addNewToOrderData.data == null){
        initData.orderEditData.data[0]['order_details'] = JSON.stringify(this.orderDetail);
      }
      this.orderDetail = this.orderDetail ? this.orderDetail : JSON.parse(initData.myOrderData.data[index]['order_details']);
      if(initData.addNewToOrderData.type && initData.addNewToOrderData.data){
        this.dealNewData(initData.addNewToOrderData.type,initData.addNewToOrderData.data);
      }
      
      console.log(this.orderDetail);
      this.$el.html(_.template(orderEditTemplate,initData.orderEditData));
    },

    dealNewData: function(type,data){
      var data = data;
      var _this = this;
      if(type == 1){
        if(this.orderDetail[this.orderDetail.length-1]['dinein_flag']){
          var dinein_flag = this.orderDetail.pop();
        }
        var len = this.orderDetail.length-1;
        var tax = this.orderDetail.pop();
        data.forEach(function(item,index){
          var addNew = true;
          for(var i=0; i<len; i++){
            if(_this.orderDetail[i]['rest_menu_item_id'] == item.menuId && _this.orderDetail[i]['rest_menu_desc'] == item.menu_desc){
              addNew = false;
              _this.orderDetail[i]['fix'] = true;
              _this.orderDetail[i]['unit_cnt'] += parseInt(item.num);
              _this.orderDetail[i]['sub_total'] +=  _this.orderDetail[i]['unit_cnt'] *  _this.orderDetail[i]['unit_price'];
              }
            }
           if(addNew){
            item['fix'] = true;
            var dataTransform = {
              "fix": true,
              "rest_menu_item_id": item['menuId'],
              "rest_menu_desc": item['menu_desc'],
              "unit_cnt": item['num'],
              "unit_price": item['price'],
              "sub_total": parseInt(item['num'])*parseFloat(item['price']),
              "components": item['components'] ? item['components'] : null,
              "comments" : item['comments'] ? item['comments'] : null,
            };
            _this.orderDetail.push(dataTransform);
          }
        });
        
        var total = this.getLastTotal(this.orderDetail,type);
        tax['pre_tax'] = total;
        this.orderDetail.push(tax);
        dinein_flag && this.orderDetail.push(dinein_flag);

        initData.orderEditData.data[0]['order_details'] = JSON.stringify(this.orderDetail);
        console.log(initData.orderEditData);

      }else{
        var len = this.orderDetail['Orders'].length;
        data['Orders'].forEach(function(item,index){
          var date = item.date;
          var addNew = true;
          for(var i=0; i<len; i++){
            if(_this.orderDetail['Orders'][i]['date'] == date){
              addNew = false;
              var menuItems = _this.orderDetail['Orders'][i]['menu_items'];
              item['menu_items'].forEach(function(menu,index){
                var unique = true;
                for(var k=0; k<menuItems.length; k++){
                  if(menu['menuId'] == menuItems[k]['menuId'] && menu['menu_name'] == menuItems[k]['menu_name']){
                    menuItems[k]['num'] += parseInt(menu['num']);
                    menuItems[k]['sub_total'] =  menuItems[k]['num'] *  menuItems[k]['price'];
                    menuItems[k]['fix'] = true;
                    unique = false;
                  }
                }
                if(unique){
                  menu['fix'] = true;
                  menuItems.push(menu);
                }
              });
            }
            }

          if(addNew){
            item['fix'] = true;
            _this.orderDetail['Orders'].push(item);
          }  
         
        });

        var total = this.getLastTotal(this.orderDetail['Orders'],type);

        this.orderDetail['order_extra']['before_tax'] = total;

        initData.orderEditData.data[0]['order_details'] = JSON.stringify(this.orderDetail);
      }


    },

    getLastTotal: function(data,type){
      if(data){
        var total = 0;
        if(type == 1){
          for(var i=0; i<data.length; i++){           
              total+=data[i]['sub_total'];           
          }
          return total;
        }else{
          for(var i=0; i<data.length; i++){
            var menu = data[i]['menu_items'];
            for(var k=0; k<menu.length; k++){
              total+=menu[k]['sub_total'];
            }
          }
          return total;
        }
      }
      return 0;
    },

    orderDataSet: function(){
       initData.addNewToOrderData = {
          type: null,
          data: null,
       };
       this.orderDetail = null;
    },

    deleteDish: function(e){
      var $obj = $(e.currentTarget);
      var index = $obj.parents('li').index();
      var menuIndex = $obj.parents('.parent-menu').index()-1;
      var type = $obj.attr('type');
      var $allPrice = $obj.parent().next().find('strong');
      var $num = $obj.parent().find('strong');
      var num = parseInt($num.text());
      var $minus = $obj.parent().find('.edit-minus');
      for(var i=0; i<num; i++){
        $minus.trigger('click');
      }
      // if(type == 1){
      //   this.commonDelete(index,type);
      // }else{
      //   this.commonDelete(index,type,menuIndex);
      // }
      // var price = parseFloat($allPrice.text());
      // $total.text((parseFloat($total.text())-price).toFixed(2));
      console.log(this.orderDetail);
    },

    operationDishNum: function(e){
      var $obj = $(e.currentTarget);
      var index = $obj.parents('li').index();
      var menuIndex = $obj.parents('.parent-menu').index()-1;
      var price = parseFloat($obj.attr('price')) || 0;
      var type = $obj.attr('type');
      var $allPrice = $obj.parent().next().find('strong');
      var $total = $('.list-all-price').find('b');
      var $num = $obj.parent().find('strong');
      var origin = parseInt($num.attr('start')) || 1;
      var num = parseInt($num.text());
      if($obj.hasClass('disable')){
        return;
      }
      if(type == 1){ 
          $num.text($obj.hasClass('edit-add') ? ++num : --num);
          this.orderDetail[index]['origin_cnt'] = origin;
          this.orderDetail[index]['unit_cnt'] = num;
          this.orderDetail[index]['sub_total'] = num*price;
          if(num == 0){
            $obj.hasClass('edit-minus') && $obj.addClass('disable');
            $obj.parents('li').find('.order-fix').addClass('line-through');
           // this.commonDelete(index,type);
          }else{
            $obj.hasClass('edit-minus') && $obj.removeClass('disable');
            $obj.hasClass('edit-add') && $obj.siblings('.edit-minus').removeClass('disable');
            $obj.parents('li').find('.order-fix').removeClass('line-through');
          }     
      }else{
          $num.text($obj.hasClass('edit-add') ? ++num : --num);
          this.orderDetail['Orders'][index]['menu_items'][menuIndex]['origin_num'] = origin;
          this.orderDetail['Orders'][index]['menu_items'][menuIndex]['num'] = num;
          this.orderDetail['Orders'][index]['menu_items'][menuIndex]['sub_total'] = num*price;
          if(num == 0){
            $obj.hasClass('edit-minus') && $obj.addClass('disable');
            $obj.parents('.parent-menu').find('.order-fix').addClass('line-through');
            // this.commonDelete(index,type,menuIndex);
          }else{
            $obj.hasClass('edit-minus') && $obj.removeClass('disable');
            $obj.hasClass('edit-add') && $obj.siblings('.edit-minus').removeClass('disable');
            $obj.parents('.parent-menu').find('.order-fix').removeClass('line-through');
          }   
      }
      if(num !== origin){
        $num.addClass('change-color');
      }else{
        $num.removeClass('change-color');
      }
      price = $obj.hasClass('edit-add') ? price : -price;
      $allPrice.text((parseFloat($allPrice.text())+price).toFixed(2));
      $total.text((parseFloat($total.text())+price).toFixed(2)); 
      if(type == 1){
        this.orderDetail[this.orderDetail.length-1]['pre_tax'] = parseFloat($total.text());
      }else{
        this.orderDetail['order_extra']['before_tax'] = parseFloat($total.text());
      }
      console.log(this.orderDetail);
    }, 

    commonDelete: function(index,type,menuIndex){
      if(type == 1){
        this.orderDetail.splice(index,1);
        $(".order-list-show li").eq(index).remove();
      }else{
        this.orderDetail['Orders'][index]['menu_items'].splice(menuIndex,1);
        $(".order-list-show li").eq(index).find('.parent-menu').eq(menuIndex).remove();
        if(this.orderDetail['Orders'][index]['menu_items'].length == 0){
          this.orderDetail['Orders'].splice(index,1);
          $(".order-list-show li").eq(index).remove();
        }
      }
      $(".order-list-show .query").each(function(){
        if(type == 1){
           var index = $(this).parents('li').index();
           $(this).text(index+1+'.');
        }else{
           var index = $(this).parents('.parent-menu').index();
           $(this).text(index+'.');
        }
       
      });
    },

    cancelOrder: function(){
      var restId = initData.orderEditData.restId;
      var ordId = initData.orderEditData.ordId;
      var _this = this;
      chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri4('cancelKidsOrder.json'),
                  data: {
                     restId: restId,
                     ordId: ordId,
                     cont: '',
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('Delete successfully',1200,function(){
                          _this.orderDataSet();
                          app_router.navigate('myOrder',{
                            trigger: true
                          })
                        });
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200);
                     }
                  }
              });  
    },

    showCancelInfo: function(e){
      var _this = this;
       var pop = $('#popInfo');
       var info ='<p>Are you sure to delete this order?</p><div class="error-pop"><span class="close-pop">cancel</span><span class="refresh">ok</span></div>'
       pop.html(info).addClass('pop-info-show');
       $(".error-pop .close-pop").on('click',function(){
           pop.removeClass('pop-info-show').html('');
       });
       $(".error-pop .refresh").on('click',function(){
           pop.removeClass('pop-info-show').html('');
           _this.cancelOrder();
       });

    },

    fixData: function(data,type){
      if(type == 1){
        var newArray = [];
          if(data && data.length){
            var totalInfo = data.pop();
            data.forEach(function(item,index){
              if(item.unit_cnt){
              var origin = {
                'menuId': item.rest_menu_item_id,
                'menu_desc': item.rest_menu_desc,
                'name': item.rest_menu_desc,
                'num': item.unit_cnt,
                'price': item.unit_price,
              }
              if(item.hasOwnProperty('comments')){
                origin['comments'] = item.comments;
              }
              if(item.hasOwnProperty('components')){
                origin['components'] = item.components;
              }
              newArray.push(origin);
            }
            });
            newArray.push(totalInfo);
          }
          return newArray;
      }else{
        var orderLast = [];
        data['Orders'].forEach(function(item,index){
          if(item['fix']){
            delete item['fix'];
          }
          var menu = item['menu_items'];
          var menuLast = [];
          if(menu && menu.length){
            for(var i=0; i<menu.length; i++){
              if(menu[i]['fix']){
                delete menu[i]['fix'];
              }
              if(menu[i].hasOwnProperty('origin_num')){
                delete menu[i]['origin_num'];
              }
              if(menu[i]['num'] != 0){
               menuLast.push(menu[i]);
              } 
            }
            item['menu_items'] = menuLast;
          }     
          if(menuLast.length != 0){
             orderLast.push(item);
          }
        });
        data['Orders'] = orderLast;
      }
      return data;
    },

    updateOrder: function(e){
      var $obj = $(e.currentTarget);
      var restId = initData.orderEditData.restId;
      var ordId = initData.orderEditData.ordId;
      var tabId = $obj.attr('table');
      var type = $obj.attr('type');
      var _this = this;
      var data = type == 2 ? {
        "General Information": this.orderDetail['General Information'],
        "Orders" : this.orderDetail['Orders'],
      } : this.orderDetail;
      data = this.fixData(data,type);
      if(type == 2 && data['Orders'].length == 0){
          newChihuo.showPopInfo('There is nothing in this order, please delete it.',3000);
          return;
      }
      if(type == 1 && data.length == 1){
          newChihuo.showPopInfo('There is nothing in this order, please check it.',3000);
          return;
      }
      
      chihuo.wkAjax({
          type: 'POST',
          url: type == 2 ? chihuo.getApiUri4('chgKidsOrder.json') : chihuo.getApiUri3('updateOrder.json'),
          data: type == 2 ? {
              restId: restId,
              ordId: ordId,
              cont: JSON.stringify(data),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              } : {
              restId: restId,
              ordId: ordId,
              tabId: tabId,
              detail: JSON.stringify(data),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
            if(data.status == 0){
                newChihuo.showPopInfo('update successfully',1200,function(){
                  _this.orderDataSet();
                 
                  app_router.navigate('myOrder',{
                        trigger: true
                      })
                  });
            }else{
                newChihuo.showPopInfo(data.errorMsg,1200);
            }
            } 
          });  

    },


    initData: function(id){
     

    },

    bindEvents: function(){
      var _this = this;
       $('.reload-top-icon').on('click',function(){
         $('#reload').addClass('show-reload');          
          setTimeout(function(){$('#reload').removeClass('show-reload')},1000);
          _this.initData();
      });
      
    }
  });
  return OrderEditView;
});
