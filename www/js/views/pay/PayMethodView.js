define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pay/payMethodTemplate.html',
], function($, _, Backbone, payMethodTemplate){

  var PayMethodView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #pay-from-mobile': 'payfrommobile',
      'click #pay-from-counter,.counter-cancel': function(){
        $('.paymethod-wrap').toggleClass('show');
        $('#pay-from-counter').toggle();
      },
      'click #confirm-counter': 'payFromCounter'
    },

    render: function(info){
      this.$el.html(_.template(payMethodTemplate,initData.payData));
      console.log(initData.payData);
    },
    payFromCounter: function(){
        var restId = initData.payMethodData.restid;
        var ordId = initData.payMethodData.orderid;
        var tabId = initData.payMethodData.tableid;
        var detail = initData.payMethodData.detail;
        chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri3('payFromCounter.json'),
                  data: {
                     restId:restId,
                     ordId:ordId,
                     tabId:tabId,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     detail: JSON.stringify(detail),
                  },
                  success: function(data){
                     if(data.status == 0){
                        newChihuo.showPopInfo('sent successfully',1200);
                     }else{
                        newChihuo.showPopInfo(data.errorMsg,1200);
                     }
                  } 
              });  
    },
    payfrommobile: function () {
        var orderid = initData.payMethodData.orderid;
        var restid = initData.payMethodData.restid;
        var tableid = initData.payMethodData.tableid;
        // var custid = newChihuo.customerId || newChihuo.getLocalStorage('customer_id');
        var deviceid = WKStorageManager.getSysDeviceId() || '';
        var lat = newChihuo.lat;
        var lon = newChihuo.lon;
        var ts = new Date().getTime();
        console.log(initData.payMethodData);
        // window.location = newChihuo.address + '/pay#/order/o1?restid=123&tableid=2&local=en';
        // https://stackoverflow.com/questions/21085041/how-to-close-inappbrowser-itself-in-phonegap-application
        var url = newChihuo.address + '/pay?' + ts + '#/order/'+orderid+'?deviceid='+deviceid+'&restid='+restid+'&tableid='+tableid+'&local=en'+'&lat='+lat+'&lon='+lon+'&ts='+ts;
        // if(newChihuo.isMobileDevice() && cordova){
        if(typeof cordova !== 'undefined' && null != cordova){
            window.open = cordova.InAppBrowser.open;
        }
        history.go(-2);
        setTimeout(function(){
            var win=window.open( url, "_blank");
            var timerloop = 0;
            //win.addEventListener( "exit", function(){
            //    // alert('payment window closed');
            //    window.clearInterval(timerloop);
            //    history.go(-2);
            //});
            win.addEventListener( "loadstop", function(){
                timerloop = window.setInterval(function(){
                    win.executeScript({
                            code: "window.shouldClose"
                        },
                        function(values){
                            // alert(values);
                            if(values[0]){
                                // alert(values[0]);
                                win.close();
                                window.clearInterval(timerloop);
                            }
                        }
                    );
                },500);
            });
        }, 10);
    }
  });
  return PayMethodView;
});
