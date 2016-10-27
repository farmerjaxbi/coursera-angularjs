(function() {
"use strict";
/**
 * Public restaurant application. Includes the common module and ui-router.
 */
angular.module('public', ['ui.router', 'common'])
.constant('ApiPath', 'https://farmerjax-week5work.herokuapp.com/');
// .config(config);

// config.$inject = ['$httpProvider'];
// function config($httpProvider) {
//   $httpProvider.interceptors.push('loadingHttpInterceptor');
// }

})();
