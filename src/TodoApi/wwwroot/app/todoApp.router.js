(function () {
    "use strict";

    angular.module('todoApp')
    .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('list', {
            url: '/',
            templateUrl: '/app/list/todoapi.list.html',
            controller: 'ListController',
            controllerAs: 'lstCtrl',
            resolve: {
                todoItems: ['TodoAppService', function (TodoAppService) {
                    return TodoAppService.GetAll();
                }],
            }
        });
    }
})();