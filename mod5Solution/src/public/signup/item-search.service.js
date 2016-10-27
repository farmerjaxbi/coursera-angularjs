(function () {
  "use strict";

  angular.module('public')
    .service('ItemSearchService',ItemSearchService);

ItemSearchService.$inject = ['$http', 'ApiPath'];
function ItemSearchService($http, ApiPath) {
  var service = this;

  service.getMenuItems = function (shortname) {
    var config = {};
    // if (shortname) {
    //   config.params = {'short_name': shortname};
    // }

    return $http({
      method: "GET",
      url:(ApiPath + 'menu_items/' + shortname +'.json')
      // console.log(response.data);
      // return response.data;

    });
  }
}
})();
