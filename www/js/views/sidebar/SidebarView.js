define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/sidebar/sidebarTemplate.html'
], function($, _, Backbone,sidebarTemplate) {

    var SidebarView = Backbone.View.extend({
        el: $("#sidebar"),

        events: {
           
        },

        render: function(info) {
           var self = this;
           initData.photoData.info = info ? info : null;
           this.$el.html(_.template(sidebarTemplate,initData.photoData)).addClass('show-big-modal');
           this.PhotoCompliment(info);
           var onBackKeyDown = function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    console.log("removeEventListener('backbutton',onBackKeyDown)");
                    //alert('backbutton event');
                    document.removeEventListener('backbutton',onBackKeyDown,false);    
                    $("#sidebar").removeClass('show-big-modal');  
            }
            document.addEventListener('backbutton',onBackKeyDown,false);

            $('.close-big-modal').on('click',function(){
              $("#sidebar").removeClass('show-big-modal');
              document.removeEventListener('backbutton',onBackKeyDown,false);
            });
        },



        PhotoCompliment: function(info){
        info && $('#photoDetail .good-icon').on('click',function(){
              if($(this).hasClass('good-done')){
              return;
            }
            var _this = this;
              chihuo.wkAjax({
                  type: 'POST',
                  url: chihuo.getApiUri('addCustRestPhotoCompliment.json'),
                  data: {
                     photoId: info.photoId,
                     restId: info.restId,
                     lat: newChihuo.lat,
                     lng: newChihuo.lon,
                     locale: 'en'
                  },
                  success: function(data){
                     if(data.status == 0){
                        var num = parseInt($(_this).text()) || 0;
                        $(_this).addClass('good-done').text(++num);
                        $('.modal-photo-show').parent().next('.rest-comment-bottom').find('.good-icon').addClass('good-done').text(num);
                        $('.modal-photo-show').attr({'compliment':'Y','total':num}).removeClass('modal-photo-show');
                     }
                  } 
              });  

          })
         }


    });

    return SidebarView;

});
