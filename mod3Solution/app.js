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
      onRemove: '&',
      emptyList: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
   var menu = this;
    // console.log(menu);

   menu.emptyListCheck = function() {

       if (menu.items == 0) {

         return true;
       }

    return false;
   };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var menu = this;
  menu.searchTerm = "";
  var found = [];

  menu.items = MenuSearchService.getItems();


  menu.emptyList = MenuSearchService.getEmpty();


  menu.getMatchedMenuItems = function(response) {
    found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    // console.log(found);
  };
  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}



MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var menuArray = [];
  var emptyList = [];
  service.getMatchedMenuItems = function(searchTerm) {
    menuArray.length = 0;

    if (searchTerm !=''){
      return $http({
        method: "GET",
        url: ApiBasePath
      }).then(function(result){
        var foundItems = result.data.menu_items;

        var foundDescriptions = []
        var i,j = 0

        for (i = 0; i <foundItems.length; i++) {
          if (foundItems[i].description.indexOf(searchTerm) !== -1) {
            menuArray.push(foundItems[i]);
          }

        };

        emptyList.push('not-empty');
        return emptyList;
        // return menuArray;
      });
    }

    else {
      emptyList = ['empty'];
      return emptyList;
    };

  };

  service.getEmpty = function() {

      return emptyList;
  };

  service.getItems = function() {

    return menuArray;
  };

  service.removeItem = function(itemIndex) {
    menuArray.splice(itemIndex,1);
  };

}

})();
