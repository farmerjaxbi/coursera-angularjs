(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
   var list = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var menu = this;
  menu.searchTerm = "";
  var found = [];

  menu.items = MenuSearchService.getItems();


  menu.getMatchedMenuItems = function(response) {
    found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    // console.log(found);

  };
  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
  // console.log(foundItems);
}


  //
  // found.then(function (response) {
  //   menu.foundItems = response.data;
  //   console.log(menu.foundItems);
  // })

  // menu.logMenuItems = function (searchTerm) {
  //   var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
  //
  //   promise.then (function (response) {
  //     console.log(response.data);
  //   })
  // };


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var menuArray = [];

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function(result){
      var foundItems = result.data.menu_items;
      console.log(foundItems);
      var foundDescriptions = []
      var i,j = 0

      for (i = 0; i <foundItems.length; i++) {
        if (foundItems[i].description.indexOf(searchTerm) !== -1) {
          menuArray.push(foundItems[i]);
          // menuArray.push([foundItems[i].id, foundItems[i].description]);
        }
        foundDescriptions.push(foundItems[i].description);
      };

      // console.log(menuArray);

      return menuArray;
    });
  };

  service.getItems = function() {
    console.log(menuArray);
    return menuArray;
  };

  service.removeItem = function(itemIndex) {
    menuArray.splice(itemIndex,1);
  };

  // service.getMatchedMenuItems = function(searchTerm) {
  //   var response = $http({
  //     method: "GET",
  //     url: ApiBasePath
  //   });
  //
  //   return response;
  // };

  // return $http(...). then (function (result) {
  //
  //   var foundItems
  //
  //   return foundItems;
  // });

}

})();
