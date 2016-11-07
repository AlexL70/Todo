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
            templateUrl: '/app/controllers/list/todoapi.list.html',
            controller: 'ListController',
            controllerAs: 'lstCtrl',
            resolve: {
                todoItems: ['TodoAppService', function (TodoAppService) {
                    return TodoAppService.GetAll();
                }],
            }
        })
        .state('add', {
            url: '/new',
            templateUrl: '/app/controllers/new/todoapi.newitem.html',
            controller: 'NewItemController',
            controllerAs: 'niCtrl'
        })
        .state('edit', {
            url: '/item/{id}',
            templateUrl: '/app/controllers/edit/todoapi.edititem.html',
            controller: 'EditItemController',
            controllerAs: 'eiCtrl',
            resolve: {
                item: ['TodoAppService', '$stateParams', function(TodoAppService, $stateParams) {
                    return TodoAppService.GetTodo($stateParams.id);
                }],
            }
        })
        .state('delete', {
            url: '/delete/{id}',
            templateUrl: '/app/controllers/delete/todoapi.deleteitem.html',
            controller: 'DeleteItemController',
            controllerAs: 'diCtrl',
            resolve: {
                item: ['TodoAppService', '$stateParams', function (TodoAppService, $stateParams) {
                    return TodoAppService.GetTodo($stateParams.id);
                }],
            }
        });
    }
})();
