define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/school/schoolDetailTemplate.html',
  'swiper'
], function($, _, Backbone, schoolDetailTemplate){

  var SchoolDetailView= Backbone.View.extend({
    el: $("#page"),
    events: {
      'click #saveChild':'saveChildInfo',
      'click #deleteChild':'deleteChildInfo',
      'change #schoolId': 'schoolInfoChange'
     
    },

    render: function(type,index){
      newChihuo.setPage('schoolDetail');
      newChihuo.windowInit();
      if(type=='edit'){
        var num = index-1;
        initData.schoolDetailData.type = 'edit';
        initData.schoolDetailData.info = initData.schoolIndexData.data[num];
      }else{
        initData.schoolDetailData.type = 'add';
        initData.schoolDetailData.info = {};
      }
      if(index !== undefined){
        initData.schoolDetailData.index = index;
      }
      this.$el.html(_.template(schoolDetailTemplate,initData.schoolDetailData));
      this.initData();
    },

    schoolInfoChange: function(e){
      var addr = $(e.currentTarget).find("option:selected").attr('addr')
      $('#schoolAddress').val(addr);
    },

    saveChildInfo: function(e){
      var type = $(e.currentTarget).attr('type');
      var chdId = $(e.currentTarget).attr('chdId');
      var firstName = $("#childFirstName").val();
      var lastName = $("#childLastName").val();
      var gradeId = $("#grade").val();
      var gradeName = $("#grade option:selected").text();
      var teacherName = $("#teacherName").val();
      var schoolId = $("#schoolId").val();
      var schoolName = $("#schoolId option:selected").text();
      var detail = {
          "first_name": firstName,
          "last_name": lastName,
          "grade_id": gradeId,
          "grade_name": gradeName,
          "teacher_name": teacherName,
          "school_id": schoolId,
          "school_name": schoolName,
      };
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri4(type == 'Edit' ? 'updateChild.json' : 'addChild.json'),
          data: {
              chdId: type == 'edit' ? chdId : undefined,
              cont: JSON.stringify(detail),
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                var str = type =='Edit' ? 'Update child info successfully!' : 'Add child info successfully!';
                newChihuo.showPopInfo(str,1200,function(){
                    app_router.navigate('childList/'+initData.schoolIndexData.rest,{
                            trigger: true
                    });
                });
                 
              }else{
                  newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });  

    },

    deleteChildInfo: function(e){
      var chdId = $(e.currentTarget).attr('chdId');
      chihuo.wkAjax({
          type: 'POST',
          url: chihuo.getApiUri4('rmChild.json'),
          data: {
              chdId: chdId,
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                  newChihuo.showPopInfo('delete successfully',1200,function(){
                          app_router.navigate('childList/'+initData.schoolIndexData.rest,{
                            trigger: true
                    });
                  });
              }else{
                  newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });  

    },

   initData: function(){
      var _this = this;
      !initData.schoolDetailData.school.length && chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri4('getSchDesc.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                initData.schoolDetailData.school = data.data;
                newChihuo.getPage('schoolDetail') && _this.$el.html(_.template(schoolDetailTemplate,initData.schoolDetailData));
              }else{
                  newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });  

      !initData.schoolDetailData.grade.length && chihuo.wkAjax({
          type: 'GET',
          url: chihuo.getApiUri4('getGradeDesc.json'),
          data: {
              lat: newChihuo.lat,
              lng: newChihuo.lon,
              locale: 'en',
              },
          success: function(data){
              if(data.status == 0){
                initData.schoolDetailData.grade = data.data;
                 newChihuo.getPage('schoolDetail') && _this.$el.html(_.template(schoolDetailTemplate,initData.schoolDetailData)); 
              }else{
                  newChihuo.showPopInfo(data.errorMsg,1200);
              }
            } 
      });      
    },

  });
  return SchoolDetailView;
});
