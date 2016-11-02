(function () {
    "use strict";

    angular.module('todoApp')
    .component('cmpItemView', {
        templateUrl: '/app/itemview/todoApp.itemview.template.html',
        bindings: {
            key: '@',
            name: '<',
            isComplete: '<',
            onUpdate: '&',
            onDelete: '&'
        }
    });
})();