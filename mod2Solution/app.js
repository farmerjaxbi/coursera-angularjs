(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var tobuy = this;
  tobuy.items = ShoppingListCheckOffService.getItems();
  tobuy.addItem = function (index) {
    try {
    tobuy.itemName = tobuy.items[index].name;
    tobuy.itemQuantity = tobuy.items[index].quantity;
    ShoppingListCheckOffService.addItem(tobuy.itemName, tobuy.itemQuantity, index);
    } catch (error) {
    tobuy.errorMessage = error.message;
      }
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;
    bought.items = ShoppingListCheckOffService.getBought();
    bought.onceCounter = 0;
    try {
    ShoppingListCheckOffService.initialMessage(bought.onceCounter);
    } catch (error) {
    bought.initialMessage = error.message;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var tobuy = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Freddo Frogs",
    quantity: "6"
  }
];

// items bought

  var bought = [];
  var itemCount = tobuy.length;

  service.addItem = function (itemName, quantity, index) {

    var item = {
      name: itemName,
      quantity: quantity
    };
    bought.push(item);
    tobuy.splice(index, 1);
    itemCount = tobuy.length;
    if (itemCount == '0') {
      throw new Error("Everything is bought!");
    }
    else {
    }

  };

  service.initialMessage = function (input) {
    if (input == 1) {
    }
    else {
      throw new Error("Nothing bought yet");
    }
  };
  service.getItems = function () {
    return tobuy;
  };
  service.getBought = function () {
    return bought;
      }
  };


})();
