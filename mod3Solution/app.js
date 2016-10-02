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

  };
  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}



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
      // console.log(foundItems);
      var foundDescriptions = []
      var i,j = 0

      for (i = 0; i <foundItems.length; i++) {
        if (foundItems[i].description.indexOf(searchTerm) !== -1) {
          menuArray.push(foundItems[i]);
        }
        foundDescriptions.push(foundItems[i].description);
      };

      return menuArray;
    });
  };

  service.getItems = function() {
    // console.log(menuArray);
    return menuArray;
  };

  service.removeItem = function(itemIndex) {
    menuArray.splice(itemIndex,1);
  };

}

})();
