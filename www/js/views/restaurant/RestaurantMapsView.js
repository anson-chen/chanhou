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
              newChihuo.map = L.map('leafletMap').setView([initData.restaurantData.data[0].addr_lat,initData.restaurantData.data[0].addr_lng], 15);

              L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 15,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets',
                  detectRetina: true
              }).addTo(newChihuo.map);

              newChihuo.myIcon1 = newChihuo.myIcon1 || L.icon({
                  iconUrl: 'imgs/marker2.png',
                  iconSize: [40, 40], // [45, 50],
                  iconAnchor: [22, 40], // [22, 94],
                  popupAnchor: [0, -40],
                  className: 'set-index'
              });
             L.marker([initData.restaurantData.data[0].addr_lat,initData.restaurantData.data[0].addr_lng],{icon:  newChihuo.myIcon1 }).addTo(newChihuo.map).bindPopup('<span class="get-direction go-direction" lat ="'+initData.restaurantData.data[0].addr_lat+'" lng="'+initData.restaurantData.data[0].addr_lng+'"  name = "'+initData.restaurantData.data[0].rest_name+'">'+initData.restaurantData.data[0].rest_name+'<br>Get Directions</span>').openPopup();
              

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
