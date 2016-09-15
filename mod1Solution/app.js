(function() {
'use strict';

angular.module('LunchCheck', [])
 .controller('LunchCheckController', LunchCheckController);


LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  // $scope.lunchItems = "ddd";
  $scope.itemCount = 0;
  $scope.lunchItems = "";

 $scope.checkItems = function () {
//   $scope.items
  $scope.itemCount = $scope.lunchItems.split(" ").length;
  if ($scope.lunchItems === ""){
   $scope.sayMessage = "Please enter data first";
  }
  else {

  if ($scope.itemCount <= 3 && $scope.itemCount >= 1) {
   //  $scope.itemCount = 0
   $scope.sayMessage = "Enjoy!";
  // return "Enjoy!"; ($scope.itemCount > 3)
  }
  else {
    $scope.sayMessage = "Too much!";
    // return "Too much!";
  }
}
};
 // $scope.sayMessage = function () {
 //   if ($scope.itemCount <= 3 && $scope.itemCount >= 1) {
 //    //  $scope.itemCount = 0
 //   return "Enjoy!";
 // }
 //   else if ($scope.itemCount > 3) {
 //     return "Too much!";
 //   }
 //   else {
 //     return "Please enter data first"
 //    //  return $scope.itemCount;
 //   }
 // };

}
}());
