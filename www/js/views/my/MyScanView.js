define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/my/myScanTemplate.html',
], function($, _, Backbone, myScanTemplate){

  var MyScanView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .scan-return': 'goBack',
    },

    render: function(info){
      newChihuo.setPage('myScan');
      newChihuo.hasStatusBar() && StatusBar.backgroundColorByHexString("#fafafa");
      $('body').addClass('body-bg-none');
      this.$el.html(_.template(myScanTemplate));
      this.initData();
    },

    getRestId: function(text){
      if(text){
        var r1 = text.split('?')[1];
        if(r1){
          var r2 = r1.split('&')[0];
          if(r2){
            return r2.split('=')[1];
          }
        }
      }
      return null;
    },
    getTableId: function(text){
      if(text){
        var r1 = text.split('?')[1];
        if(r1){
          var r2 = r1.split('&')[1];
          if(r2){
            return r2.split('=')[1];
          }
        }
      }
      return null;
    },

    initData: function(){
      var _this = this;
      QRUtils.scan(function(status,text){
        setTimeout(function(){
          if(status && text.indexOf('FoodyMonkey')>=0){
            var id = _this.getRestId(text);
            var tabId = _this.getTableId(text) || 1;
            if(id){
              chihuo.wkAjax({
                  type: 'GET',
                  url: chihuo.getApiUri3('getOriRestId.json'),
                  data: {
                      lat: newChihuo.lat,
                      lng: newChihuo.lon,
                      locale: 'en',
                      ecRestId: id,
                  },
                  success: function(data){
                    var data = data.data[0];
                      if(data.status_code == 0){
                       var restId = data.orig_restid;
                       var rest_info = JSON.parse(data.rest_info);
                        _this.goBack();
                        initData.orderNewData.info = {
                           name: rest_info.rest_name,
                           address: rest_info.addr,
                        };
                        app_router.navigate('orderNew/'+restId+'/'+tabId,{
                            trigger: true
                        });
                    }
                  }
                  });
            }
          } else {
            alert(status);
            alert(text);
            location.reload(); 
          }
        },1000); 
      });
    },

    goBack: function(){
      $('body').removeClass('body-bg-none');
      QRUtils.exit();
    },

  });
  return  MyScanView;
});
