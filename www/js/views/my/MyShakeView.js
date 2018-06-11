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

    findNearbyRandomRest: function(){
      var _this = this;
         chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri('findNearbyRandomRest.json'),
                  data: {
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en',
                     ctype: $('.shake1').attr('select'),
                     ptype: $('.shake2').attr('select'),
                     dtype: $('.shake3').attr('select'),
                  },
                  success: function(data){
                     if(data.status == 0){
                      if(data.data && data.data.length){
                          var d = data.data[0];
                          var imgSrc = d.rest_profile_photo_url || 'imgs/rest-list-img.jpg';
                          var html ='<a href="#restaurant/'+d.rest_id+'"><img src="'+ imgSrc +'"><h3>'+d.rest_name+'</h3><p class="rest-info-show" style="padding-top:5px;">'+d.cuisine_type+'<span style="color:#ff8b4c; padding:0 10px;">'+d.rest_avg_pricelevel_per_person+'</span><span style="color:#0bbc13;">'+d.rest_dicount_save+'off</span><br>'+d.cust_distance+'公里  '+d.total_likes_perc+'%喜欢</p></a>';
                          $('.mask-shake .shake-info');
                          $('.mask-shake .shake-info').eq(1).hide().end().eq(0).show().html(html);
                          $('.mask-shake').show();
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
                        $('.shake1').attr('select',$('#slotMachine1').children().eq(1).find('p').text());
                        $('.shake2').attr('select',$('#slotMachine2').children().eq(1).find('p').text());
                        $('.shake3').attr('select',$('#slotMachine3').children().eq(1).find('p').text());
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

        slot1.on('scrollEnd', getLockInfo1);
        slot2.on('scrollEnd', getLockInfo2);
        slot3.on('scrollEnd', getLockInfo3);

        function getLockInfo1(){
           $('.shake1').attr('select',$('#slotMachine1').children().eq(Math.abs(slot1.y)/50+1).find('p').text());
        }

        function getLockInfo2(){
           $('.shake2').attr('select',$('#slotMachine2').children().eq(Math.abs(slot2.y)/50+1).find('p').text());
        }

        function getLockInfo3(){
           $('.shake3').attr('select',$('#slotMachine3').children().eq(Math.abs(slot3.y)/50+1).find('p').text());
        }

        function getRandomNum(obj){
          var length = $(obj).children().length;
          var k = parseInt(length * Math.random());
          return k > length-3 ? length-3 : k;
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

          if($('.unlock-icon').length){
              if($(this).hasClass('going')){
                return;
              }else{
                $(this).addClass('going');
              } 
              
              if($('.shake1').hasClass('unlock-icon')){
                  s1 = (s1 - initS1 !=0) ? s1 : 1; 
                  initS1 = s1;
                 slot1.scrollTo(0, -50*s1, time, IScroll.utils.ease.quadratic);
                 // $('.shake1').attr('select',b1.eq(s1+1).find('p').text());
                 ++query;
              }
              if($('.shake2').hasClass('unlock-icon')){
                s2 = (s2 - initS2 !=0) ? s2 : 1; 
                initS2 = s2;
                setTimeout(function(){slot2.scrollTo(0, -50*s2, time, IScroll.utils.ease.quadratic);},query*d);
                // $('.shake2').attr('select',b2.eq(s2+1).find('p').text());
                 ++query;
              }
              if($('.shake3').hasClass('unlock-icon')){
                s3 = (s3 - initS3 !=0) ? s3 : 1; 
                initS3 = s3;
                setTimeout(function(){slot3.scrollTo(0, -50*s3, time, IScroll.utils.ease.quadratic);},query*d);
                // $('.shake3').attr('select',b3.eq(s3+1).find('p').text());
              }
               setTimeout(function(){ 
                  newChihuo.shakeTrigger = 1;
                  $(".big-shake").removeClass('going');
                  _this.findNearbyRandomRest();
                },time+query*d+100);
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
