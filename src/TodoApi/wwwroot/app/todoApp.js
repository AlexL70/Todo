(function () {
    angular.module('todoApp', [
        'ui.router'
    ])
    .constant('ApiBasePath', '/api/todo');
})();