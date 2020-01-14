define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolInfoTemplate.html',
  'swiper'
], function($, _, Backbone, schoolInfoTemplate){

  var SchoolInfoView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .child-select':'selectChild',
      'click #goSchoolOrder':'goSchoolOrder'
     
    },

    render: function(){
      newChihuo.setPage('schoolInfo');
      newChihuo.windowInit();
      this.$el.html(_.template(schoolInfoTemplate,initData.schoolIndexData));
      this.initData();
    },

    initData: function(){

    },
    selectChild: function(e){
      var index = $(e.currentTarget).index('input');
      initData.schoolIndexData.selected = index;
      $('#goSchoolOrder').addClass('can-order');
    },
    goSchoolOrder: function(e){
      var $obj = $(e.currentTarget);
      if($obj.hasClass('can-order')){
         app_router.navigate('childOrder/'+initData.schoolIndexData.rest+'/'+initData.schoolIndexData.selected,{
              trigger: true
          });
      }else{
        newChihuo.showPopInfo('You should choose a child');
      }
    }

  });
  return SchoolInfoView;
});
