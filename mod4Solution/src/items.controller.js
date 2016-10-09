(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
// console.log('items controller called');

function ItemsController(items) {
  // console.log('items controller function called');

  var itemDetail = this;
  itemDetail.items = items;

  // console.log(itemDetail);
}

})();
