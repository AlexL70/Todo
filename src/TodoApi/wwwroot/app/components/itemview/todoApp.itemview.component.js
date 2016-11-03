(function () {
    "use strict";

    angular.module('todoComponents')
    .component('cmpItemView', {
        templateUrl: '/app/components/itemview/todoApp.itemview.template.html',
        bindings: {
            key: '@',
            name: '<',
            isComplete: '<',
            onUpdate: '&',
            onDelete: '&'
        }
    });
})();