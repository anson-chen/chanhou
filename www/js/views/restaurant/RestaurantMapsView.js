define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantMapsTemplate.html',
], function($, _, Backbone, restaurantMapsTemplate){

  var RestaurantMapsView = Backbone.View.extend({
    el: $("#page"),
    events: {
     
    },

    render: function(){
      newChihuo.setPage('restaurantMaps');
      newChihuo.windowInit();
      this.$el.html(_.template(restaurantMapsTemplate,initData.restaurantData));
      if(initData.restaurantData.data[0] && initData.restaurantData.data[0].addr_lat && initData.restaurantData.data[0].addr_lng){
        this.showMap(initData.restaurantData.data[0].addr_lat,initData.restaurantData.data[0].addr_lng);
      }
      this.bindEvent();
    },

    showMap: function(lat,lon){
      if(lat && lon){
        var swiperMap =  new Swiper('#restaurantMaps-swiper', {
          slidesPerView: 'auto',
          onInit: function(swiper){
              function setMapMarker(lat,lon){
                var mapOpt = {
                center:new google.maps.LatLng(lat,lon),
                zoom:16,
                mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                newChihuo.map = new google.maps.Map(document.getElementById("googleMap4"),mapOpt);
               
                function createMarker(point) {
                       var marker = new google.maps.Marker({
                        position:point,
                        icon: 'imgs/marker2.png'
                       });
                        marker.setMap(newChihuo.map);
                        return marker;
                }
            
                var point= new google.maps.LatLng(lat,lon);
                createMarker(point);   
                }
                if(lat && lon){
                  setMapMarker(lat,lon);
                }
            }
        });
      }
    },

    bindEvent: function(){
      $('.radius-like').each(function(){
        var num = $(this).find('span').text();
        var radialObj = radialIndicator(this, {
              barColor: '#fb560a',
              barWidth: 10,
              radius: 30,
              initValue: 0,
              displayNumber: false,
              roundCorner : true
        }); 
        radialObj.animate(num); 
      });
    }

  });
  return RestaurantMapsView;
});
