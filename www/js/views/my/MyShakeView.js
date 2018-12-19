define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myShakeTemplate.html',
  'iscroll',
  'slotmachine'
], function($, _, Backbone, myShakeTemplate,IScroll){

  var MyShakeView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .shake-img':'hideMask',
     'click .lock-icon':'lockMachine'
     
    },

    render: function(){
      newChihuo.setPage('myShake');
      newChihuo.windowInit();
      this.$el.html(_.template(myShakeTemplate,initData.myShakeData));
      this.getRestSlotMchCat();
      

       //先判断设备是否支持HTML5摇一摇功能
if (window.DeviceMotionEvent) {
    //获取移动速度，得到device移动时相对之前某个时间的差值比
    !newChihuo.motionStatus ? window.addEventListener('devicemotion', deviceMotionHandler, false) : null;
}else{
    alert('您好，你目前所用的设备好像不支持重力感应哦！');
}
 
//设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了
var shakeThreshold = 3000;
//设置最后更新时间，用于对比
var lastUpdate     = 0;
//设置位置速率
var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;
 
function deviceMotionHandler(event){
    newChihuo.motionStatus = true;
    //获得重力加速
    var acceleration =event.accelerationIncludingGravity;
 
    //获得当前时间戳
    var curTime = new Date().getTime();
 
    if ((curTime - lastUpdate)> 100) {
 
        //时间差
        var diffTime = curTime -lastUpdate;
            lastUpdate = curTime;
 
 
        //x轴加速度
        curShakeX = acceleration.x;
        //y轴加速度
        curShakeY = acceleration.y;
        //z轴加速度
        curShakeZ = acceleration.z;
 
        var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
 
        if (speed > shakeThreshold && newChihuo.shakeTrigger) {
            //TODO 相关方法，比如：
            newChihuo.shakeTrigger = 0;
            $(".big-shake").trigger('click');
        }
 
        lastShakeX = curShakeX;
        lastShakeY = curShakeY;
        lastShakeZ = curShakeZ;
     }
    }
    },

    findNearbyRandomRest: function(ctype,ptype,dtype,callback){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findNearbyRandomRest.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     ctype: ctype || $('.shake1').attr('select'),
                     ptype: ptype || $('.shake2').attr('select'),
                     dtype: dtype || $('.shake3').attr('select'),
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(data.data && data.data.length){
                          var d = data.data[0];
                          var imgSrc = d.rest_profile_photo_url || 'imgs/rest-list-img.jpg';
                          var html ='<a href="#restaurant/'+d.rest_id+'"><img src="'+ imgSrc +'"><h3>'+d.rest_name+'</h3><p class="rest-info-show" style="padding-top:5px;">'+d.cuisine_type+'<span style="color:#ff8b4c; padding:0 10px;">'+d.rest_avg_pricelevel_per_person+'</span><span style="color:#0bbc13;">'+newChihuo.showDiscountInfo(d.rest_dicount_save)+'</span><br>'+newChihuo.showDistanceInfo(d.cust_distance)+'<span class="like-shake-icon">'+d.total_likes_perc+'%</span></p></a>';
                          callback && callback(d.cuisine_type,d.rest_avg_pricelevel_per_person,d.cust_distance);
                          setTimeout(function(){$('.mask-shake .shake-info').eq(1).hide().end().eq(0).show().html(html);
                          $('.mask-shake').show();},callback ? 2500 : 10);
                        }  
                        else{
                            $('.mask-shake .shake-info').eq(0).hide().end().eq(1).show();
                            $('.mask-shake').show();
                        }                 
                      }else{
                        $('.mask-shake .shake-info').eq(0).hide().end().eq(1).show();
                        $('.mask-shake').show();
                      }
                  }
              });  

    },

    getRestSlotMchCat: function(){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('getRestSlotMchCat.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                         initData.myShakeData.data = data.data;
                        newChihuo.getPage('myShake') && _this.$el.html(_.template(myShakeTemplate,initData.myShakeData));
                        newChihuo.getPage('myShake') && _this.bindEvents();
                        $('.shake1').attr('select',$('#slotMachine1').children().eq(0).find('p').text());
                        $('.shake2').attr('select',$('#slotMachine2').children().eq(0).find('p').text());
                        $('.shake3').attr('select',$('#slotMachine3').children().eq(0).find('p').text());
                      }
                    }
                    });
                  
    },

    bindEvents: function(){
        var _this = this;
        slot1 = new IScroll('#slot1',{
                   snap: '.slot1 li'
                });
        slot2 = new IScroll('#slot2',{
                   snap: '.slot2 li'
                });

        slot3 = new IScroll('#slot3',{
                   snap: '.slot3 li'
                });

        slot1.on('scrollEnd', function(){getLockInfo(1,slot1)});
        slot2.on('scrollEnd', function(){getLockInfo(2,slot2)});
        slot3.on('scrollEnd', function(){getLockInfo(3,slot3)});

        function getLockInfo(id,slot){
           var line = $('.table-cont').height() || 90;
           $('.shake'+id).attr('select',$('#slotMachine'+id).children().eq(Math.ceil(Math.abs(slot.y)/line)).find('p').text());
        }

        function getRandomNum(obj){
          var length = $(obj).children().length;
          var k = parseInt(length * Math.random());
          return k > length-3 ? length-3 : k;
        };

        function matchScroll(ctype,ptype,dtype){
          var ctype = ctype || 'All';
          var ptype = ptype || 'All';
          var dtype = dtype || 'All';
          var b1 = $('#slotMachine1').children();
          var b2 = $('#slotMachine2').children();
          var b3 = $('#slotMachine3').children();
          var time = 1500;
          var line = $('.table-cont').height() || 90;
          if($('.shake1').hasClass('unlock-icon')){
              for(var i = 0; i<b1.length; i++){
              if(b1.eq(i).text() == ctype){
                slot1.scrollTo(0, -line*i, time, IScroll.utils.ease.quadratic);
                break;
              }
              if(i == b1.length-1){
                slot1.scrollTo(0, 0, time, IScroll.utils.ease.quadratic);
                break;
              }
            }
          }
         if($('.shake2').hasClass('unlock-icon')){
          for(var k = 0; k<b2.length; k++){
            if(b2.eq(k).text() == $.trim(ptype)){
              slot2.scrollTo(0, -line*k, time, IScroll.utils.ease.quadratic);
              break;
            }
          }
        }
        if($('.shake3').hasClass('unlock-icon')){
          for(var j = 0; j<b3.length; j++){
            if(dtype == 'All'){
                slot3.scrollTo(0, 0, time, IScroll.utils.ease.quadratic);
                break;
            }
            if(parseFloat(b3.eq(j).text()) && parseFloat(b3.eq(j).text())>= parseFloat(dtype)){
              slot3.scrollTo(0, -line*j, time, IScroll.utils.ease.quadratic);
              break;
            }
          }
        }

        };

        var initS1 = 0,initS2 = 0, initS3 = 0;

        $(".big-shake").click(function(){
          var s1 = getRandomNum("#slotMachine1");
          var s2 = getRandomNum("#slotMachine2");
          var s3 = getRandomNum("#slotMachine3");
          var time = 1500;
          var query = 0;
          var d = 300;
          var b1 = $('#slotMachine1').children();
          var b2 = $('#slotMachine2').children();
          var b3 = $('#slotMachine3').children();
          var line = line || $('.table-cont').height();
          var ctype,ptype,dtype;

          if($('.unlock-icon').length){
              if($(this).hasClass('going')){
                return;
              }else{
                $(this).addClass('going');
              } 
              
              if($('.shake1').hasClass('unlock-icon')){
                  s1 = (s1 - initS1 !=0) ? s1 : 1; 
                  initS1 = s1;
                 slot1.scrollTo(0, -line*s1, time, IScroll.utils.ease.quadratic);
                 ctype ='All';
                 // $('.shake1').attr('select',b1.eq(s1+1).find('p').text());
                 ++query;
              }
              if($('.shake2').hasClass('unlock-icon')){
                s2 = (s2 - initS2 !=0) ? s2 : 1; 
                initS2 = s2;
                setTimeout(function(){slot2.scrollTo(0, -line*s2, time, IScroll.utils.ease.quadratic);},query*d);
                // $('.shake2').attr('select',b2.eq(s2+1).find('p').text());
                ptype ='All';
                 ++query;
              }
              if($('.shake3').hasClass('unlock-icon')){
                s3 = (s3 - initS3 !=0) ? s3 : 1; 
                initS3 = s3;
                setTimeout(function(){slot3.scrollTo(0, -line*s3, time, IScroll.utils.ease.quadratic);},query*d);
                // $('.shake3').attr('select',b3.eq(s3+1).find('p').text());
                dtype = 'All';
              }
               _this.findNearbyRandomRest(ctype,ptype,dtype,matchScroll);
               setTimeout(function(){ 
                  newChihuo.shakeTrigger = 1;
                  $(".big-shake").removeClass('going');    
                },time+query*d);
          }else{
            _this.findNearbyRandomRest();
          }
          

        });
    },

    hideMask: function(){
      $('.mask-shake').hide();
    },

    lockMachine: function(e){
      var obj=$(e.currentTarget);
      obj.toggleClass('unlock-icon');
      if(!obj.hasClass('unlock-icon')){
        if(obj.index('.lock-icon') == 0){
            slot1.disable();
        }else if(obj.index('.lock-icon') == 1){
            slot2.disable();
        }else{
            slot3.disable();
        }
      }else{
        if(obj.index('.lock-icon') == 0){
            slot1.enable();
        }else if(obj.index('.lock-icon') == 1){
            slot2.enable();
        }else{
            slot3.enable();
        }

      }

    }

  });
  return MyShakeView;
});
