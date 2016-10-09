(function () {
'use strict';
// menudata service
angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
var service = this;

service.getAllCategories = function() {
// categories.json
// console.log('get all categories called');
  return $http({
    method: "GET",
    url: (ApiBasePath + 'categories.json')
  }).then(function(result){
    console.log(result.data);
    return result.data;
  })
};

service.getItemsForCategory = function(categoryShortName) {
//menu_items.json
// console.log('getitems for category called');
  return $http({
    method: "GET",
    url: (ApiBasePath + 'menu_items.json'),
    params: {
      category: categoryShortName
    }
  }).then(function(result){
    // console.log(result.data)
    return result.data.menu_items;
  })
};

};

})();
