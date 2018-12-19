define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/restaurant/restaurantMissingTemplate.html',
], function($, _, Backbone, restaurantMissingTemplate){

  var RestaurantMissingView = Backbone.View.extend({
    el: $("#page"),
    events: {
     'click .missing-submit':'missingRest'
    },

    render: function(){
      newChihuo.setPage('restaurantMissing');
      newChihuo.windowInit();
      this.$el.html(_.template(restaurantMissingTemplate));
      chihuo.wkLoginPermission();
    },

    missingRest: function(){
      if(chihuo.wkLoginPermission()){
      var city = $.trim($('#missingCity').val()),
          name = $.trim($('#missingName').val()),
          address = $.trim($('#missingAddress').val());
      if(name && address && city){
        var bodyCont ='You submit a missing restaurant,\n name: '+name+',\n address: '+ address +',\n city: '+ city+',\n userId: '+(newChihuo.customerId || newChihuo.getLocalStorage('customer_id'));
        var mail = 'mailto:info@wookongcorp.com?&body='+ encodeURIComponent(bodyCont) +'&subject=Require to add a missing restaurant'; 
        $('.missing-submit').attr('href',mail);
      }else{
        newChihuo.showPopInfo(newChihuo.localize('need_to_enter_all'),1000);
        return false;
      }

       }
      
    },

    

    

   

  });
  return RestaurantMissingView;
});
