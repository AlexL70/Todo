﻿(function () {
    "use strict";

    angular.module('todoApp')
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

        return service;
    }
})();