(function(){
"use strict";

angular.module('public')
  .constant('ImagePath', 'https://ychaikin-course5.herokuapp.com')
  .component('myInfo', {
    templateUrl: 'src/public/myinfo/myInfoComponent.html',
    controller: MyInfoController,
    controllerAs: "myInfoCtrl"

  });

  MyInfoController.$inject = ['SignUpService','ImagePath'];
  function MyInfoController(SignUpService, ImagePath) {
    var ctrl = this;
     ctrl.user = SignUpService.getUser();
     ctrl.item = SignUpService.getItemData();
     ctrl.basePath = ImagePath;
     if(ctrl.user.firstname !=null &&
       ctrl.user.lastname !=null &&
       ctrl.user.email !=null &&
       ctrl.user.phone !=null) {
         ctrl.userExists = true;
       }
    //  console.log(ctrl.item);
    // console.log(ctrl.basePath + "/images/" + ctrl.item.short_name);

  };

})();
