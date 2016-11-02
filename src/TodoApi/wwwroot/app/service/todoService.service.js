(function () {
    "use strict";

    angular.module('todoService')
    .service('TodoAppService', TodoAppService);

    TodoAppService.$inject = ['$http', 'ApiBasePath'];

    function TodoAppService($http, ApiBasePath) {
        var service = {};

        service.GetAll = function () {
            var response = $http.get(ApiBasePath);
            return response;
        };

        service.GetTodo = function (id) {
            var response = $http.get(ApiBasePath + '/' + id);
            return response;
        };

        service.Create = function (todo) {
            var response = $http.post(ApiBasePath, todo);
            return response;
        };

        service.Update = function (todo) {
            var response = $http.put(ApiBasePath + '/' + todo.key);
            return response;
        };

        service.Delete = function (id) {
            var response = $http.delete(ApiBasePath + '/' + id);
            return response;
        };

        return service;
    }
})();