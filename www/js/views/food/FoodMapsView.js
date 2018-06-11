define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/food/foodMapsTemplate.html',
], function($, _, Backbone, foodMapsTemplate){

  var FoodMapsView = Backbone.View.extend({
    el: $("#page"),
    events: {
    
     
    },

    render: function(){
      newChihuo.setPage('foodMaps');
      newChihuo.windowInit();
      this.$el.html(_.template(foodMapsTemplate));
      this.showMap();
    },

    showMap: function(){
      if (GBrowserIsCompatible()) {
              var map = new GMap2(document.getElementById("googleMap5"));
              map.setCenter(new GLatLng(37,120), 15);//纬度，经度
              // map.openInfoWindow(map.getCenter(),document.createTextNode("我的位置"));
              // function createMarker(point,id,name) {
              //   var myIcon = new GIcon(G_DEFAULT_ICON,"imgs/marker.png");
              //   var marker= new GMarker(point,{icon:myIcon});
              //   GEvent.addListener(marker, "click", function() {
              //     var myHtml= "<a href='#detailShop/" +id+ "'>"+name+"</a>";
              //     map.openInfoWindowHtml(point, myHtml);});
              //   return marker;
              // }
              // var infoData=data.data;
              // for (var i= 0; i< infoData.length; i++) {
              //   var point= new GLatLng(infoData[i].address_latitude,infoData[i].address_longitude);
              //       map.addOverlay(createMarker(point, infoData[i].rest_id,infoData[i].rest_name));
              // }
            }
    }

  });
  return FoodMapsView;
});
