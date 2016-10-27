(function () {
"use strict";

angular.module('public')
  .component('signUp', {
    templateUrl: 'src/public/signup/signUpComponent.html',
    controller: SignUpController,
    controllerAs: "signUpCtrl",
    // controller: SignUpController
  });

// SignUpController.$inject = ['SingUpService', 'MenuSearchService'];

SignUpController.$inject = ['SignUpService', 'ItemSearchService'];
function SignUpController(SignUpService, ItemSearchService) {
  var ctrl = this;
 // console.log(ctrl);
 ctrl.user = SignUpService.getUser();
 ctrl.menu = SignUpService.getItemData();



  ctrl.submit = function() {
    var promise = ItemSearchService.getMenuItems(ctrl.dish);

    promise.then(function (response){
      ctrl.response = response;
      // console.log(ctrl.response);

      if(ctrl.response.status == 200){
        ctrl.isItemNotFound = false;
        ctrl.completed = true;
        ctrl.menu = response.data;
              console.log(ctrl.menu);
        SignUpService.setUser(ctrl.firstname, ctrl.lastname, ctrl.email, ctrl.phone);
        SignUpService.setItem(response.data.short_name, response.data.name, response.data.description);
      }
      // else {

      //   ctrl.isItemNotFound = true;
      //   ctrl.completed = false;
      // }
    })
    // ctrl.menu.fav = ItemSearchService.getMenuItems(ctrl.dish);
    // console.log(ctrl);
    // ctrl.completed = true;

    .catch(function (error) {
      console.log("Error: " + error);
      ctrl.isItemNotFound = true;
      ctrl.completed = false;
    });
  }
}

})();
