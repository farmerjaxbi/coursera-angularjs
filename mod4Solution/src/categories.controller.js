(function () {
'use strict';

angular.module('data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['items'];
// console.log('Categories controller called');
function CategoriesController(items) {
  // console.log('categories function called');
  var categories = this;
  // console.log(categories);
  categories.items = items;
  // console.log(categories.items);
}

})();
