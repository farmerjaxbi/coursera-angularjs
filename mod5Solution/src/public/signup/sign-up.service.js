(function () {
"use strict";

angular.module('public')
  .service('SignUpService',SignUpService);

// SignUpService.$inject = ['$scope'];

function SignUpService () {
var service = this;
  service.user = {};
  service.menu = {};
// console.log(service);
  service.setUser = function (firstname, lastname, email, phone) {
    service.user.firstname = firstname;
    service.user.lastname = lastname;
    service.user.phone = phone;
    service.user.email = email;
  }
  service.setItem = function(short_name, name, description) {
  service.menu.dish = short_name;
  service.menu.name = name;
  service.menu.desc = description;
  }
  service.getUser = function (){
    return service.user;
  }
  service.getItemData = function (){
    return service.menu;
  }
};

})();
