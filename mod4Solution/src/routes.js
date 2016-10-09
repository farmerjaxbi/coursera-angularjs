(function () {
'use strict';

angular.module('MenuApp')
  .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
//home page

  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
    // params: {
    //   itemId: null
    // }
  })

//categories list page
  .state('categories', {
    url: '/menu-categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      items: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

//items in a parent category
  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as itemDetail',
    // params: {
    //   itemId: null
    // },
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.itemId);
        // .then(function (items) {
        //   return items[$stateParams.itemId];
        // });
      }]
    }
  })


}

})();
